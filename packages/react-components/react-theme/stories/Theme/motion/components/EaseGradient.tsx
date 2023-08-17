import * as React from 'react';
import { FunctionComponent } from 'react';
import { range } from 'd3-array';
import { scaleLinear } from 'd3-scale';
import { velocity } from '../lib/pleasing';
import { linear } from '../lib/eases';
import { Ease } from '../lib/types';
import { interpolateRgbBasis } from 'd3-interpolate';

const getSpeedColor = (speed: number) => {
  // Range of Math.atan is from -pi/2 to pi/2 (-90 to 90 degrees)
  const angleRatio = Math.atan(speed) / (Math.PI / 2);
  return angleRatio > 0
    ? interpolateRgbBasis(['black', 'green', 'yellow'])(angleRatio)
    : interpolateRgbBasis(['black', 'blue', 'cyan'])(-angleRatio);
};

interface Props {
  width?: number;
  height?: number;
  ease?: Ease;
  numPoints?: number;
}

const EaseGradient: FunctionComponent<Props> = ({ width = 100, height = 100, ease = linear }) => {
  const numPoints = width;
  // if (!ease) return null;
  const sx = scaleLinear().domain([0, 1]).range([0, width]);
  const sy = scaleLinear().domain([0, 1]).range([height, 0]);
  const xData: number[] = range(0, 1, 1 / numPoints);
  // Need a slight overlap between strips to prevent banding artifacts
  const dx = width / numPoints + 0.2;
  const easeVelocity = velocity(ease);
  return (
    <g>
      {xData.map((t, i) => {
        const slope = easeVelocity(t);
        return <rect key={i} x={sx(t)} y={0} width={dx} height={height} fill={getSpeedColor(slope)} />;
      })}
    </g>
  );
};

export default EaseGradient;
