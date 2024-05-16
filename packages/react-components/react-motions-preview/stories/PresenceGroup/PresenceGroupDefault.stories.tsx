import {
  makeStyles,
  Button,
  Dropdown,
  Option,
  Persona,
  shorthands,
  // tokens,
  MessageBar,
  MessageBarTitle,
  MessageBarBody,
  useId,
} from '@fluentui/react-components';
import { AddRegular, DeleteRegular } from '@fluentui/react-icons';
// import { createPresenceComponent, motionTokens, PresenceGroup, Collapse } from '@fluentui/react-motions-preview';
import {
  PresenceGroup,
  Collapse,
  CollapseExaggerated,
  CollapseSnappy,
  Scale,
  Fade,
} from '@fluentui/react-motions-preview';
import * as React from 'react';
import { users as allUsers } from './users';

const motionOptions = {
  Collapse,
  ['CollapseExaggerated']: CollapseExaggerated,
  ['CollapseSnappy']: CollapseSnappy,
  ['Scale']: Scale,
  ['Fade']: Fade,
};

type MotionName = keyof typeof motionOptions;

const useClasses = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',

    // ...shorthands.gap('10px'),

    // ...shorthands.border(tokens.strokeWidthThicker, 'solid', tokens.colorNeutralForeground3),
    // ...shorthands.borderRadius(tokens.borderRadiusMedium),
    // borderTopRightRadius: 0,
    ...shorthands.padding('10px'),
  },
  controls: {
    display: 'flex',

    ...shorthands.gap('10px'),

    // ...shorthands.border(tokens.strokeWidthThicker, 'solid', tokens.colorNeutralForeground3),
    // ...shorthands.borderBottom('none'),
    // borderTopLeftRadius: tokens.borderRadiusMedium,
    // borderTopRightRadius: tokens.borderRadiusMedium,
    ...shorthands.padding('10px'),

    // alignSelf: 'end',
  },
});

// const ItemMotion = Collapse;

// const ItemMotion = createPresenceComponent({
//   enter: {
//     keyframes: [
//       { opacity: 0, transform: 'scaleY(0) translateX(-30px)', height: 0 },
//       { opacity: 1, transform: 'scaleY(1) translateX(0)', height: '40px' },
//     ],
//     easing: motionTokens.curveEasyEase,
//     duration: motionTokens.durationUltraSlow,
//   },
//   exit: {
//     keyframes: [
//       { opacity: 1, transform: 'scaleY(1) translateX(0)', height: '40px' },
//       { opacity: 0, transform: 'scaleY(0) translateX(-30px)', height: 0 },
//     ],
//     easing: motionTokens.curveEasyEase,
//     duration: motionTokens.durationUltraSlow,
//   },
// });

export const PresenceGroupDefault = () => {
  const comboId = useId('combo-variant');
  const classes = useClasses();
  const [availableUsers, setAvailableUsers] = React.useState([...allUsers]);
  const [users, setUsers] = React.useState(availableUsers.slice(0, 3));
  // const [limit, setLimit] = React.useState(3);
  const [motionName, setMotionName] = React.useState<MotionName>(Object.keys(motionOptions)[0] as MotionName);
  const ItemMotion = motionOptions[motionName];

  console.log('### users:', users);

  const addUser = React.useCallback(() => {
    console.log('### addUser - availableUsers, users:', availableUsers, users);
    // Find the next user index
    // const nextUserIndex = allUsers.length - users.length;
    // Grab the next available user
    const newUser = availableUsers[availableUsers.length - 1];
    // Insert at a random position
    setUsers(_users => {
      const insertionIndex = Math.floor(Math.random() * (_users.length + 1));
      return [..._users.slice(0, insertionIndex), newUser, ..._users.slice(insertionIndex)];
    });
    // Remove the user from the end of the available list
    setAvailableUsers(_availableUsers => _availableUsers.slice(0, -1));
  }, [users, setUsers, availableUsers, setAvailableUsers]);

  const removeUser = React.useCallback(() => {
    setUsers(_users => {
      // TODO: add a removal button on each item
      // Choose a random user
      const removalIndex = Math.floor(Math.random() * _users.length);
      const userToRemove = _users[removalIndex];
      // Add the user back to the available list
      setAvailableUsers(_availableUsers => [..._availableUsers, userToRemove]);
      // Remove the user from the list
      return [..._users.slice(0, removalIndex), ..._users.slice(removalIndex + 1)];
    });
  }, [setUsers]);

  return (
    <>
      <div className={classes.container}>
        <div className={classes.controls}>
          <Button
            appearance="primary"
            // disabled={limit + 1 === users.length}
            icon={<AddRegular />}
            onClick={addUser}
            size="small"
          >
            Add user
          </Button>
          <Button disabled={users.length === 0} icon={<DeleteRegular />} onClick={removeUser} size="small">
            Remove user
          </Button>

          <Dropdown
            aria-labelledby={comboId}
            // placeholder="(default)"
            defaultValue={motionName}
            // defaultSelectedOptions={}
            onOptionSelect={React.useCallback(
              (e: unknown, data: { optionValue: string | undefined }) => {
                // Clear the custom duration when a preset is selected
                data.optionValue && setMotionName(data.optionValue as keyof typeof motionOptions);
              },
              [setMotionName],
            )}
          >
            {Object.keys(motionOptions).map(optionKey => {
              return (
                <Option key={optionKey} value={optionKey}>
                  {optionKey}
                </Option>
              );
            })}
          </Dropdown>
        </div>

        <div className={classes.card}>
          <ItemMotion visible={users.length === 0} unmountOnExit>
            <MessageBar>
              <MessageBarBody>
                <MessageBarTitle>No users</MessageBarTitle>
                Click "Add user" to add a user to the presence group.
              </MessageBarBody>
            </MessageBar>
          </ItemMotion>

          <PresenceGroup>
            {users.map(item => (
              // HACK: use the motion name in the key to force re-render of all items,
              // otherwise the motions don't reliably update when the selected motion name changes
              <ItemMotion key={item.name + '_' + motionName}>
                {/* Programmatic height cannot reduce padding, so outermost div must have 0 padding for full collapse */}
                <div>
                  <div style={{ padding: '5px 0' }}>
                    <Persona
                      avatar={{
                        image: { src: item.image },
                      }}
                      textPosition="after"
                      name={item.name}
                      presence={{ status: 'available' }}
                      secondaryText="Available"
                      size="extra-large"
                    />
                  </div>
                </div>
              </ItemMotion>
            ))}
          </PresenceGroup>
        </div>
      </div>
    </>
  );
};
