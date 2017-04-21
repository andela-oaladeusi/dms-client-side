import axios from 'axios';
import { SET_USER_DOCUMENT, SET_AVAILABLE_DOCUMENT, SET_SINGLE_DOCUMENT, CREATE_DOCUMENT_MESSAGE, UPDATE_DOCUMENT_MESSAGE, DELETE_DOCUMENT_MESSAGE, SEARCH_DOCUMENT_MESSAGE } from '../actions/types';

const BASE_URL = process.env.BASE_URL;

export function setAvailableDocument(docs) {
	return {
		type: SET_AVAILABLE_DOCUMENT,
		docs
	}
}

export function setSingleDocument(doc) {
	return {
		type: SET_SINGLE_DOCUMENT,
		doc
	}
}

export function setUserDocument(userDoc) {
	return {
		type: SET_USER_DOCUMENT,
		userDoc
	}
}

export function createDocumentMessage(done) {
	return {
		type: CREATE_DOCUMENT_MESSAGE,
		createDoc: done
	}
}

export function updateDocumentMessage(done) {
	return {
		type: UPDATE_DOCUMENT_MESSAGE,
		updateDoc: done
	}
}

export function deleteDocumentMessage(done) {
	return {
		type: DELETE_DOCUMENT_MESSAGE,
		deleteDoc: done
	}
}

export function searchDocumentMessage(searchResult) {
	return {
		type: SEARCH_DOCUMENT_MESSAGE,
		searchResult
	}
}

export function createDocument(document) {
	return dispatch => {
		return axios.post(`${BASE_URL}/documents`, document).then(res => {
			dispatch(createDocumentMessage(true));
		})
		.catch(err =>
			dispatch(createDocumentMessage(err.data.message)));
	};
}

export function updateDocument(document, id) {
	return dispatch => {
		return axios.put(`${BASE_URL}/documents/${id}`, document).then(res => {
			dispatch(updateDocumentMessage(true));
		})
		.catch(err =>
			dispatch(updateDocumentMessage(err.data[0].message)));
	};
}

export function deleteDocument(id) {
	return dispatch => {
		return axios.delete(`${BASE_URL}/documents/${id}`).then(res => {
			dispatch(deleteDocumentMessage(true));
		})
		.catch(err =>
			dispatch(deleteDocumentMessage(err.data.message)));
	};
}

export function searchDocument(query) {
	return dispatch => {
		return axios.get(`${BASE_URL}/documents/search/?query=${query.query}&offset=${query.offset}`).then(res => {
			dispatch(searchDocumentMessage(res.data));
		})
		.catch(err => {
			dispatch(searchDocumentMessage(err.data.message));
		})
	}
}

export function getDocumentById(id) {
	return dispatch => {
		return axios.get(`${BASE_URL}/documents/${id}`)
      .then((res) => {
        return dispatch(setSingleDocument(res.data));
      })
      .catch((err) => {
        return dispatch(setSingleDocument(err.data));
      })
	};
}

export function avalaibleDocument(offset) {
	return dispatch => {
		return axios.get(`${BASE_URL}/documents?offset=${offset}`)
      .then((res) => {
        return dispatch(setAvailableDocument(res.data));
      })
      .catch((err) => {
        return dispatch(setAvailableDocument(err.data));
      });
	};
}

export function fetchUserDocument1({ id, offset }) {
	return dispatch => {
		return axios.get(`${BASE_URL}/users/${id}/documents?offset=${offset}`);
	};
}

export function fetchUserDocument({ id, offset }) {
	return dispatch => {
		return axios.get(`${BASE_URL}/users/${id}/documents?offset=${offset}`)
      .then((res) => {
        const user = res.data.userDocuments;
        return dispatch(setUserDocument({ userDoc: user.documents.rows, userInfo: user.user, pagination: res.data.pagination }));
      })
      .catch((err) => {
        return dispatch(setUserDocument(err.data));
      })
	};
}
