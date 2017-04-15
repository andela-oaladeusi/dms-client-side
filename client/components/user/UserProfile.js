import React from 'react';
import { connect } from 'react-redux';
import { Panel, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

class UserProfile extends React.Component {
	constructor(props) {
		super(props);

		this.onChange = this.onChange.bind(this);
	}

	onChange() {
		return 'hello';
	}
	
	render() {
		const { userInfo } = this.props;
		return (
		  <div>
		    <Panel header={'PROFILE'}>
              <form>
				<FormGroup>
					<ControlLabel>Username</ControlLabel>
					<FormControl disabled type="text" name="username" value={userInfo.username} />
				</FormGroup>
				<FormGroup>
					<ControlLabel>Firstname</ControlLabel>
					<FormControl disabled type="text" name="firstname" value={userInfo.firstname} />
				</FormGroup>
				<FormGroup>
					<ControlLabel>Lastname</ControlLabel>
					<FormControl disabled type="text" name="lastname" value={userInfo.lastname} />
				</FormGroup>
				<FormGroup>
					<ControlLabel>Email</ControlLabel>
					<FormControl disabled type="text" name="email" value={userInfo.email} />
				</FormGroup>
				<FormGroup controlId="formControlsTextarea" >
					<ControlLabel>About YOU</ControlLabel>
					<FormControl componentClass="textarea" value={userInfo.about} placeholder="Type content here..." />
				</FormGroup>
				<button type="submit" className="btn btn-primary">Update Profile</button>
			  </form>
            </Panel>
		  </div>
		)
	}
}

function mapStateToProps(state) {
	return {
		userInfo: state.auth.user
	}
}

export default connect(mapStateToProps, { })(UserProfile);
