import React from 'react';
import LoginForm from './LoginForm';
import { connect } from 'react-redux';

class LoginPage extends React.Component {
	componentDidMount() {
    const { auth } = this.props;
		if(auth) {
			this.context.router.push('/');
		}
  }
	render() {
		return (
			<div className="row">
				<div className="col-md-4 col-md-offset-4">
					<LoginForm />
				</div>
			</div>
		);
	}
}

LoginPage.contextTypes = {
	router: React.PropTypes.object.isRequired
}


function mapStateToProps(state){
	return {
		auth: state.auth.isAuthenticated
	}
}

export default connect(mapStateToProps)(LoginPage);
