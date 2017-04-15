import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchUserDocument } from '../../actions/documentActions';
import { Pagination, Button } from 'react-bootstrap';
import ShowDocuments from './ShowDocuments';

class UserDocument extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			activePage: 1,
      id: ''
		}
		this.handleSelect = this.handleSelect.bind(this);
	}

	componentDidMount() {
		const username = this.props.params.username;
		const regex = new RegExp(/(\d+)(?!.-)/);
		const id = username.match(regex)[0];
		this.fetchUserDocument({ id, offset: 0 });
	}

	fetchUserDocument(data) {
		this.props.fetchUserDocument(data);
		this.setState({ id: data.id });
	}

	handleSelect(eventKey) {
		const offset = (eventKey-1) * this.props.pagination.page_size;
		this.fetchUserDocument({ id: this.state.id, offset });
    this.setState({
      activePage: eventKey
    });
  }


	render() {
		const { pagination, userInfo, documents } = this.props;
    const show = documents.map((doc, index) => <ShowDocuments key={index} doc={doc} />);
		return (
			<div className="row">
				<div className="col-md-3">
					<h4>{`${userInfo.username}`}</h4>
					<div>{`${userInfo.firstname} ${userInfo.lastname}`}</div>
					<div>{userInfo.about}</div>
				</div>
					<div className="col-md-6">
						{show}
						<hr/>
						<Pagination
							bsSize="small"
							items={pagination.page_count}
							activePage={this.state.activePage}
							onSelect={this.handleSelect} />

					</div>
				<div className="col-md-3">
				
				</div>
			</div>
		)
	}
}

UserDocument.propTypes = {
	fetchUserDocument: React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const documents = state.documents.userDoc || [];
  const pagination = state.documents.pagination || {};
  const userInfo = state.documents.userInfo || {};
  return {
    documents,
    pagination,
    userInfo
  }
}

export default connect(mapStateToProps, { fetchUserDocument })(UserDocument);
