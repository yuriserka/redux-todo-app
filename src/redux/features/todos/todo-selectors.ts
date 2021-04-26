import { ITodo } from "redux/features/todos/todo-interface";
import { RootState } from "redux/store";
import { compareAsc, compareDesc } from "date-fns";

type SortOrder = "asc" | "desc";

const cmpDateFn: { [k in SortOrder]: Function } = {
  asc: compareAsc,
  desc: compareDesc,
};

export const sortTodosByCreationDate = (v: ITodo[], order: SortOrder = "asc") =>
  v
    .slice()
    .sort((a, b) =>
      cmpDateFn[order](
        new Date(b.last_modification),
        new Date(a.last_modification)
      )
    );

export const selectAllTodos = (state: RootState) => state.todos.entities;

export const selectTodoLoadingStatus = (state: RootState) => state.todos.status;

export const selectTodoById = (state: RootState, id: string) =>
  state.todos.entities.find((todo) => todo.id === id);

export const selectCompletedTodos = (state: RootState) =>
  state.todos.entities.filter((todo) => todo.checked);

export const selectNotCompletedTodos = (state: RootState) =>
  state.todos.entities.filter((todo) => !todo.checked);
