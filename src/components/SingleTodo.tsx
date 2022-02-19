import React, { useEffect, useRef, useState } from 'react';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';
import { TODO } from './model';

type Props = {
  todo: TODO;
  todos: TODO[];
  setTodos: React.Dispatch<React.SetStateAction<TODO[]>>;
};

export default function SingleTodo({ todo, todos, setTodos }: Props) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editTodoText, setEditTodoText] = useState<string>(todo.todo);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDone = (id: number) => {
    setTodos(
      todos.map((item) =>
        item.id === id ? { ...item, isDone: !todo.isDone } : item
      )
    );
  };

  const handleDelete = (id: number) => {
    const filtered = todos.filter((item) => item.id !== id);
    setTodos(filtered);
  };

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    console.log(id);
    const updatedTodo = todos.map((item) =>
      item.id === id ? { ...item, todo: editTodoText } : item
    );
    setTodos(updatedTodo);
    setIsEditing(!isEditing);
  };
  useEffect(() => {
    inputRef.current?.focus();
  }, [isEditing]);
  console.log(isEditing);
  return (
    <form className="todos__single" onSubmit={(e) => handleEdit(e, todo.id)}>
      {
        /* eslint-disable no-nested-ternary */
        isEditing ? (
          <input
            type="text"
            ref={inputRef}
            value={editTodoText}
            className="todos__single--text"
            onChange={(e) => setEditTodoText(e.target.value)}
          />
        ) : todo.isDone ? (
          <s className="todos__single--text"> {todo.todo} </s>
        ) : (
          <span className="todos__single--text"> {todo.todo} </span>
        )
      }
      <div>
        <span
          className="icon"
          aria-hidden="true"
          onClick={() => {
            if (!isEditing && !todo.isDone) {
              setIsEditing(!isEditing);
            }
          }}
        >
          <AiFillEdit />
        </span>
        <span
          className="icon"
          onClick={() => handleDelete(todo.id)}
          aria-hidden="true"
        >
          <AiFillDelete />
        </span>

        <span
          className="icon"
          onClick={() => handleDone(todo.id)}
          aria-hidden="true"
        >
          <MdDone />
        </span>
      </div>
    </form>
  );
}
