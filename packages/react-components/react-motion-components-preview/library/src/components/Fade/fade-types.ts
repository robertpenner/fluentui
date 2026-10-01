import type { MotionComponentProps, PresenceComponent, PresenceComponentProps } from '@fluentui/react-motion';
import type { JSXElement } from '@fluentui/react-utilities';
import type { BasePresenceParams, MotionTiming, PoseEndpoints } from '../../types';
import type { FadePose } from '../../atoms/fade-atom';

export type FadeParams = BasePresenceParams & {
  /** Opacity for the out state (exited). Defaults to 0. */
  outOpacity?: FadePose;

  /** Opacity for the in state (entered). Defaults to 1. */
  inOpacity?: FadePose;
};

/** Parameters for an opacity motion with at least one authored endpoint. */
export type FadeMotionParams = Partial<MotionTiming> & PoseEndpoints<FadePose>;

/** Parameters for a directional fade; omitted endpoints use direction-specific defaults. */
export type FadeDirectionalParams = FadeParams & { from?: FadePose; to?: FadePose };

/** Props for bidirectional Fade presence behavior. */
export type FadePresenceProps = PresenceComponentProps & FadeParams & { from?: never; to?: never };

/** Props for a one-way Fade that plays on mount. */
export type FadeMotionProps = MotionComponentProps &
  FadeMotionParams & {
    visible?: never;
    appear?: never;
    unmountOnExit?: never;
    outOpacity?: never;
    inOpacity?: never;
    exitDuration?: never;
    exitEasing?: never;
    exitDelay?: never;
  };

/** Fade supports either presence props or one-way endpoint props. */
export type FadeProps = FadePresenceProps | FadeMotionProps;

/** Fade's callable props and directional motions, with its presence definition retained for variants. */
export type FadeComponent = PresenceComponent<FadeParams, FadeMotionParams, FadeDirectionalParams> & {
  (props: FadeProps): JSXElement | null;
};
