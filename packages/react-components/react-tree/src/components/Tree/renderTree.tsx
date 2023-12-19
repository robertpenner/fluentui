/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { useRef, useState, useCallback, CSSProperties, FC, ReactNode } from 'react';
import { Transition } from 'react-transition-group';

import { assertSlots } from '@fluentui/react-utilities';
import type { TreeContextValues, TreeSlots, TreeState } from '../Tree/Tree.types';
import { TreeProvider } from '../TreeProvider';

type TransitionState = 'entering' | 'entered' | 'exiting' | 'exited' | 'unmounted';
const inOrOutByState: Record<TransitionState, 'in' | 'out'> = {
  entering: 'in',
  entered: 'in',
  exiting: 'out',
  exited: 'out',
  unmounted: 'out',
};

const duration = 200;

type TransitionConfig = {
  transitionProperty: string;
  common: CSSProperties;
  in: CSSProperties;
  out: CSSProperties;
};

const expandTransitionConfig: TransitionConfig = {
  transitionProperty: 'opacity, max-height',
  common: { transitionDuration: `${duration}ms`, transitionTimingFunction: 'ease-out' },
  in: { opacity: 1 },
  out: { opacity: 0 },
};

type CollapseProps = {
  visible: boolean;
  children: ReactNode;
};

const Collapse: FC<CollapseProps> = ({ visible, children }) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(visible ? '' : '0px');

  const baseStyle: CSSProperties = {
    width: 'fit-content',
    height: 'fit-content',
  };

  const expandToCalculatedHeight = useCallback(() => {
    nodeRef.current && setHeight(`${nodeRef.current.scrollHeight}px`);
  }, []);

  // Clear maxHeight after the enter transition so the element can grow with its content.
  const clearHeight = useCallback(() => {
    setHeight('');
  }, []);

  const collapseHeight = useCallback(() => {
    // On the exit transition, we want to animate the height from the current height to 0.
    // But if we set the height to 0, the browser will immediately set the height to 0 and the
    // transition won't work, because the height is empty and the transition only works
    // between numerical values.
    // So first set it back to the calculated height...
    expandToCalculatedHeight();
    // ...and on the next frame, set it to 0 to start the transition.
    // We can't just leave the height as a number, because children might change their height inside,
    // and the parent's height would not be updated.
    requestAnimationFrame(() => setHeight('0px'));
  }, [expandToCalculatedHeight]);

  const config = expandTransitionConfig;
  return (
    <Transition
      in={visible}
      timeout={duration}
      onEntering={expandToCalculatedHeight}
      onEntered={clearHeight}
      onExiting={collapseHeight}
    >
      {transitionState => (
        <div
          ref={nodeRef}
          style={{
            ...baseStyle,
            transitionProperty: config.transitionProperty,
            ...config.common,
            ...config[inOrOutByState[transitionState]],
            maxHeight: height,
          }}
        >
          {children}
        </div>
      )}
    </Transition>
  );
};

export const renderTree_unstable = (state: TreeState, contextValues: TreeContextValues) => {
  assertSlots<TreeSlots>(state);

  return (
    <TreeProvider value={contextValues.tree}>
      {/* original show/hide without transition */}
      {/* {state.open && <state.root>{state.root.children}</state.root>} */}

      {/* Wrap the children in a Collapse transition which manages show/hide */}
      <Collapse visible={state.open}>
        <state.root>{state.root.children}</state.root>
      </Collapse>
    </TreeProvider>
  );
};
