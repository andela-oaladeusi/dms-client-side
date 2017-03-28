import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getDocumentById } from '../../actions/documentActions'

class SingleDocument extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			singleDoc: {}
		}
		const title = this.props.params.title;
		const regex = new RegExp(/(\d+)(?!.-)/);
		const id = title.match(regex)[0];
		this.getDocumentById(id);
		this.getDocumentById = this.getDocumentById.bind(this);
	}

	getDocumentById(id) {
		this.props.getDocumentById(id).then(
			(res) => {
				this.setState({ singleDoc: res.data.document });
				return res.data.document;
			},
			(err) => {
				console.log(err);
			}
		)

	}

	render() {
		return (
			<div className="row">
				<div className="col-md-3">
					</div>
						<div className="col-md-6">
							<h1>{this.state.singleDoc.title}</h1>
							<p>{this.state.singleDoc.content}</p>
							<Link to="/" className="btn btn-default">See more documents</Link>
							<hr/>
						</div>
					<div className="col-md-3">
				</div>
			</div>
		)
	}
}

SingleDocument.propTypes = {
	getDocumentById: React.PropTypes.func.isRequired
}

export default connect(null, { getDocumentById })(SingleDocument);
