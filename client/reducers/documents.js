import { SET_AVAILABLE_DOCUMENT } from '../actions/types'

const initialState = {
	doc: []
}
export default (state = initialState, action ={}) => {
	switch(action.type) {
		case SET_AVAILABLE_DOCUMENT:
			return {
				doc: action.doc
			};

		default: return state;
	}
}