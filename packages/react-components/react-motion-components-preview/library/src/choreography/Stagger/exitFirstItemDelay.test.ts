import { staggerItemsVisibilityAtTime } from './utils/stagger-calculations';

describe('Exit First Item Delay Bug', () => {
  it('FAILING TEST: first item should start animating immediately on exit direction', () => {
    // This test captures the bug: when hiding items (exit direction),
    // the first item should start animating immediately at t=0,
    // just like how the first item shows immediately at t=0 for enter direction

    // For enter direction - first item appears immediately (this works correctly)
    const enterResult = staggerItemsVisibilityAtTime({
      itemCount: 3,
      elapsed: 0,
      itemDelay: 500, // Same delay as in the story
      direction: 'enter',
    });
    
    expect(enterResult.itemsVisibility).toEqual([true, false, false]);
    // ✅ PASSES: First item is visible immediately at t=0

    // For exit direction - first item should start hiding immediately (this is where the bug is)
    const exitResult = staggerItemsVisibilityAtTime({
      itemCount: 3,
      elapsed: 0,
      itemDelay: 500,
      direction: 'exit',
    });
    
    expect(exitResult.itemsVisibility).toEqual([true, true, true]);
    // ✅ This part is correct - all items start visible

    // But let's check what happens at a very small time increment
    // The first item should start transitioning immediately
    const exitResultSmallTime = staggerItemsVisibilityAtTime({
      itemCount: 3,
      elapsed: 1, // Just 1ms elapsed
      itemDelay: 500,
      direction: 'exit',
    });
    
    // At t=1ms, the first item should already be in the process of hiding
    // But the current logic might still show all items as visible
    expect(exitResultSmallTime.itemsVisibility).toEqual([false, true, true]);
    // ❌ This test might FAIL if the bug exists - it might still return [true, true, true]
    
    // Let's also check at exactly when the second item should start
    const exitResultAtFirstDelay = staggerItemsVisibilityAtTime({
      itemCount: 3,
      elapsed: 500, // Exactly one delay period
      itemDelay: 500,
      direction: 'exit',
    });
    
    // At t=500ms, first item should be hidden, second item should start hiding
    expect(exitResultAtFirstDelay.itemsVisibility).toEqual([false, false, true]);
    // This tests the progression is correct
  });

  it('demonstrates the symmetry issue between enter and exit', () => {
    // This test shows that enter and exit should be symmetric in their timing
    // except at t=0 where both start in their "all visible" state for exit
    
    const itemDelay = 100;
    const checkTimes = [1, 50, 100, 150, 200]; // Skip t=0 since it's a special case
    
    checkTimes.forEach(elapsed => {
      const enterResult = staggerItemsVisibilityAtTime({
        itemCount: 3,
        elapsed,
        itemDelay,
        direction: 'enter',
      });
      
      const exitResult = staggerItemsVisibilityAtTime({
        itemCount: 3,
        elapsed,
        itemDelay,
        direction: 'exit',
      });
      
      // The exit result should be the logical inverse of the enter result
      // If enter shows [true, false, false], exit should show [false, true, true]
      const expectedExitResult = enterResult.itemsVisibility.map(visible => !visible);
      
      expect(exitResult.itemsVisibility).toEqual(expectedExitResult);
    });
    
    // Special case for t=0: enter should show first item, exit should show all items
    const enterAtZero = staggerItemsVisibilityAtTime({
      itemCount: 3,
      elapsed: 0,
      itemDelay: 100,
      direction: 'enter',
    });
    
    const exitAtZero = staggerItemsVisibilityAtTime({
      itemCount: 3,
      elapsed: 0,
      itemDelay: 100,
      direction: 'exit',
    });
    
    expect(enterAtZero.itemsVisibility).toEqual([true, false, false]);
    expect(exitAtZero.itemsVisibility).toEqual([true, true, true]);
  });

  it('demonstrates the specific bug from the story example', () => {
    // This test recreates the exact scenario from the story:
    // 8 items with 500ms delay
    
    const itemCount = 8;
    const itemDelay = 500;
    
    // When showing (enter), first item appears immediately
    const showResult = staggerItemsVisibilityAtTime({
      itemCount,
      elapsed: 0,
      itemDelay,
      direction: 'enter',
    });
    
    expect(showResult.itemsVisibility[0]).toBe(true);
    // ✅ First item is visible immediately when showing
    
    // When hiding (exit), first item should START hiding immediately
    // but due to the bug, it might not change until after the first delay
    const hideResultImmediate = staggerItemsVisibilityAtTime({
      itemCount,
      elapsed: 0,
      itemDelay,
      direction: 'exit',
    });
    
    expect(hideResultImmediate.itemsVisibility[0]).toBe(true);
    // ✅ All items start visible for exit
    
    const hideResultAfterSmallTime = staggerItemsVisibilityAtTime({
      itemCount,
      elapsed: 1, // 1ms later
      itemDelay,
      direction: 'exit',
    });
    
    // The bug: first item should be transitioning (false) but might still be true
    expect(hideResultAfterSmallTime.itemsVisibility[0]).toBe(false);
    // ❌ This might FAIL if the bug exists
  });
});
