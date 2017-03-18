import React from 'react';
import classnames from 'classnames';
import validateInput from '../../validations/signup';
import TextFieldGroup from '../common/testFieldGroup';

class SignupForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			firstname: '',
			lastname: '',
			email: '',
			password: '',
			passwordConfirmation: '',
			errors: {},
			isLoading: false
		}
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
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
			this.setState({ errors: {}, isLoading: true })
			this.props.userSignupRequest(this.state).then(
				() => {
					this.context.router.push('/');
				},
				(data) => this.setState({ errors: data, isLoading: false })
			);
		} 
	}

	render() {
		const { errors } = this.state;
		return (
			<form onSubmit={this.onSubmit}>
				<h1>Join our community!</h1>
				<div>Create, Save and Share Your Documents</div>
				{errors.message && <span className="help-block">{errors.message}</span>}

				<TextFieldGroup
					error={errors.username}
					label="Username"
					onChange={this.onChange}
					value={this.state.username}
					field="username"
				/>

				<TextFieldGroup
					error={errors.firstname}
					label="Firstname"
					onChange={this.onChange}
					value={this.state.firstname}
					field="firstname"
				/>

				<TextFieldGroup
					error={errors.lastname}
					label="Lastname"
					onChange={this.onChange}
					value={this.state.lastname}
					field="lastname"
				/>

				<TextFieldGroup
					error={errors.email}
					label="Email"
					onChange={this.onChange}
					value={this.state.email}
					field="email"
				/>

				<TextFieldGroup
					error={errors.password}
					label="Password"
					onChange={this.onChange}
					value={this.state.password}
					type="password"
					field="password"
				/>

				<TextFieldGroup
					error={errors.passwordConfirmation}
					label="Re-type Password"
					onChange={this.onChange}
					value={this.state.passwordConfirmation}
					type="password"
					field="passwordConfirmation"
				/>

				<div className="form-group">
					<button disabled={this.state.isLoading} className="btn btn-primary btn-lg">
						Sign Up
					</button>
				</div>
			</form>
		);
	}
}

SignupForm.propTypes = {
	userSignupRequest: React.PropTypes.func.isRequired
}

SignupForm.contextTypes = {
	router: React.PropTypes.object.isRequired
}

export default SignupForm;