import { SET_USER, SET_AUTHENTICATED, SET_UNAUTHENTICATED, LOGOUT_USER, LOADING_USER, STOP_LOADING_USER, LIKE_POST, UNLIKE_POST } from "../types";
import axios from "axios";

const initialState = {
    authenticated: false,
    loading: false,
    credentials: {},
    likes: [],
    notifications: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_AUTHENTICATED: {
            return {
                ...state,
                authenticated: true
            }
        }
        case SET_UNAUTHENTICATED: {
            return initialState;
        }
        case SET_USER: {
            return {
                authenticated: true,
                loading: false,
                ...action.payload
            }
        }
        case LOADING_USER: {
            return {
                ...state,
                loading: true
            }
        }
        case STOP_LOADING_USER: {
            return {
                ...state,
                loading: false
            }
        }

        case LOGOUT_USER: {
            localStorage.removeItem("FBIdToken");
            delete axios.defaults.headers.common['Authorization'];
            return { ...state, authenticated: false, credentials: {} }
        }
        case LIKE_POST: {
            return {
                ...state,
                likes: [
                    ...state.likes,
                    {
                        userHandle: state.credentials.handle,
                        postId: action.payload.postId
                    }
                ]
            }
        }
        case UNLIKE_POST: {
            return {
                ...state,
                likes: state.likes.filter(like => like.postId !== action.payload.postId)
            }
        }

        default:
            return state;
    }
} 