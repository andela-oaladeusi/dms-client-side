import React from 'react';
import SignupForm from './SignupForm';
import { connect } from 'react-redux';

import { userSignupRequest } from '../../actions/signupActions';
import { addFlashMessage } from '../../actions/flashMessages';

class SignupPage extends React.Component {
	componentDidMount() {
    const { auth } = this.props;
		if(auth) {
			this.context.router.push('/');
		}
  }

	render() {
		const { userSignupRequest, addFlashMessage } = this.props;
		return (
			<div className="row">
				<div className="col-md-4 col-md-offset-4">
					<SignupForm userSignupRequest={userSignupRequest} addFlashMessage={addFlashMessage}/>
				</div>
			</div>
		);
	}
}

SignupPage.propTypes = {
	userSignupRequest: React.PropTypes.func.isRequired,
	addFlashMessage: React.PropTypes.func.isRequired
}

SignupPage.contextTypes = {
	router: React.PropTypes.object.isRequired
}


function mapStateToProps(state){
	return {
		auth: state.auth.isAuthenticated
	}
}

export default connect(mapStateToProps, { userSignupRequest, addFlashMessage })(SignupPage);
