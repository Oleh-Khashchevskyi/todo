import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';

import classes from './TodoFooter.module.scss';

type Props = {
  todos: Todo[],
  filterTodo: (value: string) => void,
  removeCompleted: () => void,
};

export const TodoFooter:React.FC<Props> = ({ todos, filterTodo, removeCompleted }) => {
  const [countLeft, setCountLeft] = useState(0);
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    setCountLeft(todos.filter(todo => !todo.completed).length);
  }, [todos])

  useEffect(() => {
    filterTodo(activeFilter);
  }, [activeFilter]);

  return (
    <div className={classes.footer}>
      <span>
        {!!countLeft && `${countLeft} items left`}
      </span>
      <div className={classes.filters}>
        <button
          type='button'
          className={classNames(classes.filterBtn, {
            [classes.activeFilter]: activeFilter === 'All',
          })}
          onClick={() => setActiveFilter('All')}
        >
          All
        </button>
        <button
          type='button'
          className={classNames(classes.filterBtn, {
            [classes.activeFilter]: activeFilter === 'Active',
          })}
          onClick={() => setActiveFilter('Active')}
        >
          Active
        </button>
        <button
          type='button'
          className={classNames(classes.filterBtn, {
            [classes.activeFilter]: activeFilter === 'Completed',
          })}
          onClick={() => setActiveFilter('Completed')}
        >
          Completed
        </button>
      </div>
      {countLeft !== todos.length && (
        <button
          type='button'
          className={classes.clearBtn}
          onClick={removeCompleted}
        >
          Clear completed
        </button>
      )}
    </div>
  );
};
