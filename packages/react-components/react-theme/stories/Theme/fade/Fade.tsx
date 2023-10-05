import React, { FC, useRef, useCallback } from 'react';
// import { CSSTransition } from 'react-transition-group';

import { Transition } from 'react-transition-group';

type TransitionState = 'entering' | 'entered' | 'exiting' | 'exited' | 'unmounted';

const transitionStyles: Record<TransitionState, object> = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
  unmounted: { opacity: 0 },
};

type FadeProps = { in: boolean; duration?: number; onStateChange?: (state: TransitionState) => void };

export const Fade: FC<FadeProps> = ({ in: inProp, duration = 300, onStateChange, children }) => {
  const nodeRef = useRef(null);

  const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
  };

  return (
    <Transition
      nodeRef={nodeRef}
      in={inProp}
      timeout={duration}
      unmountOnExit
      onEntering={useCallback(() => onStateChange?.('entering'), [onStateChange])}
      onEntered={useCallback(() => onStateChange?.('entered'), [onStateChange])}
      onExiting={useCallback(() => onStateChange?.('exiting'), [onStateChange])}
      onExited={useCallback(() => onStateChange?.('exited'), [onStateChange])}
    >
      {state => (
        <>
          <div
            ref={nodeRef}
            style={{
              ...defaultStyle,
              ...transitionStyles[state],
            }}
          >
            {children}
          </div>
        </>
      )}
    </Transition>
  );
};

// Copilot

// interface FadeProps {
//   children: React.ReactNode;
//   timeout: number;
// }

// const Fade = ({ children, timeout }: FadeProps) => (
//   <CSSTransition timeout={timeout} classNames="fade" unmountOnExit>
//     {state => (
//       <div
//         style={{
//           opacity: state === 'exiting' ? 0 : 1,
//           transition: `opacity ${timeout}ms ease-in-out`,
//         }}
//       >
//         {children}
//       </div>
//     )}
//   </CSSTransition>
// );

export default Fade;
