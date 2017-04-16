import React from 'react';
import TextFieldGroup from '../common/testFieldGroup';
import { connect } from 'react-redux';
import { createDocument, updateDocument } from '../../actions/documentActions';
import { fetchTypes } from '../../actions/typeActions';
import classnames from 'classnames';
import { MenuItem, Button, Navbar, FormGroup, FormControl, DropdownButton, ControlLabel } from 'react-bootstrap';
import NavigationBar from '../NavigationBar';
class DocumentForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: props.title || '',
			content: props.content || '',
			type: props.type || '',
			errors: {},
			isLoading: false,
			access: props.access || '',
			docErr: false,
			button: props.button || 'Save Document'
		};
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

  componentDidMount() {
    this.getType();
  }

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value })
	}

	getType(){
      this.props.fetchTypes();
	}

	onSubmit(e) {
		e.preventDefault();
		if(this.props.status === 'create') {
			this.props.createDocument(this.state).then((err) => {
				if (!!err) {
					this.setState({ docErr: this.props.createDoc })
				} else {
					this.props.callback(!this.props.createDoc);
				}
			});
		} else {
			this.props.updateDocument(this.state, this.props.docId).then((err) => {
				if (!!err) {
					this.setState({ docErr: this.props.updateDoc })
				} else {
					this.props.callback(!this.props.updateDoc);
				}
			});
		}
	}

	close() {
	  // this.props.callback(false);
	}

	render() {
		const style = {
			width: "100%",
			height: "50%"
		};
		const style2 = {
			float: "right"
		}
		const { title, content, type, errors, isLoading, access, docErr, button } = this.state;
		const typeOption = this.props.docType.map((value, index) =>
			<option key={index} value={value.title}>{value.title}</option>
		);

		const accessOption = ['public', 'private', 'role'].map((value, index) =>
			<option key={index} value={value}>{value}</option>
		);

		return (
			<form onSubmit={this.onSubmit}>
			<div>{docErr && <span className="help-block">{docErr}</span>}</div>
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
						<option value={type}>Choose Document's Type</option>
						{typeOption}
					</FormControl>
				</FormGroup>

				<FormGroup controlId="formControlsSelect" >
					<ControlLabel>Access</ControlLabel>
					<FormControl componentClass="select" placeholder="select" name="access" onChange={this.onChange}>
						<option value={access}>Document Access</option>
						{accessOption}
					</FormControl>
				</FormGroup>
				  <button type="submit" disabled={isLoading} className="btn btn-primary">{button}</button>
					<a className="btn btn-default" style={style2}>close</a>
			</form>
		)
	}
}

DocumentForm.propTypes = {
	createDocument: React.PropTypes.func.isRequired,
	fetchTypes: React.PropTypes.func.isRequired,
	updateDocument: React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
	const createDoc = state.documents.createDoc || false;
	const updateDoc = state.documents.updateDoc || false;
  const docType = state.types || [];
	return {
		createDoc,
		updateDoc,
    docType
	}
}

export default connect(mapStateToProps, { createDocument, updateDocument, fetchTypes })(DocumentForm);