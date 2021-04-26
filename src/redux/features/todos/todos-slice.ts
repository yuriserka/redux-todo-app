import { fetchTodos } from "@features/todos/todos-api";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 } from "uuid";
import { ITodo, ITodoDto } from "./todo-interface";

type InitialState = {
  status: "idle" | "loading" | "failed";
  entities: ITodo[];
};

const loadinitialTodos = createAsyncThunk("todos/load-local", async (_, __) => {
  const { data } = await fetchTodos();
  return data;
});

const todosSlice = createSlice({
  name: "todos",
  initialState: {
    entities: [],
    status: "idle",
  } as InitialState,
  reducers: {
    add: (state, { payload }: PayloadAction<ITodoDto>) => {
      state.entities = [
        ...state.entities,
        {
          ...payload,
          id: v4(),
          checked: false,
          last_modification: new Date().toISOString(),
        },
      ];
    },
    save: (state, _: PayloadAction<void>) => {
      localStorage.setItem("@redux-todos", JSON.stringify(state.entities));
    },
    check: (state, { payload }: PayloadAction<string>) => {
      state.entities = state.entities.map((todo) =>
        todo.id === payload
          ? {
              ...todo,
              checked: !todo.checked,
              last_modification: new Date().toISOString(),
            }
          : todo
      );
    },
    delete: (state, { payload }: PayloadAction<string>) => {
      state.entities = state.entities.filter((todo) => todo.id !== payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadinitialTodos.pending, (state, _) => {
        state.status = "loading";
      })
      .addCase(loadinitialTodos.rejected, (state, _) => {
        state.status = "failed";
      })
      .addCase(loadinitialTodos.fulfilled, (state, { payload }) => {
        state.entities = payload;
        state.status = "idle";
      });
  },
});

export const todosAction = {
  ...todosSlice.actions,
  loadinitialTodos,
};

export default todosSlice.reducer;
