import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Popover, Row, Col, Navbar, FormControl, Pagination } from 'react-bootstrap';
import { searchDocument } from '../../actions/documentActions';
import { searchUser } from '../../actions/userActions';

class SearchPage extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			showUser: false,
			showDoc: true,
			activePage: 1,
			pagination: {},
			query: this.props.searchQuery || ''
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.searchQuery !== this.props.searchQuery) {
			this.setState({ query: nextProps.searchQuery });
			this.search(nextProps.searchQuery, 0);
		}
	}

	onChange(e) {
		this.search(e.target.value, 0);
		return this.setState({ query: e.target.value })
	}

	search(query, offset) {
		this.props.searchDocument({ query, offset });
		this.props.searchUser(query);
  }

	redirecToFullDocument(doc) {
		const full = `/documents/${doc.id}-${doc.title}`
		window.location = full;
	}

	onShow(show) {
		if (show === 'document') {
			return this.setState({ showDoc: true, showUser: false });
		}
		if (show === 'user') {
			return this.setState({ showDoc: false, showUser: true });
		}
	}

	handleSelect(eventKey) {
		const offset = (eventKey-1) * this.props.docSearchResult.pagination.page_size;
		this.search(this.state.query, offset);
    return this.setState({
      activePage: eventKey
    });
  }

	redirectToUserPublicDocument(user) {
		const userDoc = `users/${user.id}-${user.username}/documents/`;
		this.context.router.push(userDoc);
	}

	render() {
		let showSearchDoc, showSearchUser, renderSearchDoc, renderSearchUser;
		if (this.props.docSearchResult && this.props.userSearchResult) {
			showSearchDoc = this.props.status === 'popover' ? this.props.docSearchResult.documents.rows.splice(0,2) : this.props.docSearchResult.documents.rows;
			showSearchUser = this.props.status === 'popover' ? this.props.userSearchResult.users.rows.splice(0,2) : this.props.userSearchResult.users.rows;

			renderSearchDoc = showSearchDoc.map((doc, index) =>
				<div key={index}>
					<strong>{doc.title}</strong>
					<div>{`${doc.content.substring(0, 100)}...`}</div>
					<div onClick={() => this.redirecToFullDocument(doc)} className="btn btn-default">read more</div>
					<hr/>
				</div>
			);

			renderSearchUser = showSearchUser.map((user, index) =>
				<div key={index}>
					<strong>{user.username}</strong>
					<div>{user.firstname}</div>
					<div>{user.id}</div>
					<div onClick={() => this.redirectToUserPublicDocument(user)} className="btn btn-default">read more</div>
					<hr/>
				</div>
			);
		}
		const newStyle = {
			float: "right"
		}

		const popOverSearch = (
			  <div>
					<div>
						<Row className="show-grid">
							<Col xs={6} md={4}><strong>Document</strong></Col>
							<Col xs={6} md={4} style={newStyle}><Link to='/search'>more</Link></Col>
						</Row>
						<hr/>
						{renderSearchDoc}
					</div>
					<div>
						<Row className="show-grid">
							<Col xs={6} md={4}><strong>User</strong></Col>
							<Col xs={6} md={4} style={newStyle}><Link to='/search'>more</Link></Col>
						</Row>
						<hr/>
						{renderSearchUser}
					</div>
				</div>
		);

		const realSearch = (
			  <div>
					<div>
					  <hr/>
						<Row className="show-grid">
							<a onClick={() => this.onShow('document')}><Col xs={2} md={1}><strong>Document</strong></Col></a>
							<a onClick={() => this.onShow('user')}><Col xs={2} md={1}><strong>User</strong></Col></a>
						</Row>
						<hr/>
						{this.state.showDoc ? renderSearchDoc : renderSearchUser}

						{this.props.docSearchResult ? <Pagination
							bsSize="small"
							items={this.props.docSearchResult.pagination.page_count}
							activePage={this.state.activePage}
							onSelect={(e) => this.handleSelect(e)} /> : ''
						}

					</div>
				</div>
		);

		return(
			<div>
				<FormControl value={this.state.query} onChange={(e) => this.onChange(e)} type="text" placeholder="Search dms" />
				{this.props.status === 'popover' ? popOverSearch : realSearch}
			</div>
		)
	}
}

SearchPage.propTypes = {
	searchDocument: React.PropTypes.func.isRequired,
	searchUser: React.PropTypes.func.isRequired,
	searchQuery: React.PropTypes.string
}

SearchPage.contextTypes = {
	router: React.PropTypes.object.isRequired
}

function mapStateToProps(state) {
  console.log(state);
	return {
		docSearchResult: state.documents.searchResult,
		userSearchResult: state.users.searchResult
	}
}

export default connect(mapStateToProps, { searchDocument, searchUser })(SearchPage);
