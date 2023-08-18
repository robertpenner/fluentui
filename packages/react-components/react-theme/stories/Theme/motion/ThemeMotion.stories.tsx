import * as React from 'react';
import { makeStyles, shorthands, teamsLightTheme } from '@fluentui/react-components';
import type { CurveTokens, DurationTokens } from '@fluentui/react-components';
import EaseGraph from './components/EaseGraph';
import * as BezierEasing from 'bezier-easing';

const theme = teamsLightTheme;

const curveNames = Object.keys(theme).filter(tokenName => tokenName.startsWith('curve')) as (keyof CurveTokens)[];

const useStyles = makeStyles({
  durationAnimation: {
    width: '4px',
    height: '64px',
    ...shorthands.margin(0, '30px'),
    backgroundColor: '#ccc',
    position: 'relative',
    animationIterationCount: 'infinite',
    animationName: {
      from: { transform: 'rotate(0)' },
      to: { transform: 'rotate(180deg)' },
    },
  },
  curvesAnimation: {
    width: '64px',
    height: '64px',
    // ...shorthands.margin(0, '30px'),
    ...shorthands.borderRadius('64px'),
    backgroundColor: '#ccc',
    position: 'relative',
    animationIterationCount: 'infinite',
    animationName: {
      from: { left: 0 },
      to: { left: '200px' },
    },
  },
});

export const MotionDuration = () => {
  const classes = useStyles();
  const [animationEnabled, setAnimationEnabled] = React.useState(false);
  return (
    <div>
      <input
        type="checkbox"
        id="durationEnableAnimations"
        checked={animationEnabled}
        onChange={() => {
          setAnimationEnabled(e => !e);
        }}
      />
      <label htmlFor="durationEnableAnimations">Enable animations</label>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'auto auto 1fr',
          gap: '10px',
          alignItems: 'center',
        }}
      >
        {(Object.keys(theme).filter(tokenName => tokenName.startsWith('duration')) as (keyof DurationTokens)[]).map(
          durationToken => [
            <div key={durationToken}>{durationToken}</div>,
            <div key={`${durationToken}-value`}>{theme[durationToken]}</div>,
            <div key={`${durationToken}-demo`}>
              <div
                className={classes.durationAnimation}
                style={{ animationDuration: animationEnabled ? theme[durationToken] : '0ms' }}
              />
            </div>,
          ],
        )}
      </div>
    </div>
  );
};

export const MotionCurves = () => {
  const classes = useStyles();
  const [animationEnabled, setAnimationEnabled] = React.useState(false);
  return (
    <div>
      <input
        type="checkbox"
        id="curvesEnableAnimations"
        checked={animationEnabled}
        onChange={() => {
          setAnimationEnabled(e => !e);
        }}
      />
      <label htmlFor="curvesEnableAnimations">Enable animations</label>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        {curveNames.map(curveToken => {
          const coordsStr = theme[curveToken].replace(/cubic-bezier\((.*)\)/, '$1');
          const svgSize = 64;
          const coords = coordsStr.split(',').map(parseFloat);
          const [x1, y1, x2, y2] = coords.map(n => n * svgSize);

          // const easing = (t: number) => t * t;
          const easing = BezierEasing(coords[0], coords[1], coords[2], coords[3]);
          return (
            <div
              key={curveToken}
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: 200,
                  gap: 5,
                }}
              >
                <div key={curveToken} style={{ fontWeight: 'bold' }}>
                  {curveToken}
                </div>

                <div>
                  <svg
                    key={`${curveToken}-svg`}
                    width={svgSize}
                    height={svgSize}
                    viewBox={`-2 -2 ${svgSize + 2} ${svgSize + 2}`}
                  >
                    <path
                      transform={`scale(1, -1) translate(0, -${svgSize})`}
                      d={`M 0 0 C ${x1} ${y1} ${x2} ${y2} ${svgSize} ${svgSize}`}
                      stroke="black"
                      strokeWidth="2"
                      fill="transparent"
                    />
                  </svg>
                </div>
                <div key={`${curveToken}-value`}>{theme[curveToken]}</div>
              </div>

              <div key={`${curveToken}-demo`}>
                <div
                  className={classes.curvesAnimation}
                  style={{
                    animationDuration: animationEnabled ? '2s' : '0s',
                    animationTimingFunction: theme[curveToken],
                  }}
                />
              </div>
              <EaseGraph ease={easing} width={300} height={100}></EaseGraph>
            </div>
          );
        })}{' '}
      </div>
    </div>
  );
};
