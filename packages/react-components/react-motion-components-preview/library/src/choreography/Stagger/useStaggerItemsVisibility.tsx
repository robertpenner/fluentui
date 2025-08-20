import * as React from 'react';
import { useAnimationFrame } from '@fluentui/react-utilities';
import type { StaggerProps } from './stagger-types';
import { staggerItemsVisibilityAtTime, type StaggerItemsVisibilityAtTimeParams } from './utils/stagger-calculations';
import { DEFAULT_ITEM_DURATION } from './utils/constants';

export interface UseStaggerItemsVisibilityParams
  extends Pick<StaggerProps, 'onMotionFinish' | 'mode'>,
    Omit<StaggerItemsVisibilityAtTimeParams, 'elapsed'> {}

/**
 * Hook that tracks the visibility of a staggered sequence of items as time progresses.
 *
 * **Behavior:**
 * - All modes start in final state: visible for 'enter', hidden for 'exit'
 * - All modes: No animation on first render (items already in final state)
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
 * @param mode - How children's visibility is managed: 'presence', 'visibilityStyle', or 'mount'
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
    // For mount mode, items should start hidden and animate to visible
    // For presence and visibilityStyle modes, items start in final state: visible for 'enter', hidden for 'exit'
    if (mode === 'mount') {
      return Array(itemCount).fill(direction === 'exit');
    } else {
      return Array(itemCount).fill(direction === 'enter');
    }
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

    // Mount mode should always animate, presence and visibilityStyle modes only animate after first render
    // - Stagger.In (enter + mount): DOM elements get added and animate from hidden to visible
    // - Stagger.Out (exit + mount): DOM elements start visible and animate out before removal
    if ((mode === 'presence' || mode === 'visibilityStyle') && isFirstRender.current) {
      isFirstRender.current = false;
      // Items are already in their final state from useState, no animation needed
      onMotionFinish?.();
      return; // No cleanup needed for first render
    }

    // Mark first render as complete
    if (isFirstRender.current) {
      isFirstRender.current = false;
    }

    // For mount mode, we start with the initial state and animate to the final state
    // For presence mode animations after first render, we start from the opposite state
    if (mode === 'mount') {
      // Mount mode: already initialized correctly, start animation
    } else {
      // Presence and visibilityStyle modes: start from the opposite of the final state
      // - Enter animation: start hidden (false), animate to visible (true)
      // - Exit animation: start visible (true), animate to hidden (false)
      const startState = direction === 'exit';
      setItemsVisibility(Array(itemCount).fill(startState));
    }

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
