import {
  motionTokens,
  createPresenceComponent,
  PresenceMotionFn,
  EnterExit,
  createPresenceComponentVariant,
} from '@fluentui/react-motion';
import { enterValue, exitValue } from '../../utils/presence-utils';

/** Define a presence motion for scale in/out */
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

  // TODO: use fadeAtom
  // TODO: make scaleAtom
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
export const Scale = createPresenceComponent(scalePresenceFn);

export const ScaleSnappy = createPresenceComponentVariant(Scale, {
  duration: motionTokens.durationFast,
  easing: [motionTokens.curveDecelerateMax, motionTokens.curveAccelerateMax],
});

export const ScaleRelaxed = createPresenceComponentVariant(Scale, {
  duration: motionTokens.durationGentle,
  easing: [motionTokens.curveDecelerateMid, motionTokens.curveAccelerateMid],
});
