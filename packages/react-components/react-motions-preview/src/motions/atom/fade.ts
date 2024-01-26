import {
  durationUltraFast,
  durationFaster,
  durationFast,
  durationNormal,
  durationSlow,
  durationSlower,
  durationUltraSlow,
  easingLinear,
} from './tokens';

import type { AtomMotion, PresenceMotion } from '../../types';

export type FadeParams = {
  fromValue?: number;
};

type DurationMS = number;

type PresenceDirection = keyof PresenceMotion;

type DefineFadeParams = FadeParams & {
  direction: PresenceDirection;
  duration?: DurationMS;
  easing?: string;
};

const fadeKeyframes = (direction: PresenceDirection, fromValue = 0) => {
  const keyframes = [{ opacity: fromValue }, { opacity: 1 }];
  if (direction === 'exit') {
    keyframes.reverse();
  }
  return keyframes;
};

type FadeAtomFactory = (params?: FadeParams) => AtomMotion;

export const defineFade =
  ({ direction, duration = 200, easing = easingLinear }: DefineFadeParams): FadeAtomFactory =>
  ({ fromValue = 0 } = {}) => ({
    keyframes: fadeKeyframes(direction, fromValue),
    duration,
    easing,
  });

// Fade Ins
// --------------------------------------------------

export const enterUltraFast: FadeAtomFactory = defineFade({
  direction: 'enter',
  duration: durationUltraFast,
});

export const enterFaster: FadeAtomFactory = defineFade({
  direction: 'enter',
  duration: durationFaster,
});

export const enterFast: FadeAtomFactory = defineFade({
  direction: 'enter',
  duration: durationFast,
});

export const enterNormal = ({ fromValue = 0 }: FadeParams = {}): AtomMotion => ({
  keyframes: [{ opacity: fromValue }, { opacity: 1 }],

  duration: durationNormal,
  easing: easingLinear,
});

export const enterSlow = ({ fromValue = 0 }: FadeParams = {}): AtomMotion => ({
  keyframes: [{ opacity: fromValue }, { opacity: 1 }],

  duration: durationSlow,
  easing: easingLinear,
});

export const enterSlower = ({ fromValue = 0 }: FadeParams = {}): AtomMotion => ({
  keyframes: [{ opacity: fromValue }, { opacity: 1 }],

  duration: durationSlower,
  easing: easingLinear,
});

export const enterUltraSlow = ({ fromValue = 0 }: FadeParams = {}): AtomMotion => ({
  keyframes: [{ opacity: fromValue }, { opacity: 1 }],

  duration: durationUltraSlow,
  easing: easingLinear,
});

// Fade Outs
// --------------------------------------------------

export const exitUltraFast = ({ fromValue = 0 }: FadeParams = {}): AtomMotion => ({
  keyframes: [{ opacity: 1 }, { opacity: fromValue }],

  duration: durationUltraFast,
  easing: easingLinear,
});

export const exitFaster = ({ fromValue = 0 }: FadeParams = {}): AtomMotion => ({
  keyframes: [{ opacity: 1 }, { opacity: fromValue }],

  duration: durationFaster,
  easing: easingLinear,
});

export const exitFast = ({ fromValue = 0 }: FadeParams = {}): AtomMotion => ({
  keyframes: [{ opacity: 1 }, { opacity: fromValue }],

  duration: durationFast,
  easing: easingLinear,
});

export const exitNormal = ({ fromValue = 0 }: FadeParams = {}): AtomMotion => ({
  keyframes: [{ opacity: 1 }, { opacity: fromValue }],

  duration: durationNormal,
  easing: easingLinear,
});

export const exitSlow = ({ fromValue = 0 }: FadeParams = {}): AtomMotion => ({
  keyframes: [{ opacity: 1 }, { opacity: fromValue }],

  duration: durationSlow,
  easing: easingLinear,
});

export const exitSlower = ({ fromValue = 0 }: FadeParams = {}): AtomMotion => ({
  keyframes: [{ opacity: 1 }, { opacity: fromValue }],

  duration: durationSlower,
  easing: easingLinear,
});

export const exitUltraSlow = ({ fromValue = 0 }: FadeParams = {}): AtomMotion => ({
  keyframes: [{ opacity: 1 }, { opacity: fromValue }],

  duration: durationUltraSlow,
  easing: easingLinear,
});
