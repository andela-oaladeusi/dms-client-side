import { SET_SEARCH_USER } from '../actions/types';

const initialState = {
	user: []
}

export default (state = initialState, action = {}) => {
	switch(action.type) {
		case SET_SEARCH_USER:
			return Object.assign({}, state, { searchResult: action.searchResult })
		
		default: return state;
	}
}