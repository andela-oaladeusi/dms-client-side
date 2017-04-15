import React from 'react';
import { connect } from 'react-redux';
import { fetchRoles } from '../../actions/roleActions';
import { Table, Button } from 'react-bootstrap';
import SingleRole from './SingleRole';

class Roles extends React.Component {
  constructor(props) {
    super(props);
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

  render() {
    const style = {
			float: "right",
			marginBottom: "10px"
		}
    const { roles } = this.props;
    const list = roles.map((role, index) => <SingleRole key={index} index={index} role={role}/> );
    return (
      <div>
				<div>
					<h1>LIST OF ROLES</h1>
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
    roles: state.roles
  }
}

export default connect(mapStateToProps, { fetchRoles })(Roles);