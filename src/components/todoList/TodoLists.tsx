import React, { useCallback, useEffect } from 'react';

import { Grid, Paper } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { TaskStatuses } from '../../api';
import { MainReducerType } from '../../store';
import { AddItemForm } from '../addItemForm';
import { TodoListsType } from '../app/App';

import { TodoList } from './todolist/todolist';

import {
  addTaskTC,
  changeTaskStatusTC,
  changeTaskTitleTC,
  deleteTaskTC,
  TasksStateType,
} from 'Reducers/tasks.reducer';
import {
  addTodolistTC,
  changeTDlFilterAC,
  changeTodolistTitleTC,
  FilterType,
  getTodolistsTC,
  removeTodolistsTC,
} from 'Reducers/todolist-reducer';

export const TodoLists = React.memo(() => {
  const dispatch = useDispatch();
  const todolistsFromState = useSelector<MainReducerType, TodoListsType>(
    state => state.todoLists,
  );
  const tasksFromState = useSelector<MainReducerType, TasksStateType>(
    state => state.tasks,
  );
  const isLoggedIn = useSelector<MainReducerType, boolean>(
    state => state.login.isLoggedIn,
  );

  useEffect(() => {
    if (!todolistsFromState.length) {
      dispatch(getTodolistsTC());
    }
  }, []);

  const addTask = useCallback(
    (todolistID: string, title: string) => {
      dispatch(addTaskTC({ todolistID, title }));
    },
    [dispatch],
  );

  const changeTaskStatus = useCallback(
    (todolistId: string, taskId: string, status: TaskStatuses) => {
      dispatch(changeTaskStatusTC({ todolistId, taskId, status }));
    },
    [dispatch],
  );

  const deleteTask = useCallback(
    (todolistID: string, taskId: string) => {
      dispatch(deleteTaskTC({ todolistID, taskId }));
    },
    [dispatch],
  );

  const onChangeTaskTitle = useCallback(
    (todolistId: string, taskId: string, title: string) => {
      dispatch(changeTaskTitleTC({ todolistId, taskId, title }));
    },
    [dispatch],
  );
  const changeFilter = useCallback(
    (filter: FilterType, todolistId: string) => {
      dispatch(changeTDlFilterAC({ filter, todolistId }));
    },
    [dispatch],
  );

  const removeTDFunc = useCallback(
    (todolistId: string) => {
      dispatch(removeTodolistsTC({ todolistId }));
    },
    [dispatch],
  );

  const addTDList = useCallback(
    (title: string) => {
      dispatch(addTodolistTC({ title }));
    },
    [dispatch],
  );

  const changeTDListTitleAPP = useCallback(
    (todolistId: string, title: string) => {
      dispatch(changeTodolistTitleTC({ todolistId, title }));
    },
    [dispatch],
  );

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Grid container style={{ padding: '20px' }}>
        <AddItemForm callback={addTDList} label="new todolist title" />
      </Grid>
      <Grid container spacing={4}>
        {todolistsFromState.map(tl => {
          const filteredTasks = tasksFromState[tl.id];

          return (
            <Grid item key={tl.id}>
              <Paper style={{ padding: '10px' }}>
                <TodoList
                  key={tl.id}
                  id={tl.id}
                  title={tl.title}
                  tasks={filteredTasks}
                  deleteTask={deleteTask}
                  changeFilter={changeFilter}
                  addTask={addTask}
                  changeTaskStatus={changeTaskStatus}
                  removeTDFunc={removeTDFunc}
                  onChangeTaskTitle={onChangeTaskTitle}
                  changeTDListTitleAPP={changeTDListTitleAPP}
                  todolist={tl}
                />
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
});
