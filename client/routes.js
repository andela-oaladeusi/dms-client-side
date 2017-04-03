import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import PublicDocuments from './components/documents/PublicDocuments';
import SignupPage from './components/signup/SignupPage';
import LoginPage from './components/login/LoginPage';
import DocumentPage from './components/documents/DocumentPage';
import Trigger from './components/documents/form';
import SingleDocument from './components/documents/SingleDocument';
import UserDocument from './components/documents/UserDocument';
import HomePage from './components/home/HomePage';
import ListUser from './components/user/ListUser';
import UserProfile from './components/user/UserProfile';
import SearchPage from './components/search/SearchPage';

import requireAuth from './utils/requireAuth';

export default (
	<Route path="/" component={App}>
		<IndexRoute component={HomePage} />
		<Route path="signup" component={SignupPage} />
		<Route path="login" component={LoginPage} />
		<Route path="documents" component={requireAuth(Trigger)} />
		<Route path="users/list" component={requireAuth(ListUser)} />
		<Route path="search" component={SearchPage} />
		<Route path="users/profile" component={requireAuth(UserProfile)} />
		<Route path="documents/:title" component={SingleDocument} />
		<Route path="users/:username/documents" component={requireAuth(UserDocument)} />
	</Route>
)
