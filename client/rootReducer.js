import { combineReducers } from 'redux';

import flashMessages from './reducers/flashMessages';
import auth from './reducers/auth';
import documents from './reducers/documents';
import users from './reducers/users';

export default combineReducers({
	flashMessages,
	auth,
	documents,
	users
})
