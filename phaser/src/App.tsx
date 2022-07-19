import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useObserver } from 'mobx-react';
import combindStore from './store/combindStore';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RouteArr from './routes';

function App() {
  return useObserver(() => (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {
            RouteArr.map((item) => {
              return (<Route path={item.path} element={item.element} key={item.path}/>);
            })
          }
        </Routes>
      </BrowserRouter>
      {/*  
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Ver. mobx
        </p>
        {
          todo.todoData.map((item) => {
            return (<p key={item.id}>{item.content}</p>);
          })
        }
        {
          todo2.todoData.map((item) => {
            return (<p key={item.id}>{item.content}</p>);
          })
        }
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={() => {todo.addTodo('ff');}}>
          추가하기
        </button>
      </header>
      */}
    </div>
  ));
}

export default App;
