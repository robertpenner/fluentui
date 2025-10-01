import { type AtomMotion, MotionElement } from '../motion-element.js';

/**
 * A Fade-out component that animates opacity from 1 to 0 when connected.
 *
 * @tag fluent-fade-out
 * @public
 */
export class FadeOut extends MotionElement {
  /**
   * The motion configuration for fade-out animation
   * @protected
   */
  protected motionDef: AtomMotion = {
    keyframes: [{ opacity: 1 }, { opacity: 0 }],
    duration: 1000,
    easing: 'ease-in-out',
    fill: 'both',
  };
}

// Register the FadeOut component as a custom element
customElements.define('fluent-fade-out', FadeOut);
