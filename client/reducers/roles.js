import { FETCH_ROLES_SUCCESS } from '../actions/types';

export default (state = [], action = {}) => {
  switch(action.type) {
    case FETCH_ROLES_SUCCESS:
      return action.data;
    default: return state;
  }
}
