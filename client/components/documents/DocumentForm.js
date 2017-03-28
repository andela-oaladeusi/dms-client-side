import React from 'react';
import TextFieldGroup from '../common/testFieldGroup';
import { connect } from 'react-redux';
import { createDocument, getDocumentType } from '../../actions/documentActions'
import classnames from 'classnames';
import { MenuItem, Button, Navbar, FormGroup, FormControl, DropdownButton, ControlLabel } from 'react-bootstrap';

class DocumentForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			content: '',
			type: '',
			errors: {},
			isLoading: false,
			docType: [],
			access: ''
		};
		this.getType();
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value })
	}

	getType(){
		return this.props.getDocumentType().then(
			(res) => {
				this.setState({ docType: res.data.types.rows });
				return res.data.types.rows;
			},
			(err) => {
				console.log(err);
			}
		)
	}

	onSubmit(e) {
		e.preventDefault();
		this.props.createDocument(this.state);
	}

	render() {
		const style = {
			width: "100%",
			height: "50%"
		};
		const { title, content, type, errors, isLoading, docType, access } = this.state;

		const typeOption = docType.map((value, index) =>
			<option key={index} value={value.title}>{value.title}</option>
		);

		const accessOption = ['public', 'private', 'role'].map((value, index) =>
			<option key={index} value={value}>{value}</option>
		);

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

				<FormGroup controlId="formControlsTextarea" className={classnames("form-group", {'has-error': errors.content})}>
					<ControlLabel>Content</ControlLabel>
					<FormControl componentClass="textarea" placeholder="Type content here..." style={style} value={content} name="content" onChange={this.onChange} type="text"/>
				</FormGroup>

				<FormGroup controlId="formControlsSelect" >
					<ControlLabel>Type</ControlLabel>
					<FormControl componentClass="select" placeholder="select" name="type" onChange={this.onChange}>
						<option value="">Choose Document's Type</option>
						{typeOption}
					</FormControl>
				</FormGroup>

				<FormGroup controlId="formControlsSelect" >
					<ControlLabel>Access</ControlLabel>
					<FormControl componentClass="select" placeholder="select" name="access" onChange={this.onChange}>
						<option value="">Document Access</option>
						{accessOption}
					</FormControl>
				</FormGroup>

				<button type="submit" disabled={isLoading} className="btn btn-primary">Save</button>
			</form>
		)
	}
}

DocumentForm.propTypes = {
	createDocument: React.PropTypes.func.isRequired,
	getDocumentType: React.PropTypes.func.isRequired
}

export default connect(null, { createDocument, getDocumentType })(DocumentForm);