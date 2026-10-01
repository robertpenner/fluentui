import * as React from 'react';
import { render } from '@testing-library/react';
import { motionTokens } from '@fluentui/react-motion';
import { mockAnimation } from '../../testing/testUtils';
import { expectPresenceMotionFunction, expectPresenceMotionArray } from '../../testing/testUtils';
import { Scale, ScaleSnappy, ScaleRelaxed } from './Scale';

describe('Scale', () => {
  let originalAnimate: typeof HTMLElement.prototype.animate;
  let animateSpy: jest.Spied<typeof HTMLElement.prototype.animate>;
  const testElement = React.createElement('div', { 'data-testid': 'scale-content' }, 'Test');

  beforeAll(() => {
    originalAnimate = HTMLElement.prototype.animate;
    HTMLElement.prototype.animate = () => mockAnimation();
  });

  beforeEach(() => {
    animateSpy = jest.spyOn(HTMLElement.prototype, 'animate');
  });

  afterEach(() => {
    animateSpy.mockRestore();
  });

  afterAll(() => {
    HTMLElement.prototype.animate = originalAnimate;
  });

  it('plays explicit scale poses on mount without opacity', () => {
    render(React.createElement(Scale, { from: 0.8, to: 1.2, duration: 300, children: testElement }));

    expect(animateSpy).toHaveBeenCalledTimes(1);
    expect(animateSpy).toHaveBeenCalledWith(
      [{ scale: 0.8 }, { scale: 1.2 }],
      expect.objectContaining({ duration: 300 }),
    );
  });

  it('uses explicit poses and ordinary exit timing with a directional fade', () => {
    render(
      React.createElement(Scale.Out, {
        from: 0.8,
        to: 1.2,
        duration: 150,
        easing: 'ease-in',
        delay: 25,
        children: testElement,
      }),
    );

    expect(animateSpy).toHaveBeenCalledWith(
      [{ scale: 0.8 }, { scale: 1.2 }],
      expect.objectContaining({ duration: 150, easing: 'ease-in', delay: 25 }),
    );
    expect(animateSpy).toHaveBeenCalledWith(
      [{ opacity: 1 }, { opacity: 0 }],
      expect.objectContaining({ duration: 150, easing: 'ease-in', delay: 25 }),
    );
  });

  it.each([
    [{ from: 0 }, [0, 1]],
    [{ to: 0 }, [1, 0]],
  ])('resolves an omitted scale endpoint to 1 (%o)', (params, values) => {
    render(React.createElement(Scale, { ...params, children: testElement }));
    expect(animateSpy).toHaveBeenCalledTimes(1);
    expect(animateSpy).toHaveBeenCalledWith(
      values.map(scale => ({ scale })),
      expect.objectContaining({ duration: motionTokens.durationGentle }),
    );
  });

  it('allows custom Scale.In poses and fades in by default', () => {
    render(React.createElement(Scale.In, { from: 0.8, to: 1.2, children: testElement }));
    expect(animateSpy).toHaveBeenCalledWith([{ scale: 0.8 }, { scale: 1.2 }], expect.any(Object));
    expect(animateSpy).toHaveBeenCalledWith([{ opacity: 0 }, { opacity: 1 }], expect.any(Object));
  });

  it.each([Scale.In, Scale.Out])('can disable opacity on directional motions (%o)', Direction => {
    render(React.createElement(Direction, { from: 0.8, to: 1.2, animateOpacity: false, children: testElement }));
    expect(animateSpy).toHaveBeenCalledTimes(1);
    expect(animateSpy).toHaveBeenCalledWith([{ scale: 0.8 }, { scale: 1.2 }], expect.any(Object));
  });

  it.each([
    [ScaleSnappy, motionTokens.durationNormal, motionTokens.durationFast],
    [ScaleRelaxed, motionTokens.durationSlow, motionTokens.durationGentle],
  ])('retains one-way and exit timing defaults on variants (%o)', (Variant, duration, exitDuration) => {
    const { unmount } = render(React.createElement(Variant, { from: 0.8, to: 1.2, children: testElement }));
    expect(animateSpy).toHaveBeenLastCalledWith(
      [{ scale: 0.8 }, { scale: 1.2 }],
      expect.objectContaining({ duration }),
    );
    unmount();
    render(React.createElement(Variant.Out, { to: 0.8, animateOpacity: false, children: testElement }));
    expect(animateSpy).toHaveBeenLastCalledWith(
      [{ scale: 1 }, { scale: 0.8 }],
      expect.objectContaining({ duration: exitDuration }),
    );
  });

  it('allows explicit Out timing to override variant defaults', () => {
    render(
      React.createElement(ScaleSnappy.Out, {
        to: 0.8,
        duration: 321,
        easing: 'linear',
        delay: 0,
        animateOpacity: false,
        children: testElement,
      }),
    );
    expect(animateSpy).toHaveBeenLastCalledWith(
      [{ scale: 1 }, { scale: 0.8 }],
      expect.objectContaining({ duration: 321, easing: 'linear', delay: 0 }),
    );
  });

  it('stores its motion definition as a static function', () => {
    expectPresenceMotionFunction(Scale);
  });

  it('generates a motion definition from the static function', () => {
    expectPresenceMotionArray(Scale);
  });

  it('preserves the default scale poses and direction-specific timing', () => {
    const { rerender } = render(React.createElement(Scale, { visible: false, children: testElement }));

    rerender(React.createElement(Scale, { visible: true, children: testElement }));
    expect(animateSpy).toHaveBeenCalledWith(
      [{ scale: 0.9 }, { scale: 1 }],
      expect.objectContaining({ duration: motionTokens.durationGentle, easing: motionTokens.curveDecelerateMax }),
    );

    rerender(React.createElement(Scale, { visible: false, children: testElement }));
    expect(animateSpy).toHaveBeenCalledWith(
      [{ scale: 1 }, { scale: 0.9 }],
      expect.objectContaining({ duration: motionTokens.durationNormal, easing: motionTokens.curveAccelerateMax }),
    );
  });

  it('preserves custom scale poses and independent exit timing', () => {
    const params = {
      outScale: 0.5,
      inScale: 1.2,
      duration: 300,
      easing: 'ease-out',
      delay: 50,
      exitDuration: 150,
      exitEasing: 'ease-in',
      exitDelay: 25,
    };
    const { rerender } = render(React.createElement(Scale, { ...params, visible: false, children: testElement }));
    rerender(React.createElement(Scale, { ...params, visible: true, children: testElement }));
    expect(animateSpy).toHaveBeenCalledWith(
      [{ scale: 0.5 }, { scale: 1.2 }],
      expect.objectContaining({ duration: 300, easing: 'ease-out', delay: 50 }),
    );

    rerender(React.createElement(Scale, { ...params, visible: false, children: testElement }));
    expect(animateSpy).toHaveBeenCalledWith(
      [{ scale: 1.2 }, { scale: 0.5 }],
      expect.objectContaining({ duration: 150, easing: 'ease-in', delay: 25 }),
    );
  });
});
