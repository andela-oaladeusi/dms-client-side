import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { deleteRole } from '../../actions/roleActions';


class SingleRole extends React.Component {

  deleteRole() {
    this.props.deleteRole(this.props.role.id);
  }

  render() {
      const { index, role } = this.props;
      const disabled = role.title === 'admin' || role.title === 'regular';
      return (
        <tr>
          <td>{role.id}</td>
          <td>{role.title}</td>
		      <td>{moment(role.createdAt).format("DD-MM-YYYY h:mm:ss")}</td>
		      <td>{moment(role.updatedAt).format("DD-MM-YYYY h:mm:ss")}</td>
          <td><Button onClick={() => this.deleteRole()}bsStyle="success" disabled={disabled}>Delete</Button></td>
        </tr>
      );
  }

}

export default connect(null, { deleteRole })(SingleRole);