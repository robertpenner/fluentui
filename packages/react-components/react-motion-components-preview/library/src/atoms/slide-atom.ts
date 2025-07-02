import { AtomMotion, PresenceDirection, motionTokens } from '@fluentui/react-motion';

interface SlideAtomParams {
  direction: PresenceDirection;
  duration: number;
  easing?: string;
  fromX?: number;
  fromY?: number;
}

/**
 * Generates a motion atom object for a slide in or slide out.
 * @param direction - The functional direction of the motion: 'enter' or 'exit'.
 * @param duration - The duration of the motion in milliseconds.
 * @param easing - The easing curve for the motion. Defaults to `motionTokens.curveLinear`.
 * @param fromX - The starting X translate value in pixels. Defaults to 0.
 * @param fromY - The starting Y translate value in pixels. Defaults to 0.
 * @returns A motion atom object with translate keyframes and the supplied duration and easing.
 */
export const slideAtom = ({
  direction,
  duration,
  easing = motionTokens.curveLinear,
  fromX = 0,
  fromY = 0,
}: SlideAtomParams): AtomMotion => {
  const keyframes = [
    { transform: `translate3d(${fromX}px, ${fromY}px, 0)` },
    { transform: 'translate3d(0, 0, 0)' },
  ];
  if (direction === 'exit') {
    keyframes.reverse();
  }
  return {
    keyframes,
    duration,
    easing,
  };
};