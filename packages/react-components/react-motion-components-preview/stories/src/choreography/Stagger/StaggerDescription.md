> **⚠️ Preview components are considered unstable**

`Stagger` choreography is a rippled enter or exit transition across its child elements.

- `Stagger` can wrap presence motion components (`Slide`, `Fade`, `Collapse`, etc.) and animate them by triggering their `visible` props in sequence.
- Its own `visible` prop gives interactive control over the staggered enter and exit transitions.
- This allows `Stagger` to be treated like a presence component, and thus be nested within another `Stagger`.
- `Stagger` can also transition plain HTML elements using different visibility strategies.
- `Stagger` automatically detects the optimal configuration for your children, so you usually don't need to configure anything!

```tsx
import { Stagger, Slide } from '@fluentui/react-motion-components-preview';

// Auto-detects optimal behavior for presence components
<Stagger visible={isVisible}>
  <Slide><div>Item 1</div></Slide>
  <Slide><div>Item 2</div></Slide>
  <Slide><div>Item 3</div></Slide>
</Stagger>

// Auto-detects optimal behavior for DOM elements
<Stagger visible={isVisible}>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Stagger>

// One-way staggers for entrance-only animations
<Stagger.In>
  <Fade.In><div>Card 1</div></Fade.In>
  <Scale.In><div>Card 2</div></Scale.In>
</Stagger.In>
```

## Auto-Detection

`Stagger` automatically chooses the best approach for your content:

- **Motion components** → Uses their built-in `visible` and `delay` props for optimal performance
- **DOM elements** → Uses CSS visibility with JavaScript timing to preserve layout
- **Mixed content** → Falls back to timing-based approach that works with everything

Advanced configuration options are available for power users and custom component authors.

```tsx
import { Stagger, Slide } from '@fluentui/react-motion-components-preview';

// Auto-detects optimal modes for presence components
<Stagger visible={isVisible}>
  <Slide><div>Item 1</div></Slide>
  <Slide><div>Item 2</div></Slide>
  <Slide><div>Item 3</div></Slide>
</Stagger>

// Auto-detects optimal modes for DOM elements
<Stagger visible={isVisible}>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Stagger>

// One-way staggers for entrance-only animations
<Stagger.In>
  <Fade.In><div>Card 1</div></Fade.In>
  <Scale.In><div>Card 2</div></Scale.In>
</Stagger.In>
```

## Configuration Options

`Stagger` uses two independent configuration axes that can be combined for different use cases:

### Hide Mode (how children visibility is controlled)

| Mode                  | Description                                                  | When to Use                                          | Example                              |
| --------------------- | ------------------------------------------------------------ | ---------------------------------------------------- | ------------------------------------ |
| **`visibleProp`**     | Children are motion components with a `visible` prop         | Presence components like `Fade`, `Scale`, `Slide`    | `<Fade><div>Item</div></Fade>`       |
| **`visibilityStyle`** | Children remain in DOM with CSS `visibility: hidden/visible` | Plain DOM elements that should preserve layout space | `<div>Item</div>`                    |
| **`unmount`**         | Children are added/removed from the DOM                      | One-way animations or when you want layout reflow    | `<Fade.In><div>Item</div></Fade.In>` |

### Delay Mode (how stagger timing is implemented)

| Mode            | Description                                                | Performance                           | When to Use                                      |
| --------------- | ---------------------------------------------------------- | ------------------------------------- | ------------------------------------------------ |
| **`delayProp`** | Passes `delay`/`exitDelay` props to motion components      | Best (uses native Web Animations API) | Motion components that support delay props       |
| **`timing`**    | JavaScript-based timing control with visibility management | Good                                  | DOM elements or components without delay support |

### Auto-Detection

`Stagger` automatically detects the optimal modes for your children:

- **hideMode**: Uses `visibleProp` if all children support it, otherwise falls back to `visibilityStyle` (bidirectional) or `unmount` (one-way)
- **delayMode**: Uses `delayProp` if all children support it, otherwise falls back to `timing`

You can override auto-detection by explicitly setting `hideMode` and/or `delayMode` props.

## Common Use Cases

### Interactive Presence Components (Auto-detected: `visibleProp` + `delayProp`)

```tsx
// Optimal performance - uses native Web Animations API delays
<Stagger visible={isVisible} itemDelay={150}>
  <Fade>
    <div>Menu Item 1</div>
  </Fade>
  <Scale>
    <div>Menu Item 2</div>
  </Scale>
  <Slide>
    <div>Menu Item 3</div>
  </Slide>
</Stagger>
```

### One-way Entrance Animations (Auto-detected: `unmount` + `delayProp`)

```tsx
// Cards that appear as page loads
<Stagger.In itemDelay={100}>
  <Fade.In>
    <div>Card 1</div>
  </Fade.In>
  <Scale.In>
    <div>Card 2</div>
  </Scale.In>
  <Rotate.In>
    <div>Card 3</div>
  </Rotate.In>
</Stagger.In>
```

### Plain DOM Elements (Auto-detected: `visibilityStyle` + `timing`)

```tsx
// Simple elements with JavaScript timing
<Stagger visible={isVisible} itemDelay={150}>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Stagger>
```

### Mixed Content with Override

```tsx
// Force timing mode for mixed motion components and DOM elements
<Stagger visible={isVisible} delayMode="timing" hideMode="unmount">
  <Fade>
    <div>Motion component</div>
  </Fade>
  <div>Plain element</div>
  <CustomComponent>Custom component</CustomComponent>
</Stagger>
```
