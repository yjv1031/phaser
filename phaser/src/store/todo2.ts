import { observable } from 'mobx';

export interface TodoData2 {
  id: number;
  content: string;
}

interface Todo2 {
  todoData: TodoData2[];
  currentId: number;
  addTodo: (content: string) => void;
  removeTodo: (id: number) => void;
}

export const todo2 = observable<Todo2>({
  todoData: [{id:1, content: 'cc'}, {id:2, content: 'dd'}],
  currentId: 3,

  addTodo(content) {
    this.todoData.push({ id: this.currentId, content});
    this.currentId++;
  },
  removeTodo(id) {
    const index = this.todoData.findIndex((v) => v.id === id);
    if (id !== -1) {
      this.todoData.splice(index, 1);
    }
  },
});