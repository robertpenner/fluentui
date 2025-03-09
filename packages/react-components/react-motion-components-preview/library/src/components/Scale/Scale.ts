import { motionTokens, createPresenceComponent, PresenceMotionFn } from '@fluentui/react-motion';
import { EnterExit, PresenceMotionFnCreator } from '../../types';
import { ScaleRuntimeParams_unstable, ScaleVariantParams_unstable } from './Scale.types';
import { enterValue, exitValue } from '../../utils/presence-utils';

/** Define a presence motion for scale in/out */
export const createScalePresence: PresenceMotionFnCreator<ScaleVariantParams_unstable, ScaleRuntimeParams_unstable> =
  ({
    enterDuration = motionTokens.durationGentle,
    enterEasing = motionTokens.curveDecelerateMax,
    exitDuration = motionTokens.durationNormal,
    exitEasing = motionTokens.curveAccelerateMax,
  } = {}) =>
  ({ animateOpacity = true }) => {
    const fromOpacity = animateOpacity ? 0 : 1;
    const toOpacity = 1;
    const fromScale = 0.9; // Could be a custom param in the future
    const toScale = 1;

    const enterKeyframes = [
      { opacity: fromOpacity, transform: `scale3d(${fromScale}, ${fromScale}, 1)`, visibility: 'visible' },
      { opacity: toOpacity, transform: `scale3d(${toScale}, ${toScale}, 1)` },
    ];

    const exitKeyframes = [
      { opacity: toOpacity, transform: `scale3d(${toScale}, ${toScale}, 1)` },
      { opacity: fromOpacity, transform: `scale3d(${fromScale}, ${fromScale}, 1)`, visibility: 'hidden' },
    ];
    return {
      enter: {
        duration: enterDuration,
        easing: enterEasing,
        keyframes: enterKeyframes,
      },
      exit: { duration: exitDuration, easing: exitEasing, keyframes: exitKeyframes },
    };
  };

const scalePresenceFn: PresenceMotionFn<{
  duration: EnterExit<number>;
  easing: EnterExit<string>;
  animateOpacity?: boolean;
}> = ({
  duration = motionTokens.durationNormal,
  easing = [motionTokens.curveDecelerateMid, motionTokens.curveAccelerateMid],
  animateOpacity = true,
}) => {
  const fromOpacity = animateOpacity ? 0 : 1;
  const toOpacity = 1;
  const fromScale = 0.9; // Could be a custom param in the future
  const toScale = 1;

  const enterKeyframes = [
    { opacity: fromOpacity, transform: `scale3d(${fromScale}, ${fromScale}, 1)`, visibility: 'visible' },
    { opacity: toOpacity, transform: `scale3d(${toScale}, ${toScale}, 1)` },
  ];

  const exitKeyframes = [
    { opacity: toOpacity, transform: `scale3d(${toScale}, ${toScale}, 1)` },
    { opacity: fromOpacity, transform: `scale3d(${fromScale}, ${fromScale}, 1)`, visibility: 'hidden' },
  ];
  return {
    enter: {
      duration: enterValue(duration),
      easing: enterValue(easing),
      keyframes: enterKeyframes,
    },
    exit: { duration: exitValue(duration), easing: exitValue(easing), keyframes: exitKeyframes },
  };
};

/** A React component that applies scale in/out transitions to its children. */
export const Scale = createPresenceComponent(createScalePresence());

export const ScaleSnappy = createPresenceComponent(
  createScalePresence({
    enterDuration: motionTokens.durationNormal,
    enterEasing: motionTokens.curveDecelerateMax,
    exitDuration: motionTokens.durationFast,
    exitEasing: motionTokens.curveAccelerateMax,
  }),
);

export const ScaleRelaxed = createPresenceComponent(
  createScalePresence({
    enterDuration: motionTokens.durationSlow,
    enterEasing: motionTokens.curveDecelerateMax,
    exitDuration: motionTokens.durationGentle,
    exitEasing: motionTokens.curveAccelerateMax,
  }),
);
