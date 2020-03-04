import API_URL from '../../config';
import axios from 'axios';

export const GET_DATA = 'devlix/user/GET_DATA';
export const GET_DATA_SUCCES = 'devlix/user/GET_DATA_SUCCES';
export const GET_DATA_ERROR = 'devlix/user/GET_DATA_ERROR';

export const UPDATE_DATA = 'devlix/user/UPDATE_DATA';
export const UPDATE_DATA_SUCCES = 'devlix/user/UPDATE_DATA_SUCCES';
export const UPDATE_DATA_ERROR = 'devlix/user/UPDATE_DATA_ERROR';

const initialState = {
  data: null,
  error: null,
  isLoading: false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_DATA:
      return {
        ...state,
        isLoading: true,
      };
    case GET_DATA_SUCCES:
      return {
        ...state,
        isLoading: false,
        data: action.result.data,
      };
    case GET_DATA_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.result,
      };
    case UPDATE_DATA:
      return {
        ...state,
        isLoading: true,
      };
    case UPDATE_DATA_SUCCES:
      return {
        ...state,
        isLoading: false,
        data: null,
      };
    case UPDATE_DATA_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.result,
      };
    
    default:
      return state;
  }
};

export const fetchData = (userId, groupId) => {
  const URL = `${API_URL}/proscons/group/${userId}/user/${groupId}`;
  return axios.get(URL).then((response) => response);
};

export const putData = (userId, groupId, payload) => {
  const URL = `${API_URL}/proscons/group/${userId}/user/${groupId}`;
  return axios.put(URL, payload).then((response) => response);
} 

export function getData(userId, groupId) {
  return {
    actions: [
      { type: GET_DATA },
      { type: GET_DATA_SUCCES },
      { type: GET_DATA_ERROR },
    ],
    promise: fetchData(userId, groupId),
  };
}

export function updateData(userId, groupId) {
  return {
    actions: [
      { type: UPDATE_DATA },
      { type: UPDATE_DATA_SUCCES },
      { type: UPDATE_DATA_ERROR },
    ],
    promise: putData(userId, groupId),
  };
}