import React from 'react';
import { connect } from 'react-redux';
import GuestPage from '../guest/GuestPage';
import Documents from '../documents/Documents';

class HomePage extends React.Component {

  render() {
		const { isAuthenticated } = this.props;
    return (
      <div>
			  {isAuthenticated ? <Documents /> : <GuestPage />}
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