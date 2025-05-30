import '@testing-library/jest-dom';
import * as React from 'react';
import { create } from '@fluentui/test-utilities';
import { render, screen, fireEvent, act } from '@testing-library/react';

import { SpinButton } from './SpinButton';
import { KeyCodes, resetIds } from '../../Utilities';
import { mockEvent } from '../../common/testUtilities';
import { isConformant } from '../../common/isConformant';
import type { ISpinButton } from './SpinButton.types';

describe('SpinButton', () => {
  let ref: React.RefObject<ISpinButton>;

  /**
   * Verify the value of the input field and related properties.
   * @param value - Current committed value of the SpinButton
   * @param intermediateValue - If the test is simulating editing the SpinButton's text, and the
   * edit hasn't been committed yet, this is the current value of the input field (which won't
   * be reflected as ref.current.value yet).
   */
  function verifyValue(value: string, intermediateValue?: string) {
    expect(ref.current!.value).toBe(value);

    const inputDOM = screen.getByRole('spinbutton') as HTMLInputElement;
    expect(inputDOM.value).toBe(intermediateValue ?? value);

    // These don't update until editing is complete
    const isNumeric = !!value && !isNaN(Number(value));

    // aria-valuetext is used for values with suffixes or empty
    expect(inputDOM.getAttribute('aria-valuetext')).toBe(isNumeric ? null : value);
  }

  function getButton(button: 'up' | 'down') {
    const buttonElements = screen.getAllByRole('button');
    const className = button === 'up' ? 'ms-UpButton' : 'ms-DownButton';
    const buttonDOM = buttonElements.find(node => node.classList.contains(className))!;

    expect(buttonDOM.tagName).toBe('BUTTON');
    return buttonDOM;
  }

  /**
   * Simulate a single press of an arrow button. If `expectedValue` is provided, verify the result.
   */
  function simulateArrowButton(button: 'up' | 'down', expectedValue?: string) {
    const buttonDOM = getButton(button);

    fireEvent.mouseDown(buttonDOM, { type: 'mousedown', clientX: 0, clientY: 0 });
    fireEvent.mouseUp(buttonDOM, { type: 'mouseup', clientX: 0, clientY: 0 });

    if (typeof expectedValue === 'string') {
      verifyValue(expectedValue);
    }
  }

  /**
   * Simulate a single press of an arrow key. If `expectedValue` is provided, verify the result.
   */
  function simulateArrowKey(which: KeyCodes, expectedValue?: string) {
    const inputDOM = screen.getByRole('spinbutton');

    fireEvent.keyDown(inputDOM, { which, keyCode: which });
    fireEvent.keyUp(inputDOM, { which, keyCode: which });

    if (typeof expectedValue === 'string') {
      verifyValue(expectedValue);
    }
  }

  /**
   * Simulate text entry and verify the result is as expected (before and after commit).
   * @param enteredValue - Value(s) to simulate entering in the field. If an array is given,
   * each one will be entered separately (without committing) and the intermediate state of the
   * field will be verified.
   * @param expectedValue - Resulting committed value, if different. This would happen if
   * `enteredValue` is invalid and is corrected.
   */
  function simulateInput(enteredValue: string | string[], expectedValue?: string) {
    const inputDOM = screen.getByRole('spinbutton') as HTMLInputElement;
    const oldValue = inputDOM.value;

    fireEvent.focus(inputDOM);

    const enteredValues = typeof enteredValue === 'string' ? [enteredValue] : enteredValue;
    for (const value of enteredValues) {
      fireEvent.input(inputDOM, mockEvent(value));
      // Verify the intermediate value is correctly handled
      verifyValue(oldValue, value);
    }

    fireEvent.blur(inputDOM);
    // Verify the committed value is correctly handled
    verifyValue(expectedValue ?? enteredValues.slice(-1)[0]);
  }

  beforeEach(() => {
    ref = React.createRef<ISpinButton>();
    resetIds();
  });

  afterEach(() => {
    if ((setTimeout as any).mock) {
      jest.useRealTimers();
    }
  });

  isConformant({
    Component: SpinButton,
    displayName: 'SpinButton',
  });

  describe('snapshots', () => {
    it('renders correctly', () => {
      const component = create(<SpinButton min={0} max={100} label="label" />);
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('renders correctly with user-provided values', () => {
      const component = create(
        <SpinButton min={0} max={100} label="label" value="0" ariaValueText="0 pt" data-test="test" />,
      );
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('basic props', () => {
    it('respects label', () => {
      render(<SpinButton label="my label" />);

      const input = screen.getByRole('spinbutton');
      const label = screen.getByText('my label');

      expect(label).toBeInTheDocument();
      expect(label).toHaveAttribute('for', input.id);
      expect(input).toHaveAttribute('aria-labelledby', label.id);
    });

    it('leaves min and max unset by default', () => {
      render(<SpinButton />);

      const input = screen.getByRole('spinbutton');

      expect(input).not.toHaveAttribute('aria-valuemin');
      expect(input).not.toHaveAttribute('aria-valuemax');
    });

    it('respects min', () => {
      render(<SpinButton min={-1} />);

      const input = screen.getByRole('spinbutton');

      expect(input).toHaveAttribute('aria-valuemin', '-1');
      expect(input).not.toHaveAttribute('aria-valuemax');
    });

    it('respects max', () => {
      render(<SpinButton max={22} />);

      const input = screen.getByRole('spinbutton');

      expect(input).not.toHaveAttribute('aria-valuemin');
      expect(input).toHaveAttribute('aria-valuemax', '22');
    });

    it('respects custom ariaDescribedBy id to the input', () => {
      const customId = 'customAriaDescriptionId';
      render(<SpinButton label="label" ariaDescribedBy={customId} />);

      const input = screen.getByRole('spinbutton');

      expect(input).toHaveAttribute('aria-describedby', customId);
    });
  });

  describe('value props', () => {
    it('respects defaultValue', () => {
      render(<SpinButton componentRef={ref} defaultValue="12" />);

      verifyValue('12');
    });

    it('respects empty defaultValue', () => {
      render(<SpinButton componentRef={ref} defaultValue="" />);

      verifyValue('');
    });

    // This is probably a behavior we should get rid of in the future (replace with custom rendering
    // or something), but documenting it for now...
    it('respects non-numeric defaultValue', () => {
      render(<SpinButton componentRef={ref} defaultValue="12 pt" />);

      verifyValue('12 pt');
    });

    it('ignores updates to defaultValue', () => {
      const onChange = jest.fn();
      const onValidate = jest.fn();
      const { rerender } = render(
        <SpinButton componentRef={ref} defaultValue="3" onChange={onChange} onValidate={onValidate} />,
      );

      expect(ref.current!.value).toBe('3');
      expect((screen.getByRole('spinbutton') as HTMLInputElement).value).toBe('3');

      rerender(<SpinButton componentRef={ref} defaultValue="4" onChange={onChange} onValidate={onValidate} />);

      expect(ref.current!.value).toBe('3');
      expect((screen.getByRole('spinbutton') as HTMLInputElement).value).toBe('3');

      // these are only called on user updates, not prop updates
      expect(onChange).not.toHaveBeenCalled();
      expect(onValidate).not.toHaveBeenCalled();
    });

    // It's somewhat debatable whether this is the correct behavior (documenting for now)
    it('respects defaultValue even if invalid', () => {
      render(<SpinButton componentRef={ref} value="-1" min={0} max={100} />);

      verifyValue('-1');
    });

    it('respects value', () => {
      render(<SpinButton componentRef={ref} value="3" />);

      verifyValue('3');
    });

    it('respects updates to value', () => {
      const onChange = jest.fn();
      const onValidate = jest.fn();
      const { rerender } = render(
        <SpinButton componentRef={ref} value="3" onChange={onChange} onValidate={onValidate} />,
      );

      expect(ref.current!.value).toBe('3');
      expect((screen.getByRole('spinbutton') as HTMLInputElement).value).toBe('3');

      rerender(<SpinButton componentRef={ref} value="4" onChange={onChange} onValidate={onValidate} />);

      expect(ref.current!.value).toBe('4');
      expect((screen.getByRole('spinbutton') as HTMLInputElement).value).toBe('4');

      // these are only called on user updates, not prop updates
      expect(onChange).not.toHaveBeenCalled();
      expect(onValidate).not.toHaveBeenCalled();
    });

    // This is probably a behavior we should get rid of in the future (replace with custom rendering
    // or something), but documenting it for now...
    it('respects non-numeric value', () => {
      render(<SpinButton componentRef={ref} value="12 pt" />);

      verifyValue('12 pt');
    });

    it('respects empty value', () => {
      render(<SpinButton componentRef={ref} value="" />);

      verifyValue('');
    });

    // Per standard fully controlled behavior, props.value should NOT be validated
    it('respects value even if invalid', () => {
      render(<SpinButton componentRef={ref} value="-1" min={0} max={100} />);

      verifyValue('-1');
    });

    it('uses min as default if neither value nor defaultValue is provided', () => {
      render(<SpinButton componentRef={ref} min={2} />);

      verifyValue('2');
    });

    it('uses 0 as default if neither value, defaultValue nor min is provided', () => {
      render(<SpinButton componentRef={ref} />);

      verifyValue('0');
    });
  });

  describe('increment and decrement', () => {
    it('increments value when up button is pressed', () => {
      const onChange = jest.fn();
      render(<SpinButton componentRef={ref} defaultValue="12" onChange={onChange} />);

      simulateArrowButton('up', '13');
      // There was a bug where going twice didn't work
      simulateArrowButton('up', '14');
      expect(onChange).toHaveBeenCalledTimes(2);
      expect(onChange.mock.calls[1][1]).toBe('14');
    });

    it('decrements value when down button is pressed', () => {
      const onChange = jest.fn();
      render(<SpinButton componentRef={ref} defaultValue="12" onChange={onChange} />);

      simulateArrowButton('down', '11');
      simulateArrowButton('down', '10');
      expect(onChange).toHaveBeenCalledTimes(2);
      expect(onChange.mock.calls[1][1]).toBe('10');
    });

    it('does not go above max when up button is pressed', () => {
      const onChange = jest.fn();
      render(<SpinButton componentRef={ref} defaultValue="12" max={12} onChange={onChange} />);

      simulateArrowButton('up', '12');
      expect(onChange).not.toHaveBeenCalled(); // shouldn't call onChange if value didn't change
    });

    it('does not go below min when down button is pressed', () => {
      const onChange = jest.fn();
      render(<SpinButton componentRef={ref} defaultValue="12" min={12} onChange={onChange} />);

      simulateArrowButton('down', '12');
      expect(onChange).not.toHaveBeenCalled(); // shouldn't call onChange if value didn't change
    });

    it('increments value when up arrow key is pressed', () => {
      const onChange = jest.fn();
      render(<SpinButton componentRef={ref} defaultValue="12" onChange={onChange} />);

      simulateArrowKey(KeyCodes.up, '13');
      simulateArrowKey(KeyCodes.up, '14');
      expect(onChange).toHaveBeenCalledTimes(2);
      expect(onChange.mock.calls[1][1]).toBe('14');
    });

    it('decrements value when down arrow key is pressed', () => {
      const onChange = jest.fn();
      render(<SpinButton componentRef={ref} defaultValue="12" onChange={onChange} />);

      simulateArrowKey(KeyCodes.down, '11');
      simulateArrowKey(KeyCodes.down, '10');
      expect(onChange).toHaveBeenCalledTimes(2);
      expect(onChange.mock.calls[1][1]).toBe('10');
    });

    it('does not go above max when up arrow is pressed', () => {
      const onChange = jest.fn();
      render(<SpinButton componentRef={ref} defaultValue="12" max={12} onChange={onChange} />);

      simulateArrowKey(KeyCodes.up, '12');
      expect(onChange).not.toHaveBeenCalled(); // shouldn't call onChange if value didn't change
    });

    it('does not go below min when down arrow is pressed', () => {
      const onChange = jest.fn();
      render(<SpinButton componentRef={ref} defaultValue="12" min={12} onChange={onChange} />);

      simulateArrowKey(KeyCodes.down, '12');
      expect(onChange).not.toHaveBeenCalled(); // shouldn't call onChange if value didn't change
    });

    it('respects step when incrementing value', () => {
      render(<SpinButton componentRef={ref} defaultValue="12" step={2} />);

      simulateArrowKey(KeyCodes.up, '14');
      simulateArrowKey(KeyCodes.up, '16');
    });

    it('respects step when decrementing value', () => {
      render(<SpinButton componentRef={ref} defaultValue="12" step={2} />);

      simulateArrowKey(KeyCodes.down, '10');
      simulateArrowKey(KeyCodes.down, '8');
    });

    it('does not step out of bounds', () => {
      // In this case incrementing or decrementing by the full step takes the value out of bounds.
      // The update should still be respected but clamped within valid range.
      const onChange = jest.fn();
      render(<SpinButton componentRef={ref} defaultValue="12" step={2} min={11} max={12} onChange={onChange} />);

      simulateArrowKey(KeyCodes.down, '11');
      expect(onChange).toHaveBeenCalledTimes(1);
      // onChange is called with the clamped value
      expect(onChange.mock.calls[0][1]).toBe('11');

      simulateArrowKey(KeyCodes.up, '12');
      expect(onChange).toHaveBeenCalledTimes(2);
      expect(onChange.mock.calls[1][1]).toBe('12');
    });

    it('can step below 0 if min is unspecified', () => {
      render(<SpinButton componentRef={ref} />);

      simulateArrowKey(KeyCodes.down, '-1');
    });

    it('supports decimal steps', () => {
      render(<SpinButton componentRef={ref} step={0.1} />);

      simulateArrowButton('up', '0.1');
      simulateArrowButton('up', '0.2');
    });

    it('allows stepping when no props are defined', () => {
      render(<SpinButton componentRef={ref} />);

      simulateArrowButton('up', '1');
      simulateArrowKey(KeyCodes.up, '2');
    });
  });

  describe('editing value', () => {
    it('allows value updates when no props are defined', () => {
      const onChange = jest.fn();
      render(<SpinButton componentRef={ref} onChange={onChange} />);

      simulateInput('7');
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange.mock.calls[0][1]).toBe('7');
    });

    it('accepts user-entered values when uncontrolled', () => {
      render(<SpinButton componentRef={ref} defaultValue="12" />);

      simulateInput(['21', '22', '7']);
    });

    // This is the same as the previous test, but wanted to separately call out onChange behavior:
    // it should only be called for committed/validated values
    it('does not call onChange for intermediate values', () => {
      const onChange = jest.fn();
      render(<SpinButton componentRef={ref} defaultValue="12" onChange={onChange} />);

      simulateInput(['21', '22', '7']);
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange.mock.calls[0][1]).toBe('7');
    });

    it('accepts entering 0', () => {
      const onChange = jest.fn();
      render(<SpinButton componentRef={ref} defaultValue="12" onChange={onChange} />);

      simulateInput('0');
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange.mock.calls[0][1]).toBe('0');
    });

    it('accepts empty intermediate values', () => {
      render(<SpinButton componentRef={ref} defaultValue="12" />);

      // The important part here is that the empty string is respected as an intermediate value
      // (simulateInput will verify this for each value), not immediately replaced with the
      // previous value or some other default.
      simulateInput(['', '3']);
    });

    it('does not commit user-entered values when controlled', () => {
      const onChange = jest.fn();
      render(<SpinButton componentRef={ref} value="12" onChange={onChange} />);

      // The intermediate values 21, 22, 7 will all be shown in the field before commit (blur),
      // but on blur it will go back to the previous value since onChange didn't trigger a prop update
      simulateInput(['21', '22', '7'], '12');
      expect(onChange).toHaveBeenCalledTimes(1); // onChange is still called
      expect(onChange.mock.calls[0][1]).toBe('7');
    });

    it('resets value when user entry is invalid', () => {
      const onChange = jest.fn();
      render(<SpinButton componentRef={ref} defaultValue="12" onChange={onChange} />);

      // resets after garbage value
      simulateInput('garbage', '12');
      expect(onChange).not.toHaveBeenCalled();

      // does NOT reset after intermediate garbage value followed (before blur) by valid value
      simulateInput(['garbages', '8']);
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange.mock.calls[0][1]).toBe('8');
    });

    it('uses last known good value when stepping from invalid value via buttons', () => {
      render(<SpinButton componentRef={ref} defaultValue="0" />);
      jest.useFakeTimers();

      const inputDOM = screen.getByRole('spinbutton');

      fireEvent.focus(inputDOM);
      fireEvent.input(inputDOM, mockEvent('2 2'));

      simulateArrowButton('up');
      act(() => {
        jest.runOnlyPendingTimers();
      });

      verifyValue('1');
    });

    it('uses last known good value when stepping from invalid value via keyboard', () => {
      render(<SpinButton componentRef={ref} defaultValue="1" />);
      jest.useFakeTimers();

      const inputDOM = screen.getByRole('spinbutton');

      fireEvent.focus(inputDOM);
      fireEvent.input(inputDOM, mockEvent('garbage'));

      simulateArrowKey(KeyCodes.down);
      act(() => {
        jest.runOnlyPendingTimers();
      });

      verifyValue('0');
    });

    it('resets value when input is cleared (empty)', () => {
      const onChange = jest.fn();
      render(<SpinButton componentRef={ref} defaultValue="12" onChange={onChange} />);

      simulateInput('', '12');
      expect(onChange).not.toHaveBeenCalled();
    });

    it('resets to max when user-entered value is too high', () => {
      const onChange = jest.fn();
      render(<SpinButton componentRef={ref} min={2} max={22} defaultValue="12" onChange={onChange} />);

      simulateInput('23', '22');
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange.mock.calls[0][1]).toBe('22');
    });

    it('resets to min when user-entered value is too low', () => {
      const onChange = jest.fn();
      render(<SpinButton componentRef={ref} min={2} max={22} defaultValue="12" onChange={onChange} />);

      simulateInput('0', '2');
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange.mock.calls[0][1]).toBe('2');
    });

    it('resets to latest valid value if garbage is typed after valid updates', () => {
      const onChange = jest.fn();
      render(<SpinButton componentRef={ref} defaultValue="2" onChange={onChange} />);

      simulateArrowButton('up', '3');

      simulateInput('garbage', '3');
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange.mock.calls[0][1]).toBe('3');
    });

    // Not sure if this behavior is correct. Adding a test to document it for now, but we
    // could consider changing it later (to round user input as well as steps).
    it('does not round user input even if precision is 0', () => {
      render(<SpinButton componentRef={ref} step={1} precision={0} />);

      simulateInput('1.7', '1.7');
    });
  });

  describe('custom handlers', () => {
    it('uses onBlur prop', () => {
      const onBlur = jest.fn();
      render(<SpinButton componentRef={ref} onBlur={onBlur} />);

      simulateInput('10');
      expect(onBlur).toHaveBeenCalledTimes(1);
    });

    it('uses onFocus prop', () => {
      const onFocus = jest.fn();
      render(<SpinButton componentRef={ref} onFocus={onFocus} />);

      simulateInput('10');
      expect(onFocus).toHaveBeenCalledTimes(1);
    });

    it('uses onValidate prop (with valid input)', () => {
      const min = 2;
      const max = 22;

      const onChange = jest.fn();
      const onValidate = jest.fn((newValue: string): string | void => {
        const numberValue: number = +newValue;
        if (!isNaN(numberValue) && numberValue >= min && numberValue <= max) {
          return newValue;
        }
      });

      render(
        <SpinButton
          componentRef={ref}
          min={min}
          max={max}
          defaultValue="12"
          onValidate={onValidate}
          onChange={onChange}
        />,
      );

      simulateInput('21');
      expect(onValidate).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledTimes(1);
    });

    it('uses onValidate prop (with invalid input)', () => {
      const min = 2;
      const max = 22;

      const onChange = jest.fn();
      const onValidate = jest.fn((newValue: string): string | void => {
        const numberValue: number = +newValue;
        if (!isNaN(numberValue) && numberValue >= min && numberValue <= max) {
          return newValue;
        }
      });

      render(
        <SpinButton
          componentRef={ref}
          min={min}
          max={max}
          defaultValue="12"
          onValidate={onValidate}
          onChange={onChange}
        />,
      );

      simulateInput('100', '12');
      expect(onValidate).toHaveBeenCalledTimes(1);
      expect(onChange).not.toHaveBeenCalled();
    });

    it('calls onChange with value modified by onValidate', () => {
      const onChange = jest.fn();
      const onValidate = jest.fn(() => '5');

      render(<SpinButton componentRef={ref} defaultValue="12" onValidate={onValidate} onChange={onChange} />);

      simulateInput('10', '5');
      expect(onValidate).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange.mock.calls[0][1]).toBe('5');
    });

    it('uses custom onIncrement handler', () => {
      const onIncrement: jest.Mock = jest.fn((newValue: string) => {
        // Increment on first call and do nothing on second call
        return onIncrement.mock.calls.length === 1 ? String(+newValue + 1) : undefined;
      });
      const onChange = jest.fn();

      render(<SpinButton componentRef={ref} defaultValue="2" onIncrement={onIncrement} onChange={onChange} />);

      simulateArrowButton('up', '3');
      expect(onIncrement).toHaveBeenCalledTimes(1);
      expect(onIncrement).toHaveBeenLastCalledWith('2');
      expect(onChange).toHaveBeenCalledTimes(1);

      simulateArrowButton('up', '3'); // value doesn't change since handler returns undefined
      expect(onIncrement).toHaveBeenCalledTimes(2);
      expect(onIncrement).toHaveBeenLastCalledWith('3');
      expect(onChange).toHaveBeenCalledTimes(1); // onChange isn't called since value didn't change
    });

    it('uses custom onDecrement handler', () => {
      const onDecrement: jest.Mock = jest.fn((newValue: string) => {
        // Decrement on first call and do nothing on second call
        return onDecrement.mock.calls.length === 1 ? String(+newValue - 1) : undefined;
      });
      const onChange = jest.fn();

      render(<SpinButton componentRef={ref} defaultValue="2" onDecrement={onDecrement} onChange={onChange} />);

      simulateArrowButton('down', '1');
      expect(onDecrement).toHaveBeenCalledTimes(1);
      expect(onDecrement).toHaveBeenLastCalledWith('2');
      expect(onChange).toHaveBeenCalledTimes(1);

      simulateArrowButton('down', '1'); // value doesn't change since handler returns undefined
      expect(onDecrement).toHaveBeenCalledTimes(2);
      expect(onDecrement).toHaveBeenLastCalledWith('1');
      expect(onChange).toHaveBeenCalledTimes(1); // onChange isn't called since value didn't change
    });
  });

  describe('edge cases', () => {
    it('validates when enter key is pressed', () => {
      const onChange = jest.fn();
      let keyCode: number | undefined;
      const onValidate = jest.fn((value: string, event?: React.SyntheticEvent) => {
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        keyCode = (event as React.KeyboardEvent).which;
        return value;
      });

      render(<SpinButton componentRef={ref} onValidate={onValidate} onChange={onChange} />);

      // input text => no handlers called yet
      const inputDOM = screen.getByRole('spinbutton');
      fireEvent.focus(inputDOM);
      fireEvent.input(inputDOM, mockEvent('99'));
      expect(onChange).not.toHaveBeenCalled();
      expect(onValidate).not.toHaveBeenCalled();

      // press enter => handlers called, value updated
      fireEvent.keyDown(inputDOM, { which: KeyCodes.enter, keyCode: KeyCodes.enter });
      expect(onValidate).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(keyCode).toBe(KeyCodes.enter);
      verifyValue('99');

      // blur => don't call handlers again
      fireEvent.blur(inputDOM);
      expect(onValidate).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledTimes(1);
    });

    it('does not call onValidate again on enter key press until the input changes', () => {
      const onChange = jest.fn();
      const onValidate = jest.fn((value: string) => value);

      render(<SpinButton componentRef={ref} onValidate={onValidate} onChange={onChange} />);

      // input text, press enter => handlers called
      const inputDOM = screen.getByRole('spinbutton');
      fireEvent.focus(inputDOM);
      fireEvent.input(inputDOM, mockEvent('99'));
      fireEvent.keyDown(inputDOM, { which: KeyCodes.enter, keyCode: KeyCodes.enter });
      expect(onValidate).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledTimes(1);

      // press enter again without modifications => don't call handlers again
      fireEvent.keyDown(inputDOM, { which: KeyCodes.enter, keyCode: KeyCodes.enter });
      expect(onValidate).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledTimes(1);

      // input more text, press enter => handlers called
      fireEvent.input(inputDOM, mockEvent('10'));
      fireEvent.keyDown(inputDOM, { which: KeyCodes.enter, keyCode: KeyCodes.enter });
      expect(onValidate).toHaveBeenCalledTimes(2);
      expect(onChange).toHaveBeenCalledTimes(2);
      verifyValue('10');
    });

    it('continues spinning until mouseUp', () => {
      jest.useFakeTimers();

      const onIncrement = jest.fn(value => String(+value + 1));
      const onChange = jest.fn();

      render(<SpinButton componentRef={ref} onIncrement={onIncrement} onChange={onChange} />);

      const buttonDOM = screen.getAllByRole('button').find(node => node.classList.contains('ms-UpButton'))!;

      // start spinning (component will re-render after act() call)
      act(() => {
        fireEvent.mouseDown(buttonDOM, { type: 'mousedown', clientX: 0, clientY: 0 });
      });
      expect(onIncrement).toHaveBeenCalledTimes(1);
      expect(onIncrement).toHaveBeenLastCalledWith('0');
      expect(onChange).toHaveBeenCalledTimes(1); // called on every spin

      // spin again (at one point subsequent spins were broken)
      act(() => {
        jest.runOnlyPendingTimers();
      });
      expect(onIncrement).toHaveBeenCalledTimes(2);
      expect(onIncrement).toHaveBeenLastCalledWith('1');
      expect(onChange).toHaveBeenCalledTimes(2);

      fireEvent.mouseUp(buttonDOM, { type: 'mouseup', clientX: 0, clientY: 0 });
      jest.runAllTimers();

      verifyValue('2');
      expect(onChange).toHaveBeenCalledTimes(2);
    });

    it('stops spinning if text field is focused while actively spinning', () => {
      jest.useFakeTimers();

      render(<SpinButton componentRef={ref} />);

      const inputDOM = screen.getByRole('spinbutton');
      const buttonDOM = screen.getAllByRole('button').find(node => node.classList.contains('ms-UpButton'))!;

      // start spinning (component will re-render after act() call)
      act(() => {
        fireEvent.mouseDown(buttonDOM, { type: 'mousedown', clientX: 0, clientY: 0 });
      });
      // spin again
      act(() => {
        jest.runOnlyPendingTimers();
      });

      fireEvent.focus(inputDOM);
      jest.runAllTimers();

      verifyValue('2');
    });

    it('handles full controlled scenario', () => {
      const onChange = jest.fn();
      const WrappedSpinButton = () => {
        const [value, setValue] = React.useState('12');
        onChange.mockImplementation((ev: any, newValue?: string) => {
          if (Number(newValue) < 20) {
            setValue(newValue || '');
          }
        });
        return <SpinButton componentRef={ref} value={value} onChange={onChange} />;
      };

      render(<WrappedSpinButton />);

      // onChange won't do an update based on this value, so the control won't update
      simulateInput('30', '12');
      expect(onChange).toHaveBeenCalledTimes(1);

      // this one is accepted
      simulateInput('19');
      expect(onChange).toHaveBeenCalledTimes(2);
    });

    it('handles props.value updates while editing', () => {
      const onChange = jest.fn();
      const { rerender } = render(<SpinButton componentRef={ref} value="12" onChange={onChange} />);

      // enter a new value but don't commit yet
      const inputDOM = screen.getByRole('spinbutton');
      fireEvent.focus(inputDOM);
      fireEvent.input(inputDOM, mockEvent('10'));
      verifyValue('12', '10');

      // update props.value to original value => intermediate value preserved
      rerender(<SpinButton componentRef={ref} value="12" onChange={onChange} />);
      verifyValue('12', '10');

      // update props.value to different value => intermediate value cleared
      rerender(<SpinButton componentRef={ref} value="13" onChange={onChange} />);
      verifyValue('13');

      fireEvent.blur(inputDOM);
      verifyValue('13');
      expect(onChange).not.toHaveBeenCalled();
    });

    it('handles arrow button press while editing', () => {
      jest.useFakeTimers();

      const onChange = jest.fn();
      const onBlur = jest.fn();
      render(<SpinButton componentRef={ref} defaultValue="1" onChange={onChange} onBlur={onBlur} />);

      // enter a new value but don't commit yet (not using the helper here because we don't want to blur)
      const inputDOM = screen.getByRole('spinbutton');
      fireEvent.focus(inputDOM);
      fireEvent.input(inputDOM, mockEvent('5'));
      verifyValue('1', '5');
      expect(onChange).not.toHaveBeenCalled();
      expect(onBlur).not.toHaveBeenCalled();

      // press an arrow button--the real sequence of events in the browser is button mousedown,
      // input blur, button focus, but we unfortunately have to simulate that in the test
      const buttonDOM = getButton('up');
      fireEvent.mouseDown(buttonDOM, {
        type: 'mousedown',
        clientX: 0,
        clientY: 0,
      } as any);
      // simulate the blur event which will cause the text edit to be committed
      fireEvent.blur(inputDOM);
      expect(onBlur).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange.mock.calls[0][1]).toBe('5');
      fireEvent.focus(buttonDOM);
      verifyValue('5');

      // now verify that the spin was triggered
      act(() => {
        jest.runOnlyPendingTimers();
      });
      expect(onChange).toHaveBeenCalledTimes(2);
      expect(onChange.mock.calls[1][1]).toBe('6');
      verifyValue('6');

      // spin again to be sure it worked
      act(() => {
        jest.runOnlyPendingTimers();
      });
      expect(onChange).toHaveBeenCalledTimes(3);
      expect(onChange.mock.calls[2][1]).toBe('7');
      verifyValue('7');

      fireEvent.mouseUp(buttonDOM, { type: 'mouseup', clientX: 0, clientY: 0 });
      jest.runAllTimers();

      verifyValue('7');
      expect(onChange).toHaveBeenCalledTimes(3);
    });

    // This must be tested separately since there's an important difference in internal handling
    // compared to the arrow buttons
    it('handles arrow key press while editing', () => {
      jest.useFakeTimers();

      const onChange = jest.fn();
      render(<SpinButton componentRef={ref} defaultValue="1" onChange={onChange} />);

      // enter a new value but don't commit yet (not using the helper here because we don't want keyup)
      const inputDOM = screen.getByRole('spinbutton');
      fireEvent.focus(inputDOM);
      fireEvent.input(inputDOM, mockEvent('5'));
      verifyValue('1', '5');
      expect(onChange).not.toHaveBeenCalled();

      // press an arrow key
      fireEvent.keyDown(inputDOM, { which: KeyCodes.up, keyCode: KeyCodes.up });
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange.mock.calls[0][1]).toBe('5');
      verifyValue('5');

      // now verify that the spin was triggered
      act(() => {
        jest.runOnlyPendingTimers();
      });
      expect(onChange).toHaveBeenCalledTimes(2);
      expect(onChange.mock.calls[1][1]).toBe('6');
      verifyValue('6');

      // spin again
      fireEvent.keyDown(inputDOM, { which: KeyCodes.up, keyCode: KeyCodes.up });
      expect(onChange).toHaveBeenCalledTimes(3);
      expect(onChange.mock.calls[2][1]).toBe('7');
      verifyValue('7');

      fireEvent.keyUp(inputDOM, { which: KeyCodes.up, keyCode: KeyCodes.up });
      jest.runAllTimers();

      verifyValue('7');
      expect(onChange).toHaveBeenCalledTimes(3);
    });
  });
});
