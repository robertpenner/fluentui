With plain HTML elements (no motion components), `Stagger` will add or remove them from the DOM.

```tsx
import { Stagger } from '@fluentui/react-motion-components-preview';

<Stagger visible={isVisible}>
  <div>{/* plain element 1 */}</div>
  <div>{/* plain element 2 */}</div>
  <div>{/* plain element 3 */}</div>
  // etc.
</Stagger>;
```
