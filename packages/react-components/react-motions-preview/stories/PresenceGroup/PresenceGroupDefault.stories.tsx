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
import { PresenceGroup, Collapse, Scale, Fade } from '@fluentui/react-motions-preview';
import * as React from 'react';

const motionOptions = {
  Collapse,
  ['Collapse.Pushy']: Collapse.Pushy,
  ['Collapse.Gentle']: Collapse.Gentle,
  ['Collapse.Snappy']: Collapse.Snappy,
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

    ...shorthands.gap('10px'),

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
  const [limit, setLimit] = React.useState(3);
  const [motionName, setMotionName] = React.useState<MotionName>(Object.keys(motionOptions)[0] as MotionName);
  const ItemMotion = motionOptions[motionName];

  return (
    <>
      <div className={classes.container}>
        <div className={classes.controls}>
          <Button
            appearance="primary"
            disabled={limit + 1 === users.length}
            icon={<AddRegular />}
            onClick={() => setLimit(l => l + 1)}
            size="small"
          >
            Add user
          </Button>
          <Button disabled={limit === 0} icon={<DeleteRegular />} onClick={() => setLimit(l => l - 1)} size="small">
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
          <ItemMotion visible={limit === 0} unmountOnExit>
            <MessageBar>
              <MessageBarBody>
                <MessageBarTitle>No users</MessageBarTitle>
                Click "Add user" to add a user to the presence group.
              </MessageBarBody>
            </MessageBar>
          </ItemMotion>

          <PresenceGroup>
            {users.slice(0, limit).map(item => (
              // HACK: use the motion name in the key to force re-render of all items,
              // otherwise the motions don't reliably update when the selected motion name changes
              <ItemMotion key={item.name + '_' + motionName}>
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
              </ItemMotion>
            ))}
          </PresenceGroup>
        </div>
      </div>
    </>
  );
};
