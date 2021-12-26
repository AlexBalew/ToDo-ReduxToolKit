import { v1 } from 'uuid';

import { TodoListsType } from '../../components/app/App';
import { RequestStatusType } from '../app-reducer';
import { todolistsReducer } from '../reducer/all-reducer';
import {
  addTodolistTC,
  changeTDlEntityStatusAC,
  changeTDlFilterAC,
  changeTodolistTitleTC,
  FilterType,
  getTodolistsTC,
  removeTodolistsTC,
} from '../todolist-reducer';

import { five, four, one, three, two, zero } from 'Variables/Variables';

let todolistID1: string;
let todolistID2: string;
let todolistID3: string;
let todolistID4: string;
let startState: TodoListsType;

beforeEach(() => {
  todolistID1 = v1();
  todolistID2 = v1();
  todolistID3 = v1();
  todolistID4 = v1();

  startState = [
    {
      id: todolistID1,
      title: 'Affairs',
      filter: 'all',
      order: 0,
      addedDate: '',
      entityStatus: 'idle',
    },
    {
      id: todolistID2,
      title: 'Music',
      filter: 'all',
      order: 0,
      addedDate: '',
      entityStatus: 'succeeded',
    },
    {
      id: todolistID3,
      title: 'Movies',
      filter: 'all',
      order: 0,
      addedDate: '',
      entityStatus: 'failed',
    },
    {
      id: todolistID4,
      title: 'TDList',
      filter: 'active',
      order: 0,
      addedDate: '',
      entityStatus: 'idle',
    },
  ];
});

test('exact todolist should be removed', () => {
  const finalState = todolistsReducer(
    startState,
    removeTodolistsTC.fulfilled({ id: todolistID4 }, 'requestId', {
      todolistId: todolistID4,
    }),
  );

  expect(finalState.length).toBe(three);
  expect(finalState[one].id).toBe(todolistID2);
});

test('exact todolist should be added', () => {
  const newTodoListTitle = 'New SOW';

  const newTodolist = {
    todoList: { id: '2', title: newTodoListTitle, order: 0, addedDate: '' },
  };
  const finalState = todolistsReducer(
    startState,
    addTodolistTC.fulfilled(newTodolist, 'requestId', { title: newTodoListTitle }),
  );

  expect(finalState.length).toBe(five);
  expect(finalState[zero].title).toBe(newTodoListTitle);
});

test('exact todolists title should be changed', () => {
  const newTDLTitleData = { todolistId: todolistID3, title: 'New SOW' };
  const finalState = todolistsReducer(
    startState,
    changeTodolistTitleTC.fulfilled(newTDLTitleData, 'requestId', newTDLTitleData),
  );

  expect(finalState[two].title).toBe('New SOW');
  expect(finalState[three].title).toBe('TDList');
});

test('exact todolists filter value should be changed', () => {
  const newFilterValue: FilterType = 'completed';

  const finalState = todolistsReducer(
    startState,
    changeTDlFilterAC({
      filter: newFilterValue,
      todolistId: todolistID1,
    }),
  );

  expect(finalState[two].filter).toBe('all');
  expect(finalState[zero].filter).toBe('completed');
  expect(finalState[one].filter).toBe('all');
});

test('todolists should be set', () => {
  const finalState = todolistsReducer(
    [],
    getTodolistsTC.fulfilled({ todolists: startState }, 'requestId'),
  );

  expect(finalState.length).toBe(four);
  expect(finalState[one].filter).toBe('all');
  expect(finalState[zero].title).toBe('Affairs');
  expect(finalState[two].id).toBe(todolistID3);
  expect(finalState[three].filter).toBe('all');
});

test('exact todolists entity status should be changed', () => {
  const newEntityStatus: RequestStatusType = 'succeeded';

  const finalState = todolistsReducer(
    startState,
    changeTDlEntityStatusAC({
      status: newEntityStatus,
      tlID: todolistID1,
    }),
  );

  expect(finalState[zero].entityStatus).toBe('succeeded');
  expect(finalState[two].entityStatus).toBe('failed');
});
