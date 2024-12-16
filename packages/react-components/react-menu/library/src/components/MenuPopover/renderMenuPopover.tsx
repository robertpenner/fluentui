/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { assertSlots } from '@fluentui/react-utilities';
import { MenuPopoverSlots, MenuPopoverState } from './MenuPopover.types';
import { Portal } from '@fluentui/react-portal';
import { Fade } from '@fluentui/react-motion-components-preview';
import { SlideInFadeOut } from './popover-motions';

/**
 * Render the final JSX of MenuPopover
 */
export const renderMenuPopover_unstable = (state: MenuPopoverState) => {
  assertSlots<MenuPopoverSlots>(state);

  const surface = (
    <SlideInFadeOut visible={state.open}>
      <state.root />
    </SlideInFadeOut>
  );

  if (state.inline) {
    return surface;
  }

  return <Portal mountNode={state.mountNode}>{surface}</Portal>;
};
