import {combineReducers} from "redux";
import todo from './todo/reducer';
import {Todo} from './todo/types';

export type RootState = {
    todo: Todo;
}

const rootReducer = combineReducers({
    todo,
});

export default rootReducer;