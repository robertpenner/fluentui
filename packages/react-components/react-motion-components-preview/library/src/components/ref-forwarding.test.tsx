import * as React from 'react';
import { render } from '@testing-library/react';
import { Fade } from './Fade/Fade';
import { Scale } from './Scale/Scale';

describe('Motion Component Ref Forwarding', () => {
  it('should forward refs in nested motion components', () => {
    const outerRef = React.createRef<HTMLDivElement>();
    const innerRef = React.createRef<HTMLButtonElement>();

    render(
      <Fade ref={outerRef} visible appear>
        <div>
          <Scale ref={innerRef} visible appear>
            <button>Nested Content</button>
          </Scale>
        </div>
      </Fade>
    );

    // The outer ref should point to the div
    expect(outerRef.current).toBeInstanceOf(HTMLDivElement);
    expect(outerRef.current?.textContent).toBe('Nested Content');

    // The inner ref should point to the button
    expect(innerRef.current).toBeInstanceOf(HTMLButtonElement);
    expect(innerRef.current?.textContent).toBe('Nested Content');
  });

  it('should work with single motion component and ref', () => {
    const ref = React.createRef<HTMLSpanElement>();

    render(
      <Fade ref={ref} visible appear>
        <span>Single Content</span>
      </Fade>
    );

    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    expect(ref.current?.textContent).toBe('Single Content');
  });

  it('should work with deeply nested motion components', () => {
    const ref1 = React.createRef<HTMLDivElement>();
    const ref2 = React.createRef<HTMLSpanElement>();
    const ref3 = React.createRef<HTMLButtonElement>();

    render(
      <Fade ref={ref1} visible appear>
        <div>
          <Scale ref={ref2} visible appear>
            <span>
              <Fade ref={ref3} visible appear>
                <button>Deep Content</button>
              </Fade>
            </span>
          </Scale>
        </div>
      </Fade>
    );

    expect(ref1.current).toBeInstanceOf(HTMLDivElement);
    expect(ref2.current).toBeInstanceOf(HTMLSpanElement);
    expect(ref3.current).toBeInstanceOf(HTMLButtonElement);
    expect(ref3.current?.textContent).toBe('Deep Content');
  });
});
