import React from 'react';
import { connect } from 'react-redux';
import { avalaibleDocument } from '../../actions/documentActions'
import ShowDocuments from './ShowDocuments';
import { Pagination, Button } from 'react-bootstrap';
import ListDocuments from './ListDocuments';

class PublicDocuments extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			avalaibleDoc: [],
			pagination: '',
			activePage: 1,
			tabular: false
		}

		this.showDocument = this.showDocument.bind(this);
		this.handleSelect = this.handleSelect.bind(this);
	 	this.showDocument(0);
	}

	showDocument(offset) {
		this.props.avalaibleDocument(offset).then(
			(res) => {
				this.setState({ avalaibleDoc: res.data.documents.rows, pagination: res.data.pagination })
			},
			(err) => {
				console.log(err);
			}
		)
	}

	handleSelect(eventKey) {
		const offset = (eventKey-1) * this.state.pagination.page_size;
		this.showDocument(offset);
    this.setState({
      activePage: eventKey
    });
  }

	onClick(e) {
		if (this.state.tabular) {
			this.setState({ tabular: false });
		} else {
			this.setState({ tabular: true });
		}
	}

	render() {
		const { avalaibleDoc, pagination, tabular } = this.state;
		const show = avalaibleDoc.map((doc, index) => <ShowDocuments key={index} doc={doc} />);
		return (
			<div className="row">
				<div className="col-md-3">
					{ this.props.auth.user.id === 1
						? <div>
								<h2>Admin</h2>
								<div>{this.props.username}</div>
					      <Button onClick={this.onClick.bind(this)}>{ tabular ? 'View Document as a post' :'View document in tabular form'}</Button>
						  </div>
						: '' }
				</div>
				<div className="col-md-6">
				  {tabular ? <ListDocuments docs={avalaibleDoc}/> : show}
				<Pagination
          bsSize="small"
          items={pagination.page_count}
          activePage={this.state.activePage}
          onSelect={this.handleSelect} />
				</div>
				<div className="col-md-3">
				</div>
			</div>
		);
	}
}

PublicDocuments.propTypes = {
	avalaibleDocument: React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
	return {
		auth: state.auth,
		username: state.auth.user.username
	}
}

export default connect(mapStateToProps, { avalaibleDocument })(PublicDocuments);
