import * as React from 'react';
import { useStaggerItemsVisibility } from './useStaggerItemsVisibility';
import { toElementArray, DEFAULT_ITEM_DURATION, DEFAULT_ITEM_DELAY, acceptsVisibleProp } from './utils';
import { StaggerOneWayProps, StaggerProps, type StaggerHideMode } from './stagger-types';

const StaggerOneWay: React.FC<StaggerOneWayProps> = ({
  children,
  direction,
  itemDelay = DEFAULT_ITEM_DELAY,
  itemDuration = DEFAULT_ITEM_DURATION,
  reversed = false,
  mode = 'unmount',
  onMotionFinish,
}) => {
  const elements = toElementArray(children);

  const { itemsVisibility } = useStaggerItemsVisibility({
    itemCount: elements.length,
    itemDelay,
    itemDuration,
    direction,
    reversed,
    onMotionFinish,
    mode,
  });

  return (
    <>
      {elements.map((child, idx) => {
        const key = child.key ?? idx;

        if (mode === 'alwaysVisible') {
          // Always render children without any visibility control
          return React.cloneElement(child);
        } else if (mode === 'visibleProp') {
          // Always render and control via visible prop (visibleProp mode)
          return React.cloneElement(child, { key, visible: itemsVisibility[idx] });
        } else if (mode === 'visibilityStyle') {
          // Always render and control via inline visibility style
          const style = {
            ...child.props.style,
            visibility: itemsVisibility[idx] ? 'visible' : 'hidden',
          };
          return React.cloneElement(child, { key, style });
        } else {
          // Mount/unmount based on visibility (unmount mode)
          return itemsVisibility[idx] ? React.cloneElement(child, { key }) : null;
        }
      })}
    </>
  );
};

const StaggerIn: React.FC<Omit<StaggerProps, 'visible'>> = ({ mode = 'unmount', ...props }) => (
  <StaggerOneWay {...props} direction="enter" mode={mode} />
);

const StaggerOut: React.FC<Omit<StaggerProps, 'visible'>> = ({ mode = 'unmount', ...props }) => (
  <StaggerOneWay {...props} direction="exit" mode={mode} />
);

// Main Stagger component with auto-detection or explicit mode
const StaggerMain: React.FC<StaggerProps> = props => {
  const { mode, children, visible = false, ...rest } = props;

  // Determine mode: explicit prop takes precedence, otherwise auto-detect
  let resolvedMode: StaggerHideMode;
  if (mode !== undefined) {
    resolvedMode = mode;
  } else {
    // Auto-detect based on children:
    // - If all children accept visible prop, use visibleProp mode
    // - Otherwise, use visibilityStyle mode for regular DOM elements
    const elements = toElementArray(children);
    const hasNonPresenceItems = elements.some(child => !acceptsVisibleProp(child));
    resolvedMode = hasNonPresenceItems ? 'visibilityStyle' : 'visibleProp';
  }
  const direction = visible ? 'enter' : 'exit';

  return <StaggerOneWay {...rest} children={children} mode={resolvedMode} direction={direction} />;
};

/**
 * Stagger is a component that manages the staggered entrance and exit of its children.
 * Children are animated in sequence with configurable timing between each item.
 * Stagger can be interactively toggled between entrance and exit animations using the `visible` prop.
 *
 * @param children - React elements to animate. Elements are cloned with animation props.
 * @param visible - Controls animation direction: `true` for enter, `false` for exit. Defaults to `false`.
 * @param itemDelay - Milliseconds between each item's animation start. Defaults to 100ms.
 * @param itemDuration - Milliseconds each item's animation lasts. Defaults to 200ms.
 * @param reversed - Whether to reverse the stagger sequence (last item animates first). Defaults to `false`.
 * @param onMotionFinish - Callback invoked when the staggered animation sequence completes.
 * @param mode - How children's visibility is managed. Auto-detects if not specified.
 *
 * **Mode behavior:**
 * - `'visibleProp'`: Children are presence components with `visible` prop (always rendered, visibility controlled via prop)
 * - `'visibilityStyle'`: Children remain in DOM with inline style visibility: hidden/visible (preserves layout space)
 * - `'unmount'`: Children are mounted/unmounted from DOM based on visibility
 * - `'alwaysVisible'`: Children are always visible and rendered without any stagger animation
 *
 * **Static variants:**
 * - `<Stagger.In>` - One-way stagger for entrance animations only (uses unmount mode)
 * - `<Stagger.Out>` - One-way stagger for exit animations only (uses unmount mode)
 *
 * @example
 * ```tsx
 * // Auto-detects mode based on children (visibilityStyle for DOM elements)
 * <Stagger visible={isVisible} itemDelay={150} onMotionFinish={handleComplete}>
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </Stagger>
 *
 * // Explicit unmount mode for regular DOM elements
 * <Stagger.In itemDelay={100}>
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 * </Stagger.In>
 *
 * // VisibleProp mode for motion components
 * <Stagger visible={isVisible} mode="visibleProp">
 *   <Fade><div>Item 1</div></Fade>
 *   <Scale><div>Item 2</div></Scale>
 * </Stagger>
 *
 * // VisibilityStyle mode preserves layout during stagger
 * <Stagger visible={isVisible} mode="visibilityStyle">
 *   <div>Card 1</div>
 *   <div>Card 2</div>
 * </Stagger>
 *
 * // AlwaysVisible mode shows all children without any stagger animation
 * <Stagger visible={isVisible} mode="alwaysVisible">
 *   <div>Always visible item 1</div>
 *   <div>Always visible item 2</div>
 * </Stagger>
 * ```
 */
export const Stagger = Object.assign(StaggerMain, {
  In: StaggerIn,
  Out: StaggerOut,
});
