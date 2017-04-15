import React from 'react';
import { connect } from 'react-redux';
import { fetchTypes } from '../../actions/typeActions';
import { Table, Button } from 'react-bootstrap';
import SingleType from './SingleType';

class Types extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.fetchTypes();
  }

  fetchTypes() {
    this.props.fetchTypes();
  }


  render() {
    const style = {
			float: "right",
			marginBottom: "10px"
		}
    const { types } = this.props;
    const list = types.map((type, index) => <SingleType key={index} index={index} type={type}/> );
    return (
      <div>
				<div>
					<h1>LIST OF TYPES</h1>
					<Button style={style}>Add</Button>
				</div>
        <Table striped bordered condensed hover>
					<thead>
						<tr>
							<th>No.</th>
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
      </div>
    )
  }

}

function mapStateToProps(state) {
  return {
    types: state.types
  }
}

export default connect(mapStateToProps, { fetchTypes })(Types);