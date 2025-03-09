import type { EnterExit, MotionParam } from '../types';
import { MOTION_DEFINITION, createPresenceComponent, PresenceComponent } from './createPresenceComponent';

export function createPresenceComponentVariant<PresenceParams extends Record<string, EnterExit<MotionParam>> = {}>(
  component: PresenceComponent<PresenceParams>,
  variantParams: Partial<PresenceParams>,
): typeof component {
  const originalFn = component[MOTION_DEFINITION];
  // The variant params become new defaults, but they can still be be overridden by runtime params.
  const variantFn: typeof originalFn = runtimeParams => originalFn({ ...variantParams, ...runtimeParams });
  return createPresenceComponent(variantFn);
}
