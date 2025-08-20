import * as React from 'react';
import StaggerModeComparisonDescription from './StaggerModeComparison.stories.md';
import { makeStyles, tokens, Button, Avatar } from '@fluentui/react-components';
import { Stagger } from '@fluentui/react-motion-components-preview';

const avatarData = [
  { initials: 'DR', color: 'dark-red', name: 'darkRed avatar' },
  { initials: 'CR', color: 'cranberry', name: 'cranberry avatar' },
  { initials: 'RE', color: 'red', name: 'red avatar' },
  { initials: 'PU', color: 'pumpkin', name: 'pumpkin avatar' },
  { initials: 'PE', color: 'peach', name: 'peach avatar' },
  { initials: 'MA', color: 'marigold', name: 'marigold avatar' },
  { initials: 'GO', color: 'gold', name: 'gold avatar' },
  { initials: 'BS', color: 'brass', name: 'brass avatar' },
  { initials: 'BR', color: 'brown', name: 'brown avatar' },
  { initials: 'FO', color: 'forest', name: 'forest avatar' },
  { initials: 'SE', color: 'seafoam', name: 'seafoam avatar' },
  { initials: 'DG', color: 'dark-green', name: 'darkGreen avatar' },
  { initials: 'LT', color: 'light-teal', name: 'lightTeal avatar' },
  { initials: 'TE', color: 'teal', name: 'teal avatar' },
  { initials: 'ST', color: 'steel', name: 'steel avatar' },
  { initials: 'BL', color: 'blue', name: 'blue avatar' },
  { initials: 'RB', color: 'royal-blue', name: 'royalBlue avatar' },
  { initials: 'CO', color: 'cornflower', name: 'cornflower avatar' },
  { initials: 'NA', color: 'navy', name: 'navy avatar' },
  { initials: 'LA', color: 'lavender', name: 'lavender avatar' },
  { initials: 'PU', color: 'purple', name: 'purple avatar' },
  { initials: 'GR', color: 'grape', name: 'grape avatar' },
  { initials: 'LI', color: 'lilac', name: 'lilac avatar' },
  { initials: 'PI', color: 'pink', name: 'pink avatar' },
] as const;

const renderAvatars = () => {
  return avatarData.map(avatar => (
    <Avatar key={avatar.name} initials={avatar.initials} color={avatar.color as any} name={avatar.name} />
  ));
};

const useClasses = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalXL,
  },
  controls: {
    display: 'flex',
    gap: tokens.spacingHorizontalM,
    alignItems: 'center',
    padding: tokens.spacingVerticalM,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusSmall,
  },
  comparison: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: tokens.spacingHorizontalXL,
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalM,
  },
  sectionTitle: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  items: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: tokens.spacingHorizontalS,
    padding: tokens.spacingVerticalM,
    border: `${tokens.strokeWidthThin} dashed ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusSmall,
    minHeight: '120px',
  },
  description: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
  },
});

export const ModeComparison = () => {
  const classes = useClasses();
  const [visible, setVisible] = React.useState(false);

  return (
    <div className={classes.container}>
      <div className={classes.controls}>
        <Button onClick={() => setVisible(!visible)} appearance="primary">
          {visible ? 'Hide' : 'Show'} Avatars
        </Button>
      </div>

      <div className={classes.comparison}>
        <div className={classes.section}>
          <div className={classes.sectionTitle}>visibilityStyle mode</div>
          <div className={classes.items}>
            <Stagger visible={visible} mode="visibilityStyle" itemDelay={100}>
              {renderAvatars()}
            </Stagger>
          </div>
          <div className={classes.description}>Items remain in DOM</div>
        </div>

        <div className={classes.section}>
          <div className={classes.sectionTitle}>unmount mode</div>
          <div className={classes.items}>
            <Stagger visible={visible} mode="unmount" itemDelay={100}>
              {renderAvatars()}
            </Stagger>
          </div>
          <div className={classes.description}>Items removed from DOM</div>
        </div>
      </div>
    </div>
  );
};

ModeComparison.parameters = {
  docs: {
    description: {
      story: StaggerModeComparisonDescription,
    },
  },
};
