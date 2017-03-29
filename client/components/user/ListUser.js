import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { listUsers, updateUser } from '../../actions/userActions';
import moment from 'moment';

class ListUser extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			listInfo: '',
			users: []
		}
		this.listUser = this.listUser.bind(this);
		this.enableDisableUser = this.enableDisableUser.bind(this);
		this.listUser();
	}

	listUser() {
		this.props.listUsers().then(
			(res) => {
				this.setState({ users: res.data.users.rows, listInfo: res.data });
				return res.data;
			},
			(err) => {
				console.log(err);
			}
		)
	}

	enableDisableUser(e) {
	  // this.props.updateUser({ disable: e.target.name }, e.target.value).then(
		// 	(res) => {
		// 		console.log(res.data);
		// 	},
		// 	(err) => {
		// 		console.log(err);
		// 	}
		// )
	}

	render() {
		const { listInfo, users } = this.state;
		const list = users.map((user, index) => {
			return ( <tr key={index}>
								<td>{index}</td>
								<td>{user.id}</td>
								<td>{user.firstname}</td>
								<td>{user.lastname}</td>
								<td>{user.username}</td>
								<td>{user.email}</td>
								<td>{String(user.active)}</td>
								<td>{user.disable ? <Button bsStyle="success" onClick={this.enableDisableUser} value={user.id} name="false">Enable</Button> : <Button bsStyle="danger" name="true" value={user.id} onClick={this.enableDisableUser}>Disable</Button>}</td>
								<td>{user.roleId}</td>
								<td>{moment(user.createdAt).format("DD-MM-YYYY h:mm:ss")}</td>
								<td>{moment(user.updatedAt).format("DD-MM-YYYY h:mm:ss")}</td>
							</tr>
						);
		});
		return (
			<div>
				<h1>LIST OF USERS</h1>
				<Table striped bordered condensed hover>
					<thead>
						<tr>
							<th>No.</th>
							<th>ID</th>
							<th>First Name</th>
							<th>Last Name</th>
							<th>Username</th>
							<th>Email</th>
							<th>Active</th>
							<th>Disable</th>
							<th>Role</th>
							<th>Created At</th>
							<th>Updated At</th>
						</tr>
					</thead>
					<tbody>
					  {list}
					</tbody>
				</Table>
			</div>
		)
	}
}

ListUser.propTypes = {
	listUsers: React.PropTypes.func.isRequired,
	updateUser: React.PropTypes.func.isRequired
}

export default connect(null, { listUsers, updateUser })(ListUser);