The `mode` prop determines how items are hidden during staggered animations.
This comparison demonstrates how different modes affect DOM structure and layout behavior during staggered animations.

|               | visibleProp     | visibilityStyle | unmount          | alwaysVisible   |
| ------------- | --------------- | --------------- | ---------------- | --------------- |
| DOM presence  | elements remain | elements remain | elements removed | elements remain |
| Layout impact | space preserved | space preserved | space removed    | space preserved |
| Animation     | staggered       | staggered       | staggered        | no animation    |
| Visibility    | controlled      | controlled      | controlled       | always visible  |
