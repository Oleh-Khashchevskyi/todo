import React, { useState } from "react";
import { Todo } from "../../types/Todo";

import classes from './TodoHeader.module.scss';

type Props = {
  createTodo: (title: Todo['title']) => void,
  toggleAllTodo: () => void,
  todos: Todo[],
};

export const TodoHeader: React.FC<Props> = ({ createTodo, todos, toggleAllTodo }) => {
  const [newTodo, setNewTodo] = useState('');

  return (
    <div className={classes.header}>
      {!!todos.length && (
        <label className={classes.toggleAll}>
          <input
            type="checkbox"
            onClick={toggleAllTodo}
            checked={todos.filter(todo => todo.completed).length === todos.length}
          />
          <span className={classes.icon}>❯</span>
        </label>
      )}
      <input
        type="text"
        value={newTodo}
        className={classes.newTodo}
        placeholder="What needs to be done?"
        onChange={e => setNewTodo(e.target.value)}
        onKeyDown={e => {
          if (e.key !== 'Enter') return;
          if (!newTodo.trim().length) return;

          createTodo(newTodo);
          setNewTodo('');
        }}
      />
    </div>
  )
}
