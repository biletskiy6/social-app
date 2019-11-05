
import { combineReducers } from "redux";
import { reducer as form } from "redux-form";

import dataReducer from './dataReducer';
import uiReducer from './uiReducer';
import userReducer from './userReducer';

export default combineReducers({
    user: userReducer,
    UI: uiReducer,
    data: dataReducer,
    form
});