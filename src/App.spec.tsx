import { todosAction } from "@features/todos/todos-slice";
import { store } from "@store/store";
import { cleanup, render } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

describe("app component", () => {
  let component: any;

  beforeEach(() => {
    component = render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );
  });

  afterEach(cleanup);

  it("should render component", () => {
    expect(component.container).toBeInTheDocument();
  });
});
