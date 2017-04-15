import React from 'react';
import moment from 'moment';
import { Button } from 'react-bootstrap';;


class SingleRole extends React.Component {

  render() {
      const { index, role } = this.props;
      return (
        <tr>
          <td>{index}</td>
          <td>{role.id}</td>
          <td>{role.title}</td>
		  <td>{moment(role.createdAt).format("DD-MM-YYYY h:mm:ss")}</td>
		  <td>{moment(role.updatedAt).format("DD-MM-YYYY h:mm:ss")}</td>
          <td><Button bsStyle="success" disabled={role.title!=='admin'||'regular'? true : false}>Delete</Button></td>
        </tr>
      );
  }

}

export default SingleRole;