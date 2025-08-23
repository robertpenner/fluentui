import * as React from 'react';
import { useAnimationFrame } from '@fluentui/react-utilities';
import type { StaggerProps } from './stagger-types';

export const DEFAULT_ITEM_DELAY = 100;
export const DEFAULT_ITEM_DURATION = 200;

/**
 * Defines how Stagger manages its children's visibility.
 * - 'mount': Children are mounted/unmounted from DOM based on visibility
 * - 'presence': Children are presence components with visible prop (always present in DOM, but shown/hidden by the presence itself)
 */
export type StaggerMode = 'mount' | 'presence';

/**
 * Flattens ReactNode (including Fragments) to an array of valid ReactElements,
 * filtering out strings, numbers, null, etc.
 */
export const toElementArray = (children: React.ReactNode): React.ReactElement[] =>
  React.Children.toArray(children).filter(React.isValidElement) as React.ReactElement[];

/**
 * Returns true if the given child is a React Fragment.
 */
export const isFragment = (child: React.ReactNode): child is React.ReactElement =>
  React.isValidElement(child) && child.type === React.Fragment;

/**
 * Convert React children that might be a Fragment or other JSX into a clean array of React elements.
 */
export const childrenOrFragmentToArray = (children: React.ReactNode): React.ReactElement[] => {
  if (isFragment(children)) {
    return toElementArray(children.props.children);
  }
  return toElementArray(children);
};

/**
 * Calculate the total stagger duration—from the moment stagger begins
 * until the final item’s animation completes.
 *
 * Uses the formula:
 *   max(0, delay * (count - 1) + itemDuration)
 *
 * @param params.count        Total number of items to stagger
 * @param params.delay        Milliseconds between the start of each item
 * @param params.itemDuration Milliseconds each item’s animation lasts (default 0)
 * @returns                   Total duration in milliseconds (never negative)
 */
export function getStaggerTotalDuration({
  itemCount,
  itemDelay = DEFAULT_ITEM_DELAY,
  itemDuration = DEFAULT_ITEM_DURATION,
}: {
  itemCount: number;
} & Pick<StaggerProps, 'itemDelay' | 'itemDuration'>): number {
  if (itemCount <= 0) {
    return 0;
  }
  if (itemCount <= 1) {
    return Math.max(0, itemDuration);
  }
  const staggerDuration = itemDelay * (itemCount - 1);
  return Math.max(0, staggerDuration + itemDuration);
}

interface StaggerItemsVisibilityAtTimeParams extends Pick<StaggerProps, 'itemDelay' | 'itemDuration' | 'reversed'> {
  itemCount: number;
  elapsed: number;
  direction?: 'enter' | 'exit';
}

/**
 * Returns visibility flags plus timing metrics for a stagger sequence.
 */
export function staggerItemsVisibilityAtTime({
  itemCount,
  elapsed,
  itemDelay = DEFAULT_ITEM_DELAY,
  itemDuration = DEFAULT_ITEM_DURATION,
  direction = 'enter',
  reversed = false,
}: StaggerItemsVisibilityAtTimeParams): {
  itemsVisibility: boolean[];
  totalDuration: number;
} {
  // If no items, return the empty state
  if (itemCount <= 0) {
    return { itemsVisibility: [], totalDuration: 0 };
  }

  const totalDuration = getStaggerTotalDuration({ itemCount, itemDelay, itemDuration });

  // Calculate progression through the stagger sequence
  let completedSteps: number;
  if (itemDelay <= 0) {
    // When itemDelay is 0 or negative, all steps complete immediately
    completedSteps = itemCount;
  } else {
    // For enter: Math.floor(elapsed / itemDelay) gives 0 at t=0, but we want 1 item visible
    // For exit: Math.floor(elapsed / itemDelay) gives 0 at t=0, which we'll negate to show all items
    const offset = direction === 'enter' ? 1 : 0;
    const stepsFromElapsedTime = Math.floor(elapsed / itemDelay) + offset;
    // Clamp to itemCount to prevent showing more items than we have
    completedSteps = Math.min(itemCount, stepsFromElapsedTime);
  }

  const itemsVisibility = Array.from({ length: itemCount }, (_, idx) => {
    // Calculate based on progression through the sequence (enter pattern)
    const fromStart = idx < completedSteps;
    const fromEnd = idx >= itemCount - completedSteps;

    let itemVisible = reversed ? fromEnd : fromStart;

    // For exit, invert the enter pattern
    if (direction === 'exit') {
      itemVisible = !itemVisible;
    }

    return itemVisible;
  });

  return { itemsVisibility, totalDuration };
}

interface UseStaggerItemsVisibilityParams
  extends Pick<StaggerProps, 'onMotionFinish' | 'mode'>,
    Omit<StaggerItemsVisibilityAtTimeParams, 'elapsed'> {}

/**
 * Hook that tracks the visibility of a staggered sequence of items as time progresses.
 *
 * **Behavior:**
 * - Both modes start in final state: visible for 'enter', hidden for 'exit'
 * - Both modes: No animation on first render (items already in final state)
 * - On subsequent renders: Items animate from start state to final state over time
 *
 * **States:**
 * - Enter direction: Items start visible (final state)
 * - Exit direction: Items start hidden (final state)
 *
 * @param itemCount - Total number of items to stagger
 * @param itemDelay - Milliseconds between the start of each item's animation
 * @param itemDuration - Milliseconds each item's animation lasts
 * @param direction - 'enter' (show items) or 'exit' (hide items)
 * @param reversed - Whether to reverse the stagger order (last item first)
 * @param onMotionFinish - Callback fired when the full stagger sequence completes
 * @param mode - How children's visibility is managed: 'presence' or 'mount'
 *
 * @returns An `itemsVisibility` array of booleans indicating which items are currently visible
 */
export function useStaggerItemsVisibility({
  itemCount,
  itemDelay,
  itemDuration = DEFAULT_ITEM_DURATION,
  direction,
  reversed = false,
  onMotionFinish,
  mode = 'presence',
}: UseStaggerItemsVisibilityParams): { itemsVisibility: boolean[] } {
  const [requestAnimationFrame, cancelAnimationFrame] = useAnimationFrame();

  // State: visibility array for all items
  const [itemsVisibility, setItemsVisibility] = React.useState<boolean[]>(() => {
    // Both modes start in final state: visible for 'enter', hidden for 'exit'
    // The difference is in the animation handling, not the initial state
    return Array(itemCount).fill(direction === 'enter');
  });

  // Refs: animation timing and control
  const startTimeRef = React.useRef<number | null>(null);
  const frameRef = React.useRef<number | null>(null);
  const finishedRef = React.useRef(false);
  const isFirstRender = React.useRef(true);

  // ====== ANIMATION EFFECT ======

  React.useEffect(() => {
    let cancelled = false;
    startTimeRef.current = null;
    finishedRef.current = false;

    // Both modes behave the same: no animation on first render, already in final state
    if (isFirstRender.current) {
      isFirstRender.current = false;
      // Items are already in their final state from useState, no animation needed
      onMotionFinish?.();
      return; // No cleanup needed for first render
    }

    // For animations after first render, we start from the opposite of the final state:
    // - Enter animation: start hidden (false), animate to visible (true)
    // - Exit animation: start visible (true), animate to hidden (false)
    const startState = direction === 'exit';
    setItemsVisibility(Array(itemCount).fill(startState));

    // Animation loop: update visibility on each frame until complete
    const tick = (now: number) => {
      if (cancelled) {
        return;
      }
      if (startTimeRef.current === null) {
        startTimeRef.current = now;
      }
      const elapsed = now - (startTimeRef.current as number);

      const result = staggerItemsVisibilityAtTime({
        itemCount,
        elapsed,
        itemDelay,
        itemDuration,
        direction,
        reversed,
      });

      setItemsVisibility(result.itemsVisibility);

      if (elapsed < result.totalDuration) {
        frameRef.current = requestAnimationFrame(tick as () => void);
      } else if (!finishedRef.current) {
        finishedRef.current = true;
        onMotionFinish?.();
      }
    };

    frameRef.current = requestAnimationFrame(tick as () => void);
    return () => {
      cancelled = true;
      if (frameRef.current) {
        cancelAnimationFrame();
      }
    };
  }, [
    itemCount,
    itemDelay,
    itemDuration,
    direction,
    reversed,
    onMotionFinish,
    requestAnimationFrame,
    cancelAnimationFrame,
    mode,
  ]);

  return { itemsVisibility };
}

/**
 * Checks if a React element accepts a `visible` prop.
 * This detects presence motion components by looking for the .In and .Out properties,
 * or falls back to checking if the visible prop is already explicitly provided.
 *
 * @internal - Exported for testing purposes
 */
export function acceptsVisibleProp(element: React.ReactElement): boolean {
  // Check if it's a motion component by looking for .In and .Out properties
  if (typeof element.type === 'function') {
    const isPresence = 'In' in element.type && 'Out' in element.type;
    if (isPresence) {
      return true;
    }
  }

  // Fallback: check if visible prop is already explicitly provided
  return element.props && 'visible' in element.props;
}
