import React from 'react';
import moment from 'moment';
import { Button } from 'react-bootstrap';;


class SingleUser extends React.Component {

  render() {
    const { index, user } = this.props;
    return (
      <tr>
        <td>{index}</td>
        <td>{user.id}</td>
        <td>{user.firstname}</td>
        <td>{user.lastname}</td>
        <td>{user.username}</td>
        <td>{user.email}</td>
        <td>{String(user.active)}</td>
        <td>{user.disable ? <Button bsStyle="success" value={user.id} name="false">Enable</Button> : <Button bsStyle="danger" name="true" value={user.id}>Disable</Button>}</td>
        <td>{user.roleId}</td>
        <td>{moment(user.createdAt).format("DD-MM-YYYY h:mm:ss")}</td>
        <td>{moment(user.updatedAt).format("DD-MM-YYYY h:mm:ss")}</td>
        <td><Button>Update Role</Button></td>
      </tr>
    );
  }

}

export default SingleUser;