import { ITodo } from "./todo-interface";

export async function fetchTodos() {
  return {
    data: JSON.parse(localStorage.getItem("@redux-todos") ?? "[]") as ITodo[],
  };
}
