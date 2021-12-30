import React from 'react';

import {action} from "@storybook/addon-actions";
import {ComponentStory, ComponentMeta} from '@storybook/react';

import {EditableSpan} from "../components";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'EditableSpanExample',
    component: EditableSpan,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        onChange: {
            description: 'Value was changed'
        },
        title: {
           defaultValue: 'DoubleClick me',
           description: 'Default value of  EditableSpan'
        }
    },
} as ComponentMeta<typeof EditableSpan>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args} />;

export const EditableSpanExample = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
EditableSpanExample.args = {
   onChange: action('Value was changed')
};
