import type { PresenceMotionFn, MotionComponentProps } from '@fluentui/react-motion';
import { motionTokens, createPresenceComponent, createPresenceComponentVariant } from '@fluentui/react-motion';
import { fadeIn, fadeOut } from '../../atoms/fade-atom';
import { scale } from '../../atoms/scale-atom';
import type { ScaleParams, ScaleMotionParams, ScaleDirectionalParams, ScaleComponent } from './scale-types';

/**
 * Define a presence motion for scale in/out
 *
 * @param duration - Time (ms) for the enter transition (scale-in). Defaults to the `durationGentle` value (250 ms).
 * @param easing - Easing curve for the enter transition (scale-in). Defaults to the `curveDecelerateMax` value.
 * @param delay - Time (ms) to delay the enter transition. Defaults to 0.
 * @param exitDuration - Time (ms) for the exit transition (scale-out). Defaults to the `durationNormal` value (200 ms).
 * @param exitEasing - Easing curve for the exit transition (scale-out). Defaults to the `curveAccelerateMax` value.
 * @param exitDelay - Time (ms) to delay the exit transition. Defaults to the `delay` param for symmetry.
 * @param outScale - Scale for the out pose. Defaults to `0.9`.
 * @param inScale - Scale for the in pose. Defaults to `1`.
 * @param animateOpacity - Whether to animate the opacity. Defaults to `true`.
 */
const scalePresenceFn: PresenceMotionFn<ScaleParams> = ({
  duration = motionTokens.durationGentle,
  easing = motionTokens.curveDecelerateMax,
  delay = 0,
  exitDuration = motionTokens.durationNormal,
  exitEasing = motionTokens.curveAccelerateMax,
  exitDelay = delay,
  outScale = 0.9,
  inScale = 1,
  animateOpacity = true,
}) => {
  const enterAtoms = [scale({ from: outScale, to: inScale, duration, easing, delay })];
  const exitAtoms = [
    scale({
      from: inScale,
      to: outScale,
      duration: exitDuration,
      easing: exitEasing,
      delay: exitDelay,
    }),
  ];

  // Only add fade atoms if animateOpacity is true.
  if (animateOpacity) {
    enterAtoms.push(fadeIn({ duration, easing, delay }));
    exitAtoms.push(fadeOut({ duration: exitDuration, easing: exitEasing, delay: exitDelay }));
  }

  return {
    enter: enterAtoms,
    exit: exitAtoms,
  };
};

/** Applies a scale-only one-way motion or visible-controlled presence transitions with optional opacity. */
export const Scale: ScaleComponent = createPresenceComponent<ScaleParams, ScaleMotionParams, ScaleDirectionalParams>(
  scalePresenceFn,
  defaults => ({
    motion: {
      definition: ({
        duration = defaults.duration ?? motionTokens.durationGentle,
        easing = defaults.easing ?? motionTokens.curveDecelerateMax,
        ...params
      }) => scale({ ...params, duration, easing }),
      isMotion: (props): props is MotionComponentProps & ScaleMotionParams =>
        !('visible' in props && props.visible !== undefined) &&
        (('from' in props && props.from !== undefined) || ('to' in props && props.to !== undefined)),
    },
    enter: params => {
      const options = { ...defaults, ...params };
      const timing = {
        duration: options.duration ?? motionTokens.durationGentle,
        easing: options.easing ?? motionTokens.curveDecelerateMax,
        delay: options.delay,
      };
      const atoms = [
        scale({ from: options.from ?? options.outScale ?? 0.9, to: options.to ?? options.inScale ?? 1, ...timing }),
      ];
      if (options.animateOpacity !== false) {
        atoms.push(fadeIn(timing));
      }
      return atoms;
    },
    exit: params => {
      const options = { ...defaults, ...params };
      const timing = {
        duration: params.exitDuration ?? params.duration ?? defaults.exitDuration ?? motionTokens.durationNormal,
        easing: params.exitEasing ?? params.easing ?? defaults.exitEasing ?? motionTokens.curveAccelerateMax,
        delay: params.exitDelay ?? params.delay ?? defaults.exitDelay ?? defaults.delay,
      };
      const atoms = [
        scale({ from: options.from ?? options.inScale ?? 1, to: options.to ?? options.outScale ?? 0.9, ...timing }),
      ];
      if (options.animateOpacity !== false) {
        atoms.push(fadeOut(timing));
      }
      return atoms;
    },
  }),
);

export const ScaleSnappy: ScaleComponent = createPresenceComponentVariant(Scale, {
  duration: motionTokens.durationNormal,
  exitDuration: motionTokens.durationFast,
});

export const ScaleRelaxed: ScaleComponent = createPresenceComponentVariant(Scale, {
  duration: motionTokens.durationSlow,
  exitDuration: motionTokens.durationGentle,
});
