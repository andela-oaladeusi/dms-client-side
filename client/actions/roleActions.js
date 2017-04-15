import axios from 'axios';
import { FETCH_ROLES_SUCCESS, CREATE_ROLES_SUCCESS, DELETE_ROLES_SUCCESS } from './types';

const BASE_URL = process.env.BASE_URL;
export function fetchRolesSuccess(data) {
  return {
    type: FETCH_ROLES_SUCCESS,
    data
  }
}

export function createRoleSuccess(data) {
  return {
    type: CREATE_ROLES_SUCCESS,
    data
  }
}

export function deleteRoleMessage(data) {
  return {
    type: DELETE_ROLES_SUCCESS,
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

export function createRole(data) {
  return dispatch => {
    axios.post(`${BASE_URL}/roles`, data)
      .then((res) => {
        return dispatch(createRoleSuccess(res.data.role));
      })
      .catch((err) => {
        return dispatch(createRoleSuccess(err.data));
      });
  }
}

export function deleteRole(id) {
  return dispatch => {
    axios.delete(`${BASE_URL}/roles/${id}`)
      .then((res) => {
        return dispatch(deleteRoleMessage(id));
      })
      .catch((err) => {
        return dispatch(deleteRoleMessage(err.data));
      });
  }
}