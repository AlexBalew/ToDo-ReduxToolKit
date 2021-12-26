import { TodoListsType } from '../../components/app/App';
import { tasksReducer, todolistsReducer } from '../reducer/all-reducer';
import { TasksStateType } from '../tasks.reducer';
import { addTodolistTC } from '../todolist-reducer';
import {zero} from "../../Variables/Variables";

test('ids should be equals', () => {
  const startTasksState: TasksStateType = {};
  const startTodolistsState: TodoListsType = [];

  const action = addTodolistTC.fulfilled(
    {
      todoList: {
        id: '2',
        title: 'newTodoListTitle',
        order: 0,
        addedDate: '',
      },
    },
    'requestId',
    { title: '' },
  );

  const endTasksState = tasksReducer(startTasksState, action);
  const endTodolistsState = todolistsReducer(startTodolistsState, action);

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[zero];
  const idFromTodolists = endTodolistsState[zero].id;

  if (action.payload) {
    expect(idFromTasks).toBe(action.payload.todoList.id);
    expect(idFromTodolists).toBe(action.payload.todoList.id);
  }
});
