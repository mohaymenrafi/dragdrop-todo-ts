import React, { useState } from 'react';
import './App.css';
import InputField from './components/InputField';
import { TODO } from './components/model';
import TodoList from './components/TodoList';

function App() {
  const [todo, setTodo] = useState<string>('');
  const [todos, setTodos] = useState<TODO[]>([]);
  const handleAddButton = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
      setTodo('');
    }
  };

  return (
    <div className="app">
      <h2 className="heading">Task Tracker</h2>
      <InputField
        todo={todo}
        setTodo={setTodo}
        handleAddButton={handleAddButton}
      />
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
}

export default App;
