import { SET_AVAILABLE_DOCUMENT, CREATE_DOCUMENT_MESSAGE, UPDATE_DOCUMENT_MESSAGE, SEARCH_DOCUMENT_MESSAGE } from '../actions/types'
const initialState = {
	doc: []
}
export default (state = initialState, action = {}) => {
	switch(action.type) {
		case SET_AVAILABLE_DOCUMENT:
			return {
				doc: action.doc
			};

		case CREATE_DOCUMENT_MESSAGE:
			return Object.assign({}, state, { createDoc: action.createDoc });

		case UPDATE_DOCUMENT_MESSAGE:
			return Object.assign({}, state, { updateDoc: action.updateDoc });

		case SEARCH_DOCUMENT_MESSAGE:
			return Object.assign({}, state, { searchResult: action.searchResult })

		default: return state;
	}
}