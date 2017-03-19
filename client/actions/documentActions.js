import axios from 'axios';

export function createDocument(document) {
	return dispatch => {
		return axios.post('https://andela-dms.herokuapp.com/documents', document);
	};
}
