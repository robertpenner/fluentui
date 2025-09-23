export type AtomMotion = { keyframes: Keyframe[] } & KeyframeEffectOptions;

export function createMotionElement(tagName: string, motionDef: AtomMotion): void {
  if (customElements.get(tagName)) return;

  class MotionElement extends HTMLElement {
    private _animation: Animation | null = null;

    connectedCallback(): void {
      // Destructure out keyframes and pass the rest as WAAPI options
      const { keyframes, ...options } = motionDef;
      // apply default fill = 'forwards' unless overridden
      const waOptions: KeyframeEffectOptions = { fill: 'forwards', ...options };
      this._animation = this.animate(keyframes, waOptions);
    }

    disconnectedCallback(): void {
      if (this._animation) {
        this._animation.cancel();
        this._animation = null;
      }
    }
  }

  customElements.define(tagName, MotionElement);
}

/*
EXAMPLE USAGE

import './style.css';
import { createMotionElement } from './createMotionElement';

// Fade-in
createMotionElement('fluent-fade-in', {
  keyframes: [{ opacity: 0 }, { opacity: 1 }],
  duration: 1000,
  easing: 'ease-in-out',
  fill: 'both',
});

// Fade-out
createMotionElement('fluent-fade-out', {
  keyframes: [{ opacity: 1 }, { opacity: 0 }],
  duration: 1000,
  easing: 'ease-in-out',
  fill: 'both',
});

*/
