import React from 'react';
import { Table, Button, ButtonToolbar, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import moment from 'moment';
import { listUsers } from '../../actions/userActions';
import SingleUser from './SingleUser';
import SignupPage from '../signup/SignupPage';

class Users extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			show: false
		}
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

	showModal() {
		this.setState({ show: true });
	}

	showMessage(data) {
		this.setState({ show: data })
	}

	closeModal() {
		this.setState({ show: false });
	}

	render() {
		const style = {
			float: "right",
			marginBottom: "10px"
		}

  const modal = (
      <Modal
				show={this.state.show}
				onHide={() => this.closeModal()}
				container={this}
				aria-labelledby="contained-modal-title">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title">ADD A USER</Modal.Title>
        </Modal.Header>
        <Modal.Body>
				   <SignupPage callback={(e) => this.showMessage(e)} admin={true}/>
				</Modal.Body>
      </Modal>
    )

		const { users } = this.props;
		const list = users.map((user, index) => <SingleUser key={index} index={index} user={user} />);
		return (
			<div>
				<div>
					<h1>LIST OF USERS</h1>
					<Button onClick={() => this.showModal()}style={style}>Add</Button>
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
				{modal}
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