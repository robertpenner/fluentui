import { motionTokens, createPresenceComponent, PresenceDirection, AtomMotion } from '@fluentui/react-motion';

// TODO: import these atoms from react-motion-components-preview once they're available there

/**
 * Generates a motion atom object for a fade in or fade out.
 * @param direction - The functional direction of the motion: 'enter' or 'exit'.
 * @param duration - The duration of the motion in milliseconds.
 * @param easing - The easing curve for the motion. Defaults to `motionTokens.curveLinear`.
 * @returns A motion atom object with opacity keyframes and the supplied duration and easing.
 */
const fadeAtom = (
  direction: PresenceDirection,
  duration: number,
  easing: string = motionTokens.curveLinear,
): AtomMotion => {
  const keyframes = [{ opacity: 0 }, { opacity: 1 }];
  if (direction === 'exit') {
    keyframes.reverse();
  }
  return {
    keyframes,
    duration,
    easing,
  };
};

/**
 * Generates a motion atom object for an X or Y translation, from a specified distance to zero.
 * @param direction - The functional direction of the motion: 'enter' or 'exit'.
 * @param axis - The axis of the translation: 'X' or 'Y'.
 * @param distance - The distance to slide; it can be a percentage or pixels.
 * @param duration - The duration of the motion in milliseconds.
 * @param easing - The easing curve for the motion. Defaults to `motionTokens.curveDecelerateMid`.
 */
const slideAtom = (
  direction: PresenceDirection,
  axis: 'X' | 'Y',
  distance: string,
  duration: number,
  easing: string = motionTokens.curveDecelerateMid,
): AtomMotion => {
  const keyframes = [{ transform: `translate${axis}(${distance})` }, { transform: 'translate${axis}(0)' }];
  if (direction === 'exit') {
    keyframes.reverse();
  }
  return {
    keyframes,
    duration,
    easing,
    composite: 'accumulate',
  };
};

export const SlideInFadeOut = createPresenceComponent(({ element }) => {
  const duration = motionTokens.durationGentle;

  const styles = window?.getComputedStyle(element);
  console.log('### styles', styles);

  const slideDistanceVarX = '--fui-positioning-slide-distance-x';
  const slideDistanceVarY = '--fui-positioning-slide-distance-y';

  const sx = styles.getPropertyValue(slideDistanceVarX);
  const sy = styles.getPropertyValue(slideDistanceVarY);
  console.log('### sx', sx);
  console.log('### sy', sy);

  // console.log('### styles JSON', JSON.stringify(styles));

  // const { popperPlacement = '' } = element.dataset;
  // console.log('### element.dataset', element.dataset);
  // console.log('### element.dataset.popperPlacement', element.dataset.popperPlacement);
  // console.log('### element.dataset.tabster', element.dataset.tabster);
  // console.log('### element.dataset.popperIsIntersecting', element.dataset.popperIsIntersecting);
  // const popperPlacement = element.getAttribute('data-popper-placement') || '';
  // console.log('### element.getAttributeNames()', element.getAttributeNames());
  // console.log('### popperPlacement', popperPlacement);
  // debugger;
  const axis = 'Y';
  // const axis = popperPlacement === 'top' || popperPlacement.startsWith('bottom') ? 'Y' : 'X';
  // const distance = popperPlacement === 'top' ? '30px' : '-30px';
  const distance = '30px';

  // console.log('### SlideInFadeOut element', element);
  // console.log('### SlideInFadeOut element.dataset', element.dataset);

  return {
    enter: [fadeAtom('enter', duration), slideAtom('enter', axis, distance, duration)],

    exit: fadeAtom('exit', duration),
  };
});

export const FadeOut = createPresenceComponent(() => {
  return {
    enter: [],

    exit: fadeAtom('exit', motionTokens.durationGentle),
  };
});
