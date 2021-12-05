import React from 'react';
import {ComponentMeta, Story} from '@storybook/react';
import App from "../components/app/App";
import {ReduxStoreProviderDecorator} from "./Decorators/ReduxStoreProviderDecorator";



// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'APPExample',
    component: App,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof App>;



// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: Story = () => <App demo={true}/>;

export const AppExample = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
AppExample.args = {

    };
