import React from "react";
import ReactDOM from "react-dom";
import ReduxThunk from 'redux-thunk';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { BrowserRouter } from "react-router-dom";
import {allReducers} from './reducers/index';
import App from './app';
import './styling/app.css';

let store = createStore(allReducers, applyMiddleware(ReduxThunk));

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>, document.querySelector('#root'));
