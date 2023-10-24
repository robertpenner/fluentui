import React, { useState } from 'react';
import { CardPreview } from '@fluentui/react-components';

import { Fade, ScaleFade } from './Fade';

// const textContent = (
//   <h2 style={{ backgroundColor: 'lightgrey', borderRadius: '10px', padding: '10px', display: 'inline-block' }}>
//     CONTENT
//   </h2>
// );

const resolveAsset = (asset: string) => {
  const ASSET_URL =
    'https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-card/stories/assets/';

  return `${ASSET_URL}${asset}`;
};

const content = (
  <CardPreview logo={<img src={resolveAsset('docx.png')} alt="Microsoft Word logo" />}>
    <img src={resolveAsset('doc_template.png')} alt="Preview of a Word document " />
  </CardPreview>
);

export const FadeDemo = () => {
  const [visible, setVisible] = useState(false);
  const [transitionState, setTransitionState] = useState('exited');
  const caption = visible ? 'Hide' : 'Show';
  return (
    <div>
      <div>STATE: {transitionState}</div>

      <button onClick={() => setVisible(!visible)}>{caption}</button>
      <Fade visible={visible} onState={setTransitionState}>
        {content}
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
      <Fade visible={visible}>
        {transitionState => (
          <>
            <div>STATE: {transitionState}</div>

            {content}
          </>
        )}
      </Fade>
    </div>
  );
};

export const ScaleFadeDemo = () => {
  const [visible, setVisible] = useState(false);
  const caption = visible ? 'Hide' : 'Show';

  return (
    <div>
      <button onClick={() => setVisible(!visible)}>{caption}</button>

      <ScaleFade visible={visible}>{content}</ScaleFade>
    </div>
  );
};
