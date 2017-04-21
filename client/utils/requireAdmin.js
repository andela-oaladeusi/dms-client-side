import React from 'react';
import { connect } from 'react-redux';
import { addFlashMessage } from '../actions/flashMessages';
import Auth from '../utils/auth';

export default function(ComposedComponent) {
	class Authenticate extends React.Component {
		componentWillMount() {
			if (!this.props.isAuthenticated) {
				this.props.addFlashMessage({
					type: 'error',
					text: 'You need to login to access this page'
				});
				this.context.router.push('/login');
			} else if(!Auth.validateAdmin(this.props.user)) {
				this.props.addFlashMessage({
					type: 'error',
					text: 'Page not found'
				});
				this.context.router.push('/');
			}
		}

		componentWillUpdate(nextProps) {
			if (!nextProps.isAuthenticated) {
				this.props.addFlashMessage({
					type: 'success',
					text: 'Logged out'
				});
				this.context.router.push('/');
			}
		}

		render() {
			return (
				<ComposedComponent {...this.props} />
			);
		}
	}

	Authenticate.propTypes = {
		isAuthenticated: React.PropTypes.bool.isRequired,
		addFlashMessage: React.PropTypes.func.isRequired
	}

	Authenticate.contextTypes = {
		router: React.PropTypes.object.isRequired
	}


	function mapStateToProps(state) {
		return {
			isAuthenticated: state.auth.isAuthenticated,
			user: state.auth.user
		}
	}

	return connect(mapStateToProps, { addFlashMessage })(Authenticate);
}

