import * as React from 'react';
import type { PresenceMotionFn } from '@fluentui/react-motion';
import { motionTokens, createPresenceComponent, createMotionComponent } from '@fluentui/react-motion';
import type { JSXElement } from '@fluentui/react-utilities';
import { fadeIn, fadeOut } from '../../atoms/fade-atom';
import { scale } from '../../atoms/scale-atom';
import type {
  ScaleParams,
  ScaleMotionParams,
  ScaleDirectionalParams,
  ScaleMotionProps,
  ScaleProps,
  ScaleComponent,
} from './scale-types';

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

const createScale = (defaults: ScaleParams = {}): ScaleComponent => {
  const presence = createPresenceComponent<ScaleParams>(params => scalePresenceFn({ ...defaults, ...params }));
  const motion = createMotionComponent<ScaleMotionParams>(
    ({
      duration = defaults.duration ?? motionTokens.durationGentle,
      easing = defaults.easing ?? motionTokens.curveDecelerateMax,
      ...params
    }) => scale({ ...params, duration, easing }),
  );
  const In = createMotionComponent<ScaleDirectionalParams>(params => {
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
  });
  const Out = createMotionComponent<ScaleDirectionalParams>(params => {
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
  });

  function component(props: ScaleProps): JSXElement | null {
    const isMotion = (value: ScaleProps): value is ScaleMotionProps =>
      value.visible === undefined && (value.from !== undefined || value.to !== undefined);
    return isMotion(props) ? React.createElement(motion, props) : React.createElement(presence, props);
  }

  return Object.assign(component, presence, { In, Out });
};

/** Applies a scale-only one-way motion or visible-controlled presence transitions with optional opacity. */
export const Scale = createScale();

export const ScaleSnappy = createScale({
  duration: motionTokens.durationNormal,
  exitDuration: motionTokens.durationFast,
});

export const ScaleRelaxed = createScale({
  duration: motionTokens.durationSlow,
  exitDuration: motionTokens.durationGentle,
});
