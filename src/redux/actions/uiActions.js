import { SET_ERRORS, CLEAR_ERRORS, LOADING_UI, STOP_LOADING_UI } from '../types';
export const loadingUI = () => ({ type: LOADING_UI })
export const stopLoadingUI = () => ({ type: STOP_LOADING_UI })
export const setErrors = (error) => ({ type: SET_ERRORS, payload: error.response.data })
export const clearErrors = () => ({ type: CLEAR_ERRORS })