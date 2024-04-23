import * as React from 'react';
import { createPresenceComponent } from '../../../factories/createPresenceComponent';
import { durations, curves } from '../../motionTokens';
import { PresenceMotionFn, PresenceOverrideFields, PresenceTransitionProps } from '../../../types';

const duration = durations.durationNormal;
const easing = curves.curveLinear;
// const easing = motionTokens.curveDecelerateMid;

const curvePushy = curves.curveEasyEaseMax;
// const curvePushy = 'cubic-bezier(0.6,0,0,1)';

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

  // define keyframes for opacity and maxHeight separately as an object
  // TODO: remove redundant repetition
  // const enterKeyframes = {
  //   offset: [0, 0.49999, 0.5, 1],
  //   opacity: [fromOpacity, fromOpacity, fromOpacity, toOpacity],
  //   maxHeight: [fromHeight, toHeight, 'unset', 'unset'],
  //   overflow: [overflow],
  // };

  // const exitKeyframes = {
  //   // offset: [0, 0.5, 1],
  //   opacity: [toOpacity, fromOpacity, fromOpacity],
  //   maxHeight: [toHeight, toHeight, fromHeight],
  //   overflow: [overflow],
  // };

  const enterKeyframes = [
    { opacity: fromOpacity, maxHeight: fromHeight, overflow, easing: curvePushy },
    // { opacity: toOpacity, maxHeight: fromHeight, overflow, offset: 0.5 },
    // Transition to the height of the content, at 99.99% of the height's duration.
    { opacity: fromOpacity, maxHeight: toHeight, overflow, offset: 0.49999 },
    // On completion, remove the maxHeight because the content might need to expand later.
    // This extra keyframe is simpler than firing a callback on completion.
    { opacity: fromOpacity, maxHeight: 'unset', overflow, easing: curves.curveLinear, offset: 0.5 },
    { opacity: toOpacity, maxHeight: 'unset', overflow },
  ];

  const exitKeyframes = [
    { opacity: toOpacity, maxHeight: toHeight, overflow },
    { opacity: fromOpacity, maxHeight: toHeight, overflow },
    { opacity: fromOpacity, maxHeight: fromHeight, overflow },
  ];

  return {
    enter: { ...defaults.enter, ...enterOverride, keyframes: enterKeyframes },
    exit: { ...defaults.exit, ...exitOverride, keyframes: exitKeyframes },
  };
};

/** A React component that applies collapse/expand transitions to its children. */
const Collapse2 = createPresenceComponent(collapseMotion);

// TODO: create a factory function for variants, to reduce boilerplate
const Snappy = (props: React.ComponentProps<typeof Collapse2>) =>
  Collapse2({ ...props, override: { all: { duration: durations.durationUltraFast } } });

const Gentle = (props: React.ComponentProps<typeof Collapse2>) =>
  Collapse2({ ...props, override: { all: { duration: 1000 } } });

const Pushy = (props: React.ComponentProps<typeof Collapse2>) =>
  Collapse2({
    ...props,
    override: { all: { duration: 2000, easing: curvePushy } },
  });

const Linear = (props: React.ComponentProps<typeof Collapse2>) =>
  Collapse2({ ...props, override: { all: { duration: 1000, easing: curves.curveLinear } } });

// To support <Collapse>, <Collapse.Snappy>, etc.
const WithVariants = Object.assign(Collapse2, { Snappy, Gentle, Pushy, Linear });

export { WithVariants as Collapse2 };
