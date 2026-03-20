`createPresenceComponentVariant()` is a factory function that creates a new presence component based on an existing presence component, using the provided variant parameters as defaults.

This allows you to create specialized versions of presence components with different default behaviors, while still allowing runtime parameters to override the defaults when needed.

The variant parameters should match the type of the original component's motion parameters.

```tsx
import { motionTokens, createPresenceComponentVariant } from '@fluentui/react-components';

const springWithResistance = 'linear(...)';
const anticipationWithBounce = 'linear(...)';

// Variant of Scale with bouncy easings
const ScaleBouncey = createPresenceComponentVariant(Scale, {
  outScale: 0.5,
  duration: 1000,
  exitDuration: 1500,
  easing: springWithResistance,
  exitEasing: anticipationWithBounce,
  animateOpacity: false,
});
```
