import React from 'react';
import {Placeholder} from './templates/Placeholder';

export type TemplateEntry = {
  id: string;
  title: string;
  component: React.ComponentType<Record<string, never>>;
  durationInFrames: number;
  fps: number;
  width: number;
  height: number;
};

export const templateRegistry: TemplateEntry[] = [
  {
    id: 'Main',
    title: 'Remotion Lab Pack Placeholder',
    component: Placeholder,
    durationInFrames: 150,
    fps: 30,
    width: 1920,
    height: 1080,
  },
];
