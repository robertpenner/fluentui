/* tslint:disable:jsx-no-lambda */
import { FC, useState } from 'react';
import EasePath from '../components/EasePath';
import EaseGradient from './EaseGradient';
import { Ease } from '../lib/types';
import './EaseGraph.css';
import EaseCursor from './EaseCursor';

interface Props {
  ease: Ease;
  width?: number;
  height?: number;
  padding?: number;
  label?: string;
}

// TODO: create event for ease update (ignoring error intermediates)

const EaseGraph: FC<Props> = ({ ease, width = 200, height = 200, padding = 20, label = '' }: Props) => {
  const [mouseInside, setMouseInside] = useState(false);

  const fullWidth = width + 2 * padding;
  const fullHeight = height + 2 * padding;
  const crosshairStroke = 'rgba(255, 255, 255, 0.2)';
  // console.log('EaseGraph:', ease);
  return (
    <div
      className="main"
      onMouseEnter={() => {
        setMouseInside(true);
      }}
      onMouseLeave={() => {
        setMouseInside(false);
      }}
    >
      <svg id="graph" style={{ width: fullWidth, height: fullHeight }}>
        <rect visibility="hidden" width={fullWidth} height={fullHeight} stroke="rgba(255, 255, 255, 0.1)" fill="none" />
        {/* Need padding for graphs that overshoot */}
        <g transform={`translate(${padding}, ${padding})`}>
          <EaseGradient ease={ease} width={width} height={height} />
          <rect width={width} height={height} stroke="rgba(255, 255, 255, 0.1)" fill="none" />

          <line x1={width / 2} y1={0} x2={width / 2} y2={height} strokeWidth=".5" stroke={crosshairStroke} />
          <line x1={0} y1={height / 2} x2={width} y2={height / 2} strokeWidth=".5" stroke={crosshairStroke} />
          <EasePath ease={ease} width={width} height={height} />
          {mouseInside && <EaseCursor ease={ease} width={width} height={height} />}
        </g>
      </svg>
      <div className="label" style={{ paddingLeft: padding }}>
        {label}
      </div>
    </div>
  );
};

export default EaseGraph;
