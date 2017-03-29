import axios from 'axios';

export function listUsers() {
	return dispatch => {
		return axios.get('https://andela-dms.herokuapp.com/users');
	};
}

export function updateUser(data, id) {
	return dispatch => {
		return axios.put(`https://andela-dms.herokuapp.com/users/${id}`, data);
	};
}