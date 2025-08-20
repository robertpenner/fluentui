import { PresenceComponentProps, PresenceDirection } from '@fluentui/react-motion';
import * as React from 'react';

/**
 * Defines how Stagger manages its children's visibility.
 * - 'mount': Children are mounted/unmounted from DOM based on visibility
 * - 'presence': Children are presence components with visible prop (always present in DOM, but shown/hidden by the presence itself)
 * - 'visibilityStyle': Children remain in DOM with inline style visibility: hidden/visible (preserves layout space)
 */
export type StaggerMode = 'mount' | 'presence' | 'visibilityStyle';

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
