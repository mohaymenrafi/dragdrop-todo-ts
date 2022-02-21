import React, { useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import './App.css';
import InputField from './components/InputField';
import { TODO } from './components/model';
import TodoList from './components/TodoList';

function App() {
  const [todo, setTodo] = useState<string>('');
  const [todos, setTodos] = useState<TODO[]>([]);
  const [completedTodos, setCompletedTodos] = useState<TODO[]>([]);
  const handleAddButton = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
      setTodo('');
    }
  };
  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;
    let add;
    const active = todos;
    const completed = completedTodos;
    // Source
    if (source.droppableId === 'TodosList') {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = completed[source.index];
      completed.splice(source.index, 1);
    }
    // Destination
    if (destination.droppableId === 'TodosList') {
      active.splice(destination.index, 0, add);
    } else {
      completed.splice(destination.index, 0, add);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="app">
        <h2 className="heading">Task Tracker</h2>
        <InputField
          todo={todo}
          setTodo={setTodo}
          handleAddButton={handleAddButton}
        />
        <TodoList
          todos={todos}
          setTodos={setTodos}
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
        />
      </div>
    </DragDropContext>
  );
}

export default App;
