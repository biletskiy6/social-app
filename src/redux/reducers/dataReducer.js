import { SET_POSTS, LIKE_POST, UNLIKE_POST } from "../types";

const initialState = {
    posts: [],
    post: {},
    loading: true
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_POSTS: {
            return {
                posts: action.payload,
                loading: false,
            }
        }
        case LIKE_POST:
        case UNLIKE_POST:
            let index = state.posts.findIndex(
                (post) => post.postId === action.payload.postId
            );

            state.posts[index] = action.payload;





            return {
                ...state,
                posts: [
                    ...state.posts.slice(0, index),
                    action.payload,
                    ...state.posts.slice(index + 1),

                ]
            };
        default:
            return state;
    }
}