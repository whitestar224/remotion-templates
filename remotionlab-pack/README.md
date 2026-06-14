# Remotion Lab Template Pack

This folder is a clean import workspace for Remotion Lab templates.

Source page: https://remotionlab.com/showcase

## Why this exists

Remotion Lab lists a Remotion animation template library and says templates can be downloaded as `.tsx` files. Its terms say the code templates are MIT licensed, but the site also says full code/download access requires login and forbids unauthorized bulk scraping or distributing member-only content.

So this pack is intentionally structured as a legal import scaffold:

- it does not scrape the site;
- it does not bypass login;
- it does not fabricate hidden template code;
- it keeps a place for attribution and license notes;
- it gives you a repeatable way to drop downloaded `.tsx` files into this repo and register them as Remotion compositions.

## Folder layout

```txt
remotionlab-pack/
  incoming/                         # Put downloaded Remotion Lab .tsx files here
  scripts/ingest-remotionlab-templates.mjs
  src/index.ts
  src/Root.tsx
  src/remotionlab/                  # Imported templates are copied here
  src/remotionlab.generated.tsx     # Generated registry
  src/templates/Placeholder.tsx
  package.json
  tsconfig.json
  REMOTIONLAB-LICENSE-NOTES.md
```

## Usage

```bash
cd remotionlab-pack
npm install

# 1. Download .tsx templates from Remotion Lab using your own logged-in account.
# 2. Put them into remotionlab-pack/incoming/
# 3. Generate the registry:
npm run ingest

# 4. Open Remotion Studio:
npm run dev
```

## Rendering

After importing templates, each detected template is exposed as a Remotion `<Composition />`.

```bash
npm run render -- TemplateSlug
```

The generated output goes to `out/template.mp4` by default.

## Important compliance note

If this repository remains public, only commit templates that you are allowed to publicly redistribute. If a template is login-only or member-only and the source terms forbid redistribution, keep it in a private repo or do not commit it.

Always keep the original file header/license comment when importing templates.
