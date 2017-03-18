import axios from 'axios';
import setAuthorisationToken from '../utils/setAuthorisationToken';
import { SET_CURRENT_USER } from '../actions/types';

export function setCurrentUser(user) {
	return {
		type: SET_CURRENT_USER,
		user
	}
}

export function login(data) {
	return dispatch => {
		return axios.post('https://andela-dms.herokuapp.com/users/login', data)
			.then(res => {
				const token = res.data.token;
				const { username, id, firstname, lastname } = res.data.user;
				localStorage.setItem('jwtToken', token);
				localStorage.setItem('dmsUser', { id, username , firstname, lastname });
				setAuthorisationToken(token);
				dispatch(setCurrentUser({ id, username , firstname, lastname }))
			});
	}
}
