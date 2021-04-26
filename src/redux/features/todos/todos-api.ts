import { ITodo } from "redux/features/todos/todo-interface";

export async function fetchTodos() {
  return {
    data: JSON.parse(localStorage.getItem("@redux-todos") ?? "[]") as ITodo[],
  };
}
