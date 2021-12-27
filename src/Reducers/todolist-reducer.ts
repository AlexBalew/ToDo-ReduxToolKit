import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { todolistsAPI, TodolistType } from '../api/Todolists.api';
import { handleServerAppError, handleServerNetworkError } from '../utils/error-utils';

import { RequestStatusType, setAppStatusAC } from './app-reducer';

import { one, zero } from 'Variables/Variables';

export type FilterType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
  filter: FilterType;
  entityStatus: RequestStatusType;
};

export const getTodolistsTC = createAsyncThunk(
  'todolists/getTodolists',
  // eslint-disable-next-line consistent-return
  async (param, { dispatch }) => {
    dispatch(setAppStatusAC({ status: 'loading' }));
    const res = await todolistsAPI.getTDLists();
    try {
      dispatch(setAppStatusAC({ status: 'succeeded' }));
      return { todolists: res.data };
    } catch (error: any) {
      handleServerNetworkError(error, dispatch);
    }
  },
);

export const removeTodolistsTC = createAsyncThunk(
  'todolists/removeTodolists',
    // eslint-disable-next-line consistent-return
  async (param: { todolistId: string }, { dispatch }) => {
    dispatch(setAppStatusAC({ status: 'loading' }));
    dispatch(changeTDlEntityStatusAC({ status: 'loading', tlID: param.todolistId }));
    const res = await todolistsAPI.deleteTDLists(param.todolistId);
    try {
      if (res.data.resultCode === zero) {
        dispatch(setAppStatusAC({ status: 'succeeded' }));
        return { id: param.todolistId };
      }
      handleServerAppError(res.data, dispatch);
    } catch (error: any) {
      handleServerNetworkError(error, dispatch);
    }
  },
);

export const addTodolistTC = createAsyncThunk(
  'todolists/addTodolist',
    // eslint-disable-next-line consistent-return
  async (param: { title: string }, { dispatch }) => {
    dispatch(setAppStatusAC({ status: 'loading' }));
    const res = await todolistsAPI.createTDLists(param.title);
    try {
      if (res.data.resultCode === zero) {
        dispatch(setAppStatusAC({ status: 'succeeded' }));
        return { todoList: res.data.data.item };
      }
      handleServerAppError(res.data, dispatch);
    } catch (error: any) {
      handleServerNetworkError(error, dispatch);
    }
  },
);

export const changeTodolistTitleTC = createAsyncThunk(
  'todolists/changeTodolistTitle',
    // eslint-disable-next-line consistent-return
  async (param: { todolistId: string; title: string }, { dispatch }) => {
    dispatch(setAppStatusAC({ status: 'loading' }));
    const res = await todolistsAPI.updateTDLists(param.todolistId, param.title);
    try {
      if (res.data.resultCode === zero) {
        dispatch(setAppStatusAC({ status: 'succeeded' }));
        return { todolistId: param.todolistId, title: param.title };
      }
      handleServerAppError(res.data, dispatch);
    } catch (error: any) {
      handleServerNetworkError(error, dispatch);
    }
  },
);

export const sliceTodolist = createSlice({
  name: 'todolists',
  initialState: [] as Array<TodolistDomainType>,
  reducers: {
    /*    removeTDlAC(state, action: PayloadAction<{ id: string }>) {
                const index = state.findIndex(tl => tl.id === action.payload.id)
                if (index > -1) {
                    state.splice(index, 1)
                }
            }, */
    /*  addTDlAC(state, action: PayloadAction<{ todoList: TodolistType }>) {
              state.unshift({...action.payload.todoList, filter: 'all', entityStatus: 'idle'})
          }, */
    /* addTodolist(state, action: PayloadAction<{ todoList: TodolistType }>) {
            state.unshift({...action.payload.todoList, filter: 'all', entityStatus: 'idle'})
        }, */
    /* changeTDlTitleAC(state, action: PayloadAction<{ todolistId: string, title: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId)
            state[index].title = action.payload.title
        }, */
    changeTDlFilterAC(
      state,
      action: PayloadAction<{ filter: FilterType; todolistId: string }>,
    ) {
      const index = state.findIndex(tl => tl.id === action.payload.todolistId);
      // eslint-disable-next-line no-param-reassign
      state[index].filter = action.payload.filter;
    },
    changeTDlEntityStatusAC(
      state,
      action: PayloadAction<{ status: RequestStatusType; tlID: string }>,
    ) {
      const index = state.findIndex(tl => tl.id === action.payload.tlID);
      // eslint-disable-next-line no-param-reassign
      state[index].entityStatus = action.payload.status;
    },
    /* setTodolistsAC(state, action: PayloadAction<{ todolists: Array<TodolistType> }>) {
             return action.payload.todolists.map(tl => ({...tl, filter: "all", entityStatus: 'idle'}))
         }, */
    // clearTodoReduxAC(state, action: PayloadAction) {
    //   // state = []
    // },
  },
  extraReducers: builder => {
      // eslint-disable-next-line consistent-return
    builder.addCase(getTodolistsTC.fulfilled, (state, action) => {
      if (action.payload)
        return action.payload.todolists.map(tl => ({
          ...tl,
          filter: 'all',
          entityStatus: 'idle',
        }));
    });
    builder.addCase(removeTodolistsTC.fulfilled, (state, action) => {
      const index = state.findIndex(tl => tl.id === action.payload?.id);
      if (index > -one) {
        state.splice(index, one);
      }
    });
    builder.addCase(addTodolistTC.fulfilled, (state, action) => {
      if (action.payload)
        state.unshift({
          ...action.payload.todoList,
          filter: 'all',
          entityStatus: 'idle',
        });
    });
    builder.addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
      if (action.payload) {
        const index = state.findIndex(tl => tl.id === action.payload?.todolistId);
        // eslint-disable-next-line no-param-reassign
        state[index].title = action.payload.title;
      }
    });
  },
});

export const { changeTDlEntityStatusAC, changeTDlFilterAC } = sliceTodolist.actions;

// __thunks

/* export const getTodolistsTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todolistsAPI.getTDLists()
        .then(res => {
                dispatch(setTodolistsAC({todolists: res.data}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            }
        )
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

export const removeTodolistsTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    dispatch(changeTDlEntityStatusAC({status: 'loading', tlID: todolistId}))
    todolistsAPI.deleteTDLists(todolistId)
        .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(removeTDlAC({id: todolistId}))
                    dispatch(setAppStatusAC({status: 'succeeded'}))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            }
        )
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todolistsAPI.createTDLists(title)
        .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(addTDlAC({todoList: res.data.data.item}))
                    dispatch(setAppStatusAC({status: 'succeeded'}))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            }
        )
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

export const changeTodolistTitleTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todolistsAPI.updateTDLists(todolistId, title)
        .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(changeTDlTitleAC({todolistId: todolistId, title: title}))
                    dispatch(setAppStatusAC({status: 'succeeded'}))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            }
        )
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
} */
