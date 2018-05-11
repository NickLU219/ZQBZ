import { combineReducers } from "redux";
import searchReducer from "./html/search/reducer"
import gridReducer from "./html/home/reducer"
import homeReducer from './html/basic/reducer'
import messageReducer from './html/message/reducer'

const rootReducer = combineReducers({
    searchReducer,
    gridReducer,
    homeReducer,
    messageReducer
});

export default rootReducer;