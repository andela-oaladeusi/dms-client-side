import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../actions/authActions';
import { Glyphicon, Modal, OverlayTrigger, MenuItem, Button, Navbar, FormGroup, FormControl, DropdownButton, InputGroup, Popover } from 'react-bootstrap';
import DocumentForm from '../components/documents/DocumentForm';
import { addFlashMessage } from '../actions/flashMessages';
import SearchPage from '../components/search/SearchPage';
import Auth from '../utils/auth';

class NavigationBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			show: false,
			searchQuery: '',
			admin: false
		}
	}
	componentDidMount(){
	  const admin = Auth.validateAdmin(this.props.auth.user);
	  this.setState({ admin });
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
		const { showSearch, admin } = this.state;
		const styleS = {
			width: "300px",
			marginTop: "6px",
			marginLeft: "200px"
		};

		const userDoc = `users/${user.id}-${user.username}/documents/`;

		const registeredLinks = (
      <div>
				{ admin ? <p> <Link to="/users/list">List Users</Link></p> : '' }
        { admin ? <p> <Link to="/roles/list">List Roles</Link></p> : '' }
        { admin ? <p> <Link to="/types/list">List Types</Link></p> : '' }
        { admin ? <p> <Link to="/types/list">List Documents</Link></p> : '' }
        { admin ? <hr/> : '' }
        <p> <Link to={userDoc}>Personal Documents</Link></p>
				<p> <Link to="/users/profile">Profile</Link></p>
        <hr/>
        <p> <a href="#" onClick={this.logout.bind(this)}>Logout</a></p>
			</div>
		);

		const guestLinks = (
			<ul className="nav navbar-nav navbar-right">
				<li> <Link to="/signup">Sign Up</Link></li>
				<li> <Link to="/login">Login</Link></li>
			</ul>
		);

		const popoverProfile = (
      <Popover id="popover-positioned-bottom" title={`Hi! ${user.username}`}>
        {registeredLinks}
      </Popover>
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

    const st = {
      marginTop: "7px"
    }
    const profileOverlay = (
		  <ul className="nav navbar-nav navbar-right">
        <li> <a onClick={this.show.bind(this)}>Write a Document</a></li>
          <OverlayTrigger trigger="click" rootClose={true} placement="bottom" overlay={popoverProfile}>
            <div className="btn" style={st}><Glyphicon glyph="user" />{user.username}</div>
          </OverlayTrigger>
		 </ul>
	  )

		return (
			<nav className="navbar navbar-default">
				<div className="container-fluid">
					<div className="navbar-header">
						<Link to="/" className="navbar-brand">DMS</Link>
					</div>

					<div className="collapse navbar-collapse">
						{this.props.auth.isAuthenticated ? search : ''}
						{ isAuthenticated ? profileOverlay : guestLinks }
					</div>
				</div>

        <Modal
          show={this.state.show}
          onHide={this.close.bind(this)}
          container={this}
          aria-labelledby="contained-modal-title">
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
