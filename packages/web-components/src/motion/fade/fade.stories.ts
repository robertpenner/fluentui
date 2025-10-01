import { html } from '@microsoft/fast-element';
import { type Meta, renderComponent, type StoryObj } from '../../helpers.stories.js';
import './fade';

type FadeStoryArgs = {
  slottedContent?: () => any;
  visible?: boolean;
};

const cardStyles = 'padding: 20px; background: #f3f2f1; border-radius: 4px; border: 1px solid #edebe9;';
const textStyles = { heading: 'margin: 0 0 10px 0; color: #323130;', body: 'margin: 0; color: #605e5c;' };

const sampleContent = html`
  <div style="${cardStyles}">
    <h3 style="${textStyles.heading}">Sample Content</h3>
    <p style="${textStyles.body}">Content that fades in and out.</p>
  </div>
`;

const template = html<FadeStoryArgs>`
  <fluent-fade visible="${story => story.visible}"> ${story => story.slottedContent?.() || sampleContent} </fluent-fade>
`;

const interactiveTemplate = html<FadeStoryArgs>`
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <div style="display: flex; gap: 10px; align-items: center;">
      <fluent-switch
        id="visibility-switch"
        @change="${() => {
          const switchEl = document.getElementById('visibility-switch') as any;
          const fadeEl = document.getElementById('interactive-fade') as any;
          if (fadeEl && switchEl) fadeEl.visible = switchEl.checked;
        }}"
      >
        Visible
      </fluent-switch>
      <span style="font-size: 14px; color: #605e5c;">Toggle to see the animation</span>
    </div>
    <fluent-fade id="interactive-fade" visible="false">
      <div style="${cardStyles} max-width: 400px;">
        <h3 style="${textStyles.heading}">Interactive Content</h3>
        <p style="${textStyles.body}">Toggle the switch above to see smooth fade animations.</p>
      </div>
    </fluent-fade>
  </div>
`;

export default {
  title: 'Components/Motion/Fade',
  render: renderComponent(template),
  args: {
    visible: false,
  },
  argTypes: {
    visible: {
      control: 'boolean',
      description: 'Controls whether the content is visible (triggers enter/exit animations)',
      table: {
        category: 'attributes',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    slottedContent: { table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        component: `
The Fade component provides smooth opacity transitions for entering/exiting content.

**fluent-fade**: Stateful component with \`visible\` property controlling animations
  - \`visible=true\`: fade in animation
  - \`visible=false\`: fade out animation
  - Default: invisible

Animation: 1000ms duration, ease-in-out timing, maintains end state.
        `,
      },
    },
  },
} as Meta<FadeStoryArgs>;

export const Default: StoryObj<FadeStoryArgs> = {
  render: renderComponent(interactiveTemplate),
  name: 'Interactive Presence',
  parameters: {
    docs: {
      description: {
        story: 'Toggle visibility to see fade animations.',
      },
    },
  },
};
