import React from 'react';

import {action} from "@storybook/addon-actions";
import {ComponentStory, ComponentMeta} from '@storybook/react';

import {AddItemForm} from "../components";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'AddItemFormExample',
    component: AddItemForm,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        onClick: {
            description: 'Button is clicked'
        }
    },
} as ComponentMeta<typeof AddItemForm>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args} />;

export const AddItemFormExample = Template.bind({});

// More on args: https://storybook.js.org/docs/react/writing-stories/args
AddItemFormExample.args = {
    callback: action('Button is clicked'),
    disabled: false
};
