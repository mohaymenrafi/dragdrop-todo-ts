import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { TODO } from './model';
import SingleTodo from './SingleTodo';
import './styles.css';

interface Props {
  todos: TODO[];
  setTodos: React.Dispatch<React.SetStateAction<TODO[]>>;
  completedTodos: TODO[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<TODO[]>>;
}

export default function TodoList({
  todos,
  setTodos,
  completedTodos,
  setCompletedTodos,
}: Props) {
  console.log({ completedTodos });
  return (
    <div className="container">
      <Droppable droppableId="TodosList">
        {(provided) => (
          <div
            className="todos"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <h2 className="todos__heading">Active Tasks</h2>
            {todos.map((item, index) => (
              <SingleTodo
                index={index}
                key={item.id}
                todo={item}
                todos={todos}
                setTodos={setTodos}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="TodosRemove">
        {(provided) => (
          <div
            className="todos remove"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <h2 className="todos__heading">Completed Tasks</h2>
            {completedTodos.map((item, index) => (
              <SingleTodo
                index={index}
                key={item.id}
                todo={item}
                todos={completedTodos}
                setTodos={setCompletedTodos}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
