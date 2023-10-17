import React, { FC, useRef, useCallback, ReactNode, CSSProperties } from 'react';

import { Transition as RTGTransition } from 'react-transition-group';
// import { CSSTransition } from 'react-transition-group';

type TransitionState = 'entering' | 'entered' | 'exiting' | 'exited' | 'unmounted';

// Will we need to make styles for individual states?
// type StylesByState = Record<TransitionState, CSSProperties>;
// const fadeStyles: StylesByState = {
//   entering: { opacity: 1 },
//   entered: { opacity: 1 },
//   exiting: { opacity: 0 },
//   exited: { opacity: 0 },
//   unmounted: { opacity: 0 },
// };

type TransitionDefinition = {
  in: CSSProperties;
  out: CSSProperties;
  common?: CSSProperties;
  transitionProperty: CSSProperties['transitionProperty'];
};

const fade: TransitionDefinition = {
  in: { opacity: 1, transform: 'scale(1.2)' },
  out: { opacity: 0 },
  common: { transitionTimingFunction: 'ease-in', transformOrigin: 'top' },
  transitionProperty: 'opacity, transform',
};

type TransitionRenderProp = ReactNode | ((state: TransitionState) => ReactNode);

type TransitionProps = {
  definition: TransitionDefinition;
  visible: boolean;
  duration?: number;
  children: TransitionRenderProp;
  onState?: (state: TransitionState) => void;
};

const noop = () => {};

export const Fade: FC<TransitionProps> = ({ visible, duration = 300, onState = noop, children }) => (
  <Transition definition={fade} {...{ visible, duration, children, onState }} />
);

const inOrOutByState = {
  entering: 'in',
  entered: 'in',
  exiting: 'out',
  exited: 'out',
  unmounted: 'out',
} satisfies Record<TransitionState, 'in' | 'out'>;

const Transition: FC<TransitionProps> = ({ definition, visible, duration = 300, onState = noop, children }) => {
  const nodeRef = useRef(null);

  const defaultStyle = {
    transitionProperty: definition.transitionProperty,
    transitionDuration: `${duration}ms`,
  };

  return (
    <RTGTransition
      nodeRef={nodeRef}
      in={visible}
      timeout={duration}
      unmountOnExit
      onEntering={useCallback(() => onState('entering'), [onState])}
      onEntered={useCallback(() => onState('entered'), [onState])}
      onExiting={useCallback(() => onState('exiting'), [onState])}
      onExited={useCallback(() => onState('exited'), [onState])}
    >
      {state => {
        return (
          <>
            <div
              ref={nodeRef}
              style={{
                ...defaultStyle,
                ...definition.common,
                ...definition[inOrOutByState[state]],
              }}
            >
              {typeof children === 'function' ? children(state) : children}
            </div>
          </>
        );
      }}
    </RTGTransition>
  );
};

export default Fade;
