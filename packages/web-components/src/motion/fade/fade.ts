import { createMotionElement } from '../createMotionElement';

// Fade-in
createMotionElement('fluent-fade-in', {
  keyframes: [{ opacity: 0 }, { opacity: 1 }],
  duration: 1000,
  easing: 'ease-in-out',
  fill: 'both',
});

// Fade-out
createMotionElement('fluent-fade-out', {
  keyframes: [{ opacity: 1 }, { opacity: 0 }],
  duration: 1000,
  easing: 'ease-in-out',
  fill: 'both',
});
