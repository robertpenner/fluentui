import React, { useState } from 'react';
import { Card, Caption1, Badge, Checkbox, Text, makeStyles, tokens, Button } from '@fluentui/react-components';
import { createMotionComponent } from '@fluentui/react-motion';

const draggingScale = 1.1;

const curveOvershoot1 = `linear(0.000, 0.0009405 1%, 0.003762 2%, 0.008465 3%, 0.01505 4%, 0.02351 5%, 0.03386 6%, 0.04608 7%, 0.06019 8%, 0.07618 9%, 0.09405 10%, 0.1138 11%, 0.1354 12%, 0.1589 13%, 0.1843 14%, 0.2116 15%, 0.2408 16%, 0.2718 17%, 0.3047 18%, 0.3395 19%, 0.3762 20%, 0.4148 21%, 0.4552 22%, 0.5387 24%, 0.5783 25%, 0.6164 26%, 0.6528 27%, 0.6877 28%, 0.7210 29%, 0.7529 30%, 0.7832 31%, 0.8121 32%, 0.8397 33%, 0.8658 34%, 0.8905 35%, 0.9140 36%, 0.9361 37%, 0.9570 38%, 0.9766 39%, 0.9950 40%, 1.012 41%, 1.028 42%, 1.043 43%, 1.057 44%, 1.070 45%, 1.082 46%, 1.102 48%, 1.119 50%, 1.132 52%, 1.142 54%, 1.149 56%, 1.153 58%, 1.155 60%, 1.154 62%, 1.151 64%, 1.146 66%, 1.139 68%, 1.127 71%, 1.112 74%, 1.084 79%, 1.055 84%, 1.039 87%, 1.024 90%, 1.016 92%, 1.009 94%, 1.004 96%, 1.001 98%, 1.000)`;

const curveOvershoot2 = `linear(0.000, 0.0009351 1%, 0.003740 2%, 0.008416 3%, 0.01496 4%, 0.02338 5%, 0.03366 6%, 0.04582 7%, 0.05985 8%, 0.07574 9%, 0.09351 10%, 0.1131 11%, 0.1347 12%, 0.1580 13%, 0.1833 14%, 0.2104 15%, 0.2394 16%, 0.2702 17%, 0.3030 18%, 0.3376 19%, 0.4102 21%, 0.4452 22%, 0.4790 23%, 0.5116 24%, 0.5430 25%, 0.5733 26%, 0.6024 27%, 0.6304 28%, 0.6573 29%, 0.6832 30%, 0.7079 31%, 0.7317 32%, 0.7761 34%, 0.8166 36%, 0.8534 38%, 0.8866 40%, 0.9163 42%, 0.9428 44%, 0.9661 46%, 0.9865 48%, 1.004 50%, 1.019 52%, 1.032 54%, 1.042 56%, 1.050 58%, 1.056 60%, 1.060 62%, 1.062 64%, 1.063 66%, 1.062 69%, 1.058 72%, 1.053 75%, 1.043 79%, 1.021 87%, 1.011 91%, 1.005 94%, 1.001 97%, 1.000)`;

const curveMagnetic1 = `linear(0.000, 0.05983 1%, 0.08083 2%, 0.09556 3%, 0.1071 4%, 0.1166 5%, 0.1248 6%, 0.1382 8%, 0.1490 10%, 0.1622 13%, 0.1730 16%, 0.1881 21%, 0.2197 33%, 0.2339 38%, 0.2500 43%, 0.2649 47%, 0.2820 51%, 0.2966 54%, 0.3132 57%, 0.3320 60%, 0.3535 63%, 0.3696 65%, 0.3874 67%, 0.4071 69%, 0.4292 71%, 0.4540 73%, 0.4822 75%, 0.4978 76%, 0.5147 77%, 0.5329 78%, 0.5527 79%, 0.5745 80%, 0.5986 81%, 0.6257 82%, 0.6565 83%, 0.6925 84%, 0.7362 85%, 0.7933 86%, 0.8853 87%, 0.9198 88%, 0.8175 89%, 0.7543 90%, 0.7303 91%, 0.7455 92%, 0.7997 93%, 0.8931 94%, 0.9887 95%, 0.9463 96%, 0.9430 97%, 0.9789 98%, 0.9871 99%, 1.000)`;

// https://robertpenner.com/fuse/#head_type=power-back&tail_type=bounce&join=0.654&head_anticipation=0&head_exponent=2&bounces=3&decay=95&duration=500
const curveGravity1 = `linear(0.000, 0.001824 2%, 0.007296 4%, 0.01642 6%, 0.02918 8%, 0.04560 10%, 0.06567 12%, 0.08938 14%, 0.1167 16%, 0.1477 18%, 0.1824 20%, 0.2207 22%, 0.2627 24%, 0.3083 26%, 0.3575 28%, 0.4104 30%, 0.4670 32%, 0.5272 34%, 0.5910 36%, 0.6585 38%, 0.7296 40%, 0.8044 42%, 0.8828 44%, 0.9649 46%, 0.9966 47%, 0.9772 48%, 0.9592 49%, 0.9424 50%, 0.9270 51%, 0.9128 52%, 0.8999 53%, 0.8883 54%, 0.8780 55%, 0.8690 56%, 0.8612 57%, 0.8548 58%, 0.8496 59%, 0.8458 60%, 0.8432 61%, 0.8419 62%, 0.8419 63%, 0.8432 64%, 0.8458 65%, 0.8496 66%, 0.8548 67%, 0.8612 68%, 0.8690 69%, 0.8780 70%, 0.8883 71%, 0.8999 72%, 0.9128 73%, 0.9270 74%, 0.9424 75%, 0.9592 76%, 0.9772 77%, 0.9966 78%, 0.9925 79%, 0.9847 80%, 0.9781 81%, 0.9729 82%, 0.9689 83%, 0.9662 84%, 0.9648 85%, 0.9647 86%, 0.9659 87%, 0.9684 88%, 0.9721 89%, 0.9772 90%, 0.9835 91%, 0.9912 92%, 1.000 93%, 0.9961 94%, 0.9935 95%, 0.9922 96%, 0.9923 97%, 0.9935 98%, 0.9961 99%, 1.000)`;

/**
 * DropMotion: a two-phase animation
 *   Phase 1 — slide 200px right-to-left at a constant 110% scale
 *   Phase 2 — scale from 110% → 100% (no translation change)
 *
 * createMotionComponent accepts an array of AtomMotion objects.
 * Each atom targets a different CSS property and they are played
 * as a composite sequence via the Web Animations API.
 */
const DropMotion = createMotionComponent([
  // Phase 1: horizontal slide (200px → 0) while holding 110% scale
  // {
  //   keyframes: [{ scale: 1.1 }],
  //   duration: 400,
  //   easing: 'linear',
  //   fill: 'forwards',
  // },
  {
    delay: 200,
    keyframes: [
      { translate: '100px 50px', scale: draggingScale },
      { translate: '0x', scale: draggingScale },
    ],
    duration: 400,
    easing: curveOvershoot2,
    fill: 'both',
  },
  // Phase 2: scale down from 110% → 100% (delayed until phase 1 completes)
  {
    delay: 200 + 400 + 20,
    keyframes: [{ scale: draggingScale }, { scale: 1 }],
    duration: 500,
    // easing: 'ease-in-out',
    easing: curveGravity1,
    fill: 'forwards',
  },
]);

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: tokens.colorNeutralBackground2,
    padding: '40px',
    gap: '24px',
  },
  card: {
    width: '340px',
    boxShadow: tokens.shadow8,
  },
  badges: {
    display: 'flex',
    gap: '8px',
    marginBottom: '8px',
    paddingLeft: '12px',
    paddingRight: '12px',
    paddingTop: '12px',
  },
  taskRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    paddingLeft: '4px',
    paddingRight: '12px',
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: '12px',
    paddingRight: '12px',
    paddingBottom: '12px',
    paddingTop: '4px',
  },
  dateText: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    color: tokens.colorNeutralForeground3,
  },
  avatar: {
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    backgroundColor: tokens.colorNeutralBackground5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '11px',
    fontWeight: 600,
    color: tokens.colorNeutralForeground2,
  },
});

const TaskCard: React.FC<{ className?: string }> = ({ className }) => {
  const styles = useStyles();
  return (
    <Card className={className ?? styles.card}>
      <div className={styles.badges}>
        <Badge appearance="filled" color="danger" shape="rounded">
          Design Team
        </Badge>
        <Badge appearance="tint" color="severe" shape="rounded">
          Research
        </Badge>
      </div>

      <div className={styles.taskRow}>
        <Checkbox shape="circular" />
        <Text>Draft preliminary software specification</Text>
      </div>

      <div className={styles.footer}>
        <div className={styles.dateText}>
          <span>&#128197;</span>
          <Caption1>05/01</Caption1>
        </div>
        <div className={styles.avatar}>LS</div>
      </div>
    </Card>
  );
};

export const App: React.FC = () => {
  const styles = useStyles();
  const [dropKey, setDropKey] = useState(0);
  const hasDropped = dropKey > 0;

  return (
    <div className={styles.root}>
      <Button appearance="primary" onClick={() => setDropKey(k => k + 1)}>
        {hasDropped ? 'Replay' : 'Drop Card'}
      </Button>

      {hasDropped ? (
        <DropMotion key={dropKey}>
          <div>
            <TaskCard />
          </div>
        </DropMotion>
      ) : (
        <TaskCard />
      )}
    </div>
  );
};
