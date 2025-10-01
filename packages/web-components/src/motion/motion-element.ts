/**
 * Configuration for a single motion animation
 */
export type AtomMotion = { keyframes: Keyframe[] } & KeyframeEffectOptions;

/**
 * Base class for simple motion components that play an animation once when connected.
 * This class extends HTMLElement to provide a lightweight base for motion elements that focus purely on animation behavior.
 *
 * @public
 */
export abstract class MotionElement extends HTMLElement {
  /**
   * The current running animation
   * @internal
   */
  private _animation: Animation | null = null;

  /**
   * The motion configuration for this element
   * Must be implemented by derived classes
   * @protected
   */
  protected abstract motionDef: AtomMotion;

  /**
   * Called when the element is connected to the DOM
   * Starts the animation automatically
   * @public
   */
  connectedCallback(): void {
    // Destructure out keyframes and pass the rest as WAAPI options
    const { keyframes, ...options } = this.motionDef;
    // Apply default fill = 'forwards' unless overridden
    const waOptions: KeyframeEffectOptions = { fill: 'forwards', ...options };
    this._animation = this.animate(keyframes, waOptions);
  }

  /**
   * Called when the element is disconnected from the DOM
   * Cancels any running animation
   * @public
   */
  disconnectedCallback(): void {
    if (this._animation) {
      this._animation.cancel();
      this._animation = null;
    }
  }
}
