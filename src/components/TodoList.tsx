import React from 'react';
import { TODO } from './model';
import SingleTodo from './SingleTodo';
import './styles.css';

interface Props {
  todos: TODO[];
  setTodos: React.Dispatch<React.SetStateAction<TODO[]>>;
}

export default function TodoList({ todos, setTodos }: Props) {
  return (
    <div className="todos">
      {todos.map((todo) => (
        <SingleTodo
          todo={todo}
          key={todo.id}
          todos={todos}
          setTodos={setTodos}
        />
      ))}
    </div>
  );
}
