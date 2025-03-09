import { motionTokens, createPresenceComponent, MotionParam } from '@fluentui/react-motion';
import type { EnterExit, PresenceMotionCreator } from '../../types';
import { fadeAtom } from '../../atoms/fade-atom';

type FadeVariantParams = {
  /** Time (ms) for the transition. Can be a number or an array of 2 numbers for enter/exit.
   * Defaults to the `durationNormal` value (200 ms). */
  duration?: EnterExit<number>;

  /** Easing curve for the enter transition (fade-in). Can be a string or an array of 2 strings for enter/exit.
   * Defaults to the `easeEase` value.  */
  easing?: EnterExit<string>;
};

const get1st = <T extends MotionParam>(value: EnterExit<T>): T => (Array.isArray(value) ? value[0] : value);

const get2nd = <T extends MotionParam>(value: EnterExit<T>): T => (Array.isArray(value) ? value[1] : value);

/** Define a presence motion for fade in/out  */
export const createFadePresence: PresenceMotionCreator<FadeVariantParams> = ({
  duration = motionTokens.durationNormal,
  easing = motionTokens.curveEasyEase,
} = {}) => {
  return {
    enter: fadeAtom({ direction: 'enter', duration: get1st(duration), easing: get1st(easing) }),
    exit: fadeAtom({ direction: 'exit', duration: get2nd(duration), easing: get2nd(easing) }),
  };
};

/** A React component that applies fade in/out transitions to its children. */
export const Fade = createPresenceComponent(createFadePresence());

export const FadeSnappy = createPresenceComponent(createFadePresence({ duration: motionTokens.durationFast }));

export const FadeRelaxed = createPresenceComponent(createFadePresence({ duration: motionTokens.durationGentle }));
