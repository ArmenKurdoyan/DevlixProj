import API_URL from '../../config';
import axios from 'axios';

export const GET_USER_ID = 'devlix/user/GET_USER_ID';
export const GET_USER_ID_SUCCES = 'devlix/user/GET_USER_ID_SUCCES';
export const GET_USER_ID_ERROR = 'devlix/user/GET_USER_ID_ERROR';

export const GET_GROUP_ID = 'devlix/user/GET_GROUP_ID';
export const GET_GROUP_ID_SUCCES = 'devlix/user/GET_GROUP_ID_SUCCES';
export const GET_GROUP_ID_ERROR = 'devlix/user/GET_GROUP_ID_ERROR';

const initialState = {
  userId: null,
  groupId: null,
  error: null,
  isLoading: false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_ID:
      return {
        ...state,
        isLoading: true,
      };
    case GET_USER_ID_SUCCES:
      return {
        ...state,
        isLoading: false,
        userId: action.result.userId,
        groupId: action.result.groupId,
      };
    case GET_USER_ID_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.result,
      };
    
    default:
      return state;
  }
};

export const fetchUserId = () => {
  const URL = `${API_URL}/user/armen_kurdoyan`;
  return axios.get(URL).then((response) => response.data.userId);
};

export const fetchGroupId = () => {
  const URL = `${API_URL}/group/armen_kurdoyan`;
  return axios.get(URL).then((response) => response.data.groupId);
};

export function getUserDetails() {
  const userDetails = [
    fetchGroupId(),
    fetchUserId(),
  ];

  return {
    actions: [
      { type: GET_USER_ID },
      { type: GET_USER_ID_SUCCES },
      { type: GET_USER_ID_ERROR },
    ],
    promise: Promise.all(userDetails).then(([userId, groupId]) => ({
      userId,
      groupId,
    })),
  };
}
