/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { useRef, CSSProperties, useEffect, FC, ReactNode, useCallback } from 'react';
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

const expandTransitionConfig = {
  transitionProperty: 'opacity, max-height',
  in: { opacity: 1 },
  out: { opacity: 0 },
  common: { transitionDuration: `${duration}ms`, transitionTimingFunction: 'ease-out' },
};

type CollapseProps = {
  visible: boolean;
  children: ReactNode;
};

const Collapse: FC<CollapseProps> = ({ visible, children }) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  const baseStyle: CSSProperties = {
    width: 'fit-content',
    height: 'fit-content',
  };
  const config = expandTransitionConfig;

  useEffect(() => {
    const element = nodeRef.current;
    if (!element) {
      return;
    }

    if (visible) {
      const maxHeightPx = element.scrollHeight;
      element.style.maxHeight = `${maxHeightPx}px`;
    } else {
      // On the exit transition, we want to animate the height from the current height to 0.
      // But if we set maxHeight to 0, the browser will immediately set the height to 0 and the
      // transition won't work, because maxHeight is empty and the transition only works
      // between numerical values.
      // So first set maxHeight back to a number,
      // and on the next frame, set it to 0 to start the transition.
      // We can't leave maxHeight as a number because children might change their height inside,
      // and the parent's maxHeight would not be updated.
      element.style.maxHeight = `${element.scrollHeight}px`;
      requestAnimationFrame(() => {
        element.style.maxHeight = '0px';
      });
    }
  }, [visible]);

  // TODO: try to remove this callback and make it a declarative style
  const onEntered = useCallback(() => {
    const element = nodeRef.current;
    if (!element) {
      return;
    }
    element.style.maxHeight = '';
  }, []);

  return (
    <Transition in={visible} timeout={duration} onEntered={onEntered}>
      {transitionState => (
        <div
          ref={nodeRef}
          style={{
            ...baseStyle,
            transitionProperty: config.transitionProperty,
            ...config.common,
            ...config[inOrOutByState[transitionState]],
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
      <Collapse visible={state.open}>
        <state.root>{state.root.children}</state.root>
      </Collapse>
    </TreeProvider>
  );
};
