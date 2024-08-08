import { createPresenceComponent } from '@fluentui/react-motion';

export const ToastContainerMotion = createPresenceComponent(({ element }) => ({
  enter: [
    {
      keyframes: [
        { marginTop: 0, minHeight: 0, maxHeight: 0, opacity: 0 },
        { marginTop: '16px', minHeight: 44, maxHeight: `${element.scrollHeight}px`, opacity: 0 },
      ],
      duration: 200,
    },
    {
      keyframes: [{ opacity: 0 }, { opacity: 1 }],
      delay: 200,
      duration: 400,
    },
  ],

  exit: [
    {
      keyframes: [
        { marginTop: '16px', minHeight: 44, maxHeight: `${element.scrollHeight}px` },
        { marginTop: 0, minHeight: 0, maxHeight: 0 },
      ],
      delay: 400,
      duration: 200,
    },
    {
      keyframes: [{ opacity: 1 }, { opacity: 0 }],
      duration: 400,
    },
  ],
}));

// export const ToastContainerMotion2 = createPresenceComponentVariant(Collapse, {
//   enter: { duration: motionTokens.durationSlow, easing: motionTokens.curveEasyEaseMax },
//   exit: { duration: motionTokens.durationNormal, easing: motionTokens.curveEasyEaseMax },
// });
