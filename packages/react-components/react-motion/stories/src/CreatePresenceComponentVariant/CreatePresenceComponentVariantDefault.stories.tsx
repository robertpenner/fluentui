import { createPresenceComponentVariant, Field, makeStyles, Switch, tokens } from '@fluentui/react-components';
import { Scale } from '@fluentui/react-motion-components-preview';
import * as React from 'react';
import type { JSXElement, PresenceComponentProps } from '@fluentui/react-components';

const useClasses = makeStyles({
  container: {
    display: 'grid',
    gridTemplate: `"controls ." "cards cards" / 1fr 1fr`,
    gap: '20px 10px',
  },
  cards: {
    display: 'flex',
    flexDirection: 'row',
    gap: '20px',
    gridArea: 'cards',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,

    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow16,
    padding: '20px',
    minHeight: '200px',
  },
  controls: {
    display: 'flex',
    flexDirection: 'column',
    gridArea: 'controls',

    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow16,
    padding: '10px',
  },
  field: {
    flex: 1,
  },

  item: {
    backgroundColor: tokens.colorBrandBackground,
    border: `${tokens.strokeWidthThicker} solid ${tokens.colorTransparentStroke}`,
    borderRadius: '50%',
    width: '100px',
    height: '100px',
  },
  cardTitle: {
    marginBottom: '50px',
    fontWeight: tokens.fontWeightSemibold,
  },
});

// Initial resistance is bezier (0.2, 0.6, 0.9, 0), then spring with 5 bounces & 95% decay
// const springWithResistance = `linear(0.000, 0.03796 1%, 0.06775 2%, 0.09199 3%, 0.1122 4%, 0.1292 5%, 0.1439 6%, 0.1565 7%, 0.1675 8%, 0.1771 9%, 0.1930 11%, 0.2056 13%, 0.2158 15%, 0.2280 18%, 0.2514 25%, 0.2628 28%, 0.2719 30%, 0.2828 32%, 0.2960 34%, 0.3125 36%, 0.3221 37%, 0.3330 38%, 0.3451 39%, 0.3589 40%, 0.3745 41%, 0.3922 42%, 0.4126 43%, 0.4361 44%, 0.4636 45%, 0.4964 46%, 0.5362 47%, 0.5864 48%, 0.6542 49%, 0.7625 50%, 0.9077 51%, 1.051 52%, 1.173 53%, 1.259 54%, 1.306 55%, 1.315 56%, 1.291 57%, 1.240 58%, 1.172 59%, 1.096 60%, 1.022 61%, 0.9553 62%, 0.9031 63%, 0.8683 64%, 0.8520 65%, 0.8531 66%, 0.8691 67%, 0.8962 68%, 0.9301 69%, 0.9662 70%, 1.001 71%, 1.030 72%, 1.052 73%, 1.066 74%, 1.071 75%, 1.068 76%, 1.058 77%, 1.044 78%, 1.010 80%, 0.9948 81%, 0.9820 82%, 0.9728 83%, 0.9677 84%, 0.9667 85%, 0.9692 86%, 0.9745 87%, 0.9976 90%, 1.005 91%, 1.010 92%, 1.014 93%, 1.016 94%, 1.016 95%, 1.014 96%, 1.007 98%, 1.000)`;
const springWithResistance = `linear(0, .038 1%, .092 3%, .129 5%, .168 8%, .193 11%, .216 15%, .251 25%, .283 32%, .312 36%, .345 39%, .375 41%, .413 43%, .464 45%, .536 47%, .654 49%, .763 50%, 1.05 52%, 1.26 54%, 1.32 56%, 1.24 58%, 1.1 60%, .955 62%, .868 64%, .853 66%, .896 68%, .966 70%, 1.03 72%, 1.07 75%, 1.04 78%, 1.01 80%, .982 82%, .968 84%, .969 86%, .998 90%, 1.01 94%, 1)`;
// const springWithResistance = `linear(0, .068 2%, .112 4%, .156 7%, .206 13%, .251 25%, .296 34%, .345 39%, .413 43%, .496 46%, .586 48%, .654 49%, .762 50%, 1.051 52%, 1.173 53%, 1.259 54%, 1.306 55%, 1.315 56%, 1.291 57%, 1.24 58%, .955 62%, .903 63%, .868 64%, .852 65%, .853 66%, .869 67%, .896 68%, 1.03 72%, 1.066 74%, 1.068 76%, .982 82%, .967 85%, .998 90%, 1.016 94%, 1)`;

// Initial anticipation is 30% with exponent 5, then 4 hard bounces with 95% decay
const anticipationWithBounce = `linear(0.000, -0.001322 1%, -0.005149 2%, -0.01127 3%, -0.01947 4%, -0.02955 5%, -0.04128 6%, -0.05447 7%, -0.06889 8%, -0.1006 10%, -0.1868 15%, -0.2196 17%, -0.2349 18%, -0.2490 19%, -0.2618 20%, -0.2732 21%, -0.2828 22%, -0.2905 23%, -0.2960 24%, -0.2993 25%, -0.2999 26%, -0.2978 27%, -0.2927 28%, -0.2844 29%, -0.2727 30%, -0.2574 31%, -0.2383 32%, -0.2152 33%, -0.1878 34%, -0.1559 35%, -0.1194 36%, -0.07801 37%, -0.03152 38%, 0.02026 39%, 0.07756 40%, 0.1406 41%, 0.2095 42%, 0.2846 43%, 0.3661 44%, 0.4541 45%, 0.5489 46%, 0.6506 47%, 0.7596 48%, 0.8760 49%, 1.000 50%, 0.9258 51%, 0.8584 52%, 0.7979 53%, 0.7441 54%, 0.6972 55%, 0.6572 56%, 0.6239 57%, 0.5975 58%, 0.5779 59%, 0.5652 60%, 0.5592 61%, 0.5601 62%, 0.5679 63%, 0.5824 64%, 0.6038 65%, 0.6320 66%, 0.6670 67%, 0.7089 68%, 0.7576 69%, 0.8131 70%, 0.8754 71%, 0.9446 72%, 0.9879 73%, 0.9460 74%, 0.9109 75%, 0.8826 76%, 0.8612 77%, 0.8466 78%, 0.8388 79%, 0.8379 80%, 0.8438 81%, 0.8565 82%, 0.8760 83%, 0.9024 84%, 0.9356 85%, 0.9756 86%, 0.9875 87%, 0.9655 88%, 0.9503 89%, 0.9419 90%, 0.9404 91%, 0.9456 92%, 0.9577 93%, 0.9767 94%, 0.9986 95%, 0.9852 96%, 0.9787 97%, 0.9789 98%, 0.9861 99%, 1.000)`;

// Variant of Scale with bouncy easings
const ScaleBouncey = createPresenceComponentVariant(Scale, {
  outScale: 0.5,
  duration: 1000,
  exitDuration: 1500,
  easing: springWithResistance,
  exitEasing: anticipationWithBounce,
  animateOpacity: false,
});

export const CreatePresenceComponentVariantDefault = (props: PresenceComponentProps): JSXElement => {
  const classes = useClasses();

  const [visible, setVisible] = React.useState<boolean>(true);

  return (
    <div className={classes.container}>
      <div className={classes.controls}>
        <Field className={classes.field}>
          <Switch label="Visible" checked={visible} onChange={() => setVisible(v => !v)} />
        </Field>
      </div>

      <div className={classes.cards}>
        {/* <div className={classes.card}>
          <div className={classes.cardTitle}>Scale</div>
          <Scale visible={visible}>
            <div className={classes.item} />
          </Scale>
        </div> */}

        <div className={classes.card}>
          <div className={classes.cardTitle}>{`createPresenceComponentVariant(Scale, { easing: bouncyEasing })`}</div>
          <ScaleBouncey visible={visible}>
            <div className={classes.item} />
          </ScaleBouncey>
        </div>
      </div>
    </div>
  );
};
