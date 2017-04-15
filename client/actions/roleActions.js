import axios from 'axios';
import { FETCH_ROLES_SUCCESS } from './types';

const BASE_URL = process.env.BASE_URL;
export function fetchRolesSuccess(data) {
  return {
    type: FETCH_ROLES_SUCCESS,
    data
  }
}

export function fetchRoles() {
  return dispatch => {
    return axios.get(`${BASE_URL}/roles`)
      .then((res) => {
        return dispatch(fetchRolesSuccess(res.data.roles));
      })
      .catch((err) => {
        return dispatch(fetchRolesSuccess(err.data));
      })
  }
}