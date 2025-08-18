import { PresenceComponentProps, PresenceDirection } from '@fluentui/react-motion/src/index';
import * as React from 'react';
import type { StaggerMode } from './stagger-utils';

/**
 * Props for the Stagger component that manages staggered entrance and exit animations.
 */

export interface StaggerProps {
  /** React elements to animate. Elements are cloned with animation props. */
  children: React.ReactNode;

  /** Controls children animation direction: `true` for enter, `false` for exit. Defaults to `false`. */
  visible?: PresenceComponentProps['visible'];

  /** Whether to reverse the stagger sequence (last item animates first). Defaults to `false`. */
  reversed?: boolean; // run sequence backward (defaults to false)

  /** Milliseconds between each child's animation start. Defaults to 100ms. */
  itemDelay?: number;

  /** Milliseconds each child's animation lasts. Defaults to 200ms. */
  itemDuration?: number;

  /** How children's visibility is managed. If undefined, auto-detects based on children. */
  mode?: StaggerMode;

  /** Callback invoked when the staggered animation sequence completes. */
  onMotionFinish?: () => void;
}

export interface StaggerOneWayProps extends Omit<StaggerProps, 'visible'> {
  /** Animation direction: 'enter' or 'exit'. */
  direction: PresenceDirection;
}
