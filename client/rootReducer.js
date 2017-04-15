import { combineReducers } from 'redux';

import flashMessages from './reducers/flashMessages';
import auth from './reducers/auth';
import documents from './reducers/documents';
import users from './reducers/users';
import roles from './reducers/roles';
import types from './reducers/types';

export default combineReducers({
	flashMessages,
	auth,
	documents,
	users,
	roles,
	types
})
