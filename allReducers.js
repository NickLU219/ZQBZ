import { combineReducers } from "redux";
import searchReducer from "./html/search/reducer"
import gridReducer from "./html/home/reducer"

const rootReducer = combineReducers({
    searchReducer,
    gridReducer,
});
export default rootReducer;