import { html } from '@microsoft/fast-element';
import { type Meta, renderComponent, type StoryObj } from '../../helpers.stories.js';
import './fade';

type FadeStoryArgs = {
  slottedContent?: () => any;
};

const fadeInTemplate = html<FadeStoryArgs>` <fluent-fade-in> ${story => story.slottedContent?.()} </fluent-fade-in> `;

const fadeOutTemplate = html<FadeStoryArgs>`
  <fluent-fade-out> ${story => story.slottedContent?.()} </fluent-fade-out>
`;

export default {
  title: 'Components/Motion/Fade',
  render: renderComponent(fadeInTemplate),
  args: {
    slottedContent: () => html`
      <div style="padding: 20px; background: #f3f2f1; border-radius: 4px; border: 1px solid #edebe9;">
        <h3 style="margin: 0 0 10px 0; color: #323130;">Sample Content</h3>
        <p style="margin: 0; color: #605e5c;">This content will fade with the animation.</p>
      </div>
    `,
  },
  parameters: {
    docs: {
      description: {
        component: `
The Fade components provide smooth opacity transitions for content entering or leaving the interface.

- **fluent-fade-in**: Animates content from invisible (opacity: 0) to visible (opacity: 1)
- **fluent-fade-out**: Animates content from visible (opacity: 1) to invisible (opacity: 0)

Both animations have a duration of 1000ms with ease-in-out timing and use \`fill: 'both'\` to maintain the end state.
        `,
      },
    },
  },
} as Meta<FadeStoryArgs>;

export const FadeIn: StoryObj<FadeStoryArgs> = {
  render: renderComponent(fadeInTemplate),
  name: 'Fade In',
  parameters: {
    docs: {
      description: {
        story: 'Content that fades in from invisible to visible when the component is mounted.',
      },
    },
  },
};

export const FadeOut: StoryObj<FadeStoryArgs> = {
  render: renderComponent(fadeOutTemplate),
  name: 'Fade Out',
  parameters: {
    docs: {
      description: {
        story: 'Content that fades out from visible to invisible when the component is mounted.',
      },
    },
  },
};

export const FadeOutWithCard: StoryObj<FadeStoryArgs> = {
  render: renderComponent(fadeOutTemplate),
  name: 'Fade Out - Card Content',
  args: {
    slottedContent: () => html`
      <div
        style="
        max-width: 300px;
        padding: 16px;
        background: white;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        border: 1px solid #e1dfdd;
      "
      >
        <h4 style="margin: 0 0 8px 0; color: #323130;">Card Title</h4>
        <p style="margin: 0 0 12px 0; color: #605e5c; font-size: 14px;">
          This card content will fade out when the component is mounted.
        </p>
        <div
          style="
          padding: 6px 12px;
          background: #f3f2f1;
          border: 1px solid #d1d1d1;
          border-radius: 2px;
          cursor: pointer;
          display: inline-block;
          font-size: 14px;
        "
          @click="${() => alert('Action clicked!')}"
        >
          Action
        </div>
      </div>
    `,
  },
  parameters: {
    docs: {
      description: {
        story: 'A card component that fades out, showing how complex content can be animated.',
      },
    },
  },
};

const bothAnimationsTemplate = html<FadeStoryArgs>`
  <div style="display: flex; gap: 20px; flex-wrap: wrap;">
    <div style="flex: 1; min-width: 250px;">
      <h4 style="margin: 0 0 10px 0;">Fade In</h4>
      <fluent-fade-in>
        <div style="padding: 16px; background: #e1f5fe; border-radius: 4px; border: 1px solid #0078d4;">
          <strong>Fade In Content</strong>
          <p style="margin: 8px 0 0 0; font-size: 14px;">This content fades in from transparent to opaque.</p>
        </div>
      </fluent-fade-in>
    </div>
    <div style="flex: 1; min-width: 250px;">
      <h4 style="margin: 0 0 10px 0;">Fade Out</h4>
      <fluent-fade-out>
        <div style="padding: 16px; background: #fef7e0; border-radius: 4px; border: 1px solid #ffb900;">
          <strong>Fade Out Content</strong>
          <p style="margin: 8px 0 0 0; font-size: 14px;">This content fades out from opaque to transparent.</p>
        </div>
      </fluent-fade-out>
    </div>
  </div>
`;

export const BothAnimations: StoryObj<FadeStoryArgs> = {
  render: renderComponent(bothAnimationsTemplate),
  name: 'Both Animations',
  parameters: {
    docs: {
      description: {
        story: 'A side-by-side comparison showing both fade-in and fade-out animations.',
      },
    },
  },
};
