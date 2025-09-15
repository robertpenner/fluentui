import * as React from 'react';
import { Fade } from '../Fade/Fade';
import { Scale } from '../Scale/Scale';

/**
 * Example demonstrating ref forwarding with nested motion components
 */
export const NestedMotionExample: React.FC = () => {
  const fadeRef = React.useRef<HTMLDivElement>(null);
  const scaleRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    // You can now access the DOM elements directly
    if (fadeRef.current) {
      console.log('Fade component div:', fadeRef.current);
    }
    if (scaleRef.current) {
      console.log('Scale component button:', scaleRef.current);
    }
  }, []);

  const handleClick = () => {
    // Direct DOM manipulation is now possible
    if (scaleRef.current) {
      scaleRef.current.focus();
      scaleRef.current.style.border = '2px solid blue';
      setTimeout(() => {
        if (scaleRef.current) {
          scaleRef.current.style.border = '';
        }
      }, 1000);
    }
  };

  return (
    <div>
      <h3>Nested Motion Components with Ref Forwarding</h3>
      
      {/* Single motion component with ref */}
      <Fade ref={fadeRef} visible appear>
        <div style={{ padding: '20px', background: '#f0f0f0', margin: '10px' }}>
          Fade container (ref attached to this div)
          
          {/* Nested motion component with ref */}
          <Scale ref={scaleRef} visible appear>
            <button 
              onClick={handleClick}
              style={{ 
                padding: '10px 20px', 
                background: '#007acc', 
                color: 'white', 
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                margin: '10px'
              }}
            >
              Scale button (ref attached to this button)
            </button>
          </Scale>
        </div>
      </Fade>

      {/* Deeply nested example */}
      <Fade visible appear>
        <div style={{ padding: '20px', background: '#ffe6e6', margin: '10px' }}>
          <Scale visible appear>
            <div style={{ padding: '10px', background: '#e6f3ff' }}>
              <Fade visible appear>
                <span style={{ fontWeight: 'bold' }}>
                  Deeply nested: Fade → Scale → Fade
                </span>
              </Fade>
            </div>
          </Scale>
        </div>
      </Fade>
    </div>
  );
};
