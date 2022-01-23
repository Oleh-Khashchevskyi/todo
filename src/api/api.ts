import axios from "axios";
import { Todo } from "../types/Todo";

const BASE_URL = 'https://mate.academy/students-api';

export const getTodos = async () => {
  const response = await axios.get(`${BASE_URL}/todos?userId=7777`);

  return response.data;
};

export const addTodo = async (title: Todo['title']) => {
  return await axios.post(`${BASE_URL}/todos`, {
    userId: 7777,
    title,
    completed: false,
  });
};

export const deleteTodo = (todoId: Todo['id']) => {
  return axios.delete(`${BASE_URL}/todos/${todoId}`);
};

export const changeTodoStatus = (todoId: Todo['id'], completed: Todo['completed']) => {
  return axios.patch(`${BASE_URL}/todos/${todoId}`, { completed });
};
