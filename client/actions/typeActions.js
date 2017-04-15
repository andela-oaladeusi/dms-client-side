import axios from 'axios';
import { FETCH_TYPES_SUCCESS } from './types';

export function fetchTypeSuccess(data) {
  return {
    type: FETCH_TYPES_SUCCESS,
    data
  }
}

export function fetchTypes() {
  return dispatch => {
    axios.get('https://andela-dms.herokuapp.com/types')
      .then((res) => {
        return dispatch(fetchTypeSuccess(res.data.types.rows));
      })
      .catch((err) => {
        return dispatch(fetchTypeSuccess(err.data));
      })
  }
}