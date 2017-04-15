import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Button, Modal } from 'react-bootstrap';
import DocumentForm from './DocumentForm';
import { addFlashMessage } from '../../actions/flashMessages';
import moment from 'moment';

class ShowDocuments extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			show: false
		}
	}

	showMessage(data) {
		this.setState({ show: data});
		this.props.addFlashMessage({
			type: 'success',
			text: 'Document Updated successfully'
		})
	}

	editDoc(e) {
		e.preventDefault();
		this.setState({ show: true })
	}

	close() {
		this.setState({ show: false })
	}

  deleteDoc(e) {
		console.log(e);
	}

	disableDoc(e) {
		console.log(e);
	}

	redirecToFullDocument(full) {
		this.context.router.push(full);
	}

	render() {
		const { doc, userInfo } = this.props;
		const full = `/documents/${doc.id}-${doc.title}`
		return (
			<div>
				<h1>{doc.title}</h1>
				<p>{doc.content.substring(0, 600)+'...'}</p>
				<hr/>
				<p>Access: {doc.access}</p>
				<p>Category: {doc.type}</p>
				<p>Published Date: {moment(doc.createdAt).format("DD-MM-YYYY")}</p>
					{userInfo.id === doc.ownerId ? <Button onClick={(e) => this.editDoc(e)}>Edit</Button> : ''}
					{userInfo.id === doc.ownerId ? <Button onClick={(e) => this.deleteDoc(e)}>Delete</Button> : ''}
					{userInfo.id === doc.ownerId ? <Button onClick={(e) => this.disableDoc(e)}>Disable</Button> : ''}
				<button onClick={(e) => this.redirecToFullDocument(full)} className="btn btn-default">More info</button>
				<hr/>
				
				<Modal
					show={this.state.show}
					onHide={this.close.bind(this)}
					container={this}
					aria-labelledby="contained-modal-title"
     	  >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title">Update Document</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DocumentForm callback={(e) => this.showMessage(e)} status={'update'} title={doc.title} content={doc.content} docId={doc.id} button={'Update Document'}/>
				</Modal.Body>
        </Modal>
			</div>
		)
	}
}

ShowDocuments.contextTypes = {
	router: React.PropTypes.object.isRequired
}


function mapStateToProps(state) {
	return {
		userInfo: state.auth.user
	}
}

export default connect(mapStateToProps, { addFlashMessage })(ShowDocuments);
