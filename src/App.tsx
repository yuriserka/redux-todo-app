import Routes from "@components/router";
import { todosAction } from "@features/todos/todos-slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function App() {
  const dispatch = useDispatch();

  function saveState() {
    dispatch(todosAction.saveAll());
  }

  useEffect(() => {
    dispatch(todosAction.loadinitialTodos());
    window.addEventListener("beforeunload", saveState);

    return () => {
      window.removeEventListener("beforeunload", saveState);
    };
    // eslint-disable-next-line
  }, []);

  return <Routes />;
}
