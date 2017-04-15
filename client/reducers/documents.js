import { SET_USER_DOCUMENT, SET_AVAILABLE_DOCUMENT, SET_SINGLE_DOCUMENT, CREATE_DOCUMENT_MESSAGE, UPDATE_DOCUMENT_MESSAGE, SEARCH_DOCUMENT_MESSAGE } from '../actions/types'
const initialState = {
	docs: []
}
export default (state = initialState, action = {}) => {
	switch(action.type) {
		case SET_AVAILABLE_DOCUMENT:
			return {
				docs: action.docs.documents.rows,
        pagination: action.docs.pagination
			};

    case SET_SINGLE_DOCUMENT:
      return Object.assign({}, state, { singleDoc: action.doc.document });
    
    case SET_USER_DOCUMENT:
      return Object.assign({}, state, action.userDoc);

		case CREATE_DOCUMENT_MESSAGE:
			return Object.assign({}, state, { createDoc: action.createDoc });

		case UPDATE_DOCUMENT_MESSAGE:
			return Object.assign({}, state, { updateDoc: action.updateDoc });

		case SEARCH_DOCUMENT_MESSAGE:
			return Object.assign({}, state, { searchResult: action.searchResult });

		default: return state;
	}
}