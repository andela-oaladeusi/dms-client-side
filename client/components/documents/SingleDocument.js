import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getDocumentById } from '../../actions/documentActions'
import FacebookProvider, { Comments } from 'react-facebook';


class SingleDocument extends React.Component {

	constructor(props) {
		super(props);
	}

  componentDidMount() {
		const title = this.props.params.title;
		const regex = new RegExp(/(\d+)(?!.-)/);
		const id = title.match(regex)[0];
		this.getDocumentById(id);
  }	

	getDocumentById(id) {
		this.props.getDocumentById(id);
	}

	render() {
		return (
			<div className="row">
				<div className="col-md-3">
					</div>
						<div className="col-md-6">
							<h1>{this.props.singleDoc.title}</h1>
							<p>{this.props.singleDoc.content}</p>
							<Link to="/" className="btn btn-default">See more documents</Link>
							<hr/>
							<FacebookProvider appID={process.env.APP_ID}>
        				<Comments href={`localhost:3000${this.props.location.pathname}`} />
      				</FacebookProvider>
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

function mapStateToProps(state) {
  const singleDoc = state.documents.singleDoc || {}
  return {
    singleDoc
  }
}

export default connect(mapStateToProps, { getDocumentById })(SingleDocument);
