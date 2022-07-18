import { ActionType } from "typesafe-actions";
import * as actions from "./actions";

//액션에 대한 타입 정의
export type TodoAction = ActionType<typeof actions>;

//state에 대한 타입 정의
export type Todo = {
    todo: Array<string>;
};