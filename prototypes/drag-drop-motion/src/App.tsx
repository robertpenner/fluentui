import React, { useState, useRef, useCallback } from 'react';
import { Card, Caption1, Badge, Checkbox, Text, makeStyles, tokens, Button } from '@fluentui/react-components';
import { createMotionComponent } from '@fluentui/react-motion';

// 10% scale increase while dragging
const draggingScale = 1.1;

//// GRAB EASING

// https://robertpenner.com/fuse/#head_type=power-back&tail_type=power-back&join=0.401&head_anticipation=15&head_exponent=2.02&tail_overshoot=0&tail_exponent=3&duration=700
const curveCompressAnticipateExpandSmooth1 = `linear(0.000, -0.01902 2%, -0.03461 4%, -0.04636 6%, -0.05416 8%, -0.05655 9%, -0.05793 10%, -0.05830 11%, -0.05765 12%, -0.05598 13%, -0.05328 14%, -0.04956 15%, -0.04480 16%, -0.03901 17%, -0.03219 18%, -0.02433 19%, -0.01543 20%, -0.005490 21%, 0.005491 22%, 0.01751 23%, 0.03058 24%, 0.04470 25%, 0.05986 26%, 0.07607 27%, 0.09333 28%, 0.1116 29%, 0.1310 30%, 0.1514 31%, 0.1729 32%, 0.1954 33%, 0.2190 34%, 0.2436 35%, 0.2693 36%, 0.2960 37%, 0.3238 38%, 0.3527 39%, 0.4129 41%, 0.4706 43%, 0.5244 45%, 0.5745 47%, 0.6208 49%, 0.6637 51%, 0.7032 53%, 0.7395 55%, 0.7727 57%, 0.8030 59%, 0.8304 61%, 0.8552 63%, 0.8774 65%, 0.8973 67%, 0.9148 69%, 0.9303 71%, 0.9437 73%, 0.9553 75%, 0.9652 77%, 0.9735 79%, 0.9833 82%, 0.9904 85%, 0.9951 88%, 0.9985 92%, 0.9999 97%, 1.000)`;

//https://robertpenner.com/fuse/#head_type=power-back&tail_type=power-back&join=0.501&head_anticipation=15&head_exponent=2.02&tail_overshoot=0&tail_exponent=3&duration=700
const curveCompressAnticipateExpandSmooth2 = `linear(0.000, -0.01942 2%, -0.03621 4%, -0.04995 6%, -0.06053 8%, -0.06792 10%, -0.07205 12%, -0.07291 14%, -0.07048 16%, -0.06474 18%, -0.05568 20%, -0.04328 22%, -0.02754 24%, -0.008433 26%, 0.01403 28%, 0.03987 30%, 0.06909 32%, 0.1017 34%, 0.1377 36%, 0.1771 38%, 0.2198 40%, 0.2660 42%, 0.3156 44%, 0.3687 46%, 0.4251 48%, 0.5152 51%, 0.5443 52%, 0.5722 53%, 0.5989 54%, 0.6245 55%, 0.6490 56%, 0.6724 57%, 0.6947 58%, 0.7160 59%, 0.7556 61%, 0.7913 63%, 0.8233 65%, 0.8519 67%, 0.8772 69%, 0.8995 71%, 0.9189 73%, 0.9356 75%, 0.9499 77%, 0.9618 79%, 0.9717 81%, 0.9798 83%, 0.9861 85%, 0.9929 88%, 0.9970 91%, 0.9995 95%, 1.000)`;

// https://robertpenner.com/fuse/#head_type=power-back&tail_type=power-back&join=0.497&head_anticipation=15&head_exponent=2.02&tail_overshoot=15&tail_exponent=3&duration=300
const curveCompressAnticipateExpandOvershoot1 = `linear(0.000, -0.02478 2%, -0.04616 4%, -0.05539 5%, -0.06362 6%, -0.07083 7%, -0.07702 8%, -0.08218 9%, -0.08629 10%, -0.08936 11%, -0.09139 12%, -0.09236 13%, -0.09227 14%, -0.09112 15%, -0.08891 16%, -0.08564 17%, -0.08130 18%, -0.07588 19%, -0.06940 20%, -0.06184 21%, -0.05321 22%, -0.04350 23%, -0.03272 24%, -0.02085 25%, -0.007900 26%, 0.006131 27%, 0.02125 28%, 0.03744 29%, 0.05473 30%, 0.07310 31%, 0.09256 32%, 0.1131 33%, 0.1348 34%, 0.1575 35%, 0.1813 36%, 0.2062 37%, 0.2322 38%, 0.2593 39%, 0.2875 40%, 0.3168 41%, 0.3472 42%, 0.3787 43%, 0.4113 44%, 0.4450 45%, 0.4798 46%, 0.5156 47%, 0.5526 48%, 0.6297 50%, 0.6672 51%, 0.7026 52%, 0.7359 53%, 0.7671 54%, 0.7964 55%, 0.8238 56%, 0.8493 57%, 0.8730 58%, 0.8950 59%, 0.9152 60%, 0.9339 61%, 0.9510 62%, 0.9666 63%, 0.9807 64%, 0.9934 65%, 1.005 66%, 1.015 67%, 1.024 68%, 1.031 69%, 1.038 70%, 1.043 71%, 1.052 73%, 1.056 75%, 1.058 77%, 1.056 79%, 1.053 81%, 1.048 83%, 1.038 86%, 1.016 92%, 1.007 95%, 1.003 97%, 1.000 99%, 1.000)`;

// https://robertpenner.com/fuse/#head_type=power-back&tail_type=power-back&join=0.497&head_anticipation=15&head_exponent=2.02&tail_overshoot=30&tail_exponent=3&duration=500
const curveCompressAnticipateExpandOvershoot2 = `linear(0.000, -0.02675 2%, -0.03881 3%, -0.04984 4%, -0.05980 5%, -0.06869 6%, -0.07648 7%, -0.08316 8%, -0.08872 9%, -0.09317 10%, -0.09648 11%, -0.09867 12%, -0.09971 13%, -0.09962 14%, -0.09838 15%, -0.09600 16%, -0.09246 17%, -0.08777 18%, -0.08193 19%, -0.07493 20%, -0.06677 21%, -0.05745 22%, -0.04697 23%, -0.03532 24%, -0.02251 25%, -0.008529 26%, 0.006619 27%, 0.02294 28%, 0.04043 29%, 0.05909 30%, 0.07893 31%, 0.09994 32%, 0.1221 33%, 0.1455 34%, 0.1700 35%, 0.1957 36%, 0.2226 37%, 0.2507 38%, 0.2800 39%, 0.3104 40%, 0.3421 41%, 0.3749 42%, 0.4089 43%, 0.4441 44%, 0.4804 45%, 0.5180 46%, 0.5567 47%, 0.5966 48%, 0.6798 50%, 0.7202 51%, 0.7580 52%, 0.7935 53%, 0.8265 54%, 0.8573 55%, 0.8859 56%, 0.9123 57%, 0.9367 58%, 0.9591 59%, 0.9795 60%, 0.9980 61%, 1.015 62%, 1.030 63%, 1.043 64%, 1.055 65%, 1.065 66%, 1.074 67%, 1.081 68%, 1.087 69%, 1.092 70%, 1.096 71%, 1.098 72%, 1.100 74%, 1.099 76%, 1.094 78%, 1.087 80%, 1.078 82%, 1.062 85%, 1.033 90%, 1.018 93%, 1.010 95%, 1.004 97%, 1.000 99%, 1.000)`;

// https://robertpenner.com/fuse/#head_type=power-back&tail_type=power-back&join=0.402&head_anticipation=15&head_exponent=2.02&tail_overshoot=30&tail_exponent=3&duration=700
const curveCompressAnticipateExpandOvershoot3 = `linear(0.000, -0.01459 1%, -0.02815 2%, -0.04038 3%, -0.05123 4%, -0.06066 5%, -0.06863 6%, -0.07515 7%, -0.08018 8%, -0.08374 9%, -0.08579 10%, -0.08635 11%, -0.08540 12%, -0.08294 13%, -0.07896 14%, -0.07346 15%, -0.06644 16%, -0.05789 17%, -0.04781 18%, -0.03620 19%, -0.02305 20%, -0.008361 21%, 0.007867 22%, 0.02564 23%, 0.04495 24%, 0.06581 25%, 0.08823 26%, 0.1122 27%, 0.1377 28%, 0.1648 29%, 0.1934 30%, 0.2236 31%, 0.2553 32%, 0.2886 33%, 0.3235 34%, 0.3599 35%, 0.3978 36%, 0.4374 37%, 0.4785 38%, 0.5212 39%, 0.6101 41%, 0.6525 42%, 0.6928 43%, 0.7308 44%, 0.7668 45%, 0.8006 46%, 0.8325 47%, 0.8623 48%, 0.8903 49%, 0.9164 50%, 0.9407 51%, 0.9632 52%, 0.9840 53%, 1.003 54%, 1.021 55%, 1.037 56%, 1.051 57%, 1.064 58%, 1.076 59%, 1.086 60%, 1.095 61%, 1.103 62%, 1.110 63%, 1.115 64%, 1.119 65%, 1.125 67%, 1.127 69%, 1.126 71%, 1.122 73%, 1.115 75%, 1.107 77%, 1.091 80%, 1.043 88%, 1.026 91%, 1.017 93%, 1.009 95%, 1.003 97%, 1.000 99%, 1.000)`;

//// RELEASE-SLIDE-OVER EASING

// https://robertpenner.com/fuse/#head_type=power-back&tail_type=power-back&join=0.198&head_anticipation=0&head_exponent=2&tail_overshoot=10&tail_exponent=3&duration=500
const curveOvershoot1 = `linear(0.000, 0.0009351 1%, 0.003740 2%, 0.008416 3%, 0.01496 4%, 0.02338 5%, 0.03366 6%, 0.04582 7%, 0.05985 8%, 0.07574 9%, 0.09351 10%, 0.1131 11%, 0.1347 12%, 0.1580 13%, 0.1833 14%, 0.2104 15%, 0.2394 16%, 0.2702 17%, 0.3030 18%, 0.3376 19%, 0.4102 21%, 0.4452 22%, 0.4790 23%, 0.5116 24%, 0.5430 25%, 0.5733 26%, 0.6024 27%, 0.6304 28%, 0.6573 29%, 0.6832 30%, 0.7079 31%, 0.7317 32%, 0.7761 34%, 0.8166 36%, 0.8534 38%, 0.8866 40%, 0.9163 42%, 0.9428 44%, 0.9661 46%, 0.9865 48%, 1.004 50%, 1.019 52%, 1.032 54%, 1.042 56%, 1.050 58%, 1.056 60%, 1.060 62%, 1.062 64%, 1.063 66%, 1.062 69%, 1.058 72%, 1.053 75%, 1.043 79%, 1.021 87%, 1.011 91%, 1.005 94%, 1.001 97%, 1.000)`;

//// DROP-BOUNCE EASING

// https://robertpenner.com/fuse/#head_type=power-back&tail_type=bounce&join=0.501&head_anticipation=0&head_exponent=2.05&bounces=4&decay=95&duration=1200
const curveGravityBounce1 = `linear(0.000, 0.001355 2%, 0.005611 4%, 0.01288 6%, 0.02324 8%, 0.03671 10%, 0.05335 12%, 0.07318 14%, 0.09622 16%, 0.1225 18%, 0.1520 20%, 0.1848 22%, 0.2209 24%, 0.2603 26%, 0.3030 28%, 0.3491 30%, 0.3985 32%, 0.4512 34%, 0.5073 36%, 0.5667 38%, 0.6296 40%, 0.6958 42%, 0.7654 44%, 0.8385 46%, 0.9149 48%, 0.9947 50%, 0.9792 51%, 0.9574 52%, 0.9378 53%, 0.9203 54%, 0.9051 55%, 0.8920 56%, 0.8811 57%, 0.8724 58%, 0.8659 59%, 0.8616 60%, 0.8595 61%, 0.8596 62%, 0.8618 63%, 0.8663 64%, 0.8729 65%, 0.8817 66%, 0.8928 67%, 0.9060 68%, 0.9213 69%, 0.9389 70%, 0.9587 71%, 0.9807 72%, 0.9971 73%, 0.9836 74%, 0.9722 75%, 0.9631 76%, 0.9561 77%, 0.9513 78%, 0.9487 79%, 0.9483 80%, 0.9500 81%, 0.9540 82%, 0.9601 83%, 0.9685 84%, 0.9790 85%, 0.9917 86%, 0.9963 87%, 0.9892 88%, 0.9843 89%, 0.9815 90%, 0.9810 91%, 0.9826 92%, 0.9864 93%, 0.9925 94%, 0.9996 95%, 0.9953 96%, 0.9932 97%, 0.9933 98%, 0.9955 99%, 1.000)`;

const GrabMotion = createMotionComponent(() => ({
  keyframes: [
    { scale: 1, boxShadow: tokens.shadow2, opacity: 1 },
    { scale: draggingScale, boxShadow: tokens.shadow8, opacity: 0.5 },
  ],
  duration: 600,
  easing: curveCompressAnticipateExpandSmooth2,
  fill: 'forwards',
}));

/**
 * DropMotion: a two-phase animation parameterised by the drag offset.
 *   Phase 1 — slide from (dragX, dragY) back to origin at a constant 110% scale
 *   Phase 2 — scale from 110% → 100%
 */
const DropMotion = createMotionComponent<{ dragX: number; dragY: number }>(({ dragX, dragY }) => {
  const dragDistance = Math.sqrt(dragX * dragX + dragY * dragY);
  const slideDuration = Math.max(dragDistance * 3, 400); // 3ms per pixel, with a minimum of 400ms;
  console.log('### slideDuration', slideDuration);
  const dropDurationOverlap = 300;
  return [
    {
      keyframes: [
        { translate: `${dragX}px ${dragY}px`, scale: draggingScale, boxShadow: tokens.shadow8, opacity: 0.5 },
        { translate: '0px 0px', scale: draggingScale, boxShadow: tokens.shadow8, opacity: 0.5 },
      ],
      duration: slideDuration,
      easing: curveOvershoot1,
      fill: 'both',
    },
    {
      delay: slideDuration - dropDurationOverlap,
      keyframes: [
        { scale: draggingScale, boxShadow: tokens.shadow8, opacity: 0.5 },
        { scale: 1, boxShadow: tokens.shadow2, opacity: 1 },
      ],
      duration: 800,
      easing: curveGravityBounce1,
      fill: 'forwards',
    },
  ];
});

const CARD_WIDTH = '340px';
const GRID_GAP = '20px';
const GRID_COLUMNS = 1;
const GRID_ROWS = 3;

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    boxSizing: 'border-box',
    backgroundColor: tokens.colorNeutralBackground5,
    padding: '10px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: `repeat(${GRID_COLUMNS}, ${CARD_WIDTH})`,
    gridAutoRows: '1fr',
    gap: GRID_GAP,
  },
  gridCell: {
    width: CARD_WIDTH,
    borderRadius: tokens.borderRadiusMedium,
    border: `2px dashed ${tokens.colorNeutralStroke2}`,
    backgroundColor: tokens.colorNeutralBackground3,
  },
  gridCellCardHome: {
    width: CARD_WIDTH,
    borderRadius: tokens.borderRadiusMedium,
    border: `2px solid transparent`,
    backgroundColor: tokens.colorNeutralBackground3,
  },
  gridCellCenter: {
    width: CARD_WIDTH,
    borderRadius: tokens.borderRadiusMedium,
    // transparent border to prevent layout shift when card moves in
    border: `2px solid ${tokens.colorNeutralBackground7}`,
    backgroundColor: tokens.colorNeutralBackground6,
  },
  card: {
    width: CARD_WIDTH,
    boxShadow: tokens.shadow2,
    userSelect: 'none',
  },
  cardDragging: {
    width: CARD_WIDTH,
    cursor: 'grabbing',
    boxShadow: tokens.shadow8,
    userSelect: 'none',
    ':active': {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  },
  cardIdle: {
    width: CARD_WIDTH,
    cursor: 'grab',
    userSelect: 'none',
    ':active': {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
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
  | { phase: 'grabbing'; x: number; y: number; key: number }
  | { phase: 'dragging'; x: number; y: number }
  | { phase: 'dropping'; x: number; y: number; key: number };

const CENTER_CELL = Math.floor((GRID_COLUMNS * GRID_ROWS) / 2);

export const App: React.FC = () => {
  const styles = useStyles();
  const [drag, setDrag] = useState<DragState>({ phase: 'idle' });
  const [cardIndex, setCardIndex] = useState(CENTER_CELL);
  const [targetIndex, setTargetIndex] = useState(CENTER_CELL);
  const targetIndexRef = useRef(CENTER_CELL);
  const dragStartRef = useRef({ mouseX: 0, mouseY: 0 });
  const grabCounter = useRef(0);
  const dropCounter = useRef(0);
  const cellRefs = useRef<(HTMLDivElement | null)[]>([]);

  const findClosestCell = useCallback(
    (cardCenterX: number, cardCenterY: number) => {
      let closest = cardIndex;
      let minDist = Infinity;
      for (let i = 0; i < GRID_COLUMNS * GRID_ROWS; i++) {
        const el = cellRefs.current[i];
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dist = Math.hypot(cardCenterX - cx, cardCenterY - cy);
        if (dist < minDist) {
          minDist = dist;
          closest = i;
        }
      }
      return closest;
    },
    [cardIndex],
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      dragStartRef.current = { mouseX: e.clientX, mouseY: e.clientY };
      targetIndexRef.current = cardIndex;
      setTargetIndex(cardIndex);
      grabCounter.current += 1;
      setDrag({ phase: 'grabbing', x: 0, y: 0, key: grabCounter.current });

      const handleMouseMove = (ev: MouseEvent) => {
        const dx = ev.clientX - dragStartRef.current.mouseX;
        const dy = ev.clientY - dragStartRef.current.mouseY;
        setDrag(prev => (prev.phase === 'grabbing' ? { ...prev, x: dx, y: dy } : { phase: 'dragging', x: dx, y: dy }));

        const cardEl = cellRefs.current[cardIndex];
        if (cardEl) {
          const rect = cardEl.getBoundingClientRect();
          const cardCenterX = rect.left + rect.width / 2 + dx;
          const cardCenterY = rect.top + rect.height / 2 + dy;
          setTargetIndex(prev => {
            const next = findClosestCell(cardCenterX, cardCenterY);
            if (prev !== next) {
              targetIndexRef.current = next;
              return next;
            }
            return prev;
          });
        }
      };

      const handleMouseUp = (ev: MouseEvent) => {
        const dx = ev.clientX - dragStartRef.current.mouseX;
        const dy = ev.clientY - dragStartRef.current.mouseY;

        // Compute offset from the card's current visual position to the target cell,
        // so the animation starts where the card is and ends in the target cell.
        const sourceEl = cellRefs.current[cardIndex];
        const currentTarget = targetIndexRef.current;
        const targetEl = cellRefs.current[currentTarget];
        let dropX = dx;
        let dropY = dy;
        if (sourceEl && targetEl) {
          const sourceRect = sourceEl.getBoundingClientRect();
          const targetRect = targetEl.getBoundingClientRect();
          const cellOffsetX = sourceRect.left - targetRect.left;
          const cellOffsetY = sourceRect.top - targetRect.top;
          dropX = dx + cellOffsetX;
          dropY = dy + cellOffsetY;
        }

        dropCounter.current += 1;
        setCardIndex(currentTarget);
        setDrag({ phase: 'dropping', x: dropX, y: dropY, key: dropCounter.current });
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    },
    [cardIndex, findClosestCell],
  );

  const handleGrabFinish = useCallback(() => {
    setDrag(prev => (prev.phase === 'grabbing' ? { phase: 'dragging', x: prev.x, y: prev.y } : prev));
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
          opacity: 0.5,
          userSelect: 'none',
        }
      : drag.phase === 'grabbing'
      ? {
          translate: `${drag.x}px ${drag.y}px`,
          userSelect: 'none',
        }
      : undefined;

  let cardCell: React.ReactNode;
  if (drag.phase === 'dropping') {
    cardCell = (
      <DropMotion key={drag.key} dragX={drag.x} dragY={drag.y} onMotionFinish={handleMotionFinish}>
        <div>
          <TaskCard className={styles.card} onMouseDown={handleMouseDown} />
        </div>
      </DropMotion>
    );
  } else if (drag.phase === 'grabbing') {
    cardCell = (
      <div style={cardStyle}>
        <GrabMotion key={drag.key} onMotionFinish={handleGrabFinish}>
          <div>
            <TaskCard className={styles.cardDragging} onMouseDown={handleMouseDown} />
          </div>
        </GrabMotion>
      </div>
    );
  } else {
    cardCell = (
      <div style={cardStyle}>
        <TaskCard
          className={drag.phase === 'dragging' ? styles.cardDragging : styles.cardIdle}
          onMouseDown={handleMouseDown}
        />
      </div>
    );
  }

  const cells = Array.from({ length: GRID_COLUMNS * GRID_ROWS }, (_, i) => {
    const isCardCell = i === cardIndex;
    const isTarget = (drag.phase === 'dragging' || drag.phase === 'grabbing') && i === targetIndex;
    const isCardHome = isCardCell && drag.phase === 'idle';
    const cellClass = isTarget ? styles.gridCellCenter : isCardHome ? styles.gridCellCardHome : styles.gridCell;

    return (
      <div
        key={i}
        ref={el => {
          cellRefs.current[i] = el;
        }}
        className={cellClass}
      >
        {isCardCell ? cardCell : null}
      </div>
    );
  });

  return (
    <div className={styles.root}>
      <div className={styles.grid}>{cells}</div>
    </div>
  );
};
