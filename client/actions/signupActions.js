import axios from 'axios';

export function userSignupRequest(userData) {
	return dispatch => {
		return axios.post('https://andela-dms.herokuapp.com/users/', userData);
	}
}