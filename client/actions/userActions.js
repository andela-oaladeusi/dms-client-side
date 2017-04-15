import axios from 'axios';
import { SET_GET_USER, SET_UPDATE_USER, SET_SEARCH_USER, SET_FETCH_USERS, SET_CREATE_USER } from './types';


const BASE_URL = process.env.BASE_URL;

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

export function updateUserMessage(data) {
	return {
		type: SET_UPDATE_USER,
		data
	}
}

export function signupRequest(data) {
	return {
		type: SET_CREATE_USER,
		data
	}
}

export function getUserMessage(data) {
	return {
		type: SET_GET_USER,
		data
	}
}

export function listUsers() {
	return dispatch => {
		return axios.get(`${BASE_URL}/users`)
      .then((res) => {
        return dispatch(fetchUserMessage(res.data.users.rows))
      })
      .catch((err) => {
        return dispatch(fetchUserMessage(err.data));
      })
	};
}

export function updateUser(id, data) {
	return dispatch => {
		return axios.put(`${BASE_URL}/users/${id}`, data)
      .then((res) => {
        return dispatch(updateUserMessage(res.data.updatedUser));
      })
      .catch((err) => {
        return dispatch(updateUserMessage(err.data));
      });
	};
}

export function searchUser(query) {
	return dispatch => {
		return axios.get(`${BASE_URL}/users/search?query=${query}`)
      .then((res) => {
			  return dispatch(searchUserMessage(res.data));
		  })
		  .catch((err) => {
			  return dispatch(searchUserMessage(err.data));
		  });
	};
}

export function userSignupRequest(userData) {
	return dispatch => {
		return axios.post(`${BASE_URL}/users/`, userData)
			.then((res) => {
				return dispatch(signupRequest(res.data.user));
			})
			.catch((err) => {
				return dispatch(signupRequest(err.data.message));
			});
	}
}

export function getUser(id) {
	return dispatch => {
		return axios.get(`${BASE_URL}/users/${id}`)
      .then((res) => {
        return dispatch(getUserMessage(res.data.user));
      })
      .catch((err) => {
        return dispatch(getUserMessage(err.data));
      });
	};
}