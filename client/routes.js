import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import PublicDocuments from './components/documents/PublicDocuments';
import SignupPage from './components/signup/SignupPage';
import LoginPage from './components/login/LoginPage';
import SingleDocument from './components/documents/SingleDocument';
import UserDocument from './components/documents/UserDocument';
import HomePage from './components/home/HomePage';
import ListUser from './components/user/ListUser';
import UserProfile from './components/user/UserProfile';
import SearchPage from './components/search/SearchPage';
import PageNotFound from './components/NotFound/PageNotFound';
import requireAuth from './utils/requireAuth';
import requireAdmin from './utils/requireAdmin';

export default (
	<Route path="/" component={App}>
		<IndexRoute component={HomePage} />
		<Route path="signup" component={SignupPage} />
		<Route path="login" component={LoginPage} />
		<Route path="users/list" component={requireAdmin(ListUser)} />
		<Route path="search" component={requireAuth(SearchPage)} />
		<Route path="users/profile" component={requireAuth(UserProfile)} />
		<Route path="documents/:title" component={SingleDocument} />
		<Route path="users/:username/documents" component={requireAuth(UserDocument)} />
		<Route path="*" component={PageNotFound} />
	</Route>
)
