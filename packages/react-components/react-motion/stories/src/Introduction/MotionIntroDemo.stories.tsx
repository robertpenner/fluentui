import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import type { Meta } from '@storybook/react-webpack5';

import { MotionIntroDemo } from './MotionIntroDemo';

const meta: Meta<typeof MotionIntroDemo> = {
  title: 'Motion/Introduction/Get started',
  component: MotionIntroDemo,
};

export default meta;

export const GetStarted = (): JSXElement => <MotionIntroDemo />;
