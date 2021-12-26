// eslint-disable-next-line import/no-import-module-exports
import React from 'react';

// eslint-disable-next-line import/no-import-module-exports
import ReactDOM from 'react-dom';
// eslint-disable-next-line import/no-import-module-exports
import './index.css';
// eslint-disable-next-line import/no-import-module-exports
import { Provider } from 'react-redux';
// eslint-disable-next-line import/no-import-module-exports
import { HashRouter } from 'react-router-dom';

// eslint-disable-next-line import/no-import-module-exports
import App from './components/app/App';
// eslint-disable-next-line import/no-import-module-exports
import reportWebVitals from './reportWebVitals';
// eslint-disable-next-line import/no-import-module-exports
import { store } from './store/store';

export const reRenderEntireApp = () => {
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <HashRouter>
          <App />
        </HashRouter>
      </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
  );
};

reRenderEntireApp();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./components/app/App', () => {
    reRenderEntireApp();
  });
  /* module.hot.accept('./store/store', () => {
        reRenderEntireApp()
    }) */
}
