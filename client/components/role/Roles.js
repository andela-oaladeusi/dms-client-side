import React from 'react';
import { connect } from 'react-redux';
import { fetchRoles, createRole } from '../../actions/roleActions';
import { Table, Button, Modal, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import SingleRole from './SingleRole';

class Roles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      title: ''
    }
  }

  componentDidMount(){
    this.fetchRoles();
  }

  componentWillMount(){
    this.fetchRoles();
  }

  fetchRoles() {
    this.props.fetchRoles();
  }

  showModal() {
    this.setState({ show: true });
  }

  closeModal() {
    this.setState({ show: false });
  }

  onChange(e) {
    this.setState({ title: e.target.value })
  }

  saveRole() {
    this.props.createRole(this.state);
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
          <Modal.Title id="contained-modal-title">ADD A ROLE</Modal.Title>
        </Modal.Header>
        <Modal.Body>
				  <form>
				    <FormGroup>
					    <ControlLabel>Role</ControlLabel>
					  <FormControl onChange={(e) => this.onChange(e)} type="text" placeholder="role..." name="title" value={this.state.title} />
				    </FormGroup>
          </form>
				</Modal.Body>
        <Modal.Footer>
          <Button onClick={() => this.saveRole()}>Save Role</Button>
          <Button onClick={() => this.closeModal()}>Close</Button>
        </Modal.Footer>
      </Modal>
    )


    const { roles } = this.props;
    const list = roles.map((role, index) => <SingleRole key={index} index={index} role={role}/> );
    return (
      <div>
				<div>
					<h1>LIST OF ROLES</h1>
					<Button onClick={() => this.showModal()}style={style}>Add</Button>
				</div>
        <Table striped bordered condensed hover>
					<thead>
						<tr>
							<th>ID</th>
              <th>Title</th>
							<th>Created At</th>
							<th>Updated At</th>
              <th>Delete</th>
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
function mapStateToProps(state) {
  return {
    roles: state.roles
  }
}

export default connect(mapStateToProps, { fetchRoles, createRole })(Roles);