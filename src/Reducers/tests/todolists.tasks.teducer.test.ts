import {TodoListsType} from "../../components/app/App";
import {addTDlAC, todolistsReducer} from "../todolist.reducer";
import {tasksReducer, TasksStateType} from "../tasks.reducer";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodolistsState: TodoListsType = [];

    const action = addTDlAC({id: '2', title: 'newTodoListTitle', order: 0, addedDate: ''});

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.todoList.id);
    expect(idFromTodolists).toBe(action.todoList.id);
});