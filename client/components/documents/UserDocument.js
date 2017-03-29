import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchUserDocument } from '../../actions/documentActions';
import { Pagination, Button } from 'react-bootstrap';
import ShowDocuments from './ShowDocuments';
import ListDocuments from './ListDocuments';

class UserDocument extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			pagination: '',
			userInfo: '',
			documents: [],
			activePage: 1,
			tabular: false
		}

		const username = this.props.params.username;
		const regex = new RegExp(/(\d+)(?!.-)/);
		const id = username.match(regex)[0];
		this.fetchUserDocument = this.fetchUserDocument.bind(this);
		this.handleSelect = this.handleSelect.bind(this);
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

	onClick(e) {
		if (this.state.tabular) {
			this.setState({ tabular: false });
		} else {
			this.setState({ tabular: true });
		}
	}


	render() {
		const { pagination, userInfo, documents, tabular } = this.state;
    const show = documents.map((doc, index) => <ShowDocuments key={index} doc={doc} />);
		return (
			<div className="row">
				<div className="col-md-3">
				  <h2>User</h2>
					<div>{userInfo.username}</div>
					<Button onClick={this.onClick.bind(this)}>{ tabular ? 'View Document as a post' :'View document in tabular form'}</Button>
				</div>
					<div className="col-md-6">
						{tabular ? <ListDocuments docs={documents}/> : show}
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
