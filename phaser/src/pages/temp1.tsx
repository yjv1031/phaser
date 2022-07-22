import { useObserver } from 'mobx-react';
import combindStore from '../store/combindStore';

function Temp1() {
  const { todo } = combindStore();
  
  return useObserver(() => (
    <div className="App">
        {
            todo.todoData.map((item) => {
                return (
                    <p key={item.id}>
                        {item.content}
                    </p>
                )
            })
        }
        <button onClick={() => {todo.addTodo('gggg');}}>추가</button>
    </div>
  ));
}

export default Temp1;