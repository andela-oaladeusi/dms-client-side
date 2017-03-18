import axios from 'axios';

export function login(data) {
	return dispatch => {
		return axios.post('https://andela-dms.herokuapp.com/users/login', data);
	}
}
