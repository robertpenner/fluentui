# VisibilityStyle Mode

The `visibilityStyle` mode provides a balance between the `mount` and `presence` modes by:

- **Keeping elements in the DOM at all times** (like `presence` mode)
- **Using inline CSS `visibility: hidden/visible`** to control visibility
- **Preserving layout space** when elements are hidden (unlike `display: none`)

## Key Benefits

### Layout Preservation

Hidden elements maintain their space in the layout, preventing jarring layout shifts during animations.

### Performance

Style changes are generally faster than DOM mutations, and no re-layout calculations are needed.

### Accessibility

Screen readers can still access the content structure even when elements are visually hidden.

### Smooth Animations

No layout jumps or shifts occur during the stagger sequence.

## Use Cases

- **Card grids** where spacing should remain consistent
- **Form fields** that need predictable positioning
- **Navigation items** that shouldn't cause layout changes
- **Dashboard widgets** requiring stable positioning

## Comparison with Other Modes

| Mode              | DOM Presence   | Layout Impact                   | Performance               |
| ----------------- | -------------- | ------------------------------- | ------------------------- |
| `mount`           | Added/removed  | Layout shifts possible          | DOM mutations             |
| `presence`        | Always present | Controlled by motion components | Motion component overhead |
| `visibilityStyle` | Always present | Layout preserved                | Simple style changes      |
