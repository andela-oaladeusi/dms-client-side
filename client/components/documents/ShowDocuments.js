import React from 'react';
import { Link } from 'react-router';

class ShowDocuments extends React.Component {
	render() {
		const { doc } = this.props;
		const full = `/documents/${doc.id}-${doc.title}`
		return (
			<div>
				<h1>{doc.title}</h1>
				<p>{doc.content.substring(0, 600)+'...'}</p>
				<hr/>
				<p>Access: {doc.access}</p>
				<p>Category: {doc.type}</p>
				<Link to={full} className="btn btn-default">More info</Link>
				<hr/>
			</div>
		)
	}
}
export default ShowDocuments;
