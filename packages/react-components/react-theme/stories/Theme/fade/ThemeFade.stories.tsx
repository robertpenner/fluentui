import React, { useState } from 'react';
import { Fade } from './Fade';

export const FadeDemo = () => {
  const [visible, setVisible] = useState(false);
  const [transitionState, setTransitionState] = useState('exited');
  const caption = visible ? 'Hide' : 'Show';
  return (
    <div>
      <div>STATE: {transitionState}</div>

      <button onClick={() => setVisible(!visible)}>{caption}</button>
      <Fade visible={visible} duration={1000} onState={setTransitionState}>
        <h2 style={{ backgroundColor: 'lightgrey', borderRadius: '10px', padding: '10px', display: 'inline-block' }}>
          CONTENT
        </h2>
      </Fade>
    </div>
  );
};

export const FadeDemoRenderProp = () => {
  const [visible, setVisible] = useState(false);
  const caption = visible ? 'Hide' : 'Show';
  return (
    <div>
      <button onClick={() => setVisible(!visible)}>{caption}</button>
      <Fade visible={visible} duration={1000}>
        {transitionState => (
          <>
            <div>STATE: {transitionState}</div>

            <h2
              style={{ backgroundColor: 'lightgrey', borderRadius: '10px', padding: '10px', display: 'inline-block' }}
            >
              CONTENT
            </h2>
          </>
        )}
      </Fade>
    </div>
  );
};

// export const TransitionDemoRenderProp = () => {
//   const [visible, setVisible] = useState(false);
//   const caption = visible ? 'Hide' : 'Show';
//   return (
//     <div>
//       <button onClick={() => setVisible(!visible)}>{caption}</button>
//       <Fade visible={visible} duration={1000}>
//         {transitionState => (
//           <>
//             <div>STATE: {transitionState}</div>

//             <h2
//               style={{ backgroundColor: 'lightgrey', borderRadius: '10px', padding: '10px', display: 'inline-block' }}
//             >
//               CONTENT
//             </h2>
//           </>
//         )}
//       </Fade>
//     </div>
//   );
// };
