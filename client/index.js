import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './rootReducer';
import setAuthorisationToken from './utils/setAuthorisationToken';
import { setCurrentUser } from './actions/authActions';

import routes from './routes';

// reducer takes state and action and return a new state
// thunk middleware allows us to dispatch asynchronous actions
const store = createStore(
	rootReducer,
	compose(
		applyMiddleware(thunk),
		window.devToolsExtension ? window.devToolsExtension() : f => f
	)
);

if (localStorage.jwtToken) {
	setAuthorisationToken(localStorage.jwtToken);
	store.dispatch(setCurrentUser(JSON.parse(localStorage.dmsUser)));
}

render(
	<Provider store={store}>
		<Router history={browserHistory} routes={routes} />
	</Provider>, document.getElementById('app'));
