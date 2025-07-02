import * as React from 'react';
import { Field, makeStyles, tokens, Switch, Button, Dropdown, Option } from '@fluentui/react-components';
import { Slide } from '@fluentui/react-motion-components-preview';

const useClasses = makeStyles({
  container: {
    display: 'grid',
    gridTemplate: `"controls ." "demo demo" / 300px 1fr`,
    gap: '20px 10px',
    height: '400px',
  },
  controls: {
    display: 'flex',
    flexDirection: 'column',
    gridArea: 'controls',
    gap: '10px',

    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow16,
    padding: '15px',
  },
  demo: {
    gridArea: 'demo',
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusMedium,
    padding: '20px',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: tokens.colorNeutralBackground2,
  },
  card: {
    padding: '20px',
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow8,
    maxWidth: '300px',
    textAlign: 'center',
  },
  field: {
    flex: '0 0 auto',
  },
});

const slideDirections = {
  'Slide from Top': { fromX: 0, fromY: -40 },
  'Slide from Bottom': { fromX: 0, fromY: 40 },
  'Slide from Left': { fromX: -40, fromY: 0 },
  'Slide from Right': { fromX: 40, fromY: 0 },
  'Slide from Top-Left': { fromX: -30, fromY: -30 },
  'Slide from Top-Right': { fromX: 30, fromY: -30 },
  'Slide from Bottom-Left': { fromX: -30, fromY: 30 },
  'Slide from Bottom-Right': { fromX: 30, fromY: 30 },
};

export const Customization = () => {
  const classes = useClasses();
  const [visible, setVisible] = React.useState<boolean>(true);
  const [selectedDirection, setSelectedDirection] = React.useState<string>('Slide from Top');
  const [animateOpacity, setAnimateOpacity] = React.useState<boolean>(true);

  const slideParams = slideDirections[selectedDirection as keyof typeof slideDirections];

  return (
    <div className={classes.container}>
      <div className={classes.controls}>
        <Field className={classes.field}>
          <Switch label="Visible" checked={visible} onChange={() => setVisible(v => !v)} />
        </Field>
        
        <Field className={classes.field}>
          <Switch 
            label="Animate Opacity" 
            checked={animateOpacity} 
            onChange={() => setAnimateOpacity(v => !v)} 
          />
        </Field>

        <Field className={classes.field} label="Slide Direction">
          <Dropdown
            value={selectedDirection}
            onOptionSelect={(_, data) => setSelectedDirection(data.optionValue as string)}
          >
            {Object.keys(slideDirections).map(direction => (
              <Option key={direction} value={direction}>
                {direction}
              </Option>
            ))}
          </Dropdown>
        </Field>

        <Button onClick={() => setVisible(v => !v)}>
          Toggle Animation
        </Button>
      </div>

      <div className={classes.demo}>
        <Slide
          visible={visible}
          fromX={slideParams.fromX}
          fromY={slideParams.fromY}
          animateOpacity={animateOpacity}
        >
          <div className={classes.card}>
            <h3>Slide Animation</h3>
            <p>Direction: {selectedDirection}</p>
            <p>fromX: {slideParams.fromX}px</p>
            <p>fromY: {slideParams.fromY}px</p>
            <p>Opacity: {animateOpacity ? 'Animated' : 'Static'}</p>
          </div>
        </Slide>
      </div>
    </div>
  );
};