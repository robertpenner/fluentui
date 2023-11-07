/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { assertSlots } from '@fluentui/react-utilities';
import type { TreeContextValues, TreeSlots, TreeState } from '../Tree/Tree.types';
import { TreeProvider } from '../TreeProvider';

import { Transition } from 'react-transition-group';
import { useRef, CSSProperties, useEffect } from 'react';

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

export const renderTree_unstable = (state: TreeState, contextValues: TreeContextValues) => {
  assertSlots<TreeSlots>(state);
  const nodeRef = useRef<HTMLElement>(null);
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
    if (state.open) {
      element.style.maxHeight = element.scrollHeight + 'px';
    } else {
      element.style.maxHeight = '0px';
    }
  }, [state.open]);
  return (
    <TreeProvider value={contextValues.tree}>
      {/* original show/hide without transition */}
      {/* {state.open && <state.root>{state.root.children}</state.root>} */}
      <Transition nodeRef={nodeRef} in={state.open} timeout={duration}>
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
            <state.root>{state.root.children}</state.root>
          </div>
        )}
      </Transition>
    </TreeProvider>
  );
};
