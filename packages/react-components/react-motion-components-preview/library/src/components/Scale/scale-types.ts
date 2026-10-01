import type {
  MotionComponent,
  MotionComponentProps,
  PresenceComponent,
  PresenceComponentProps,
} from '@fluentui/react-motion';
import type { JSXElement } from '@fluentui/react-utilities';
import type { BasePresenceParams, AnimateOpacity, MotionTiming, PoseEndpoints } from '../../types';
import type { ScalePose } from '../../atoms/scale-atom';

export type ScaleParams = BasePresenceParams &
  AnimateOpacity & {
    /** Scale for the out pose. Defaults to `0.9`. */
    outScale?: ScalePose;

    /** Scale for the in pose. Defaults to `1`. */
    inScale?: ScalePose;
  };

/** Parameters for a scale-only motion with at least one authored endpoint. */
export type ScaleMotionParams = Partial<MotionTiming> & PoseEndpoints<ScalePose>;

/** Parameters for a directional scale with optional opacity animation. */
export type ScaleDirectionalParams = ScaleParams & { from?: ScalePose; to?: ScalePose };

/** Props for bidirectional Scale presence behavior. */
export type ScalePresenceProps = PresenceComponentProps & ScaleParams & { from?: never; to?: never };

/** Props for a scale-only motion that plays on mount. */
export type ScaleMotionProps = MotionComponentProps &
  ScaleMotionParams & {
    visible?: never;
    appear?: never;
    unmountOnExit?: never;
    animateOpacity?: never;
    outScale?: never;
    inScale?: never;
    exitDuration?: never;
    exitEasing?: never;
    exitDelay?: never;
  };

/** Scale supports either presence props or one-way endpoint props. */
export type ScaleProps = ScalePresenceProps | ScaleMotionProps;

/** Scale's callable props and directional motions, with its presence definition retained for variants. */
export type ScaleComponent = PresenceComponent<ScaleParams> & {
  (props: ScaleProps): JSXElement | null;
  In: MotionComponent<ScaleDirectionalParams>;
  Out: MotionComponent<ScaleDirectionalParams>;
};
