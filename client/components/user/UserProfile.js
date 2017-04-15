import React from 'react';
import { connect } from 'react-redux';
import { Panel, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { updateUser, getUser } from '../../actions/userActions';

class UserProfile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			myProfile: {},
			firstname: '',
			lastname: '',
			about: ''
		}
		this.onChange = this.onChange.bind(this);
	}

	componentDidMount() {
	  this.getMyProfile();
	}

	getMyProfile() {
	  this.props.getUser(this.props.userInfo.id)
	  	.then(() => {
			this.setState({ myProfile: this.props.myProfile, firstname: this.props.myProfile.firstname, lastname: this.props.myProfile.lastname, about: this.props.myProfile.about });
		});
	}

	onChange(e) {
		e.preventDefault(e);
		this.setState({ [e.target.name]: e.target.value })
	}

	updateProfile(e) {
		e.preventDefault(e);
		this.props.updateUser(this.props.myProfile.id, this.state);
	}
	
	render() {
		const { myProfile, firstname, lastname, about } = this.state;
		return (
		  <div>
		    <Panel header={'PROFILE'}>
              <form onSubmit={(e) => this.updateProfile(e)}>
				<FormGroup>
					<ControlLabel>Username</ControlLabel>
					<FormControl disabled type="text" name="username" value={myProfile.username} />
				</FormGroup>
				<FormGroup>
					<ControlLabel>Firstname</ControlLabel>
					<FormControl onChange={this.onChange} type="text" name="firstname" value={firstname} />
				</FormGroup>
				<FormGroup>
					<ControlLabel>Lastname</ControlLabel>
					<FormControl onChange={this.onChange} type="text" name="lastname" value={lastname} />
				</FormGroup>
				<FormGroup>
					<ControlLabel>Email</ControlLabel>
					<FormControl disabled type="text" name="email" value={myProfile.email} />
				</FormGroup>
				<FormGroup controlId="formControlsTextarea" >
					<ControlLabel>About YOU</ControlLabel>
					<FormControl componentClass="textarea" name="about" onChange={this.onChange} value={about} placeholder="Type content here..." />
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
		userInfo: state.auth.user,
		myProfile: state.users.myProfile || {}
	}
}

export default connect(mapStateToProps, { getUser, updateUser })(UserProfile);
