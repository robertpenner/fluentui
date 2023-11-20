/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { assertSlots } from '@fluentui/react-utilities';
import type { TreeContextValues, TreeSlots, TreeState } from '../Tree/Tree.types';
import { TreeProvider } from '../TreeProvider';

import { Transition } from 'react-transition-group';
import { useRef, CSSProperties, useEffect, FC, ReactNode } from 'react';

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
  // in: { opacity: 1, maxHeight: '200px' },
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
    const maxHeightPx = visible ? element.scrollHeight : 0;
    element.style.maxHeight = `${maxHeightPx}px`;
  }, [visible]);

  return (
    <Transition in={visible} timeout={duration}>
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
