import { createPresenceComponentVariant, motionTokens } from '@fluentui/react-motion';
import { Scale } from '@fluentui/react-motion-components-preview';

/**
 * Dialog surface motion component with optimized scaling behavior.
 * 
 * Uses a refined scale value (0.9 instead of 0.85) for smoother visual transition
 * and consistent easing curves optimized for dialog motion patterns.
 * 
 * Features:
 * - Hardware-accelerated transforms via Scale component
 * - Optimized scale value for dialog surfaces  
 * - Consistent easing curves for enter/exit transitions
 * - Built on the standard Scale motion component
 */
export const DialogSurfaceMotion = createPresenceComponentVariant(Scale, {
  fromScale: 0.9, // Refined from 0.85 for smoother animation
  easing: motionTokens.curveDecelerateMid,
  duration: motionTokens.durationGentle,
  exitEasing: motionTokens.curveAccelerateMin,
  exitDuration: motionTokens.durationGentle,
});
