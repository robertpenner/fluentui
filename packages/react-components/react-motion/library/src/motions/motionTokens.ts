type DurationKey = `duration${Capitalize<string>}`;
type DurationValue = number;
type DurationTokens = Record<DurationKey, DurationValue>;

type CurveKey = `curve${Capitalize<string>}`;
type BezierCurveValue = `cubic-bezier(${number},${number},${number},${number})`;
type CurveTokens = Record<CurveKey, BezierCurveValue>;

/**
 * Animation duration tokens, copied from `packages/tokens/src/global/durations.ts`.
 *
 * Values are plain numbers in **milliseconds** (rather than CSS strings like `'200ms'`)
 * so they can be passed directly to the Web Animations API
 * (e.g. `element.animate(keyframes, { duration: durations.durationNormal })`).
 *
 * @example
 * ```ts
 * element.animate(keyframes, { duration: durations.durationNormal });
 * ```
 */
export const durations = {
  durationUltraFast: 50,
  durationFaster: 100,
  durationFast: 150,
  durationNormal: 200,
  durationGentle: 250,
  durationSlow: 300,
  durationSlower: 400,
  durationUltraSlow: 500,
} as const satisfies DurationTokens;

/**
 * Animation easing curve tokens, copied from `packages/tokens/src/global/curves.ts`.
 *
 * Each value is a CSS `cubic-bezier()` string compatible with both the Web Animations API
 * (`KeyframeAnimationOptions.easing`) and CSS `animation-timing-function`.
 *
 * Curves are grouped by intent:
 * - **Accelerate** (`curveAccelerate*`) — element speeds up as it leaves; use for exits.
 * - **Decelerate** (`curveDecelerate*`) — element slows down as it arrives; use for entrances.
 * - **EasyEase** (`curveEasyEase*`) — element eases in and out; use for positional transitions.
 * - **Linear** (`curveLinear`) — constant speed; use for opacity or color transitions.
 *
 * The `Max` / `Mid` / `Min` suffix controls the intensity of the curve.
 *
 * @example
 * ```ts
 * element.animate(keyframes, { easing: curves.curveDecelerateMax });
 * ```
 */
export const curves = {
  curveAccelerateMax: 'cubic-bezier(0.9,0.1,1,0.2)',
  curveAccelerateMid: 'cubic-bezier(1,0,1,1)',
  curveAccelerateMin: 'cubic-bezier(0.8,0,0.78,1)',
  curveDecelerateMax: 'cubic-bezier(0.1,0.9,0.2,1)',
  curveDecelerateMid: 'cubic-bezier(0,0,0,1)',
  curveDecelerateMin: 'cubic-bezier(0.33,0,0.1,1)',
  curveEasyEaseMax: 'cubic-bezier(0.8,0,0.2,1)',
  curveEasyEase: 'cubic-bezier(0.33,0,0.67,1)',
  curveLinear: 'cubic-bezier(0,0,1,1)',
} as const satisfies CurveTokens;

/**
 * The Fluent motion design tokens: durations and easing curves combined.
 *
 * ### Duration tokens
 *
 * Values are plain numbers in **milliseconds** (rather than CSS strings like `'200ms'`)
 * so they can be passed directly to the Web Animations API.
 *
 * ### Easing curve tokens
 *
 * Each value is a CSS `cubic-bezier()` string compatible with both the Web Animations API
 * (`KeyframeAnimationOptions.easing`) and CSS `animation-timing-function`.
 *
 * Curves are grouped by intent:
 * - **Accelerate** (`curveAccelerate*`) — element speeds up as it leaves; use for exits.
 * - **Decelerate** (`curveDecelerate*`) — element slows down as it arrives; use for entrances.
 * - **EasyEase** (`curveEasyEase*`) — element eases in and out; use for positional transitions.
 * - **Linear** (`curveLinear`) — constant speed; use for opacity or color transitions.
 *
 * The `Max` / `Mid` / `Min` suffix controls the intensity of the curve.
 *
 * @example
 * ```ts
 * element.animate(keyframes, {
 *   duration: motionTokens.durationNormal,
 *   easing: motionTokens.curveDecelerateMax,
 * });
 * ```
 */
export const motionTokens = {
  ...durations,
  ...curves,
};
