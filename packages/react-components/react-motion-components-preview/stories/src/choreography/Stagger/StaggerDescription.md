> **⚠️ Preview components are considered unstable**

`Stagger` choreography is a rippled enter or exit transition across its child elements.

- `Stagger` can wrap presence motion components (`Slide`, `Fade`, `Collapse`, etc.) and then animate them by triggering their `visible` props in sequence.
- Its own `visible` prop gives interactive control over the staggered enter and exit transitions.
- This allows `Stagger` to be treated like a presence component, and thus be nested within another `Stagger`.
- `Stagger` can also animate plain HTML elements by adding and removing them from the DOM.

```tsx
import { Stagger, Slide } from '@fluentui/react-motion-components-preview';

// wrapping presence motion components
<Stagger visible={isVisible}>
  <Slide>{/* item 1 */}</Slide>
  <Slide>{/* item 2 */}</Slide>
  <Slide>{/* item 3 */}</Slide>
</Stagger>

// wrapping plain elements
<Stagger visible={isVisible}>
  <div>1</div>
  <div>2</div>
  <div>3</div>
</Stagger>
```

## Stagger Modes

|                   | **'presence' mode**                                                            | **'mount' mode**                                          |
| ----------------- | ------------------------------------------------------------------------------ | --------------------------------------------------------- |
| **Type**          | Reactive                                                                       | Autonomous                                                |
| **Purpose**       | Components exist in the DOM and wait for external events to trigger animations | Components animate as soon as they're added to the DOM    |
| **Initial State** | Idle/ready state - items are already in their final state                      | Animation begins immediately upon mount                   |
| **Trigger**       | User interactions, state changes, or other events toggle the animation         | The act of mounting/rendering itself starts the animation |
| **Example**       | A dropdown menu that's hidden but ready to animate in when clicked             | Cards that stagger in as soon as a page loads             |
