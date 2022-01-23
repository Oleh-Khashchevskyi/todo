import classNames from 'classnames';
import React from 'react';
import { Todo } from '../../types/Todo';

import classes from './TodoItem.module.scss';

type Props = {
  todo: Todo,
  removeTodo: (todoId: Todo['id']) => void,
  toggleTodo: (todoId: Todo['id'], completed: Todo['completed']) => void,
};

export const TodoItem:React.FC<Props> = ({ todo, removeTodo, toggleTodo }) => {
  return (
    <li className={classNames(classes.todoItem, {
      [classes.completed]: todo.completed,
    })}>
      <label className={classes.checkbox}>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id, !todo.completed)}
        />
        <div className={classes.toggle} />
      </label>
      {todo.title}
      <button
        type='button'
        className={classes.delete}
        onClick={() => removeTodo(todo.id)}
      >
        x
      </button>
    </li>
  )
};
