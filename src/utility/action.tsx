import { Todo } from "./types";
export const setTodos = (todos: Todo[]) => ({
  type: "SET_TODOS",
  payload: todos,
});

export const updateTodo = (todo: Todo) => ({
  type: "UPDATE_TODO",
  payload: todo,
});

export const deleteTodo = (todo: Todo) => ({
  type: "DELETE_TODO",
  payload: todo,
});

export const addTodo = (todo: Todo) => ({
  type: "ADD_TODO",
  payload: todo,
});

export const setStatusFilter = (status: string) => ({
  type: "SET_STATUS_FILTER",
  payload: status,
});
