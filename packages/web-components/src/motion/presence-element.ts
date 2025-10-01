/**
 * Configuration for a single motion animation (enter or exit)
 */
export type AtomMotion = { keyframes: Keyframe[] } & KeyframeEffectOptions;

/**
 * Configuration for presence motion with both enter and exit animations
 */
export type PresenceMotion = {
  enter: AtomMotion;
  exit: AtomMotion;
};

/**
 * Base class for presence motion components that can animate in and out based on a visible attribute.
 * This class extends HTMLElement to provide a lightweight base for motion elements that focus purely on animation behavior.
 *
 * @public
 */
export abstract class PresenceElement extends HTMLElement {
  /**
   * The current running animation
   * @internal
   */
  private _currentAnimation: Animation | null = null;

  /**
   * Internal visible state
   * @internal
   */
  private _visible: boolean = false;

  /**
   * The motion configuration for this presence element
   * Must be implemented by derived classes
   * @protected
   */
  protected abstract presenceMotion: PresenceMotion;

  /**
   * Specify which attributes to observe for changes
   * @internal
   */
  static get observedAttributes(): string[] {
    return ['visible'];
  }

  /**
   * Controls the visibility and triggers enter/exit animations
   * @public
   */
  get visible(): boolean {
    return this._visible;
  }

  set visible(value: boolean) {
    const newValue = Boolean(value);
    if (newValue === this._visible) return;

    this._visible = newValue;
    this.setAttribute('visible', String(newValue));
    this._playAnimation();
  }

  /**
   * Called when the element is connected to the DOM
   * @public
   */
  connectedCallback(): void {
    // Initialize based on the visible attribute state
    if (!this.hasAttribute('visible') || this.getAttribute('visible') !== 'true') {
      this._visible = false;
      this._applyExitState();
    } else {
      this._visible = true;
      this._playAnimation();
    }
  }

  /**
   * Called when the element is disconnected from the DOM
   * @public
   */
  disconnectedCallback(): void {
    this._cancelCurrentAnimation();
  }

  /**
   * Called when an observed attribute changes
   * @param name - The attribute name
   * @param oldValue - The old value
   * @param newValue - The new value
   * @internal
   */
  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void {
    if (name === 'visible' && oldValue !== newValue) {
      this._visible = newValue === 'true';
      this._playAnimation();
    }
  }

  /**
   * Plays the appropriate animation based on the current visible state
   * @private
   */
  private _playAnimation(): void {
    this._cancelCurrentAnimation();

    const motion = this.visible ? this.presenceMotion.enter : this.presenceMotion.exit;
    const { keyframes, ...options } = motion;

    // Apply default fill = 'forwards' unless overridden
    const waOptions: KeyframeEffectOptions = { fill: 'forwards', ...options };

    this._currentAnimation = this.animate(keyframes, waOptions);
  }

  /**
   * Cancels the currently running animation
   * @private
   */
  private _cancelCurrentAnimation(): void {
    if (this._currentAnimation) {
      this._currentAnimation.cancel();
      this._currentAnimation = null;
    }
  }

  /**
   * Applies the final state of the exit animation immediately (start invisible)
   * @private
   */
  private _applyExitState(): void {
    const exitKeyframes = this.presenceMotion.exit.keyframes;
    if (exitKeyframes.length > 0) {
      const finalFrame = exitKeyframes[exitKeyframes.length - 1];
      Object.assign(this.style, finalFrame);
    }
  }
}
