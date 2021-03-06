import { store } from "@store/store";
import { cleanup, render, RenderResult } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

describe("app component", () => {
  let component: RenderResult;

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
