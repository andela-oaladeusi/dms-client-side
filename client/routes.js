import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import PublicDocuments from './components/documents/PublicDocuments';
import SignupPage from './components/signup/SignupPage';
import LoginPage from './components/login/LoginPage';
import DocumentPage from './components/documents/DocumentPage';
import SingleDocument from './components/documents/SingleDocument';
import UserDocument from './components/documents/UserDocument';
import HomePage from './components/home/HomePage';
import ListUser from './components/user/ListUser';

import requireAuth from './utils/requireAuth';

export default (
	<Route path="/" component={App}>
		<IndexRoute component={HomePage} />
		<Route path="signup" component={SignupPage} />
		<Route path="login" component={LoginPage} />
		<Route path="documents" component={requireAuth(DocumentPage)} />
		<Route path="users/list" component={requireAuth(ListUser)} />
		<Route path="documents/:title" component={SingleDocument} />
		<Route path="users/:username/documents" component={requireAuth(UserDocument)} />
	</Route>
)
