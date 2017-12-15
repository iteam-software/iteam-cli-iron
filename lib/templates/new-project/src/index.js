import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { routerMiddleware, routerReducer, ConnectedRouter } from 'react-router-redux';

import AppRouter from './routes/AppRouter';
import rootReducer from './reducers';
import middleware from './middleware';
import {errorMiddlewareFactory} from './middleware/core/errorMiddleware';

const history = createHistory();
const store = createStore(
  combineReducers({
    ...rootReducer,
    router: routerReducer,
  }),  
  applyMiddleware(
    errorMiddlewareFactory(),
    thunk,
    routerMiddleware(history),
    ...middleware)
);

ReactDOM.render(
  <Provider store={store}>
    <AppRouter history={history} />
  </Provider>,
  document.getElementById('app')
);