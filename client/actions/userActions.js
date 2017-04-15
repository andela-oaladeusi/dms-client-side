import axios from 'axios';
import { SET_SEARCH_USER, SET_FETCH_USERS } from './types';

export function searchUserMessage(searchResult) {
	return {
		type: SET_SEARCH_USER,
		searchResult
	}
}

export function fetchUserMessage(data) {
	return {
		type: SET_FETCH_USERS,
		data
	}
}

export function listUsers() {
	return dispatch => {
		return axios.get('https://andela-dms.herokuapp.com/users')
      .then((res) => {
        return dispatch(fetchUserMessage(res.data.users.rows))
      })
      .catch((err) => {
        return dispatch(fetchUserMessage(err.data));
      })
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
