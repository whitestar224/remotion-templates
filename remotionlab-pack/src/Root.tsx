import React from 'react';
import {Composition} from 'remotion';
import {templateRegistry} from './remotionlab.generated';

export const Root: React.FC = () => {
  return (
    <>
      {templateRegistry.map((template) => (
        <Composition
          key={template.id}
          id={template.id}
          component={template.component}
          durationInFrames={template.durationInFrames}
          fps={template.fps}
          width={template.width}
          height={template.height}
        />
      ))}
    </>
  );
};
