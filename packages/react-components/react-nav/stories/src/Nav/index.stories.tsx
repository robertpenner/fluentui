import { Nav } from '@fluentui/react-components';

// Todo: add best practices
// import bestPracticesMd from './NavBestPractices.md';

import descriptionMd from './NavDescription.md';
import accessibilityMd from './NavAccessibility.md';

export { Basic } from '../NavDrawer/Basic.stories';
export { VariableDensityItems } from '../NavDrawer/VariableDensityItems.stories';
export { Controlled } from '../NavDrawer/Controlled.stories';
export { SplitNavItems } from '../NavDrawer/SplitNavItems.stories';
export { CustomMotion } from '../NavDrawer/CustomMotion.stories';

export default {
  title: 'Components/Nav',
  component: Nav,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, accessibilityMd].join('\n'),
      },
    },
  },
};
