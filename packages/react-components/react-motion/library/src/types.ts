type AtomCore = { keyframes: Keyframe[] } & KeyframeEffectOptions;

export type AtomMotion = AtomCore & {
  /**
   * Allows to specify a reduced motion version of the animation. If provided, the settings will be used when the
   * user has enabled the reduced motion setting in the operating system (i.e `prefers-reduced-motion` media query is
   * active). If not provided, the duration of the animation will be overridden to be 1ms.
   *
   * Note, if `keyframes` are provided, they will be used instead of the regular `keyframes`.
   */
  reducedMotion?: Partial<AtomCore>;
};

export type PresenceDirection = 'enter' | 'exit';

export type PresenceMotion = Record<PresenceDirection, AtomMotion | AtomMotion[]>;

/**
 * A motion param should be a primitive value that can be serialized to JSON and could be potentially used a plain
 * dependency for React hooks.
 */
export type MotionParam = boolean | number | string;

export type AtomMotionFn<MotionParams extends Record<string, MotionParam> = {}> = (
  params: { element: HTMLElement } & MotionParams,
) => AtomMotion | AtomMotion[];

/**
 * If a motion param is a 2-item array, it means that
 * the first value is for the enter transition and the second value is for the exit transition.
 * If a motion param is not an array, it means that
 * the same value is used for both enter and exit transitions.
 */
// export type EnterExit<T extends MotionParam> = T | [enter: T, exit: T];
export type EnterExit<T> = T | [enter: T, exit: T];

export type PresenceMotionFn<PresenceParams extends Record<string, EnterExit<MotionParam>> = {}> = (
  params: { element: HTMLElement } & PresenceParams,
) => PresenceMotion;

// ---

export type AnimationHandle = Pick<Animation, 'cancel' | 'finish' | 'pause' | 'play' | 'playbackRate'> & {
  setMotionEndCallbacks: (onfinish: () => void, oncancel: () => void) => void;
};

export type MotionImperativeRef = {
  /** Sets the playback rate of the animation, where 1 is normal speed. */
  setPlaybackRate: (rate: number) => void;

  /** Sets the state of the animation to running or paused. */
  setPlayState: (state: 'running' | 'paused') => void;
};
