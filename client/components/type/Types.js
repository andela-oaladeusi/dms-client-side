import React from 'react';
import { connect } from 'react-redux';
import { fetchTypes, createType } from '../../actions/typeActions';
import { Table, Button, Modal, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import SingleType from './SingleType';

class Types extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      title: ''
    }
  }

  componentDidMount() {
    this.fetchTypes();
  }

  fetchTypes() {
    this.props.fetchTypes();
  }

  showModal() {
    this.setState({ show: true });
  }

  closeModal() {
    this.setState({ show: false });
  }

  onChange(e) {
    e.preventDefault(e);
    this.setState({ title: e.target.value });
  }

  saveType() {
    this.props.createType(this.state);
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
          <Modal.Title id="contained-modal-title">ADD DOCUMENT TYPE</Modal.Title>
        </Modal.Header>
        <Modal.Body>
				  <form>
				    <FormGroup>
					    <ControlLabel>Type</ControlLabel>
					  <FormControl onChange={(e) => this.onChange(e)} type="text" placeholder="type..." name="title" value={this.state.title} />
				    </FormGroup>
          </form>
				</Modal.Body>
        <Modal.Footer>
          <Button onClick={() => this.saveType()}>Save Type</Button>
          <Button onClick={() => this.closeModal()}>Close</Button>
        </Modal.Footer>
      </Modal>
    )

    const { types } = this.props;
    const list = types.map((type, index) => <SingleType key={index} index={index} type={type}/> );
    return (
      <div>
				<div>
					<h1>LIST OF TYPES</h1>
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
    types: state.types
  }
}

export default connect(mapStateToProps, { fetchTypes, createType })(Types);