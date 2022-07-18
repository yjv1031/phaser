import React from 'react';
import logo from './logo.svg';
import './App.css';
import { RootState } from './modules';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addTodo } from './modules/todo/actions';

function App() {
  const [value, setValue] = React.useState("");
  const todoList = useSelector((state: RootState) => state.todo.todo);

  const dispatch = useDispatch();
  const updateTodo = React.useCallback(
    (todo: string) => dispatch(addTodo({todo: todo})),
    [dispatch]
  );

  const changeValue = (e: any) => {
    setValue(e.target.value);
  }

  const todoAdd = () => {
    updateTodo(value);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <input type="text" maxLength={5} onChange={changeValue}/><button onClick={todoAdd}>함께</button>
        {
          todoList.map((item) => {
              return (
                <p>
                  {item}님 환영합니다!
                </p>
              );
            }
          )
        }
      </header>
    </div>
  );
}

export default App;
