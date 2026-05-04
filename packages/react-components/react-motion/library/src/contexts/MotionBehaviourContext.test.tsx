import { render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import * as React from 'react';

import { MotionBehaviourProvider, useMotionBehaviourContext } from './MotionBehaviourContext';

describe('useMotionBehaviourContext', () => {
  it('returns "default" when no provider is present', () => {
    const { result } = renderHook(() => useMotionBehaviourContext());
    expect(result.current).toBe('default');
  });

  it('returns "default" when provider value is "default"', () => {
    const { result } = renderHook(() => useMotionBehaviourContext(), {
      wrapper: ({ children }: { children?: React.ReactNode }) => (
        <MotionBehaviourProvider value="default">{children}</MotionBehaviourProvider>
      ),
    });
    expect(result.current).toBe('default');
  });

  it('returns "skip" when provider value is "skip"', () => {
    const { result } = renderHook(() => useMotionBehaviourContext(), {
      wrapper: ({ children }: { children?: React.ReactNode }) => (
        <MotionBehaviourProvider value="skip">{children}</MotionBehaviourProvider>
      ),
    });
    expect(result.current).toBe('skip');
  });

  it('reflects updated provider value when it changes', () => {
    const TestConsumer: React.FC = () => {
      const value = useMotionBehaviourContext();
      return <span data-testid="result">{value}</span>;
    };

    const { getByTestId, rerender } = render(
      <MotionBehaviourProvider value="default">
        <TestConsumer />
      </MotionBehaviourProvider>,
    );
    expect(getByTestId('result').textContent).toBe('default');

    rerender(
      <MotionBehaviourProvider value="skip">
        <TestConsumer />
      </MotionBehaviourProvider>,
    );
    expect(getByTestId('result').textContent).toBe('skip');

    rerender(
      <MotionBehaviourProvider value="default">
        <TestConsumer />
      </MotionBehaviourProvider>,
    );
    expect(getByTestId('result').textContent).toBe('default');
  });

  it('uses the nearest provider value when providers are nested', () => {
    const { result } = renderHook(() => useMotionBehaviourContext(), {
      wrapper: ({ children }: { children?: React.ReactNode }) => (
        <MotionBehaviourProvider value="default">
          <MotionBehaviourProvider value="skip">{children}</MotionBehaviourProvider>
        </MotionBehaviourProvider>
      ),
    });
    expect(result.current).toBe('skip');
  });

  it('inner provider can override outer "skip" with "default"', () => {
    const { result } = renderHook(() => useMotionBehaviourContext(), {
      wrapper: ({ children }: { children?: React.ReactNode }) => (
        <MotionBehaviourProvider value="skip">
          <MotionBehaviourProvider value="default">{children}</MotionBehaviourProvider>
        </MotionBehaviourProvider>
      ),
    });
    expect(result.current).toBe('default');
  });
});
