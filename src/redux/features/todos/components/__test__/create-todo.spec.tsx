import CreateTodo from "@features/todos/components/create-todo";
import { store } from "@store/store";
import { cleanup, render } from "@testing-library/react";
import { Provider } from "react-redux";

describe("create-todo component", () => {
  let component: any;

  beforeEach(() => {
    component = render(
      <Provider store={store}>
        <CreateTodo />
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
