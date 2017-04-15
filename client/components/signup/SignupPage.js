import React from 'react';
import SignupForm from './SignupForm';
import { connect } from 'react-redux';

import { userSignupRequest } from '../../actions/userActions';
import { addFlashMessage } from '../../actions/flashMessages';

class SignupPage extends React.Component {
	
  componentDidMount() {
    const { auth, roleId } = this.props;
		if(auth && roleId !== 1) {
			this.context.router.push('/');
		}
  }
  showMessage(data) {
    this.props.callback(data)
  }
	render() {
		const { userSignupRequest, addFlashMessage } = this.props;
    const admin = this.props.admin || false
		return (
			<div className="row">
        <div className="col-md-2"></div>
				<div className="col-md-8">
					<SignupForm admin={admin} userSignupRequest={userSignupRequest} addFlashMessage={addFlashMessage} callback={(e) => this.showMessage(e)}/>
				</div>
        <div className="col-md-2"></div>
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
		auth: state.auth.isAuthenticated,
    roleId: state.auth.user.roleId
	}
}

export default connect(mapStateToProps, { userSignupRequest, addFlashMessage })(SignupPage);
