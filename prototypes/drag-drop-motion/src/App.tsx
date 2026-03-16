import React, { useState, useRef, useCallback } from 'react';
import { Card, Caption1, Badge, Checkbox, Text, makeStyles, tokens, Button } from '@fluentui/react-components';
import { createMotionComponent } from '@fluentui/react-motion';

const draggingScale = 1.1;

const curveOvershoot2 = `linear(0.000, 0.0009351 1%, 0.003740 2%, 0.008416 3%, 0.01496 4%, 0.02338 5%, 0.03366 6%, 0.04582 7%, 0.05985 8%, 0.07574 9%, 0.09351 10%, 0.1131 11%, 0.1347 12%, 0.1580 13%, 0.1833 14%, 0.2104 15%, 0.2394 16%, 0.2702 17%, 0.3030 18%, 0.3376 19%, 0.4102 21%, 0.4452 22%, 0.4790 23%, 0.5116 24%, 0.5430 25%, 0.5733 26%, 0.6024 27%, 0.6304 28%, 0.6573 29%, 0.6832 30%, 0.7079 31%, 0.7317 32%, 0.7761 34%, 0.8166 36%, 0.8534 38%, 0.8866 40%, 0.9163 42%, 0.9428 44%, 0.9661 46%, 0.9865 48%, 1.004 50%, 1.019 52%, 1.032 54%, 1.042 56%, 1.050 58%, 1.056 60%, 1.060 62%, 1.062 64%, 1.063 66%, 1.062 69%, 1.058 72%, 1.053 75%, 1.043 79%, 1.021 87%, 1.011 91%, 1.005 94%, 1.001 97%, 1.000)`;

const curveGravity1 = `linear(0.000, 0.001824 2%, 0.007296 4%, 0.01642 6%, 0.02918 8%, 0.04560 10%, 0.06567 12%, 0.08938 14%, 0.1167 16%, 0.1477 18%, 0.1824 20%, 0.2207 22%, 0.2627 24%, 0.3083 26%, 0.3575 28%, 0.4104 30%, 0.4670 32%, 0.5272 34%, 0.5910 36%, 0.6585 38%, 0.7296 40%, 0.8044 42%, 0.8828 44%, 0.9649 46%, 0.9966 47%, 0.9772 48%, 0.9592 49%, 0.9424 50%, 0.9270 51%, 0.9128 52%, 0.8999 53%, 0.8883 54%, 0.8780 55%, 0.8690 56%, 0.8612 57%, 0.8548 58%, 0.8496 59%, 0.8458 60%, 0.8432 61%, 0.8419 62%, 0.8419 63%, 0.8432 64%, 0.8458 65%, 0.8496 66%, 0.8548 67%, 0.8612 68%, 0.8690 69%, 0.8780 70%, 0.8883 71%, 0.8999 72%, 0.9128 73%, 0.9270 74%, 0.9424 75%, 0.9592 76%, 0.9772 77%, 0.9966 78%, 0.9925 79%, 0.9847 80%, 0.9781 81%, 0.9729 82%, 0.9689 83%, 0.9662 84%, 0.9648 85%, 0.9647 86%, 0.9659 87%, 0.9684 88%, 0.9721 89%, 0.9772 90%, 0.9835 91%, 0.9912 92%, 1.000 93%, 0.9961 94%, 0.9935 95%, 0.9922 96%, 0.9923 97%, 0.9935 98%, 0.9961 99%, 1.000)`;

/**
 * DropMotion: a two-phase animation parameterised by the drag offset.
 *   Phase 1 — slide from (dragX, dragY) back to origin at a constant 110% scale
 *   Phase 2 — scale from 110% → 100%
 */
const DropMotion = createMotionComponent<{ dragX: number; dragY: number }>(({ dragX, dragY }) => {
  return [
    {
      // delay: 200,
      keyframes: [
        { translate: `${dragX}px ${dragY}px`, scale: draggingScale, boxShadow: tokens.shadow8 },
        { translate: '0px 0px', scale: draggingScale, boxShadow: tokens.shadow8 },
      ],
      duration: 700,
      easing: curveOvershoot2,
      fill: 'both',
    },
    {
      delay: 700 - 200,
      keyframes: [
        { scale: draggingScale, boxShadow: tokens.shadow8 },
        { scale: 1, boxShadow: tokens.shadow2 },
      ],
      duration: 800,
      easing: curveGravity1,
      fill: 'forwards' as const,
    },
  ];
});

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: tokens.colorNeutralBackground4,
    padding: '40px',
    gap: '24px',
  },
  card: {
    width: '340px',
    boxShadow: tokens.shadow2,
  },
  cardDragging: {
    width: '340px',
    cursor: 'grabbing',
    boxShadow: tokens.shadow8,
  },
  cardIdle: {
    width: '340px',
    cursor: 'grab',
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

const TaskCard: React.FC<{ className?: string; onMouseDown?: React.MouseEventHandler }> = ({
  className,
  onMouseDown,
}) => {
  const styles = useStyles();
  return (
    <Card className={className ?? styles.card} appearance="filled" onMouseDown={onMouseDown}>
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

type DragState =
  | { phase: 'idle' }
  | { phase: 'dragging'; x: number; y: number }
  | { phase: 'dropping'; x: number; y: number; key: number };

export const App: React.FC = () => {
  const styles = useStyles();
  const [drag, setDrag] = useState<DragState>({ phase: 'idle' });
  const dragStartRef = useRef({ mouseX: 0, mouseY: 0 });
  const dropCounter = useRef(0);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    dragStartRef.current = { mouseX: e.clientX, mouseY: e.clientY };
    setDrag({ phase: 'dragging', x: 0, y: 0 });

    const handleMouseMove = (ev: MouseEvent) => {
      const dx = ev.clientX - dragStartRef.current.mouseX;
      const dy = ev.clientY - dragStartRef.current.mouseY;
      setDrag({ phase: 'dragging', x: dx, y: dy });
    };

    const handleMouseUp = (ev: MouseEvent) => {
      const dx = ev.clientX - dragStartRef.current.mouseX;
      const dy = ev.clientY - dragStartRef.current.mouseY;
      dropCounter.current += 1;
      setDrag({ phase: 'dropping', x: dx, y: dy, key: dropCounter.current });
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  }, []);

  const handleMotionFinish = useCallback(() => {
    setDrag({ phase: 'idle' });
  }, []);

  const cardStyle: React.CSSProperties | undefined =
    drag.phase === 'dragging'
      ? {
          translate: `${drag.x}px ${drag.y}px`,
          scale: `${draggingScale}`,
          boxShadow: tokens.shadow8,
          userSelect: 'none',
        }
      : undefined;

  return (
    <div className={styles.root}>
      {drag.phase === 'dropping' ? (
        <DropMotion key={drag.key} dragX={drag.x} dragY={drag.y} onMotionFinish={handleMotionFinish}>
          <div>
            <TaskCard className={styles.card} />
          </div>
        </DropMotion>
      ) : (
        <div style={cardStyle}>
          <TaskCard
            className={drag.phase === 'dragging' ? styles.cardDragging : styles.cardIdle}
            onMouseDown={handleMouseDown}
          />
        </div>
      )}
    </div>
  );
};
