import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import {createStore} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from './reducers'; // 您需要创建一个reducer来处理状态更新

const store = createStore(rootReducer); // 创建Redux store

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>,
    </React.StrictMode>
);
