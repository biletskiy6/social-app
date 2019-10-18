import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI } from '../types';
export const getAuthenticatedUserData = (data) => ({ type: SET_USER, payload: data })
