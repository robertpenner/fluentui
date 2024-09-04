import { motionTokens, type PresenceMotionFnCreator, createPresenceComponent } from '@fluentui/react-motion';

const { durationNormal, durationSlower, durationUltraSlow, curveEasyEase } = motionTokens;

/** Define a presence motion for collapse/expand */
const createToastCollapseMotionFn: PresenceMotionFnCreator<
  {
    enterHeightDuration?: number;
    enterOpacityDuration?: number;
    exitHeightDuration?: number;
    exitOpacityDuration?: number;
    enterEasing?: string;
    exitEasing?: string;
    enterDelay?: number;
    exitDelay?: number;
  },
  { animateOpacity?: boolean; collapseMargin?: boolean; collapsePadding?: boolean }
> =
  ({
    enterHeightDuration = durationNormal,
    enterOpacityDuration = durationSlower,
    exitHeightDuration = durationNormal,
    exitOpacityDuration = durationSlower,
    enterDelay = durationNormal,
    exitDelay = durationSlower,
    enterEasing = curveEasyEase,
    exitEasing = curveEasyEase,
  } = {}) =>
  ({ element, animateOpacity = true, collapseMargin = false, collapsePadding = false }) => {
    const fromOpacity = animateOpacity ? 0 : 1;
    const toOpacity = 1;
    const fromHeight = 0; // Possible future custom param, for collapsing to a specific height.
    const toHeight = `${element.scrollHeight}px`;

    // Setting height to zero does not eliminate margin or padding, so allow collapsing those as well.
    const collapsedWhiteSpace = {
      marginTop: collapseMargin ? 0 : undefined,
      marginBottom: collapseMargin ? 0 : undefined,
      paddingTop: collapsePadding ? 0 : undefined,
      paddingBottom: collapsePadding ? 0 : undefined,
    };

    return {
      enter: [
        // Expand height first
        {
          keyframes: [
            {
              maxHeight: fromHeight,
              opacity: fromOpacity,
              ...collapsedWhiteSpace,
            },
            { maxHeight: toHeight, offset: 0.9999 },
            { maxHeight: 'unset' },
          ],
          duration: enterHeightDuration,
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
          keyframes: [{ opacity: toOpacity }, { opacity: fromOpacity }],
          duration: exitOpacityDuration,
          easing: exitEasing,
        },
        // Collapse height after a delay
        {
          delay: exitDelay,
          keyframes: [{ maxHeight: toHeight }, { maxHeight: fromHeight, ...collapsedWhiteSpace }],
          duration: exitHeightDuration,
          easing: exitEasing,
        },
      ],
    };
  };

/** A React component that applies collapse/expand transitions to its children. */
export const DelayedCollapse = createPresenceComponent(createToastCollapseMotionFn());

export const DelayedCollapseExaggerated = createPresenceComponent(
  createToastCollapseMotionFn({
    enterHeightDuration: durationSlower,
    enterOpacityDuration: durationUltraSlow,
    exitHeightDuration: durationSlower,
    exitOpacityDuration: durationUltraSlow,
  }),
);
