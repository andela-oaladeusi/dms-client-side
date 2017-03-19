import React from 'react';
import TextFieldGroup from '../common/testFieldGroup';
import { connect } from 'react-redux';
import { createDocument } from '../../actions/documentActions'

class DocumentForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			content: '',
			errors: {},
			isLoading: false
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value })
	}

	onSubmit(e) {
		e.preventDefault();
		this.props.createDocument(this.state);
	}

	render() {
		const { title, content, errors, isLoading } = this.state;

		return (
			<form onSubmit={this.onSubmit}>
				<h1>New Document</h1>

				<TextFieldGroup
					field="title"
					label="Title"
					name="title"
					value={title}
					onChange={this.onChange}
					error={errors.title}
				/>

				<TextFieldGroup
					field="content"
					label="Content"
					name="content"
					value={content}
					onChange={this.onChange}
					error={errors.content}
				/>

				<button type="submit" disabled={isLoading} className="btn btn-primary">Save</button>
			</form>
		)
	}
}

DocumentForm.propTypes = {
	createDocument: React.PropTypes.func.isRequired
}

export default connect(null, { createDocument })(DocumentForm);