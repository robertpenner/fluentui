import {
  motionTokens,
  createPresenceComponent,
  PresenceMotionFn,
  createPresenceComponentVariant,
  EnterExit,
} from '@fluentui/react-motion';
import { fadeAtom } from '../../atoms/fade-atom';
import { enterValue, exitValue } from '../../utils/presence-utils';

type FadeVariantParams = {
  /** Time (ms) for the transition. Can be a number or an array of 2 numbers for enter/exit.
   * Defaults to the `durationNormal` value (200 ms). */
  duration?: EnterExit<number>;

  /** Easing curve for the enter transition (fade-in). Can be a string or an array of 2 strings for enter/exit.
   * Defaults to the `easeEase` value.  */
  easing?: EnterExit<string>;
};

/** Define a presence motion for fade in/out  */
export const fadePresenceFn: PresenceMotionFn<FadeVariantParams> = ({
  duration = motionTokens.durationNormal,
  easing = motionTokens.curveEasyEase,
}) => {
  return {
    enter: fadeAtom({ direction: 'enter', duration: enterValue(duration), easing: enterValue(easing) }),
    exit: fadeAtom({ direction: 'exit', duration: exitValue(duration), easing: exitValue(easing) }),
  };
};

/** A React component that applies fade in/out transitions to its children. */
export const Fade = createPresenceComponent(fadePresenceFn);

export const FadeSnappy = createPresenceComponentVariant(Fade, { duration: motionTokens.durationFast });

export const FadeRelaxed = createPresenceComponentVariant(Fade, { duration: motionTokens.durationGentle });
