/* eslint-disable @typescript-eslint/no-deprecated */
import * as React from 'react';
import { render } from '@testing-library/react';
import { useConstCallback } from './useConstCallback';
import { validateHookValueNotChanged } from './testUtilities';

describe('useConstCallback', () => {
  validateHookValueNotChanged('returns the same callback', () => [useConstCallback(() => 'hi')]);

  it('does not call the callback', () => {
    const callback = jest.fn(() => 'hi');
    const TestComponent: React.FunctionComponent = () => {
      const cb = useConstCallback(callback);
      expect(cb).toHaveBeenCalledTimes(0);
      return <div>{cb()}</div>;
    };
    render(<TestComponent />);
  });
});
