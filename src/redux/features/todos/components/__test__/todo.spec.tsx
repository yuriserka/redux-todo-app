import TodoListItem from "@features/todos/components/todo";
import { ITodo } from "@features/todos/todo-interface";
import { store } from "@store/store";
import { cleanup, render, RenderResult } from "@testing-library/react";
import { Provider } from "react-redux";

describe("create-todo component", () => {
  let component: RenderResult;

  const todo: ITodo = {
    id: "fake-id",
    checked: false,
    description: "no descr",
    last_modification: new Date().toISOString(),
    title: "no title",
  };

  beforeEach(() => {
    component = render(
      <Provider store={store}>
        <TodoListItem todo={todo} />
      </Provider>
    );
  });

  afterEach(() => {
    cleanup();
  });

  it("should render component", () => {
    expect(component.container).toBeInTheDocument();
  });
});
