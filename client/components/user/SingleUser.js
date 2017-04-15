import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { Button, Modal, ControlLabel, FormControl } from 'react-bootstrap';
import { updateUser } from '../../actions/userActions';
import { fetchRoles } from '../../actions/roleActions';


class SingleUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      index: '',
      show: false,
      roles: [],
      roleId: 2
    }
  }

  componentWillMount() {
    this.setState({ user: this.props.user, index: this.props.index });
    this.fetchRoles();
  }

  fetchRoles() {
    this.props.fetchRoles()
      .then((roles) => {
        this.setState({ roles: roles.data });
      });
  }

	enableDisableUser(e) {
    e.preventDefault();
    const data = {
      disable: e.target.name
    };
    const id = e.target.value
    this.props.updateUser(id, data)
      .then((res) => {
        this.setState({ user: res.data });
      });
	}

  updateUserRole() {
    const data = {
      roleId: this.state.roleId
    }
    const id = this.state.user.id;
    this.props.updateUser(id, data)
      .then((res) => {
        this.setState({ user: res.data });
        this.closeModal();
      });
  }

  showModal(e) {
    e.preventDefault();
    this.setState({ show: true });
  }

  closeModal() {
    this.setState({ show: false });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const roleOption = this.state.roles.map((role, index) =>
			<option key={index} value={role.id}>{role.title}</option>
		);
    const { index, user } = this.state;
    const disabled = user.id === 1 || user.id === 2;
  
    const modal = (
      <Modal
				show={this.state.show}
				onHide={(e) => this.closeModal(e)}
				container={this}
				aria-labelledby="contained-modal-title">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title">Update User's Role</Modal.Title>
        </Modal.Header>
        <Modal.Body>
					<ControlLabel>Roles</ControlLabel>
					<FormControl componentClass="select" placeholder="select" name="roleId" onChange={(e) => this.onChange(e)}>
						<option value="">Choose User's Role</option>
						{roleOption}
					</FormControl>
				</Modal.Body>
        <Modal.Footer>
          <Button onClick={() => this.updateUserRole()}>Update</Button>
          <Button onClick={() => this.closeModal()}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  
    return (
      <tr>
        <td>{user.id}</td>
        <td>{user.firstname}</td>
        <td>{user.lastname}</td>
        <td>{user.username}</td>
        <td>{user.email}</td>
        <td>{String(user.active)}</td>
        <td>{user.disable ? <Button bsStyle="success" disabled={disabled} value={user.id} onClick={(e) => this.enableDisableUser(e)} name="false">Enable</Button> : <Button bsStyle="danger" disabled={disabled} name="true" onClick={(e) => this.enableDisableUser(e)} value={user.id}>Disable</Button>}</td>
        <td>{user.roleId}</td>
        <td>{moment(user.createdAt).format("DD-MM-YYYY h:mm:ss")}</td>
        <td>{moment(user.updatedAt).format("DD-MM-YYYY h:mm:ss")}</td>
        <td><Button disabled={disabled} onClick={(e) => this.showModal(e)}>Update Role</Button></td>
        {modal}
      </tr>
    );
  }

}

export default connect(null, { updateUser, fetchRoles })(SingleUser);