The `mode` prop determines how items are hidden during staggered animations.
This comparison demonstrates how different hide modes affect DOM structure and layout behavior during staggered animations.

| Feature       | visibilityStyle mode                            | unmount mode                      |
| ------------- | ----------------------------------------------- | --------------------------------- |
| DOM presence  | Elements remain with `visibility: hidden` style | Elements removed from DOM         |
| Layout impact | Layout space preserved during animation         | Layout may shift during animation |
