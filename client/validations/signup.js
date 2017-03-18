import validator from 'validator';

export default function validateInput(data) {
	let errors = {};
	if (validator.isEmpty(data.username)) {
		errors.username = 'This field is required';
	}
	if (validator.isEmpty(data.firstname)) {
		errors.firstname = 'This field is required';
	}
	if (validator.isEmpty(data.lastname)) {
		errors.lastname = 'This field is required';
	}
	if (validator.isEmpty(data.email)) {
		errors.email = 'This field is required';
	}
	if (!validator.isEmail(data.email)) {
		errors.email = 'Email is invalid';
	}
	if (validator.isEmpty(data.password)) {
		errors.password = 'This field is required';
	}
	if (validator.isEmpty(data.passwordConfirmation)) {
		errors.passwordConfirmation = 'This field is required';
	}
	if (!validator.equals(data.password, data.passwordConfirmation)) {
		errors.passwordConfirmation = 'Password must match';
	}

	const isValid = Object.keys(errors).length === 0;
	return { errors, isValid };
}