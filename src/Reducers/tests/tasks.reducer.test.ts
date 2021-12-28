import { v1 } from 'uuid';

import { TaskPriorities, TaskStatuses } from '../../api/Todolists.api';
import { tasksReducer } from '../reducer/all-reducer';
import {
  addTaskTC,
  changeTaskStatusTC,
  changeTaskTitleTC,
  deleteTaskTC,
  getTasksTC,
  TasksStateType,
} from '../tasks.reducer';
import { addTodolistTC, getTodolistsTC, removeTodolistsTC } from '../todolist-reducer';

import {five, four, one, six, three, two, zero} from "Variables/Variables";

const todolistID1 = v1();
const todolistID2 = v1();
const todolistID3 = v1();
const todolistID4 = v1();
const todolistID5 = v1();
const taskID1 = v1();
let startState: TasksStateType = {};

beforeEach(() => {
  startState = {
    [todolistID1]: [
      {
        id: taskID1,
        title: 'sleep',
        status: TaskStatuses.New,
        addedDate: '01-01-2021',
        deadline: '',
        description: 'daily routine',
        startDate: '',
        order: 0,
        priority: TaskPriorities.Hi,
        todoListId: 'TD1',
      },
      {
        id: v1(),
        title: 'drink',
        status: TaskStatuses.New,
        addedDate: '01-01-2021',
        deadline: '',
        description: 'daily routine',
        startDate: '',
        order: 0,
        priority: TaskPriorities.Hi,
        todoListId: 'TD1',
      },
      {
        id: v1(),
        title: 'rave',
        status: TaskStatuses.New,
        addedDate: '01-01-2021',
        deadline: '',
        description: 'daily routine',
        startDate: '',
        order: 0,
        priority: TaskPriorities.Hi,
        todoListId: 'TD1',
      },
      {
        id: v1(),
        title: 'repeat',
        status: TaskStatuses.Completed,
        addedDate: '01-01-2021',
        deadline: '',
        description: 'daily routine',
        startDate: '',
        order: 0,
        priority: TaskPriorities.Hi,
        todoListId: 'TD1',
      },
    ],
    [todolistID2]: [
      {
        id: v1(),
        title: 'Metallica',
        status: TaskStatuses.Completed,
        addedDate: '01-01-2021',
        deadline: '',
        description: 'daily routine',
        startDate: '',
        order: 0,
        priority: TaskPriorities.Hi,
        todoListId: 'TD1',
      },
      {
        id: v1(),
        title: 'Neuro',
        status: TaskStatuses.New,
        addedDate: '01-01-2021',
        deadline: '',
        description: 'daily routine',
        startDate: '',
        order: 0,
        priority: TaskPriorities.Hi,
        todoListId: 'TD1',
      },
      {
        id: v1(),
        title: 'Ghost',
        status: TaskStatuses.New,
        addedDate: '01-01-2021',
        deadline: '',
        description: 'daily routine',
        startDate: '',
        order: 0,
        priority: TaskPriorities.Hi,
        todoListId: 'TD1',
      },
      {
        id: v1(),
        title: 'Liquid',
        status: TaskStatuses.Completed,
        addedDate: '01-01-2021',
        deadline: '',
        description: 'daily routine',
        startDate: '',
        order: 0,
        priority: TaskPriorities.Hi,
        todoListId: 'TD1',
      },
    ],
    [todolistID3]: [
      {
        id: v1(),
        title: 'Seven',
        status: TaskStatuses.Completed,
        addedDate: '01-01-2021',
        deadline: '',
        description: 'daily routine',
        startDate: '',
        order: 0,
        priority: TaskPriorities.Hi,
        todoListId: 'TD1',
      },
      {
        id: taskID1,
        title: 'Night',
        status: TaskStatuses.New,
        addedDate: '01-01-2021',
        deadline: '',
        description: 'daily routine',
        startDate: '',
        order: 0,
        priority: TaskPriorities.Hi,
        todoListId: 'TD1',
      },
      {
        id: v1(),
        title: 'Family Guy',
        status: TaskStatuses.New,
        addedDate: '01-01-2021',
        deadline: '',
        description: 'daily routine',
        startDate: '',
        order: 0,
        priority: TaskPriorities.Hi,
        todoListId: 'TD1',
      },
      {
        id: v1(),
        title: 'South Park',
        status: TaskStatuses.Completed,
        addedDate: '01-01-2021',
        deadline: '',
        description: 'daily routine',
        startDate: '',
        order: 0,
        priority: TaskPriorities.Hi,
        todoListId: 'TD1',
      },
    ],
    [todolistID4]: [
      {
        id: v1(),
        title: 'Train UseStyles',
        status: TaskStatuses.New,
        addedDate: '01-01-2021',
        deadline: '',
        description: 'daily routine',
        startDate: '',
        order: 0,
        priority: TaskPriorities.Hi,
        todoListId: 'TD1',
      },
      {
        id: v1(),
        title: 'Set up a background',
        status: TaskStatuses.New,
        addedDate: '01-01-2021',
        deadline: '',
        description: 'daily routine',
        startDate: '',
        order: 0,
        priority: TaskPriorities.Hi,
        todoListId: 'TD1',
      },
      {
        id: v1(),
        title: 'Create own style',
        status: TaskStatuses.New,
        addedDate: '01-01-2021',
        deadline: '',
        description: 'daily routine',
        startDate: '',
        order: 0,
        priority: TaskPriorities.Hi,
        todoListId: 'TD1',
      },
      {
        id: v1(),
        title: 'Push it to GitHub',
        status: TaskStatuses.New,
        addedDate: '01-01-2021',
        deadline: '',
        description: 'daily routine',
        startDate: '',
        order: 0,
        priority: TaskPriorities.Hi,
        todoListId: 'TD1',
      },
    ],
    [todolistID5]: [],
  };
});

test('exact task should be removed from exact array', () => {
  const finalState = tasksReducer(
    startState,
    deleteTaskTC.fulfilled({ todolistId: todolistID1, taskId: taskID1 }, '', {
      todolistID: todolistID1,
      taskId: taskID1,
    }),
  );

  expect(finalState[todolistID1].length).toBe(three);
  expect(finalState[todolistID3].length).toBe(four);
  expect(finalState[todolistID2].length).toBe(four);
  expect(finalState[todolistID4].length).toBe(four);
});

test('new task should be added to exact array', () => {
  const task = {
    todoListId: todolistID2,
    title: 'Дайте танк!',
    status: TaskStatuses.New,
    addedDate: '',
    deadline: '',
    description: '',
    order: 0,
    priority: 0,
    startDate: '',
    id: '234467',
  };

  const action = addTaskTC.fulfilled({ task }, 'requestId', {
    title: task.title,
    todolistID: task.todoListId,
  });

  const finalState = tasksReducer(startState, action);

  expect(finalState[todolistID2].length).toBe(five);
  expect(finalState[todolistID2][zero].title).toBe('Дайте танк!');
  expect(finalState[todolistID2][two].title).toBe('Neuro');
  expect(finalState[todolistID4].length).toBe(four);
  expect(finalState[todolistID2][four].title).toBe('Liquid');
});

test('task title should be changed in exact array', () => {
  const updateTitleModel = {
    todolistId: todolistID3,
    taskId: taskID1,
    title: 'It',
  };
  const finalState = tasksReducer(
    startState,
    changeTaskTitleTC.fulfilled(updateTitleModel, 'requestId', updateTitleModel),
  );

  expect(finalState[todolistID3][one].title).toBe('It');
  expect(finalState[todolistID3][two].title).toBe('Family Guy');
});

test('task status should be changed in exact array', () => {
  const newTaskID = v1();

  const updateModel = {
    todolistId: todolistID3,
    taskId: newTaskID,
    status: TaskStatuses.Completed,
  };
  const finalState = tasksReducer(
    startState,
    changeTaskStatusTC.fulfilled(updateModel, 'requestId', updateModel),
  );

  expect(finalState[todolistID3][one].status).toBe(TaskStatuses.New);
  expect(finalState[todolistID3][two].status).toBe(TaskStatuses.New);
  expect(finalState[todolistID3][zero].status).toBe(TaskStatuses.Completed);
  expect(finalState[todolistID3][three].status).toBe(TaskStatuses.Completed);
});

test('new array should be added when new todolist is added', () => {
  const action = addTodolistTC.fulfilled(
    { todoList: { id: '1', title: 'New affairs', addedDate: '', order: 0 } },
    'requestId',
    { title: '' },
  );

  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);
  const newKey = keys.find(
    k => k !== todolistID1 && k !== todolistID2 && k !== todolistID3 && k !== todolistID4,
  );
  if (!newKey) {
    throw Error('new key should be added');
  }

  expect(keys.length).toBe(six);
  expect(endState[newKey]).toEqual([]);
});

test('property with todolistId should be deleted', () => {
  const action = removeTodolistsTC.fulfilled({ id: todolistID3 }, 'requestId', {
    todolistId: todolistID3,
  });

  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);

  expect(keys.length).toBe(four);
  expect(endState[todolistID3]).not.toBeDefined();
});

test('new empty arrays of tasks should be added when todolists were set', () => {
  const action = getTodolistsTC.fulfilled(
    {
      todolists: [
        { id: '1', title: '111', order: 0, addedDate: '' },
        { id: '2', title: '222', order: 0, addedDate: '' },
      ],
    },
    'requestId',
  );

  const endState = tasksReducer({}, action);

  const keys = Object.keys(endState);

  expect(keys.length).toBe(two);
  expect(endState['1']).toStrictEqual([]);
  expect(endState['2']).toStrictEqual([]);
});

test('new arrays of tasks should be added to state when todolists were set', () => {
  const action = getTasksTC.fulfilled(
    {
      todolistID: todolistID5,
      tasks: [
        {
          id: '23',
          title: '11122',
          order: 0,
          addedDate: '',
          description: '',
          status: 0,
          priority: 0,
          startDate: '',
          deadline: '',
          todoListId: todolistID3,
        },
        {
          id: '32',
          title: '11133',
          order: 0,
          addedDate: '',
          description: '',
          status: 0,
          priority: 0,
          startDate: '',
          deadline: '',
          todoListId: todolistID3,
        },
      ],
    },
    '',
    todolistID5,
  );

  const endState = tasksReducer({ [todolistID5]: [] }, action);

  expect(endState[todolistID5].length).toBe(two);
  expect(endState[todolistID5][zero].id).toBe('23');
  expect(endState[todolistID5][one].title).toBe('11133');
});
