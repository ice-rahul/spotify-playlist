import { combineReducers } from "redux";
import main from './main';

const rootReducer = combineReducers({
    playlist: main
})

export default rootReducer;
