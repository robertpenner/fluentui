import {
  motionTokens,
  type PresenceMotionFn,
  createPresenceComponent,
  createPresenceComponentVariant,
} from '@fluentui/react-motion';

/** Define a presence motion for collapse/expand */
const collapseMotion: PresenceMotionFn<{ animateOpacity?: boolean; delay?: number }> = ({
  element,
  animateOpacity = true,
  delay = 0,
}) => {
  const fromOpacity = animateOpacity ? 0 : 1;
  const toOpacity = 1;
  const fromHeight = '0'; // Could be a custom param in the future: start partially expanded
  const toHeight = `${element.scrollHeight}px`;
  const overflow = 'hidden';

  const duration = motionTokens.durationNormal;
  const easing = motionTokens.curveEasyEaseMax;
  // const delay = 0;

  const opacityEnterKeyframes = [{ opacity: fromOpacity }, { opacity: toOpacity }];

  const opacityExitKeyframes = [{ opacity: toOpacity }, { opacity: fromOpacity }];

  const heightEnterKeyframes = [
    { maxHeight: fromHeight, opacity: fromOpacity, offset: 0, overflow },
    { maxHeight: toHeight, offset: 0.9999, overflow },
    { maxHeight: 'unset', opacity: fromOpacity, offset: 1, overflow },
  ];

  const heightExitKeyframes = [
    { maxHeight: toHeight, opacity: fromOpacity, overflow },
    { maxHeight: fromHeight, opacity: fromOpacity, overflow },
  ];

  const whitespaceEnterKeyframes = [{ marginTop: 0, marginBottom: 0, minHeight: 0, offset: 0 }];

  const whitespaceExitKeyframes = [{ marginTop: 0, marginBottom: 0, minHeight: 0, offset: 1 }];

  return {
    enter: [
      { keyframes: whitespaceEnterKeyframes, duration, easing },
      { keyframes: heightEnterKeyframes, duration, easing },
      { delay, keyframes: opacityEnterKeyframes, duration, easing },
    ],
    exit: [
      { keyframes: opacityExitKeyframes, duration, easing, fill: 'forwards' },
      { delay, keyframes: heightExitKeyframes, duration, easing },
      { delay, keyframes: whitespaceExitKeyframes, duration, easing },
    ],
  };

  // const enterKeyframes = [
  //   { opacity: fromOpacity, maxHeight: fromHeight, overflow },
  //   // Transition to the height of the content, at 99.99% of the duration.
  //   { opacity: toOpacity, maxHeight: toHeight, offset: 0.9999, overflow },
  //   // On completion, remove the maxHeight because the content might need to expand later.
  //   // This extra keyframe is simpler than firing a callback on completion.
  //   { opacity: toOpacity, maxHeight: 'unset', overflow },
  // ];

  // const exitKeyframes = [
  //   { opacity: toOpacity, maxHeight: toHeight, overflow },
  //   { opacity: fromOpacity, maxHeight: fromHeight, overflow },
  // ];

  // return {
  //   enter: { duration, easing, keyframes: enterKeyframes },
  //   exit: { duration, easing, keyframes: exitKeyframes },
  // };
};

/** A React component that applies collapse/expand transitions to its children. */
export const Collapse = createPresenceComponent(collapseMotion);

export const CollapseSnappy = createPresenceComponentVariant(Collapse, {
  all: { duration: motionTokens.durationUltraFast },
});

export const CollapseExaggerated = createPresenceComponentVariant(Collapse, {
  enter: { duration: motionTokens.durationSlow, easing: motionTokens.curveEasyEaseMax },
  exit: { duration: motionTokens.durationNormal, easing: motionTokens.curveEasyEaseMax },
});
