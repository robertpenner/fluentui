import type { PresenceMotionFn, MotionComponentProps } from '@fluentui/react-motion';
import { motionTokens, createPresenceComponent, createPresenceComponentVariant } from '@fluentui/react-motion';
import { fade } from '../../atoms/fade-atom';
import type { FadeParams, FadeMotionParams, FadeDirectionalParams, FadeComponent } from './fade-types';

/**
 * Define a presence motion for fade in/out
 *
 * @param duration - Time (ms) for the enter transition (fade-in). Defaults to the `durationNormal` value (200 ms).
 * @param easing - Easing curve for the enter transition (fade-in). Defaults to the `curveEasyEase` value.
 * @param delay - Time (ms) to delay the enter transition. Defaults to 0.
 * @param exitDuration - Time (ms) for the exit transition (fade-out). Defaults to the `duration` param for symmetry.
 * @param exitEasing - Easing curve for the exit transition (fade-out). Defaults to the `easing` param for symmetry.
 * @param exitDelay - Time (ms) to delay the exit transition. Defaults to the `delay` param for symmetry.
 * @param outOpacity - Opacity for the out pose. Defaults to 0.
 * @param inOpacity - Opacity for the in pose. Defaults to 1.
 */
export const fadePresenceFn: PresenceMotionFn<FadeParams> = ({
  duration = motionTokens.durationNormal,
  easing = motionTokens.curveEasyEase,
  delay = 0,
  exitDuration = duration,
  exitEasing = easing,
  exitDelay = delay,
  outOpacity = 0,
  inOpacity = 1,
}) => {
  return {
    enter: fade({ from: outOpacity, to: inOpacity, duration, easing, delay }),
    exit: fade({
      from: inOpacity,
      to: outOpacity,
      duration: exitDuration,
      easing: exitEasing,
      delay: exitDelay,
    }),
  };
};

/** Applies a one-way opacity motion or visible-controlled presence transitions. */
export const Fade: FadeComponent = createPresenceComponent<FadeParams, FadeMotionParams, FadeDirectionalParams>(
  fadePresenceFn,
  defaults => ({
    motion: {
      definition: ({
        duration = defaults.duration ?? motionTokens.durationNormal,
        easing = defaults.easing ?? motionTokens.curveEasyEase,
        ...params
      }) => fade({ ...params, duration, easing }),
      isMotion: (props): props is MotionComponentProps & FadeMotionParams =>
        !('visible' in props && props.visible !== undefined) &&
        (('from' in props && props.from !== undefined) || ('to' in props && props.to !== undefined)),
    },
    enter: params => {
      const options = { ...defaults, ...params };
      return fade({
        from: options.from ?? options.outOpacity ?? 0,
        to: options.to ?? options.inOpacity ?? 1,
        duration: options.duration ?? motionTokens.durationNormal,
        easing: options.easing ?? motionTokens.curveEasyEase,
        delay: options.delay,
      });
    },
    exit: params => {
      const options = { ...defaults, ...params };
      return fade({
        from: options.from ?? options.inOpacity ?? 1,
        to: options.to ?? options.outOpacity ?? 0,
        duration:
          params.exitDuration ??
          params.duration ??
          defaults.exitDuration ??
          defaults.duration ??
          motionTokens.durationNormal,
        easing:
          params.exitEasing ?? params.easing ?? defaults.exitEasing ?? defaults.easing ?? motionTokens.curveEasyEase,
        delay: params.exitDelay ?? params.delay ?? defaults.exitDelay ?? defaults.delay,
      });
    },
  }),
);

export const FadeSnappy: FadeComponent = createPresenceComponentVariant(Fade, { duration: motionTokens.durationFast });

export const FadeRelaxed: FadeComponent = createPresenceComponentVariant(Fade, {
  duration: motionTokens.durationGentle,
});
