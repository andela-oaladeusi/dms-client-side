import axios from 'axios'
import { FETCH_ROLES_SUCCESS } from './types';

export function fetchRolesSuccess(data) {
  return {
    type: FETCH_ROLES_SUCCESS,
    data
  }
}

export function fetchRoles() {
  return dispatch => {
    return axios.get('https://andela-dms.herokuapp.com/roles')
      .then((res) => {
        return dispatch(fetchRolesSuccess(res.data.roles));
      })
      .catch((err) => {
        return dispatch(fetchRolesSuccess(err.data));
      })
  }
}