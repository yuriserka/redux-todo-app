import CreateTodo from "@features/todos/components/create-todo";
import { store } from "@store/store";
import { cleanup, render, RenderResult } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";

describe("create-todo component", () => {
  let component: RenderResult;
  let titleInput: HTMLElement;
  let descriptionInput: HTMLElement;
  let submitButton: HTMLElement;

  const todoMock = {
    title: "fake title",
    description: "fake description :D",
  };

  beforeEach(() => {
    component = render(
      <Provider store={store}>
        <CreateTodo />
      </Provider>
    );

    titleInput = component.getByTestId("input-todo-title");
    descriptionInput = component.getByTestId("input-todo-description");
    submitButton = component.getByTestId("btn-todo-create-confirm");
  });

  afterEach(() => {
    cleanup();
  });

  it("should render component", () => {
    expect(component.container).toBeInTheDocument();
  });

  it("should not add todo without a title", () => {
    const spy = jest.spyOn(store, "dispatch");

    userEvent.type(descriptionInput, todoMock.description);
    userEvent.click(component.getByTestId("btn-todo-create-confirm"));

    expect(spy).toBeCalledTimes(0);
  });

  it("should add todo", () => {
    const spy = jest.spyOn(store, "dispatch");

    userEvent.type(titleInput, todoMock.title);
    userEvent.type(descriptionInput, todoMock.description);
    userEvent.click(submitButton);

    expect(spy).toBeCalledTimes(1);
  });
});
