/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
// import * as React from 'react';

import { assertSlots } from '@fluentui/react-utilities';
import type { AccordionPanelState, AccordionPanelSlots } from './AccordionPanel.types';
// import { Collapse, durations, curves } from '@fluentui/react-motions-preview';
// import { Collapse, curves } from '@fluentui/react-motions-preview';
import { Collapse } from '@fluentui/react-motions-preview';

const MotionFC = Collapse;

// const MotionFC: React.FC<{ visible: boolean }> = ({ visible, children, ...otherProps }) =>
//   Collapse({ visible, children, override: { all: { duration: 200, easing: curves.curveAccelerateMid } } });

// TODO: allow the motion to be injected and enable that from Storybook
// TODO: unify this open/close duration with the header's chevron rotation duration
// const motionDuration = durations.durationNormal;
// const enterEasing = curves.curveDecelerateMid;
// const exitEasing = curves.curveDecelerateMid;

/**
 * Function that renders the final JSX of the component
 */
export const renderAccordionPanel_unstable = (state: AccordionPanelState) => {
  assertSlots<AccordionPanelSlots>(state);

  // TODO: read the motion from the context

  // Wrap child content in a Collapse transition which manages show/hide
  return (
    // <Collapse
    //   visible={state.open}
    //   override={{
    //     all: { duration: motionDuration },
    //     enter: { easing: enterEasing },
    //     exit: { easing: exitEasing },
    //   }}
    // >
    <MotionFC visible={state.open}>
      <state.root>{state.root.children}</state.root>
    </MotionFC>
  );
};
