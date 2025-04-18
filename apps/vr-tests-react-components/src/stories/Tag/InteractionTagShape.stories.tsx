import * as React from 'react';
import { InteractionTag, InteractionTagPrimary, InteractionTagSecondary } from '@fluentui/react-tags';
import type { Meta } from '@storybook/react';
import { getStoryVariant, RTL } from '../../utilities';
import { Avatar } from '@fluentui/react-avatar';
import { Steps, type StoryParameters } from 'storywright';

const contentId = 'content-id';
const dismissButtonId = 'dismiss-button-id';

const defaultSteps = new Steps()
  .snapshot('default')

  // This needs to be added so that the focus outline is shown correctly
  .executeScript(`document.querySelector('#${contentId}').setAttribute('data-fui-focus-visible', '')`)
  .focus(`#${contentId}`)
  .snapshot('focus content')
  .executeScript(`document.querySelector('#${contentId}').removeAttribute('data-fui-focus-visible')`)
  .end();

const dismissSteps = new Steps()
  .snapshot('default')
  // This needs to be added so that the focus outline is shown correctly
  .executeScript(`document.querySelector('#${contentId}').setAttribute('data-fui-focus-visible', '')`)
  .focus(`#${contentId}`)
  .snapshot('focus content')
  .executeScript(`document.querySelector('#${contentId}').removeAttribute('data-fui-focus-visible')`)

  // This needs to be added so that the focus outline is shown correctly
  .executeScript(`document.querySelector('#${dismissButtonId}').setAttribute('data-fui-focus-visible', '')`)
  .focus(`#${dismissButtonId}`)
  .snapshot('focus dismiss')
  .executeScript(`document.querySelector('#${dismissButtonId}').removeAttribute('data-fui-focus-visible')`)
  .end();

export default {
  title: 'InteractionTag Converged',
  component: InteractionTag,
  parameters: { storyWright: { steps: defaultSteps } } satisfies StoryParameters,
} satisfies Meta<typeof InteractionTag>;

export const Rounded = () => (
  <InteractionTag>
    <InteractionTagPrimary id={contentId}>Primary Text</InteractionTagPrimary>
  </InteractionTag>
);

export const RoundedWithSecondaryText = () => (
  <InteractionTag>
    <InteractionTagPrimary id={contentId} secondaryText="Secondary Text">
      Primary Text
    </InteractionTagPrimary>
  </InteractionTag>
);

export const RoundedWithMedia = () => (
  <InteractionTag>
    <InteractionTagPrimary id={contentId} media={<Avatar name="Lydia Bauer" badge={{ status: 'available' }} />}>
      Primary Text
    </InteractionTagPrimary>
  </InteractionTag>
);
export const RoundedWithMediaRTL = getStoryVariant(RoundedWithMedia, RTL);

export const RoundedDismissible = () => (
  <InteractionTag>
    <InteractionTagPrimary id={contentId} hasSecondaryAction>
      Primary Text
    </InteractionTagPrimary>
    <InteractionTagSecondary id={dismissButtonId} />
  </InteractionTag>
);
RoundedDismissible.parameters = { storyWright: { steps: dismissSteps } } satisfies StoryParameters;
export const RoundedDismissibleRTL = getStoryVariant(RoundedDismissible, RTL);

export const Circular = () => (
  <InteractionTag shape="circular">
    <InteractionTagPrimary id={contentId}>Primary Text</InteractionTagPrimary>
  </InteractionTag>
);

export const CircularWithSecondaryText = () => (
  <InteractionTag shape="circular">
    <InteractionTagPrimary id={contentId} secondaryText="Secondary Text">
      Primary Text
    </InteractionTagPrimary>
  </InteractionTag>
);

export const CircularWithMedia = () => (
  <InteractionTag shape="circular">
    <InteractionTagPrimary id={contentId} media={<Avatar name="Lydia Bauer" badge={{ status: 'available' }} />}>
      Primary Text
    </InteractionTagPrimary>
  </InteractionTag>
);
export const CircularWithMediaRTL = getStoryVariant(CircularWithMedia, RTL);

export const CircularDismissible = () => (
  <InteractionTag shape="circular">
    <InteractionTagPrimary id={contentId} hasSecondaryAction>
      Primary Text
    </InteractionTagPrimary>
    <InteractionTagSecondary id={dismissButtonId} />
  </InteractionTag>
);
CircularDismissible.parameters = { storyWright: { steps: dismissSteps } } satisfies StoryParameters;

export const CircularDismissibleRTL = getStoryVariant(CircularDismissible, RTL);
