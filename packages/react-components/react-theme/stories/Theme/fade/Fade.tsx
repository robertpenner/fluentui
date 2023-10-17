import React, { FC, useRef, useCallback } from 'react';

import { Transition as RTGTransition } from 'react-transition-group';
// import { CSSTransition } from 'react-transition-group';

type TransitionState = 'entering' | 'entered' | 'exiting' | 'exited' | 'unmounted';
type StylesByState = Record<TransitionState, object>;

const fadeStyles: StylesByState = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
  unmounted: { opacity: 0 },
};

type TransitionDefinition = {
  in: object;
  out: object;
  transitionProperty: string;
};

const fade: TransitionDefinition = {
  in: { opacity: 1 },
  out: { opacity: 0 },
  transitionProperty: 'opacity',
};

type TransitionProps = { in: boolean; duration?: number; onState?: (state: TransitionState) => void };

const noop = () => {};

export const Fade: FC<TransitionProps> = ({ in: inProp, duration = 300, onState = noop, children }) => {
  const nodeRef = useRef(null);

  const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
  };

  return (
    <RTGTransition
      nodeRef={nodeRef}
      in={inProp}
      timeout={duration}
      unmountOnExit
      onEntering={useCallback(() => onState('entering'), [onState])}
      onEntered={useCallback(() => onState('entered'), [onState])}
      onExiting={useCallback(() => onState('exiting'), [onState])}
      onExited={useCallback(() => onState('exited'), [onState])}
    >
      {state => (
        <>
          <div
            ref={nodeRef}
            style={{
              ...defaultStyle,
              ...fadeStyles[state],
            }}
          >
            {children}
          </div>
        </>
      )}
    </RTGTransition>
  );
};

export default Fade;
