import React from 'react';
import moment from 'moment';
import { Table, Button } from 'react-bootstrap';

class ListDocuments extends React.Component{
	render() {
		const { docs } = this.props;
		const list = docs.map((doc, index) => {
			return ( <tr key={index}>
								<td>{index + 1}</td>
								<td>{doc.id}</td>
								<td>{doc.title}</td>
								<td>{doc.content.substring(0, 200)+'...'}</td>
								<td>{doc.type}</td>
								<td>{doc.access}</td>
								<td>{String(doc.disable)}</td>
								<td>{doc.ownerId}</td>
								<td>{moment(doc.createdAt).format("DD-MM-YYYY h:mm:ss")}</td>
								<td>{moment(doc.updatedAt).format("DD-MM-YYYY h:mm:ss")}</td>
								<td><Button>View</Button></td>
							</tr>
						);
		});
		return (
			<div>
				<h1>LIST OF Documents</h1>
				<Table striped bordered condensed hover>
					<thead>
						<tr>
							<th>No.</th>
							<th>ID</th>
							<th>Title</th>
							<th>Content</th>
							<th>Type</th>
							<th>Access</th>
							<th>Disable</th>
							<th>OwnerId</th>
							<th>Created At</th>
							<th>Updated At</th>
							<th>View</th>
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

export default ListDocuments;