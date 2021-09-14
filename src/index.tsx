import React from 'react';
import { configureStore } from "@reduxjs/toolkit";
import thunk from 'redux-thunk'
import rootReducer from "./services/reducers/rootReducer";
import { wsMiddleware } from "./services/middleware/wsMiddleware";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { Provider } from "react-redux";
import reportWebVitals from './reportWebVitals';

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk, wsMiddleware]
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
