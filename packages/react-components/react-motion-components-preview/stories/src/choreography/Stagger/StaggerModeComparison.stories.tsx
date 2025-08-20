import * as React from 'react';
import StaggerModeComparisonDescription from './StaggerModeComparison.stories.md';
import { makeStyles, tokens, Button, Avatar } from '@fluentui/react-components';
import { Stagger } from '@fluentui/react-motion-components-preview';

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
              <Avatar initials="DR" color="dark-red" name="darkRed avatar" />
              <Avatar initials="CR" color="cranberry" name="cranberry avatar" />
              <Avatar initials="RE" color="red" name="red avatar" />
              <Avatar initials="PU" color="pumpkin" name="pumpkin avatar" />
              <Avatar initials="PE" color="peach" name="peach avatar" />
              <Avatar initials="MA" color="marigold" name="marigold avatar" />
              <Avatar initials="GO" color="gold" name="gold avatar" />
              <Avatar initials="BS" color="brass" name="brass avatar" />
              <Avatar initials="BR" color="brown" name="brown avatar" />
              <Avatar initials="FO" color="forest" name="forest avatar" />
              <Avatar initials="SE" color="seafoam" name="seafoam avatar" />
              <Avatar initials="DG" color="dark-green" name="darkGreen avatar" />
              <Avatar initials="LT" color="light-teal" name="lightTeal avatar" />
              <Avatar initials="TE" color="teal" name="teal avatar" />
              <Avatar initials="ST" color="steel" name="steel avatar" />
              <Avatar initials="BL" color="blue" name="blue avatar" />
              <Avatar initials="RB" color="royal-blue" name="royalBlue avatar" />
              <Avatar initials="CO" color="cornflower" name="cornflower avatar" />
              <Avatar initials="NA" color="navy" name="navy avatar" />
              <Avatar initials="LA" color="lavender" name="lavender avatar" />
              <Avatar initials="PU" color="purple" name="purple avatar" />
              <Avatar initials="GR" color="grape" name="grape avatar" />
              <Avatar initials="LI" color="lilac" name="lilac avatar" />
              <Avatar initials="PI" color="pink" name="pink avatar" />
            </Stagger>
          </div>
          <div className={classes.description}>Items remain in DOM</div>
        </div>

        <div className={classes.section}>
          <div className={classes.sectionTitle}>unmount mode</div>
          <div className={classes.items}>
            <Stagger visible={visible} mode="unmount" itemDelay={100}>
              <Avatar initials="DR" color="dark-red" name="darkRed avatar" />
              <Avatar initials="CR" color="cranberry" name="cranberry avatar" />
              <Avatar initials="RE" color="red" name="red avatar" />
              <Avatar initials="PU" color="pumpkin" name="pumpkin avatar" />
              <Avatar initials="PE" color="peach" name="peach avatar" />
              <Avatar initials="MA" color="marigold" name="marigold avatar" />
              <Avatar initials="GO" color="gold" name="gold avatar" />
              <Avatar initials="BS" color="brass" name="brass avatar" />
              <Avatar initials="BR" color="brown" name="brown avatar" />
              <Avatar initials="FO" color="forest" name="forest avatar" />
              <Avatar initials="SE" color="seafoam" name="seafoam avatar" />
              <Avatar initials="DG" color="dark-green" name="darkGreen avatar" />
              <Avatar initials="LT" color="light-teal" name="lightTeal avatar" />
              <Avatar initials="TE" color="teal" name="teal avatar" />
              <Avatar initials="ST" color="steel" name="steel avatar" />
              <Avatar initials="BL" color="blue" name="blue avatar" />
              <Avatar initials="RB" color="royal-blue" name="royalBlue avatar" />
              <Avatar initials="CO" color="cornflower" name="cornflower avatar" />
              <Avatar initials="NA" color="navy" name="navy avatar" />
              <Avatar initials="LA" color="lavender" name="lavender avatar" />
              <Avatar initials="PU" color="purple" name="purple avatar" />
              <Avatar initials="GR" color="grape" name="grape avatar" />
              <Avatar initials="LI" color="lilac" name="lilac avatar" />
              <Avatar initials="PI" color="pink" name="pink avatar" />
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
