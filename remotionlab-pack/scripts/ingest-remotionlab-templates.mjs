import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const incomingDir = path.join(root, 'incoming');
const targetDir = path.join(root, 'src', 'remotionlab');
const registryFile = path.join(root, 'src', 'remotionlab.generated.tsx');

const slugify = (name) =>
  name
    .replace(/\.tsx?$/i, '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();

const pascalCase = (slug) =>
  slug
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');

fs.mkdirSync(incomingDir, {recursive: true});
fs.mkdirSync(targetDir, {recursive: true});

const files = fs
  .readdirSync(incomingDir)
  .filter((file) => file.endsWith('.tsx') || file.endsWith('.ts'))
  .sort();

if (files.length === 0) {
  console.log('No .tsx/.ts files found in incoming/. Registry kept as placeholder.');
  process.exit(0);
}

const entries = [];

for (const file of files) {
  const slug = slugify(file);
  const safeName = `${slug}.tsx`;
  const source = path.join(incomingDir, file);
  const target = path.join(targetDir, safeName);
  fs.copyFileSync(source, target);
  entries.push({
    id: pascalCase(slug) || 'Template',
    title: file.replace(/\.tsx?$/i, ''),
    importName: `Template_${entries.length}`,
    importPath: `./remotionlab/${slug}`,
  });
}

const importLines = entries
  .map((entry) => `import * as ${entry.importName} from '${entry.importPath}';`)
  .join('\n');

const registryEntries = entries
  .map(
    (entry) => `  {
    id: '${entry.id}',
    title: '${entry.title.replace(/'/g, "\\'")}',
    component: pickComponent(${entry.importName}),
    durationInFrames: 150,
    fps: 30,
    width: 1920,
    height: 1080,
  }`
  )
  .join(',\n');

const generated = `import React from 'react';
${importLines}

export type TemplateEntry = {
  id: string;
  title: string;
  component: React.ComponentType<Record<string, never>>;
  durationInFrames: number;
  fps: number;
  width: number;
  height: number;
};

const Empty: React.FC = () => null;

const pickComponent = (moduleExports: Record<string, unknown>): React.ComponentType<Record<string, never>> => {
  const maybeDefault = moduleExports.default;
  if (typeof maybeDefault === 'function') {
    return maybeDefault as React.ComponentType<Record<string, never>>;
  }

  const firstFunction = Object.values(moduleExports).find((value) => typeof value === 'function');
  if (typeof firstFunction === 'function') {
    return firstFunction as React.ComponentType<Record<string, never>>;
  }

  return Empty;
};

export const templateRegistry: TemplateEntry[] = [
${registryEntries}
];
`;

fs.writeFileSync(registryFile, generated);
console.log(`Imported ${entries.length} template(s) into src/remotionlab and regenerated src/remotionlab.generated.tsx.`);
