import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux'

import routes from './routes';

// reducer takes state and action and return a new state
// thunk middleware allows us to dispatch asynchronous actions
const store = createStore(
	(state = {}) => state,
	applyMiddleware(thunk)
)

render(
	<Provider store={store}>
		<Router history={browserHistory} routes={routes} />
	</Provider>, document.getElementById('app'));
