import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import PublicDocuments from './components/PublicDocuments';
import SignupPage from './components/signup/SignupPage';
import LoginPage from './components/login/LoginPage';
import DocumentPage from './components/documents/DocumentPage';

import requireAuth from './utils/requireAuth';

export default (
	<Route path="/" component={App}>
		<IndexRoute component={PublicDocuments} />
		<Route path="signup" component={SignupPage} />
		<Route path="login" component={LoginPage} />
		<Route path="documents" component={requireAuth(DocumentPage)} />
	</Route>
)
