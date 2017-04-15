import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import SignupPage from './components/signup/SignupPage';
import LoginPage from './components/login/LoginPage';
import SingleDocument from './components/documents/SingleDocument';
import UserDocument from './components/documents/UserDocument';
import HomePage from './components/home/HomePage';
import Users from './components/user/Users';
import UserProfile from './components/user/UserProfile';
import SearchPage from './components/search/SearchPage';
import PageNotFound from './components/NotFound/PageNotFound';
import Types from './components/type/Types';
import Roles from './components/role/Roles';
import requireAuth from './utils/requireAuth';
import requireAdmin from './utils/requireAdmin';

export default (
	<Route path="/" component={App}>
		<IndexRoute component={HomePage} />
		<Route path="signup" component={SignupPage} />
		<Route path="login" component={LoginPage} />
		<Route path="users/list" component={requireAdmin(Users)} />
        <Route path="types/list" component={requireAdmin(Types)} />
        <Route path="roles/list" component={requireAdmin(Roles)} />
		<Route path="search" component={requireAuth(SearchPage)} />
		<Route path="users/profile" component={requireAuth(UserProfile)} />
		<Route path="documents/:title" component={SingleDocument} />
		<Route path="users/:username/documents" component={requireAuth(UserDocument)} />
		<Route path="*" component={PageNotFound} />
	</Route>
)
