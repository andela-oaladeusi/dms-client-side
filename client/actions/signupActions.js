import axios from 'axios';

const BASE_URL = process.env.BASE_URL;

export function userSignupRequest(userData) {
	return dispatch => {
		return axios.post(`${BASE_URL}/users/`, userData);
	}
}