import type { StaggerProps } from '../stagger-types';
import { DEFAULT_ITEM_DELAY, DEFAULT_ITEM_DURATION } from './constants';

/**
 * Calculate the total stagger duration—from the moment stagger begins
 * until the final item's animation completes.
 *
 * Uses the formula:
 *   max(0, delay * (count - 1) + itemDuration)
 *
 * @param params.count        Total number of items to stagger
 * @param params.delay        Milliseconds between the start of each item
 * @param params.itemDuration Milliseconds each item's animation lasts (default 0)
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

export interface StaggerItemsVisibilityAtTimeParams
  extends Pick<StaggerProps, 'itemDelay' | 'itemDuration' | 'reversed'> {
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
