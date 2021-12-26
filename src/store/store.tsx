// eslint-disable-next-line import/no-import-module-exports
import { configureStore } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-import-module-exports
import { useDispatch } from 'react-redux';
// eslint-disable-next-line import/no-import-module-exports
import thunk from 'redux-thunk';

// eslint-disable-next-line import/no-import-module-exports
import { mainReducer } from './mainReducer';

// export let store = createStore(mainReducer, applyMiddleware(thunk)) //redux approach

export const store = configureStore({
  // redux toolkit approach
  reducer: mainReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk),
});

type AppDispatchType = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatchType>();

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./mainReducer', () => {
    store.replaceReducer(mainReducer);
  });
}

// @ts-ignore
window.store = store;
