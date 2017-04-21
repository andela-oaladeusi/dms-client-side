import React from 'react';
import Loading from 'react-loading';
import { connect } from 'react-redux';
import { avalaibleDocument } from '../../actions/documentActions'
import ShowDocuments from './ShowDocuments';
import { Pagination, Button } from 'react-bootstrap';

class Documents extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activePage: 1
		}

		this.showDocument = this.showDocument.bind(this);
		this.handleSelect = this.handleSelect.bind(this);
	}

	componentDidMount() {
		this.showDocument(0);
	}

	showDocument(offset) {
		this.props.avalaibleDocument(offset);
	}

	handleSelect(eventKey) {
		const offset = (eventKey-1) * this.props.pagination.page_size;
		this.showDocument(offset);
    this.setState({
      activePage: eventKey
    });
  }

	onClick(e) {

	}

	render() {
		const { avalaibleDoc, pagination } = this.props;
		const show = avalaibleDoc.map((doc, index) => <ShowDocuments key={index} doc={doc} others={true}/>);
		return (
			<div className="row">
				<div className="col-md-3">
				</div>
				<div className="col-md-6">
				  {show}
				<Pagination
          bsSize="small"
          items={pagination.page_count}
          activePage={this.state.activePage}
          onSelect={this.handleSelect} />
				</div>
				<div className="col-md-3">
				</div>
			</div>
		);
	}
}

Documents.propTypes = {
	avalaibleDocument: React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const avalaibleDoc = state.documents.docs;
  const pagination = state.documents.pagination || {};
	return {
		auth: state.auth,
		username: state.auth.user.username,
    avalaibleDoc,
    pagination
	}
}

export default connect(mapStateToProps, { avalaibleDocument })(Documents);
