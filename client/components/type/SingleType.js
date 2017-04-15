import React from 'react';
import moment from 'moment';
import { Button } from 'react-bootstrap';;


class SingleType extends React.Component {

  render() {
      const { index, type } = this.props;
      return (
        <tr>
          <td>{type.id}</td>
          <td>{type.title}</td>
		      <td>{moment(type.createdAt).format("DD-MM-YYYY h:mm:ss")}</td>
		      <td>{moment(type.updatedAt).format("DD-MM-YYYY h:mm:ss")}</td>
          <td><Button bsStyle="success">Delete</Button></td>
        </tr>
      );
  }

}

export default SingleType;