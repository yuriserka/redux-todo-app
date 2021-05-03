import CreateTodo from "@features/todos/components/create-todo";
import TodoList from "@features/todos/components/list-todos";
import { selectTodoLoadingStatus } from "@features/todos/todo-selectors";
import { useAppSelector } from "@store/hooks";
import { useState } from "react";

type Views = "completed" | "uncompleted";

export default function Home() {
  const status = useAppSelector(selectTodoLoadingStatus);
  const [actualView, setActualView] = useState<Views>("uncompleted");

  if (status === "loading") {
    return <h1 className="centered text-3xl font-bold pt-32">loading...</h1>;
  }

  function ChangeViewButtonTo(view: Views) {
    return (
      <button
        data-test={`btn-${view}`}
        onClick={() => setActualView(view)}
        className={`capitalize hover:bg-blue-400 p-2 rounded-md font-semibold ${
          actualView === view ? "bg-blue-300" : ""
        }`}
      >
        {view} todos
      </button>
    );
  }

  return (
    <div
      data-test="home-page"
      className="min-h-screen flex flex-col tracking-wide"
    >
      <CreateTodo />
      <div className="flex flex-row justify-around px-8 text-xl md:text-2xl py-2">
        {ChangeViewButtonTo("completed")}
        {ChangeViewButtonTo("uncompleted")}
      </div>
      <div data-test="todo-list" className="flex p-5">
        <TodoList view={actualView} />
      </div>
    </div>
  );
}
