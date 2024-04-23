export { motionTokens, durations, curves } from './motions/motionTokens';

export { createMotionComponent } from './factories/createMotionComponent';
export { createPresenceComponent } from './factories/createPresenceComponent';

export { PresenceGroup } from './components/PresenceGroup';

export type { AtomMotion, AtomMotionFn, PresenceMotion, PresenceMotionFn, MotionImperativeRef } from './types';

// export { Collapse } from './motions/presence/components/Collapse';
export { Collapse2 as Collapse } from './motions/presence/components/Collapse2';
export { Fade } from './motions/presence/components/Fade';
export { Scale } from './motions/presence/components/Scale';
