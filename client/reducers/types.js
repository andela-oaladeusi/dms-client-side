import { FETCH_TYPES_SUCCESS } from '../actions/types';

export default (state=[], action={}) => {
  switch(action.type) {
    case FETCH_TYPES_SUCCESS:
      return action.data;
  
    default: return state;
  }
}