import { motionTokens, type MotionImperativeRef } from '@fluentui/react-motion';
import { Slide } from '@fluentui/react-motion-components-preview';
import * as React from 'react';
import { AnimationDirection } from '../Calendar';
import { JSXElement } from '@fluentui/react-utilities';

export const DirectionalSlide: React.FC<{
  duration?: number;
  easing?: string;
  animationDirection?: AnimationDirection;
  animateBackwards?: boolean;
  /** When provided, replays the slide animation when the value changes (without remounting). */
  navigationKey?: string | number;
  children: JSXElement;
}> = ({
  duration = motionTokens.durationSlower, // 400 ms
  easing = motionTokens.curveDecelerateMax,
  animationDirection = AnimationDirection.Vertical,
  animateBackwards = false,
  navigationKey,
  children,
}) => {
  const imperativeRef = React.useRef<MotionImperativeRef>(undefined);
  const prevKeyRef = React.useRef(navigationKey);

  React.useEffect(() => {
    if (navigationKey !== undefined && prevKeyRef.current !== navigationKey) {
      prevKeyRef.current = navigationKey;
      imperativeRef.current?.setPlayState('running');
    }
  }, [navigationKey]);

  let outX = '0px';
  let outY = '0px';
  const distance = animateBackwards ? '-20px' : '20px';
  if (animationDirection === AnimationDirection.Horizontal) {
    outX = distance;
  } else {
    // default to vertical
    outY = distance;
  }
  return (
    <Slide.In imperativeRef={imperativeRef} duration={duration} easing={easing} outX={outX} outY={outY}>
      {children}
    </Slide.In>
  );
};
