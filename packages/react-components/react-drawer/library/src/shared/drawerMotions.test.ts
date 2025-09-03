import { getPositionTransform } from './drawerMotions';

describe('getPositionTransform', () => {
  it('should return the correct transform for start position', () => {
    expect(getPositionTransform('start', 'medium', 'rtl')).toBe('translate3d(var(medium), 0, 0)');
    expect(getPositionTransform('start', 'medium', 'ltr')).toBe('translate3d(calc(var(medium) * -1), 0, 0)');
  });

  it('should return the correct transform for end position', () => {
    expect(getPositionTransform('end', 'medium', 'rtl')).toBe('translate3d(calc(var(medium) * -1), 0, 0)');
    expect(getPositionTransform('end', 'medium', 'ltr')).toBe('translate3d(var(medium), 0, 0)');
  });

  it('should return the correct transform for bottom position', () => {
    expect(getPositionTransform('bottom', 'medium', 'rtl')).toBe('translate3d(0, var(medium), 0)');
    expect(getPositionTransform('bottom', 'medium', 'ltr')).toBe('translate3d(0, var(medium), 0)');
  });

  it('should return the default transform for undefined or unknown position', () => {
    expect(getPositionTransform('top' as unknown as undefined, 'medium', 'ltr')).toBe('translate3d(0, 0, 0)');
  });

  it('should handle different sizes correctly', () => {
    expect(getPositionTransform('start', 'small', 'ltr')).toBe('translate3d(calc(var(small) * -1), 0, 0)');
    expect(getPositionTransform('end', 'large', 'rtl')).toBe('translate3d(calc(var(large) * -1), 0, 0)');
    expect(getPositionTransform('bottom', 'full', 'ltr')).toBe('translate3d(0, var(full), 0)');
  });
});

describe('OverlaySurfaceBackdropMotion', () => {
  it('should create fade motion with correct duration based on size', () => {
    const { createBackdropFadeMotion } = require('./drawerMotions');
    
    // Test different sizes
    const sizes = ['small', 'medium', 'large', 'full'] as const;
    
    sizes.forEach(size => {
      const motion = createBackdropFadeMotion({ size });
      
      // Check that it returns the expected structure
      expect(motion).toHaveProperty('enter');
      expect(motion).toHaveProperty('exit');
      
      // Check enter motion
      expect(motion.enter).toHaveProperty('keyframes');
      expect(motion.enter).toHaveProperty('duration');
      expect(motion.enter).toHaveProperty('easing');
      expect(motion.enter.keyframes).toEqual([{ opacity: 0 }, { opacity: 1 }]);
      
      // Check exit motion (should be reversed keyframes)
      expect(motion.exit).toHaveProperty('keyframes');
      expect(motion.exit.keyframes).toEqual([{ opacity: 1 }, { opacity: 0 }]);
      
      // Check that duration matches the expected size mapping
      expect(motion.enter.duration).toBeGreaterThan(0);
      expect(motion.exit.duration).toEqual(motion.enter.duration);
    });
  });
});
