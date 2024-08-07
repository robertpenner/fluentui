import type { StoryContext as StoryContextOrigin, Parameters } from '@storybook/react';
import type { ParametersExtension, PresetConfig } from './public-types';

export interface StoryContext extends StoryContextOrigin {
  parameters: Parameters & ParametersExtension;
}

export type { ParametersExtension, PresetConfig };
