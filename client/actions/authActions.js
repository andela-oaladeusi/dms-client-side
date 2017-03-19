import axios from 'axios';
import setAuthorisationToken from '../utils/setAuthorisationToken';
import { SET_CURRENT_USER } from '../actions/types';

export function setCurrentUser(user) {
	return {
		type: SET_CURRENT_USER,
		user
	}
}

export function logout() {
	return dispatch => {
		localStorage.removeItem('jwtToken');
		localStorage.removeItem('dmsUser');
		setAuthorisationToken(false);
		dispatch(setCurrentUser({}));
	}
}


export function login(data) {
	return dispatch => {
		return axios.post('https://andela-dms.herokuapp.com/users/login', data)
			.then(res => {
				delete res.data.user.email;
				const token = res.data.token;
				const user = JSON.stringify(res.data.user);
				const dmsUser = res.data.user;
				localStorage.setItem('jwtToken', token);
				localStorage.setItem('dmsUser', user);
				setAuthorisationToken(token);
				dispatch(setCurrentUser(dmsUser));
			});
	}
}
