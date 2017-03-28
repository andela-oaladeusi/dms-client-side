import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../actions/authActions';
import { MenuItem, Button, Navbar, FormGroup, FormControl, DropdownButton, InputGroup } from 'react-bootstrap';

class NavigationBar extends React.Component {

	logout(e) {
		e.preventDefault();
		this.props.logout();
	}

	render() {
		const { isAuthenticated, user } = this.props.auth;

		const styleS = {
			width: "300px",
			marginTop: "6px",
			marginLeft: "200px"
		};

		const userDoc = `users/${user.id}-${user.username}/documents/`;

		const userLinks = (
			<ul className="nav navbar-nav navbar-right">
				<li> <Link to={userDoc}>My Document</Link></li>
				<li> <Link to="/documents">Create Document</Link></li>
				<li> <a href="#" onClick={this.logout.bind(this)}>Logout</a></li>
				<li> <a href="#">{user.username}</a></li>
			</ul>
		);

		const guestLinks = (
			<ul className="nav navbar-nav navbar-right">
				<li> <Link to="/signup">Sign Up</Link></li>
				<li> <Link to="/login">Login</Link></li>
			</ul>
		);

		const search = (
				<Navbar.Form pullLeft>
					<FormGroup>
						<InputGroup>
							<FormControl type="text" />
							<DropdownButton
								componentClass={InputGroup.Button}
								id="input-dropdown-addon"
								title="Action">
								<MenuItem key="1">User</MenuItem>
								<MenuItem key="2">Document</MenuItem>
							</DropdownButton>
						</InputGroup>
					</FormGroup>
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
			</nav>
		);
	}
}

NavigationBar.propTypes = {
	auth: React.PropTypes.object.isRequired,
	logout: React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
	return {
		auth: state.auth
	}
}

export default connect(mapStateToProps, { logout })(NavigationBar);
