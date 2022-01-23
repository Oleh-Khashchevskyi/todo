import React, { useEffect, useState } from "react";
import { addTodo, changeTodoStatus, deleteTodo, getTodos } from "../../api/api";
import { Todo } from "../../types/Todo";
import { TodoFooter } from "../TodoFooter/TodoFooter";
import { TodoHeader } from "../TodoHeader/TodoHeader";
import { TodoList } from "../TodoList/TodoList";

import classes from './TodoApp.module.scss';

export const TodoApp:React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [handleChange, setHandleChange] = useState(false);

  const fetchTodos = async () => {
    try {
      const todosFromServer = await getTodos();

      setTodos(todosFromServer);
      setVisibleTodos(todosFromServer);
    } catch {
      Promise.reject(new Error('error'));
    };
  };

  const filterTodo = (value: string) => {
    switch(value) {
      case 'Active':
        setVisibleTodos([...todos].filter(todo => !todo.completed));
        break;
      case 'Completed':
        setVisibleTodos([...todos].filter(todo => todo.completed));
        break;
      default:
        setVisibleTodos([...todos]);
        break;
    }
  }

  const createTodo = async (title: Todo['title']) => {
    await addTodo(title);
    setHandleChange(!handleChange);
  };

  const toggleTodo = async (todoId: Todo['id'], completed: Todo['completed']) => {
    await changeTodoStatus(todoId, completed);
    setHandleChange(!handleChange);
  };

  const toggleAllTodo = () => {
    if (todos.filter(todo => !todo.completed).length === 0) {
      todos.map(todo => toggleTodo(todo.id, false));
    } else {
      todos.map(todo => toggleTodo(todo.id, true));
    }
  };

  const removeTodo = async (todoId: Todo['id']) => {
    await deleteTodo(todoId);
    setHandleChange(!handleChange);
  };

  const removeCompleted = () => {
    todos.filter(todo => todo.completed).map(t => {
      return deleteTodo(t.id);
    });
    setHandleChange(!handleChange);
  };

  useEffect(() => {
    fetchTodos();
  }, [handleChange]);

  return (
    <>
      <h1 className={classes.title}>todos</h1>
      <div className={classes.todoApp}>
        <TodoHeader todos={todos} createTodo={createTodo} toggleAllTodo={toggleAllTodo} />
        <TodoList todos={visibleTodos} toggleTodo={toggleTodo} removeTodo={removeTodo} />
        {!!todos.length && (
          <TodoFooter todos={visibleTodos} filterTodo={filterTodo} removeCompleted={removeCompleted} />
        )}
      </div>
    </>
  );
};
