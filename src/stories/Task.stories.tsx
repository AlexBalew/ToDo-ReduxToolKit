import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {Task} from "../components/task/Task";
import {TaskPriorities, TaskStatuses} from "../api/Todolists.api";

export default {
    title: 'TaskExample',
    component: Task,
} as ComponentMeta<typeof Task>;

const baseArgs = {
    changeTaskStatus: action('Task status was changed'),
    onChangeTitle: action('Task title was changed'),
    deleteTask: action('Exact task was deleted'),
}

const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskExample = Template.bind({});

TaskExample.args = {
    ...baseArgs,
    task: {
        id: '48', title: 'Feed the cat', status: TaskStatuses.InProgress,
        addedDate: '01-01-2021', deadline: '', description: 'daily routine', startDate: '', order: 0,
        priority: TaskPriorities.Hi, todoListId: 'TD1'
    },
    todolistId: 'TD1'
};
