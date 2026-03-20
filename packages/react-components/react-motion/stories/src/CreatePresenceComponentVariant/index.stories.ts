import type { Meta } from '@storybook/react-webpack5';
import CreatePresenceComponentVariantDescription from './CreatePresenceComponentVariantDescription.md';
import { CreatePresenceComponentVariantDefault } from './CreatePresenceComponentVariantDefault.stories';
export { CreatePresenceComponentVariantDefault as Default } from './CreatePresenceComponentVariantDefault.stories';

export default {
  title: 'Motion/APIs/createPresenceComponentVariant',
  component: CreatePresenceComponentVariantDefault,
  parameters: {
    docs: {
      description: {
        component: CreatePresenceComponentVariantDescription,
      },
    },
  },
} satisfies Meta;
