import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import {createStore} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from './reducers';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';
import './locale/index';

const persistConfig = {
    key: 'settings',
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer); // 创建Redux store
const persistor = persistStore(store); // 创建持久化的store

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <App />
            </PersistGate>
        </Provider>,
    </React.StrictMode>
);
