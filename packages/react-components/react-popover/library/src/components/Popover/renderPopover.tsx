/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import * as React from 'react';
import type { JSXElement } from '@fluentui/react-utilities';
import { PopoverContext } from '../../popoverContext';
import type { PopoverState } from './Popover.types';

/**
 * Render the final JSX of Popover
 */

const MotionRefForwarderContext = React.createContext<React.Ref<HTMLElement> | undefined>(undefined);

/**
 * @internal
 */
export function useMotionForwardedRef(): React.Ref<HTMLElement> | undefined {
  return React.useContext(MotionRefForwarderContext);
}

/**
 * A component that forwards a ref to its children via a React context.
 *
 * @internal
 */
export const MotionRefForwarder = React.forwardRef<HTMLElement, { children: React.ReactElement }>((props, ref) => {
  return <MotionRefForwarderContext.Provider value={ref}>{props.children}</MotionRefForwarderContext.Provider>;
});

export const renderPopover_unstable = (state: PopoverState): JSXElement => {
  const {
    appearance,
    arrowRef,
    contentRef,
    inline,
    mountNode,
    open,
    openOnContext,
    openOnHover,
    setOpen,
    size,
    toggleOpen,
    trapFocus,
    triggerRef,
    withArrow,
    inertTrapFocus,
  } = state;

  return (
    <PopoverContext.Provider
      value={{
        appearance,
        arrowRef,
        contentRef,
        inline,
        mountNode,
        open,
        openOnContext,
        openOnHover,
        setOpen,
        toggleOpen,
        triggerRef,
        size,
        trapFocus,
        inertTrapFocus,
        withArrow,
      }}
    >
      {state.popoverTrigger}
      {state.popoverSurface && (
        <state.surfaceMotion>
          <MotionRefForwarder>
            {/* Casting here as content should be equivalent to <PopoverSurface /> */}
            {/* FIXME: content should not be ReactNode it should be ReactElement instead. */}
            {state.popoverSurface as React.ReactElement}
          </MotionRefForwarder>
        </state.surfaceMotion>
      )}
    </PopoverContext.Provider>
  );
};
