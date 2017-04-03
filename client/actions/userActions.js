import axios from 'axios';
import { SET_SEARCH_USER } from './types';

export function searchUserMessage(searchResult) {
	return {
		type: SET_SEARCH_USER,
		searchResult
	}
}

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

export function searchUser(query) {
	return dispatch => {
		return axios.get(`https://andela-dms.herokuapp.com/users/search?query=${query}`).then((res) => {
			return dispatch(searchUserMessage(res.data));
		})
		.catch((err) => {
			return dispatch(searchUserMessage(err.data));
		});
	};
}
