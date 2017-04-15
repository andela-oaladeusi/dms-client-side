import { FETCH_ROLES_SUCCESS, DELETE_ROLES_SUCCESS, CREATE_ROLES_SUCCESS } from '../actions/types';

export default (state = [], action = {}) => {
  switch(action.type) {
    case FETCH_ROLES_SUCCESS:
      return action.data;
    case CREATE_ROLES_SUCCESS:
      return [...state, action.data];
    case DELETE_ROLES_SUCCESS:
      return state.filter((role) => role.id !== action.data);
    default: return state;
  }
}
