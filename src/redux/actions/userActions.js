import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, LOADING_USER, STOP_LOADING_USER, LOGOUT_USER, SET_UNAUTHENTICATED } from '../types';
export const getAuthenticatedUserData = (data) => ({ type: SET_USER, payload: data })
export const loadingUser = () => ({ type: LOADING_USER })
export const stopLoadingUser = () => ({ type: STOP_LOADING_USER })
export const logoutUser = () => ({ type: LOGOUT_USER })
export const setUnauthenticated = () => ({ type: SET_UNAUTHENTICATED })
