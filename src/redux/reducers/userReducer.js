import { LOADING_UI, STOP_LOADING_UI, SET_ERRORS, SET_USER, SET_AUTHENTICATED, SET_UNAUTHENTICATED, LOGOUT_USER } from "../types";
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
        case LOGOUT_USER: {
            localStorage.removeItem("FDIdToken");
            delete axios.defaults.headers.common['Authorization'];

        }
        default:
            return state;
    }
} 