import axios from 'axios';
import { FETCH_TYPES_SUCCESS, CREATE_TYPES_SUCCESS, DELETE_TYPES_SUCCESS } from './types';

const BASE_URL = process.env.BASE_URL;

export function fetchTypeSuccess(data) {
  return {
    type: FETCH_TYPES_SUCCESS,
    data
  }
}

export function createTypeSuccess(data) {
  return {
    type: CREATE_TYPES_SUCCESS,
    data
  }
}

export function deleteTypeMessage(data) {
  return {
    type: DELETE_TYPES_SUCCESS,
    data
  }
}

export function fetchTypes() {
  return dispatch => {
    axios.get(`${BASE_URL}/types`)
      .then((res) => {
        return dispatch(fetchTypeSuccess(res.data.types.rows));
      })
      .catch((err) => {
        return dispatch(fetchTypeSuccess(err.data));
      })
  }
}

export function createType(data) {
  return dispatch => {
    axios.post(`${BASE_URL}/types`, data)
      .then((res) => {
        return dispatch(createTypeSuccess(res.data.type));
      })
      .catch((err) => {
        return dispatch(createTypeSuccess(err.data));
      });
  }
}

export function deleteType(id) {
  return dispatch => {
    axios.delete(`${BASE_URL}/types/${id}`)
      .then((res) => {
        return dispatch(deleteTypeMessage(id));
      })
      .catch((err) => {
        return dispatch(deleteTypeMessage(err.data));
      });
  }
}