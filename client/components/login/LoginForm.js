import React from 'react';
import Loading from 'react-loading';
import TextFieldGroup from '../common/testFieldGroup';
import validateInput from '../../validations/login';
import { connect } from 'react-redux';
import { login } from '../../actions/authActions'
import { addFlashMessage } from '../../actions/flashMessages';

class LoginForm extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			email: '',
			password: '',
			errors: {},
			isLoading: false
		};

		this.onSubmit = this.onSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	isValid() {
		const { errors, isValid } = validateInput(this.state);
		if (!isValid) {
			this.setState({ errors });
		}
		return isValid;
	}

	onSubmit(e) {
		e.preventDefault();
		if (this.isValid()) {
			this.setState({ errors: {}, isLoading: true });
			this.props.login(this.state).then(
				(res) => { 
					this.props.addFlashMessage({
						type: 'success',
						text: `You have successfully logged in, WELCOME`
					})
					this.context.router.push('/');
				},
				(err) => { 
					this.props.addFlashMessage({
						type: 'error',
						text: err.data.message
					});
					this.setState({ isLoading: false });
				}
			);
		}
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	render() {
		const { errors, email, password, isLoading } = this.state;
		return (
			<form onSubmit={this.onSubmit}>
				<h1>Login</h1>

				<TextFieldGroup
					field="email"
					label="Email"
					value={email}
					error={errors.email}
					onChange={this.onChange}
					disabled={isLoading}
				/>

				<TextFieldGroup
					field="password"
					label="Password"
					value={password}
					error={errors.password}
					onChange={this.onChange}
					type="password"
					disabled={isLoading}
				/>

				<div className="form-group text-center">{isLoading ? <Loading type='bubbles' color='#e3e3e3'/> : ''}<button className="btn btn-primary btn-lg" disabled={isLoading}>Login</button></div>
			</form>
		);
	}
}

LoginForm.propTypes = {
	login: React.PropTypes.func.isRequired,
	addFlashMessage: React.PropTypes.func.isRequired
}

LoginForm.contextTypes = {
	router: React.PropTypes.object.isRequired
}

export default connect(null, { login, addFlashMessage })(LoginForm);