import { SET_GET_USER, SET_UPDATE_USER, SET_SEARCH_USER, SET_FETCH_USERS } from '../actions/types';

const initialState = {
	user: []
}

export default (state = initialState, action = {}) => {
	switch(action.type) {
    case SET_FETCH_USERS:
      return Object.assign({}, state, { user: action.data });
	case SET_SEARCH_USER:
	  return Object.assign({}, state, { searchResult: action.searchResult });
	case SET_UPDATE_USER:
		return Object.assign({}, state, { singleUser: action.data });
	case SET_GET_USER:
		return Object.assign({}, state, { myProfile: action.data });
	default: return state;
  }
}