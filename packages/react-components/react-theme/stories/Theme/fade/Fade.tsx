import React, { FC, useRef, useCallback, ReactNode, CSSProperties } from 'react';

import { Transition as RTGTransition } from 'react-transition-group';
// import { CSSTransition } from 'react-transition-group';

type TransitionState = 'entering' | 'entered' | 'exiting' | 'exited' | 'unmounted';

type TransitionConfig = {
  in?: CSSProperties;
  out: CSSProperties;
  common: CSSProperties;
  /* Can be multiple properties, e.g. 'opacity, transform' */
  transitionProperty: CSSProperties['transitionProperty'];
};

const fade: TransitionConfig = {
  transitionProperty: 'opacity',
  // in: { opacity: 1 },
  out: { opacity: 0 },
  common: { transitionDuration: '1s', transitionTimingFunction: 'ease-in-out' },
};

const scaleFade: TransitionConfig = {
  transitionProperty: 'opacity, transform',
  // in: { opacity: 1, transform: 'scale(1)' },
  out: { opacity: 0, transform: 'scale(.8)' },
  common: { transitionDuration: '1s', transitionTimingFunction: 'ease-out', transformOrigin: 'center' },
};

type TransitionRenderProp = ReactNode | ((state: TransitionState) => ReactNode);

type TransitionProps = {
  config: TransitionConfig;
  visible: boolean;
  children: TransitionRenderProp;
  onState?: (state: TransitionState) => void;
};

const noop = () => {};

const inOrOutByState = {
  entering: 'in',
  entered: 'in',
  exiting: 'out',
  exited: 'out',
  unmounted: 'out',
} satisfies Record<TransitionState, 'in' | 'out'>;

const Transition: FC<TransitionProps> = ({ config, visible, onState = noop, children }) => {
  const nodeRef = useRef(null);
  const { transitionDuration } = config.common;

  // Convert transition string to milliseconds, needed by react-transition-group
  const durationMs = transitionDuration?.endsWith('ms')
    ? parseInt(transitionDuration)
    : transitionDuration?.endsWith('s')
    ? parseInt(transitionDuration) * 1000
    : 0;

  // Fit the wrapper holding transition styles to the size of the content
  const baseStyle: CSSProperties = {
    width: 'fit-content',
    height: 'fit-content',
  };

  return (
    <RTGTransition
      nodeRef={nodeRef}
      in={visible}
      timeout={durationMs}
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
                ...baseStyle,
                ...config.common,
                ...config[inOrOutByState[state]],
              }}
            >
              {/* Support static children or render function to respond to state */}
              {typeof children === 'function' ? children(state) : children}
            </div>
          </>
        );
      }}
    </RTGTransition>
  );
};

export const Fade: FC<Omit<TransitionProps, 'config'>> = ({ visible, onState = noop, children }) => (
  <Transition config={fade} {...{ visible, children, onState }} />
);

export const ScaleFade: FC<Omit<TransitionProps, 'config'>> = ({ visible, onState = noop, children }) => (
  <Transition config={scaleFade} {...{ visible, children, onState }} />
);

export default Fade;
