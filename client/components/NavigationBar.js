import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../actions/authActions';
import { Modal, OverlayTrigger, MenuItem, Button, Navbar, FormGroup, FormControl, DropdownButton, InputGroup, Popover } from 'react-bootstrap';
import DocumentForm from '../components/documents/DocumentForm';
import { addFlashMessage } from '../actions/flashMessages';
import SearchPage from '../components/search/SearchPage';

class NavigationBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			show: false,
			searchQuery: ''
		}
	}

	logout(e) {
		e.preventDefault();
		this.props.logout();
	}
	show() {
		return this.setState({ show: true });
	}
	close() {
		return this.setState({ show: false});
	}

	showMessage(data) {
		this.setState({ show: data});
		this.props.addFlashMessage({
			type: 'success',
			text: 'Document created successfully'
		})
	}

	onChange(e) {
		return this.setState({ searchQuery: e.target.value });
	}

	render() {
		const { isAuthenticated, user, createDoc } = this.props.auth;
		const { showSearch } = this.state;
		const styleS = {
			width: "300px",
			marginTop: "6px",
			marginLeft: "200px"
		};

		const userDoc = `users/${user.id}-${user.username}/documents/`;

		const userLinks = (
			<ul className="nav navbar-nav navbar-right">
				<li> <Link to="/users/list">List of Users</Link></li>
				<li> <Link to={userDoc}>My Document</Link></li>
				<li> <a onClick={this.show.bind(this)}>Create Document</a></li>
				<li> <a href="#" onClick={this.logout.bind(this)}>Logout</a></li>
				<li> <Link to="/users/profile">{user.username}</Link></li>
			</ul>
		);

		const guestLinks = (
			<ul className="nav navbar-nav navbar-right">
				<li> <Link to="/signup">Sign Up</Link></li>
				<li> <Link to="/login">Login</Link></li>
			</ul>
		);

		const popOverSearch = (
      <Popover id="popover-positioned-scrolling-top" title="Search Result">
				<SearchPage status={'popover'} searchQuery={this.state.searchQuery}/>
      </Popover>
    );

		const search = (
			<Navbar.Form pullRight>
				<OverlayTrigger trigger="click" rootClose={true} placement="bottom" overlay={popOverSearch}>
					<FormControl value={this.state.searchQuery} type="text" onChange={(e) => this.onChange(e)} placeholder="Search" />
				</OverlayTrigger>
			</Navbar.Form>
		);

		return (
			<nav className="navbar navbar-default">
				<div className="container-fluid">
					<div className="navbar-header">
						<Link to="/" className="navbar-brand">DMS</Link>
					</div>

					<div className="collapse navbar-collapse">
						{search}
						{ isAuthenticated ? userLinks : guestLinks }
					</div>
				</div>

        <Modal
          show={this.state.show}
          onHide={this.close.bind(this)}
          container={this}
          aria-labelledby="contained-modal-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title">Create Document</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <DocumentForm status={'create'} callback={(e) => this.showMessage(e)} />
					</Modal.Body>
        </Modal>

			</nav>
		);
	}
}

NavigationBar.propTypes = {
	auth: React.PropTypes.object.isRequired,
	logout: React.PropTypes.func.isRequired,
	addFlashMessage: React.PropTypes.func.isRequired
}

const newBar =new NavigationBar();

function mapStateToProps(state) {
	const done = state.documents.createDoc ? state.documents.createDoc : false
	return {
		auth: state.auth,
		createDoc: state.documents.createDoc
	}
}

export default connect(mapStateToProps, { logout, addFlashMessage })(NavigationBar);
