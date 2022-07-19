import { useObserver } from 'mobx-react';
import combindStore from '../store/combindStore';

function Temp2() {
  const { todo2 } = combindStore();
  
  return useObserver(() => (
    <div className="App">
        {
            todo2.todoData.map((item) => {
                return (
                    <p key={item.id}>
                        {item.content}
                    </p>
                )
            })
        }
    </div>
  ));
}

export default Temp2;