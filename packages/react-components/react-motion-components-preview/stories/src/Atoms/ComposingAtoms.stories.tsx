import * as React from 'react';
import {
  Button,
  createPresenceComponent,
  makeStyles,
  motionTokens,
  tokens,
  type JSXElement,
} from '@fluentui/react-components';
import { rotateAtom, blurAtom, scaleAtom } from '@fluentui/react-motion-components-preview';

const duration = 1000;
const exitDuration = 1000;
const easing = motionTokens.curveDecelerateMid;

// Custom presence component composed from rotate + blur + scale atoms running in parallel.
const SpinBlur = createPresenceComponent({
  enter: [
    rotateAtom({ direction: 'enter', duration, easing, axis: 'z', outAngle: -20, inAngle: 0 }),
    blurAtom({ direction: 'enter', duration, easing, outRadius: '8px', inRadius: '0px' }),
    scaleAtom({ direction: 'enter', duration, easing, outScale: 2 }),
  ],
  exit: [
    rotateAtom({
      direction: 'exit',
      duration: exitDuration,
      easing: motionTokens.curveAccelerateMid,
      axis: 'z',
      outAngle: 90,
      inAngle: 0,
    }),
    blurAtom({
      direction: 'exit',
      duration: exitDuration,
      easing: motionTokens.curveLinear,
      outRadius: '8px',
      inRadius: '0px',
    }),
    scaleAtom({ direction: 'exit', duration: exitDuration, easing: motionTokens.curveLinear, outScale: 0 }),
  ],
});

const useClasses = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: tokens.spacingVerticalL,
    padding: tokens.spacingVerticalXL,
  },
  box: {
    padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalXXL}`,
    backgroundColor: tokens.colorNeutralBackground3,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusMedium,
    color: tokens.colorNeutralForeground1,
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    textAlign: 'center',
  },
});

export const SpinBlurExample = (): JSXElement => {
  const classes = useClasses();
  const [visible, setVisible] = React.useState(true);

  return (
    <div className={classes.container}>
      <SpinBlur visible={visible}>
        <div className={classes.box}>SpinBlur</div>
      </SpinBlur>
      <Button appearance="primary" onClick={() => setVisible(v => !v)}>
        {visible ? 'Hide' : 'Show'}
      </Button>
    </div>
  );
};
