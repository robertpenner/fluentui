import { type AtomMotion, MotionElement } from '../motion-element.js';

/**
 * A Fade-in component that animates opacity from 0 to 1 when connected.
 *
 * @tag fluent-fade-in
 * @public
 */
export class FadeIn extends MotionElement {
  /**
   * The motion configuration for fade-in animation
   * @protected
   */
  protected motionDef: AtomMotion = {
    keyframes: [{ opacity: 0 }, { opacity: 1 }],
    duration: 1000,
    easing: 'ease-in-out',
    fill: 'both',
  };
}

// Register the FadeIn component as a custom element
customElements.define('fluent-fade-in', FadeIn);
