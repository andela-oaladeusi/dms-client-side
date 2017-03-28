import React from 'react';
import { Carousel } from 'react-bootstrap';
import LoginPage from '../login/LoginPage';

class GuestPage extends React.Component {
  constructor(props) {
		super(props);
	}


  render() {
		const style = {
			height: "80%",
			backgroundColor: "purple"
		}
    return (
			<div width={900} style={style}>
				<LoginPage />
			</div>
    );
  }
}

export default GuestPage;