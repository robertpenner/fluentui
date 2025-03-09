import type { MotionParam, PresenceMotion, PresenceMotionFn } from '@fluentui/react-motion';

/**
 * If a motion param is a 2-item array, it means that
 * the first value is for the enter transition and the second value is for the exit transition.
 * If a motion param is not an array, it means that
 * the same value is used for both enter and exit transitions.
 */
export type EnterExit<T extends MotionParam> = T | [enter: T, exit: T];

/**
 * This is a factory function that generates a motion object from variant params, e.g. duration, easing, etc.
 * The generated object defines a presence motion with `enter` and `exit` transitions.
 * This motion object is declarative, i.e. data without side effects,
 * and it is framework-independent, i.e. non-React.
 * It can be turned into a React component using `createPresenceComponent`.
 */
// TODO: move to @fluentui/react-motion when stable
export type PresenceMotionCreator<
  MotionVariantParams extends Record<string, MotionParam | EnterExit<MotionParam>> = {},
> = (variantParams?: MotionVariantParams) => PresenceMotion;

/**
 * This is a factory function that generates a motion function, which has variant params bound into it.
 * The generated motion function accepts other runtime params that aren't locked into the variant, but supplied at runtime.
 * This separation allows the variant to be defined once and reused with different runtime params which may be orthogonal to the variant params.
 * For example, a variant may define the duration and easing of a transition, which are fixed for all instances of the variant,
 * while the runtime params may give access to the target element, which is different for each instance.
 *
 * The generated motion function is also framework-independent, i.e. non-React.
 * It can be turned into a React component using `createPresenceComponent`.
 */
// TODO: move to @fluentui/react-motion when stable
export type PresenceMotionFnCreator<
  MotionVariantParams extends Record<string, MotionParam> = {},
  MotionRuntimeParams extends Record<string, MotionParam> = {},
> = (variantParams?: MotionVariantParams) => PresenceMotionFn<MotionRuntimeParams>;
