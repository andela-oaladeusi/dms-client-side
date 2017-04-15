import { FETCH_TYPES_SUCCESS, CREATE_TYPES_SUCCESS, DELETE_TYPES_SUCCESS } from '../actions/types';

export default (state=[], action={}) => {
  switch(action.type) {
    case FETCH_TYPES_SUCCESS:
      return action.data;
    case CREATE_TYPES_SUCCESS:
      return [...state, action.data];
    case DELETE_TYPES_SUCCESS:
      return state.filter((type) => type.id !== action.data);

    default: return state;
  }
}