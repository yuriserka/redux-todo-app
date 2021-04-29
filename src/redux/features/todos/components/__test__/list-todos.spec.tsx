import TodoList from "@features/todos/components/list-todos";
import { store } from "@store/store";
import { cleanup, render } from "@testing-library/react";
import { Provider } from "react-redux";

describe("create-todo component", () => {
  let component: any;

  beforeEach(() => {
    component = render(
      <Provider store={store}>
        <TodoList view="completed" />
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
