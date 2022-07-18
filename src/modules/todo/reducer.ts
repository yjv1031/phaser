import {TodoAction, Todo} from './types';
import { action, createReducer } from 'typesafe-actions';
import {ADD_TODO, DELETE_TODO} from './actions';
import produce from 'immer';

const initState : Todo = {
    todo : [],
};

//draft : 기존의 state, action : 새로운 state
//createReducer는 타입으로 state에 대한 Type과 두 번째로는 Action에 대한 Type을 사용한다
const todo = createReducer<Todo,TodoAction>(initState,{
    [ADD_TODO] : (state,action)=> 
    produce(state,draft => {
        draft.todo.push(action.payload.todo);
    }),
    [DELETE_TODO] : (state, action) => 
    produce(state,draft => {
        draft.todo.pop();
    })
})

export default todo;