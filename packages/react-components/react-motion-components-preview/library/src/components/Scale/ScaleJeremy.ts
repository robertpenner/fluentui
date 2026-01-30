import { motionTokens, createPresenceComponent } from '@fluentui/react-motion';
import { scaleAtom, fadeAtom } from '@fluentui/react-motion-components-preview';

const enter = [
  scaleAtom({
    direction: 'enter',
    duration: motionTokens.durationSlow, // 300 ms,
    easing: motionTokens.curveDecelerateMin,
    outScale: 0.9,
  }),
  fadeAtom({
    direction: 'enter',
    delay: motionTokens.durationNormal, // 200 ms
    duration: motionTokens.durationFaster, // 100 ms
    easing: motionTokens.curveLinear,
  }),
];

// TODO: confirm exit timing with Jeremy
const exit = [
  scaleAtom({
    direction: 'exit',
    duration: motionTokens.durationSlow, // 300 ms
    easing: motionTokens.curveAccelerateMin,
    outScale: 0.9,
  }),
  fadeAtom({
    direction: 'exit',
    delay: motionTokens.durationNormal, // 200 ms
    duration: motionTokens.durationFaster, // 100 ms
    easing: motionTokens.curveLinear,
  }),
];

const motionAtoms = {
  enter,
  exit,
};

export const ScaleJeremy = createPresenceComponent(motionAtoms);
