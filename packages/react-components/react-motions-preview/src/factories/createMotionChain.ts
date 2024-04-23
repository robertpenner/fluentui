import { AtomMotion } from '../types';

// function sumDuration(currentAtom: AtomMotion, nextAtom: AtomMotion) {
//   // TODO: handle iterations
//   return Number(currentAtom.delay ?? 0) + (nextAtom.delay ?? 0) + Number(currentAtom.duration ?? 0);
// }

// TODO: calculate including delay and iterations
// function totalDuration(motions: AtomMotion[]): number {
//   return motions.reduce((acc, motion) => acc + (Number(motion.duration) ?? 0), 0);
// }

export function chainAtomMotions(...motions: AtomMotion[]): AtomMotion {
  // const duration = totalDuration(motions);

  let totalDuration = 0;
  const mergedKeyframes: Keyframe[] = [];

  for (const motion of motions) {
    const { keyframes } = motion;
    const duration = Number(motion.duration);
    totalDuration += duration;

    const adjustedKeyframes = keyframes.map(keyframe => ({
      ...keyframe,
      offset: (Number(keyframe.offset) * duration) / totalDuration,
    }));
    mergedKeyframes.push(...adjustedKeyframes);
  }

  return { duration: totalDuration, keyframes: mergedKeyframes };
}
