import * as React from 'react';
import StaggerVisibilityStyleDescription from './StaggerVisibilityStyle.stories.md';
import { Field, makeStyles, tokens, Button } from '@fluentui/react-components';
import { Stagger } from '@fluentui/react-motion-components-preview';

const useClasses = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: tokens.spacingHorizontalXL,
  },
  controls: {
    display: 'flex',
    flexDirection: 'column',
    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow16,
    padding: '10px',
    gap: '10px',
  },
  items: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: tokens.spacingHorizontalM,
    padding: tokens.spacingHorizontalM,
    border: `${tokens.strokeWidthThin} dashed ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusSmall,
  },
  card: {
    padding: tokens.spacingVerticalM,
    backgroundColor: tokens.colorBrandBackground2,
    borderRadius: tokens.borderRadiusSmall,
    textAlign: 'center',
    color: tokens.colorBrandForeground2,
    minHeight: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: tokens.fontWeightSemibold,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorBrandStroke2}`,
  },
});

export const VisibilityStyle = () => {
  const classes = useClasses();
  const [visible, setVisible] = React.useState(false);

  return (
    <div className={classes.container}>
      <div className={classes.controls}>
        <Field size="small">
          <Button onClick={() => setVisible(!visible)} appearance="primary">
            {visible ? 'Hide' : 'Show'} Cards
          </Button>
        </Field>
      </div>

      <div className={classes.items}>
        <Stagger visible={visible} mode="visibilityStyle" itemDelay={150}>
          <div className={classes.card}>Card 1</div>
          <div className={classes.card}>Card 2</div>
          <div className={classes.card}>Card 3</div>
          <div className={classes.card}>Card 4</div>
          <div className={classes.card}>Card 5</div>
          <div className={classes.card}>Card 6</div>
        </Stagger>
      </div>

      <div style={{ fontSize: '14px', color: tokens.colorNeutralForeground3 }}>
        <p>
          <strong>VisibilityStyle mode:</strong> Cards remain in the DOM and preserve their layout space even when
          hidden. This prevents layout shifts during the stagger animation.
        </p>
        <p>
          Notice how the grid layout remains stable - hidden cards occupy space but are invisible (using{' '}
          <code>visibility: hidden</code> instead of <code>display: none</code>).
        </p>
      </div>
    </div>
  );
};

VisibilityStyle.storyName = 'VisibilityStyle Mode';

VisibilityStyle.parameters = {
  docs: {
    description: {
      story: StaggerVisibilityStyleDescription,
    },
  },
};
