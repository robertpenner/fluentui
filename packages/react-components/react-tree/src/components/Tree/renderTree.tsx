/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { useRef, useState, useEffect, useCallback, CSSProperties, FC, ReactNode } from 'react';
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
  // transitionProperty: 'opacity',
  in: { opacity: 1 },
  out: { opacity: 0 },
  common: { transitionDuration: `${duration}ms`, transitionTimingFunction: 'ease-out' },
};

type CollapseProps = {
  visible: boolean;
  children: ReactNode;
};

function usePreviousValue<T>(value: T): T {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current!;
}

const Collapse: FC<CollapseProps> = ({ visible, children }) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  // const [maxHeight, setMaxHeight] = useState('0px');
  const [maxHeight, setMaxHeight] = useState('');

  // const [previousVisible, setPreviousVisible] = useState<boolean | undefined>(undefined);
  // const previousVisible = useRef<boolean>(visible);
  const previousVisible = usePreviousValue(visible);
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

    // On the first render, we don't want to animate the exit transition.
    const isFirstRender = previousVisible === undefined && !visible;
    const isOpening = previousVisible === false && visible;
    const isClosing = previousVisible === true && !visible;
    if (isFirstRender) {
      // element.style.maxHeight = '0px';
      setMaxHeight('0px');
    } else if (isOpening) {
      // element.style.maxHeight = `${element.scrollHeight}px`;
      setMaxHeight(`${element.scrollHeight}px`);
    } else if (isClosing) {
      // On the exit transition, we want to animate the height from the current height to 0.
      // But if we set maxHeight to 0, the browser will immediately set the height to 0 and the
      // transition won't work, because maxHeight is empty and the transition only works
      // between numerical values.
      // So first set maxHeight back to a number,
      // and on the next frame, set it to 0 to start the transition.
      // We can't leave maxHeight as a number because children might change their height inside,
      // and the parent's maxHeight would not be updated.
      // element.style.maxHeight = `${element.scrollHeight}px`;
      setMaxHeight(`${element.scrollHeight}px`);
      requestAnimationFrame(() => {
        // element.style.maxHeight = '0px';
        setMaxHeight('0px');
      });
    }
  }, [visible, previousVisible]);

  // TODO: try to remove this callback and make it a declarative style
  // Clear maxHeight after the enter transition so the element can grow with its content.
  const onEntered = useCallback(() => {
    const element = nodeRef.current;
    if (!element) {
      return;
    }
    // element.style.maxHeight = '';
    setMaxHeight('');
  }, []);

  // setPreviousVisible(visible);

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
            maxHeight: maxHeight || undefined,
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
