import { PresenceElement, type PresenceMotion } from '../presence-element.js';

/**
 * A Fade presence component that animates opacity changes.
 * Provides smooth fade in/out animations when the visible attribute changes.
 *
 * @tag fluent-fade
 * @public
 */
export class Fade extends PresenceElement {
  /**
   * The motion configuration for fade animations
   * @protected
   */
  protected presenceMotion: PresenceMotion = {
    enter: {
      keyframes: [{ opacity: 0 }, { opacity: 1 }],
      duration: 1000,
      easing: 'linear',
      fill: 'both',
    },
    exit: {
      keyframes: [{ opacity: 1 }, { opacity: 0 }],
      duration: 1000,
      easing: 'linear',
      fill: 'both',
    },
  };
}

// Register the Fade component as a custom element
customElements.define('fluent-fade', Fade);
