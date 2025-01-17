/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { MessageBarGroupState, MessageBarGroupSlots } from './MessageBarGroup.types';
import { PresenceGroup } from '@fluentui/react-motion';
import { MessageBarMotion } from './MessageBarGroup.motions';
// import { Fade, Scale, ScaleRelaxed, CollapseRelaxed, CollapseDelayed } from '@fluentui/react-motion-components-preview';

/**
 * Render the final JSX of MessageBarGroup
 */
export const renderMessageBarGroup_unstable = (state: MessageBarGroupState) => {
  assertSlots<MessageBarGroupSlots>(state);

  return (
    <state.root>
      <PresenceGroup>
        {state.children.map(child => (
          <MessageBarMotion key={child.key} animate={state.animate}>
            <div>{child}</div>
          </MessageBarMotion>
        ))}
      </PresenceGroup>
    </state.root>
  );
};

/*

<MessageBarMotion key={child.key} animate={state.animate}>
  <div>{child}</div>
</MessageBarMotion>

<CollapseDelayed key={child.key}>
  <div>{child}</div>
</CollapseDelayed>

*/
