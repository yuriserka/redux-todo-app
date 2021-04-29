import reducer, { todosAction, TodosState } from "./todos-slice";

describe("Todos reducer", () => {
  const initialState: TodosState = {
    entities: [],
    status: "idle",
  };

  it("should handle initial state", () => {
    expect(reducer(undefined, { type: "unknown" })).toEqual({
      entities: [],
      status: "idle",
    });
  });

  it("should handle add", () => {
    const actual = reducer(
      initialState,
      todosAction.add({
        title: "todo-test title",
        description: "todo-test description",
      })
    );
    expect(actual.entities.length).toEqual(1);
  });

  it("should handle check", () => {
    let state = [
      todosAction.add({
        title: "todo-test title",
        description: "todo-test description",
      }),
      todosAction.add({
        title: "todo-test title2",
        description: "todo-test description2",
      }),
    ].reduce((state, action) => reducer(state, action), initialState);

    const todo = state.entities[1];

    state = reducer(state, todosAction.check(todo.id));
    expect(state.entities.filter((e) => e.checked).length).toEqual(1);

    state = reducer(state, todosAction.check(todo.id));
    expect(state.entities.filter((e) => e.checked).length).toEqual(0);
  });

  it("should handle delete", () => {
    let actual = reducer(
      initialState,
      todosAction.add({
        title: "todo-test title",
        description: "todo-test description",
      })
    );

    const todo = actual.entities[0];

    actual = reducer(actual, todosAction.delete(todo.id));
    expect(actual.entities.length).toEqual(0);
  });

  it("should handle saveAll", () => {
    let actual = reducer(
      initialState,
      todosAction.add({
        title: "todo-test title",
        description: "todo-test description",
      })
    );

    actual = reducer(actual, todosAction.saveAll());
    expect(
      (JSON.parse(localStorage.getItem("@redux-todos") ?? "[]") as []).length
    ).toEqual(1);
  });
});
