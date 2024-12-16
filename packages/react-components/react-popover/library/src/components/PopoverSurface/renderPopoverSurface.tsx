/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { assertSlots } from '@fluentui/react-utilities';
import { Portal } from '@fluentui/react-portal';
import type { PopoverSurfaceSlots, PopoverSurfaceState } from './PopoverSurface.types';
import { Fade } from '@fluentui/react-motion-components-preview';
import { SlideInFadeOut } from './popover-motions';
import { ReactChild, ReactElement } from 'react';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';

/**
 * Render the final JSX of PopoverSurface
 */
export const renderPopoverSurface_unstable = (state: PopoverSurfaceState) => {
  assertSlots<PopoverSurfaceSlots>(state);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  // const { targetDocument } = useFluent();
  // const targetWindow = targetDocument?.defaultView;

  // console.log('### state', state);
  // console.log('### state.root', state.root);

  // const styles = targetWindow?.getComputedStyle(state.root?.children as unknown as HTMLElement);
  // console.log('### styles', styles);
  // const myVariable = styles.getPropertyValue('--my-variable');

  // console.log('### state.root.data-popper-placement', (state.root as unknown as HTMLElement)['data-popper-placement']);
  // console.log('### state.root.dataset', (state.root as unknown as HTMLElement).dataset);
  // console.log('### state.root.tabster', (state.root as unknown as HTMLElement).dataset?.tabster);
  // console.log('### state.root.popperPlacement', (state.root as unknown as HTMLElement).dataset?.popperPlacement);

  // console.log(
  //   '### data-popper-placement',
  //   (state.root as unknown as HTMLDivElement)?.getAttribute('data-popper-placement'),
  // );

  const surface = (
    // <Fade visible={state.open}>
    <SlideInFadeOut visible={state.open}>
      <state.root>
        {state.withArrow && <div ref={state.arrowRef} className={state.arrowClassName} />}
        {state.root.children}
        {/* <button>BTN</button> */}
      </state.root>
    </SlideInFadeOut>
    // </Fade>
  );

  if (state.inline) {
    return surface;
  }

  return <Portal mountNode={state.mountNode}>{surface}</Portal>;
};
