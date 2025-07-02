The `Slide` component can be customized with different slide directions and opacity settings.

```tsx
import { Slide } from '@fluentui/react-motion-components-preview';

function Component({ visible }) {
  return (
    <Slide visible={visible} fromX={-40} fromY={0} animateOpacity={true}>
      <div>Slides in from the left with opacity animation</div>
    </Slide>
  );
}
```

## Parameters

- `fromX`: The X translate value in pixels to slide from (default: 0)
- `fromY`: The Y translate value in pixels to slide from (default: -20)
- `animateOpacity`: Whether to include fade animation (default: true)
- `duration`: Animation duration for enter transition (default: 250ms)
- `exitDuration`: Animation duration for exit transition (default: 200ms)