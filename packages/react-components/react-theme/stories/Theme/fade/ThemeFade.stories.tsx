import React, { useCallback, useState } from 'react';
import { Fade } from './Fade';
// import { Dialog } from '../../../../react-dialog/src/Dialog';
// import {
//   Dialog,
//   DialogTrigger,
//   DialogSurface,
//   DialogTitle,
//   DialogBody,
//   DialogActions,
//   DialogContent,
//   Button,
// } from '@fluentui/react-components';

export const FadeDemo = () => {
  const [visible, setVisible] = useState(false);
  const [fadeState, setFadeState] = useState('exited');
  const caption = visible ? 'Hide' : 'Show';
  return (
    <div>
      <div>STATE: {fadeState}</div>

      <button onClick={() => setVisible(!visible)}>{caption}</button>
      <Fade in={visible} duration={1000} onStateChange={setFadeState}>
        <h2 style={{ backgroundColor: 'lightgrey', borderRadius: '10px', padding: '10px', display: 'inline-block' }}>
          CONTENT
        </h2>
      </Fade>
    </div>
  );
};

/*

<Dialog>
  <DialogTrigger disableButtonEnhancement>
    <Button>Open dialog</Button>
  </DialogTrigger>
  <DialogSurface>
    <DialogBody>
      <DialogTitle>Dialog title</DialogTitle>
      <DialogContent>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam exercitationem cumque repellendus
        eaque est dolor eius expedita nulla ullam? Tenetur reprehenderit aut voluptatum impedit voluptates in
        natus iure cumque eaque?
      </DialogContent>
      <DialogActions>
        <DialogTrigger disableButtonEnhancement>
          <Button appearance="secondary">Close</Button>
        </DialogTrigger>
        <Button appearance="primary">Do Something</Button>
      </DialogActions>
    </DialogBody>
  </DialogSurface>
</Dialog>

*/
