'use client';

import * as React from 'react';
import { Button, Card } from '@fluentui/react-components';
import { createMotionComponent, createPresenceComponent, motionTokens } from '@fluentui/react-motion';
import { useClasses } from './MotionVsPresenceDemo.styles';

// One-way motion: plays on mount
const SlideIn = createMotionComponent({
  keyframes: [
    { transform: 'translateX(-20px)', opacity: 0 },
    { transform: 'translateX(0)', opacity: 1 },
  ],
  duration: motionTokens.durationUltraSlow * 2,
  easing: motionTokens.curveDecelerateMid,
});

// Two-way presence: controlled by visible prop
const FadePresence = createPresenceComponent({
  enter: {
    keyframes: [{ opacity: 0 }, { opacity: 1 }],
    duration: motionTokens.durationUltraSlow,
    easing: motionTokens.curveDecelerateMid,
  },
  exit: {
    keyframes: [{ opacity: 1 }, { opacity: 0 }],
    duration: motionTokens.durationSlow,
    easing: motionTokens.curveAccelerateMid,
  },
});

const motionCode = `const SlideIn = createMotionComponent({
  keyframes: [
    { transform: 'translateX(-20px)', opacity: 0 },
    { transform: 'translateX(0)', opacity: 1 },
  ],
  duration: 1000,
});`;

const presenceCode = `const Fade = createPresenceComponent({
  enter: {
    keyframes: [{ opacity: 0 }, { opacity: 1 }],
    duration: 500,
  },
  exit: {
    keyframes: [{ opacity: 1 }, { opacity: 0 }],
    duration: 300,
  },
});`;

export const MotionVsPresenceDemo: React.FC = () => {
  const classes = useClasses();
  const [motionKey, setMotionKey] = React.useState(0);
  const [presenceVisible, setPresenceVisible] = React.useState(true);

  const handleReplay = React.useCallback(() => {
    setMotionKey(k => k + 1);
  }, []);

  const handleTogglePresence = React.useCallback(() => {
    setPresenceVisible(v => !v);
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.panel}>
        <div className={classes.panelHeader}>
          <h4 className={classes.title}>One-Way Motion</h4>
          <p className={classes.subtitle}>Plays once on mount</p>
        </div>
        <div className={classes.demoArea}>
          <SlideIn key={motionKey}>
            <Card appearance="filled" className={classes.card}>
              Slide In
            </Card>
          </SlideIn>
        </div>
        <pre className={classes.codeArea}>{motionCode}</pre>
        <div className={classes.buttonRow}>
          <Button appearance="primary" onClick={handleReplay}>
            Replay
          </Button>
        </div>
      </div>

      <div className={classes.panel}>
        <div className={classes.panelHeader}>
          <h4 className={classes.title}>Two-Way Presence</h4>
          <p className={classes.subtitle}>Toggles with enter/exit</p>
        </div>
        <div className={classes.demoArea}>
          <FadePresence visible={presenceVisible}>
            <Card appearance="filled" className={classes.card}>
              Fade
            </Card>
          </FadePresence>
        </div>
        <pre className={classes.codeArea}>{presenceCode}</pre>
        <div className={classes.buttonRow}>
          <Button appearance="primary" onClick={handleTogglePresence}>
            {presenceVisible ? 'Hide' : 'Show'}
          </Button>
        </div>
      </div>
    </div>
  );
};
