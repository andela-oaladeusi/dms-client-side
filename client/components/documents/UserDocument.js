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
			pagination: '',
			userInfo: '',
			documents: [],
			activePage: 1
		}
		this.fetchUserDocument = this.fetchUserDocument.bind(this);
		this.handleSelect = this.handleSelect.bind(this);
	}

	componentWillMount() {
		const username = this.props.params.username;
		const regex = new RegExp(/(\d+)(?!.-)/);
		const id = username.match(regex)[0];
		this.fetchUserDocument({ id, offset: 0 });
	}

	fetchUserDocument(data) {
		this.props.fetchUserDocument(data).then(
			(res) => {
				this.setState({ id: data.id, pagination: res.data.pagination, userInfo: res.data.userDocuments.user, documents: res.data.userDocuments.documents.rows });
				return;
			},
			(err) => {
				console.log(err);
			}
		)
	}

	handleSelect(eventKey) {
		const offset = (eventKey-1) * this.state.pagination.page_size;
		this.fetchUserDocument({ id: this.state.id, offset });
    this.setState({
      activePage: eventKey
    });
  }


	render() {
		const { pagination, userInfo, documents } = this.state;
    const show = documents.map((doc, index) => <ShowDocuments key={index} doc={doc} />);
		return (
			<div className="row">
				<div className="col-md-3">
				  <h2>User</h2>
					<div>{userInfo.username}</div>
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

export default connect(null, { fetchUserDocument })(UserDocument);
