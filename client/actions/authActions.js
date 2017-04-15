import axios from 'axios';
import setAuthorisationToken from '../utils/setAuthorisationToken';
import { SET_CURRENT_USER } from '../actions/types';

const BASE_URL = process.env.BASE_URL;

export function setCurrentUser(user) {
	return {
		type: SET_CURRENT_USER,
		user
	}
}

export function logout() {
	return dispatch => {
		axios.post(`${BASE_URL}/users/logout`);
		localStorage.removeItem('jwtToken');
		localStorage.removeItem('dmsUser');
		setAuthorisationToken(false);
		dispatch(setCurrentUser({}));
	}
}


export function login(data) {
	return dispatch => {
		return axios.post(`${BASE_URL}/users/login`, data)
			.then(res => {
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
