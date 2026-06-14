import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

export const Placeholder: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const scale = spring({frame, fps, config: {damping: 14, stiffness: 120}});
  const opacity = interpolate(frame, [0, 20], [0, 1], {extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(135deg, #101014 0%, #232332 100%)',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Inter, system-ui, sans-serif',
        color: 'white',
      }}
    >
      <div
        style={{
          transform: `scale(${scale})`,
          opacity,
          width: 760,
          borderRadius: 32,
          padding: 48,
          background: 'rgba(255,255,255,0.08)',
          boxShadow: '0 30px 90px rgba(0,0,0,0.35)',
          border: '1px solid rgba(255,255,255,0.16)',
        }}
      >
        <div style={{fontSize: 54, fontWeight: 800, marginBottom: 16}}>Remotion Lab Pack</div>
        <div style={{fontSize: 26, lineHeight: 1.45, color: 'rgba(255,255,255,0.78)'}}>
          Put downloaded .tsx templates into <b>incoming/</b>, then run <b>npm run ingest</b>.
        </div>
      </div>
    </AbsoluteFill>
  );
};
