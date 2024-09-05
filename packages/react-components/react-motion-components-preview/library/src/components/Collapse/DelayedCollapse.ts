import { motionTokens, type PresenceMotionFnCreator, createPresenceComponent } from '@fluentui/react-motion';

const { durationNormal, durationSlower, durationUltraSlow, curveEasyEase } = motionTokens;

type Orientation = 'horizontal' | 'vertical';

/**
 * Creates a motion function for a collapse presence,
 * which defines enter and exit transitions for an element,
 * governing size (width or height) and opacity.
 *
 * @param params - Motion parameters for customizing the generated motion function:
 *
 * - `enterSizeDuration` (optional): The duration of the size animation when entering. Defaults to `durationNormal`.
 * - `enterOpacityDuration` (optional): The duration of the opacity animation when entering. Defaults to `durationSlower`.
 * - `exitSizeDuration` (optional): The duration of the size animation when exiting. Defaults to `enterSizeDuration`.
 * - `exitOpacityDuration` (optional): The duration of the opacity animation when exiting. Defaults to `enterOpacityDuration`.
 * - `enterDelay` (optional): The delay before the enter animation starts. Defaults to `0`.
 * - `exitDelay` (optional): The delay before the exit animation starts. Defaults to `0`.
 * - `enterEasing` (optional): The easing function for the enter animation. Defaults to `curveEasyEase`.
 * - `exitEasing` (optional): The easing function for the exit animation. Defaults to `curveEasyEase`.
 *
 * The motion function returned by `createDelayedCollapseMotionFn` accepts an options object with the following properties:
 * - `element`: The element to animate.
 * - `orientation` (optional): The orientation of the animation. Defaults to `'vertical'`.
 * - `animateOpacity` (optional): Whether to animate the opacity. Defaults to `true`.
 * - `collapseMargin` (optional): Whether to collapse the margin. Defaults to `true`.
 * - `collapsePadding` (optional): Whether to collapse the padding. Defaults to `true`.
 *
 * @returns The motion function.
 */
const createDelayedCollapseMotionFn: PresenceMotionFnCreator<
  {
    enterSizeDuration?: number;
    enterOpacityDuration?: number;

    /** Defaults to enterSizeDuration */
    exitSizeDuration?: number;

    /** Defaults to enterOpacityDuration */
    exitOpacityDuration?: number;

    /** Defaults to enterSizeDuration */
    enterDelay?: number;

    /** Defaults to exitOpacityDuration */
    exitDelay?: number;
    enterEasing?: string;
    exitEasing?: string;
  },
  { orientation?: Orientation; animateOpacity?: boolean; collapseMargin?: boolean; collapsePadding?: boolean }
> =
  ({
    // duration
    enterSizeDuration = durationNormal * 1,
    enterOpacityDuration = durationSlower * 1,
    exitSizeDuration = enterSizeDuration,
    exitOpacityDuration = enterOpacityDuration,
    // delay
    enterDelay = 0 * enterSizeDuration,
    exitDelay = 0 * exitOpacityDuration,
    // easing
    enterEasing = curveEasyEase,
    exitEasing = curveEasyEase,
  } = {}) =>
  ({ element, orientation = 'horizontal', animateOpacity = true, collapseMargin = !true, collapsePadding = !true }) => {
    const fromOpacity = animateOpacity ? 0 : 1;
    const toOpacity = 1;
    // "size" is the width or height of the element, depending on the orientation.
    const fromSize = '0'; // Possible future custom param, for collapsing to a width or height.
    const measuredSize = orientation === 'horizontal' ? element.scrollWidth : element.scrollHeight;
    const toSize = `${measuredSize}px`;
    const sizeName = orientation === 'horizontal' ? 'maxWidth' : 'maxHeight';
    const overflowName = orientation === 'horizontal' ? 'overflowX' : 'overflowY';
    const overflow = 'hidden';

    // Setting height to zero does not eliminate margin or padding, so allow collapsing those as well.
    // TODO: rename to be agnostic to orientation
    const collapsedWhiteSpace = {
      marginTop: collapseMargin ? 0 : undefined,
      marginBottom: collapseMargin ? 0 : undefined,
      paddingTop: collapsePadding ? 0 : undefined,
      paddingBottom: collapsePadding ? 0 : undefined,
    };

    return {
      enter: [
        // Expand size (width or height) first
        {
          keyframes: [
            {
              [sizeName]: fromSize,
              // opacity: fromOpacity,
              overflow,
              ...collapsedWhiteSpace,
            },
            { [sizeName]: toSize, offset: 0.9999, overflow },
            { [sizeName]: 'unset', overflow: 'unset' },
          ],
          duration: enterSizeDuration,
          easing: enterEasing,
        },
        // Fade in after a delay
        {
          delay: enterDelay,
          keyframes: [{ opacity: fromOpacity }, { opacity: toOpacity }],
          duration: enterOpacityDuration,
          easing: enterEasing,
          fill: 'both',
        },
      ],

      exit: [
        // Fade out first
        {
          keyframes: [
            { opacity: toOpacity, overflow },
            { opacity: fromOpacity, overflow },
          ],
          duration: exitOpacityDuration,
          easing: exitEasing,
        },
        // Collapse size (width or height) after a delay
        {
          delay: exitDelay,
          keyframes: [
            { [sizeName]: toSize, overflow },
            { [sizeName]: fromSize, overflow, ...collapsedWhiteSpace },
          ],
          duration: exitSizeDuration,
          easing: exitEasing,
          fill: 'both',
        },
      ],
    };
  };

/** A React component that applies collapse/expand transitions to its children. */
export const DelayedCollapse = createPresenceComponent(createDelayedCollapseMotionFn());

export const DelayedCollapseExaggerated = createPresenceComponent(
  createDelayedCollapseMotionFn({
    enterSizeDuration: durationSlower,
    enterOpacityDuration: durationUltraSlow,
    exitSizeDuration: durationSlower,
    exitOpacityDuration: durationUltraSlow,
  }),
);
