import { FC } from 'react';

import { range } from 'd3-array';
import { scaleLinear } from 'd3-scale';
import { Line, line as d3_line } from 'd3-shape';
import { Ease } from '../lib/types';

interface Props {
  width?: number;
  height?: number;
  ease?: Ease;
  numPoints?: number;
}

const EasePath: FC<Props> = ({ width = 100, height = 100, ease = t => t /*, numPoints = 1000*/ }) => {
  // TODO: fix this logic
  // numPoints = numPoints || width;
  const numPoints = width;
  // console.log('EasePath - ease:', ease);
  // TODO: prevent errors being thrown when ease is null,
  // but also show the most recent valid path while typing
  // if (!ease) return null;
  const sx = scaleLinear().domain([0, 1]).range([0, width]);
  const sy = scaleLinear().domain([0, 1]).range([height, 0]);
  const xData: number[] = range(0, 1, 1 / numPoints).concat(1);

  // TODO: filter out NaN
  let fLine: Line<number>;
  try {
    fLine = d3_line<number>()
      .x(t => sx(t))
      .y(t => sy(ease(t)));
  } catch (e) {
    return null;
  }
  return <path d={fLine(xData)!} stroke="white" fill="none" />;
};

export default EasePath;
