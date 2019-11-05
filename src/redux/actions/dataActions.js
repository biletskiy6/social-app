import { SET_POSTS, LOADING_DATA, LIKE_POST, UNLIKE_POST } from '../types';
export const getPosts = (posts) => ({ type: SET_POSTS, payload: posts })
export const loadingData = () => ({ type: LOADING_DATA })
export const likePostAction = (data) => ({ type: LIKE_POST, payload: { ...data } })
export const unlikePostAction = (data) => ({ type: UNLIKE_POST, payload: { ...data } })
