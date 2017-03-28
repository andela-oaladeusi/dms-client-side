import React from 'react';
import { connect } from 'react-redux';
import GuestPage from '../guest/GuestPage';
import PublicDocuments from '../documents/PublicDocuments';

class HomePage extends React.Component {

  render() {
		const { isAuthenticated } = this.props;
    return (
      <div>
			  {isAuthenticated ? <PublicDocuments /> : <GuestPage />}
			</div>
    );
  }
}

function mapStateToProps(state) {
	return {
		isAuthenticated: state.auth.isAuthenticated
	}
}

export default connect(mapStateToProps, {})(HomePage);