import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import PublicDocuments from './components/PublicDocuments';
import SignupPage from './components/signup/SignupPage';

export default (
	<Route path="/" component={App}>
		<IndexRoute component={PublicDocuments} />
		<Route path="signup" component={SignupPage} />
	</Route>
)