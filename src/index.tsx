import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import {store} from './store/store';
import { HashRouter } from 'react-router-dom';

export const reRenderEntireApp = () => {
    ReactDOM.render(
        <React.StrictMode>
            <Provider store={store}>
                <HashRouter>
                    <App/>
                </HashRouter>
            </Provider>
        </React.StrictMode>,
        document.getElementById('root')
    );
}

reRenderEntireApp()


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

if(process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('./components/app/App', () => {
        reRenderEntireApp()
    })
    /*module.hot.accept('./store/store', () => {
        reRenderEntireApp()
    })*/
}