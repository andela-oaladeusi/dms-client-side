import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Button, Modal, Panel, Popover, OverlayTrigger, Glyphicon } from 'react-bootstrap';
import DocumentForm from './DocumentForm';
import { addFlashMessage } from '../../actions/flashMessages';
import { deleteDocument } from '../../actions/documentActions'
import moment from 'moment';
import Auth from '../../utils/auth';

class ShowDocuments extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			show: false,
			docAccess: false
		}
	}

	componentDidMount() {
	  const docAccess = Auth.docAccess(this.props.userInfo, this.props.doc);
	  this.setState({ docAccess });
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
	  e.preventDefault();
		this.props.deleteDocument(this.props.doc.id);
	}

	disableDoc(e) {
		e.preventDefault();	
	}

	redirecPage(full) {
		this.context.router.push(full);
	}

	render() {
		const { doc, userInfo } = this.props;
		const { docAccess } = this.state;
		const docRedirect = doc.title.replace(new RegExp(/[' ',.]/g), '-');
		const documentFullLink = `/documents/${doc.id}-${docRedirect}`
    const userFullLink = `/users/${doc.ownerId}-other/documents`

    const popoverBottom = (
      <Popover id="popover-positioned-bottom" title="">
        {docAccess
          ? <div><a className="btn" onClick={(e) => this.editDoc(e)}>Edit Document</a> <br/>
            <a className="btn" onClick={(e) => this.deleteDoc(e)}>Delete Document</a> </div>
          : ''}
        {this.props.others
          ? <a onClick={(e) => this.redirecPage(userFullLink)} className="btn">User Document</a>
          : ''}
      </Popover>
    );

		return (
			<div>
        <Panel header={`${doc.type}, published on ${moment(doc.createdAt).format("DD-MM-YYYY")} by ${doc.ownerId}`}>
          <h3>{doc.title}</h3>
          <p>{doc.content.substring(0, 400)+'...'}</p>
          <p onClick={(e) => this.redirecPage(documentFullLink)} className="btn">Read more ...</p>
          <hr/>
            <OverlayTrigger trigger="click" placement="bottom" overlay={popoverBottom}>
              <div className="btn"><Glyphicon glyph="menu-down" /></div>
            </OverlayTrigger>
        </Panel>
				
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

export default connect(mapStateToProps, { addFlashMessage, deleteDocument })(ShowDocuments);
