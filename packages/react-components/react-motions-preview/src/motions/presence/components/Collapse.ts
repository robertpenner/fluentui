import { PresenceMotionFn, createPresenceComponent, motionTokens } from '@fluentui/react-motions-preview';
import { PresenceOverrideFields, PresenceTransitionProps } from '../../../types';

const duration = motionTokens.durationNormal;
const easing = motionTokens.curveDecelerateMid;

// There may be Collapse-specific parameters in the future, e.g. for partial collapse
type CollapseParams = PresenceOverrideFields;

export const defaults: Required<PresenceTransitionProps<CollapseParams>> = {
  enter: { duration, easing },
  exit: { duration, easing },
} as const;

// Define a presence motion (enter/exit transitions) for collapse/expand
const collapseMotion: PresenceMotionFn<CollapseParams> = ({
  element,
  enter: enterOverride,
  exit: exitOverride,
  animateOpacity = true,
}) => {
  const fromOpacity = animateOpacity ? 0 : 1;
  const toOpacity = 1;
  const fromHeight = '0'; // Could be a custom param in the future: start partially expanded
  const toHeight = `${element.scrollHeight}px`;
  const overflow = 'hidden';

  const enterKeyframes = [
    { opacity: fromOpacity, maxHeight: fromHeight, overflow },
    // Transition to the height of the content, at 99.99% of the duration.
    { opacity: toOpacity, maxHeight: toHeight, offset: 0.9999, overflow },
    // On completion, remove the maxHeight because the content might need to expand later.
    // This extra keyframe is simpler than firing a callback on completion.
    { opacity: toOpacity, maxHeight: 'unset', overflow },
  ];

  const exitKeyframes = [
    { opacity: toOpacity, maxHeight: toHeight, overflow },
    { opacity: fromOpacity, maxHeight: fromHeight, overflow },
  ];

  return {
    enter: { ...defaults.enter, ...enterOverride, keyframes: enterKeyframes },
    exit: { ...defaults.exit, ...exitOverride, keyframes: exitKeyframes },
  };
};

// Create a React component that applies collapse/expand transitions to its children
export const Collapse = createPresenceComponent(collapseMotion);