import axios from 'axios';
import { SET_AVAILABLE_DOCUMENT, CREATE_DOCUMENT_MESSAGE, UPDATE_DOCUMENT_MESSAGE, SEARCH_DOCUMENT_MESSAGE } from '../actions/types';

export function setAvailableDocument(doc) {
	return {
		type: SET_AVAILABLE_DOCUMENT,
		doc
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

export function searchDocumentMessage(searchResult) {
	return {
		type: SEARCH_DOCUMENT_MESSAGE,
		searchResult
	}
}

export function createDocument(document) {
	return dispatch => {
		return axios.post('https://andela-dms.herokuapp.com/documents', document).then(res => {
			dispatch(createDocumentMessage(true));
		})
		.catch(err =>
			dispatch(createDocumentMessage(err.data.message)));
	};
}

export function updateDocument(document, id) {
	return dispatch => {
		return axios.put(`https://andela-dms.herokuapp.com/documents/${id}`, document).then(res => {
			dispatch(updateDocumentMessage(true));
		})
		.catch(err =>
			dispatch(updateDocumentMessage(err.data[0].message)));
	};
}

export function searchDocument(query) {
	return dispatch => {
		return axios.get(`https://andela-dms.herokuapp.com/documents/search/?query=${query}`).then(res => {
			dispatch(searchDocumentMessage(res.data));
		})
		.catch(err => {
			dispatch(searchDocumentMessage(err.data.message));
		})
	}
}

export function publicDocument() {
	return dispatch => {
		return axios.get('https://andela-dms.herokuapp.com/documents/public');
	};
}

export function getDocumentById(id) {
	return dispatch => {
		return axios.get(`https://andela-dms.herokuapp.com/documents/${id}`);
	};
}

export function avalaibleDocumentRedux() {
	return dispatch => {
		return axios.get('https://andela-dms.herokuapp.com/documents').then(res => {
			const availableDocument = res.data.documents.rows;
			availableDocument.pagination = res.data.pagination;
			dispatch(setAvailableDocument(availableDocument));
		})
		.catch(err => console.log(err));
	};
}

export function avalaibleDocument(offset) {
	return dispatch => {
		return axios.get(`https://andela-dms.herokuapp.com/documents?offset=${offset}`);
	};
}

export function fetchUserDocument({ id, offset }) {
	return dispatch => {
		return axios.get(`https://andela-dms.herokuapp.com/users/${id}/documents?offset=${offset}`);
	};
}

export function getDocumentType() {
	return dispatch => {
		return axios.get('https://andela-dms.herokuapp.com/types');
	};
}
