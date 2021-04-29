import { RootState } from "@store/store";

export const selectAllTodos = (state: RootState) => state.todos.entities;

export const selectTodoLoadingStatus = (state: RootState) => state.todos.status;

export const selectTodoById = (state: RootState, id: string) =>
  state.todos.entities.find((todo) => todo.id === id);

export const selectCompletedTodos = (state: RootState) =>
  state.todos.entities.filter((todo) => todo.checked);

export const selectNotCompletedTodos = (state: RootState) =>
  state.todos.entities.filter((todo) => !todo.checked);
