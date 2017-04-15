import React from 'react';
import { Table, Button, ButtonToolbar } from 'react-bootstrap';
import { connect } from 'react-redux';
import moment from 'moment';
import { listUsers } from '../../actions/userActions';
import SingleUser from './SingleUser';

class Users extends React.Component {
	constructor(props) {
		super(props);
	}

  componentDidMount() {
    this.listUser();
  }
  componentWillMount() {
    this.listUser();
  }

	listUser() {
		this.props.listUsers();
	}

	render() {
		const style = {
			float: "right",
			marginBottom: "10px"
		}
		const { users } = this.props;
		const list = users.map((user, index) => <SingleUser key={index} index={index} user={user} />);
		return (
			<div>
				<div>
					<h1>LIST OF USERS</h1>
					<Button style={style}>Add</Button>
				</div>
				<Table striped bordered condensed hover>
					<thead>
						<tr>
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
							<th>Update Role</th>
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

Users.propTypes = {
	listUsers: React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    users: state.users.user
  }
}

export default connect(mapStateToProps, { listUsers })(Users);