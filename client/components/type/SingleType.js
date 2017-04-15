import React from 'react';
import moment from 'moment';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { deleteType } from '../../actions/typeActions';


class SingleType extends React.Component {
  constructor(props) {
    super(props);
  }

  deleteType() {
    this.props.deleteType(this.props.type.id);
  }

  render() {
      const { index, type } = this.props;
      const disabled = type.id === 1 || type.id === 2;
      return (
        <tr>
          <td>{type.id}</td>
          <td>{type.title}</td>
		      <td>{moment(type.createdAt).format("DD-MM-YYYY h:mm:ss")}</td>
		      <td>{moment(type.updatedAt).format("DD-MM-YYYY h:mm:ss")}</td>
          <td><Button disabled={disabled} onClick={() => this.deleteType()}bsStyle="success">Delete</Button></td>
        </tr>
      );
  }

}

export default connect(null, { deleteType })(SingleType);