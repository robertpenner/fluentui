import * as React from 'react';
import { useStaggerItemsVisibility } from './useStaggerItemsVisibility';
import {
  toElementArray,
  DEFAULT_ITEM_DURATION,
  DEFAULT_ITEM_DELAY,
  acceptsVisibleProp,
  acceptsDelayProps,
} from './utils';
import { StaggerOneWayProps, StaggerProps, type StaggerHideMode } from './stagger-types';

const StaggerOneWay: React.FC<StaggerOneWayProps> = ({
  children,
  direction,
  itemDelay = DEFAULT_ITEM_DELAY,
  itemDuration = DEFAULT_ITEM_DURATION,
  reversed = false,
  hideMode,
  delayMode = 'timing',
  onMotionFinish,
}) => {
  const elements = toElementArray(children);

  // Auto-detect hideMode if not specified
  const resolvedHideMode: StaggerHideMode =
    hideMode ??
    (() => {
      const hasVisibleSupport = elements.every(child => acceptsVisibleProp(child));
      return hasVisibleSupport ? 'visibleProp' : 'visibilityStyle';
    })();

  // For delayProp mode, pass delay props directly to motion components
  if (delayMode === 'delayProp') {
    return (
      <>
        {elements.map((child, idx) => {
          const key = child.key ?? idx;
          const staggerIndex = reversed ? elements.length - 1 - idx : idx;
          const delay = staggerIndex * itemDelay;

          // Clone element with delay prop (for enter direction) or exitDelay prop (for exit direction)
          const delayProp = direction === 'enter' ? { delay } : { exitDelay: delay };

          return React.cloneElement(child, {
            key,
            visible: true, // Always visible, let the delay handle the timing
            ...delayProp,
          });
        })}
      </>
    );
  }

  // For timing mode, use the existing timing-based implementation
  const { itemsVisibility } = useStaggerItemsVisibility({
    itemCount: elements.length,
    itemDelay,
    itemDuration,
    direction,
    reversed,
    onMotionFinish,
    mode: resolvedHideMode,
  });

  return (
    <>
      {elements.map((child, idx) => {
        const key = child.key ?? idx;

        if (resolvedHideMode === 'visibleProp') {
          return React.cloneElement(child, { key, visible: itemsVisibility[idx] });
        } else if (resolvedHideMode === 'visibilityStyle') {
          const style = {
            ...child.props.style,
            visibility: itemsVisibility[idx] ? 'visible' : 'hidden',
          };
          return React.cloneElement(child, { key, style });
        } else {
          // unmount mode
          return itemsVisibility[idx] ? React.cloneElement(child, { key }) : null;
        }
      })}
    </>
  );
};

const StaggerIn: React.FC<Omit<StaggerProps, 'visible'>> = props => (
  <StaggerOneWay {...props} direction="enter" hideMode="unmount" />
);

const StaggerOut: React.FC<Omit<StaggerProps, 'visible'>> = props => (
  <StaggerOneWay {...props} direction="exit" hideMode="unmount" />
);

// Main Stagger component with auto-detection or explicit modes
const StaggerMain: React.FC<StaggerProps> = props => {
  const { children, visible = false, hideMode, delayMode, ...rest } = props;

  // Auto-detect hideMode if not specified
  const resolvedHideMode: StaggerHideMode =
    hideMode ??
    (() => {
      const elements = toElementArray(children);
      const hasDelaySupport = elements.every(child => acceptsDelayProps(child));
      const hasVisibleSupport = elements.every(child => acceptsVisibleProp(child));

      // Prefer delayProp mode if all children support it (most performant)
      if (hasDelaySupport && delayMode === 'delayProp') {
        return 'visibleProp';
      } else if (hasVisibleSupport) {
        return 'visibleProp';
      } else {
        return 'visibilityStyle';
      }
    })();

  const direction = visible ? 'enter' : 'exit';

  return (
    <StaggerOneWay
      {...rest}
      children={children}
      hideMode={resolvedHideMode}
      delayMode={delayMode}
      direction={direction}
    />
  );
};

/**
 * Stagger is a component that manages the staggered entrance and exit of its children.
 * Children are animated in sequence with configurable timing between each item.
 * Stagger can be interactively toggled between entrance and exit animations using the `visible` prop.
 *
 * @param children - React elements to animate. Elements are cloned with animation props.
 * @param visible - Controls animation direction: `true` for enter, `false` for exit. Defaults to `false`.
 * @param itemDelay - Milliseconds between each item's animation start. Defaults to 100ms.
 * @param itemDuration - Milliseconds each item's animation lasts. Only used with `delayMode="timing"`. Defaults to 200ms.
 * @param reversed - Whether to reverse the stagger sequence (last item animates first). Defaults to `false`.
 * @param hideMode - How children's visibility/mounting is managed. Auto-detects if not specified.
 * @param delayMode - How staggering timing is implemented. Defaults to 'timing'.
 * @param onMotionFinish - Callback invoked when the staggered animation sequence completes.
 *
 * **hideMode behavior:**
 * - `'visibleProp'`: Children are presence components with `visible` prop (always rendered, visibility controlled via prop)
 * - `'visibilityStyle'`: Children remain in DOM with inline style visibility: hidden/visible (preserves layout space)
 * - `'unmount'`: Children are mounted/unmounted from DOM based on visibility
 *
 * **delayMode behavior:**
 * - `'timing'`: Manages visibility over time using JavaScript timing (current behavior)
 * - `'delayProp'`: Passes delay props to motion components to use native Web Animations API delays (most performant)
 *
 * **Static variants:**
 * - `<Stagger.In>` - One-way stagger for entrance animations only (uses unmount hideMode)
 * - `<Stagger.Out>` - One-way stagger for exit animations only (uses unmount hideMode)
 *
 * @example
 * ```tsx
 * // Auto-detects hideMode, uses timing delayMode by default
 * <Stagger visible={isVisible} itemDelay={150}>
 *   <Scale><div>Item 1</div></Scale>
 *   <Fade><div>Item 2</div></Fade>
 *   <Rotate><div>Item 3</div></Rotate>
 * </Stagger>
 *
 * // Use delayProp mode for better performance with motion components
 * <Stagger visible={isVisible} delayMode="delayProp" itemDelay={100}>
 *   <Scale><div>Item 1</div></Scale>
 *   <Fade><div>Item 2</div></Fade>
 * </Stagger>
 *
 * // Auto-detects visibilityStyle hideMode for DOM elements
 * <Stagger visible={isVisible} itemDelay={150} onMotionFinish={handleComplete}>
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </Stagger>
 *
 * // Static variants for one-way animations
 * <Stagger.In itemDelay={100}>
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 * </Stagger.In>
 * ```
 */
export const Stagger = Object.assign(StaggerMain, {
  In: StaggerIn,
  Out: StaggerOut,
});
