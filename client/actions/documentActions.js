import axios from 'axios';
import { SET_AVAILABLE_DOCUMENT } from '../actions/types';

export function setAvailableDocument(doc) {
	return {
		type: SET_AVAILABLE_DOCUMENT,
		doc
	}
}

export function createDocument(document) {
	return dispatch => {
		return axios.post('https://andela-dms.herokuapp.com/documents', document);
	};
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
