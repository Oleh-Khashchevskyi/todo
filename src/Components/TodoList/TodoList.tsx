import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';

import classes from './TodoList.module.scss';
import './Animate.scss';

type Props = {
  todos: Todo[],
  removeTodo: (todoId: Todo['id']) => void,
  toggleTodo: (todoId: Todo['id'], completed: Todo['completed']) => void,
};

export const TodoList:React.FC<Props> = ({ todos, removeTodo, toggleTodo }) => {
  return (
    <ul className={classes.todoList}>
      <TransitionGroup className="todo-list">
        {todos.map(todo => (
          <CSSTransition
            key={todo.id}
            timeout={500}
            classNames="item"
          >
            <TodoItem todo={todo} removeTodo={removeTodo} toggleTodo={toggleTodo} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </ul>
  );
};
