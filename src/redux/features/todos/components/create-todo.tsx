import { todosAction } from "@features/todos/todos-slice";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";

function Input({ onChange, name, value, ...rest }: any) {
  return (
    <input
      {...rest}
      className="form-input rounded-lg w-3/5"
      type="text"
      name={name}
      value={value}
      placeholder={name}
      autoComplete="off"
      onChange={onChange}
    />
  );
}

const initialState = {
  title: "",
  description: "",
};

export default function CreateTodo() {
  const dispatch = useDispatch();
  const [form, setForm] = useState(initialState);

  function handleChange(e: any) {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  }

  function handleSubmit(e: any) {
    e.preventDefault();

    if (!!!form.title) {
      return;
    }

    dispatch(todosAction.add(form));
    setForm(initialState);
  }

  return (
    <form
      data-testid="create-todo-form"
      className="centered flex-col space-y-3 h-60 w-full bg-gradient-to-r from-yellow-300 to-indigo-500 via-pink-400 animate-gradient-x"
      onSubmit={handleSubmit}
    >
      <h1 className="text-5xl font-bold text-gray-800 mb-2">Create Todo</h1>
      <Input
        data-testid="input-todo-title"
        name="title"
        value={form?.title}
        onChange={handleChange}
      />
      <Input
        data-testid="input-todo-description"
        name="description"
        value={form?.description}
        onChange={handleChange}
      />
      <button
        data-testid="btn-todo-create-confirm"
        type="submit"
        className={`rounded-full sm:hidden p-2 ${
          !!form?.title ? "cursor-pointer hover:bg-blue-500" : "cursor-not-allowed"
        }`}
        disabled={!!!form?.title}
      >
        <FaPlus
          className={`${
            !!form.title ? "text-white" : "text-gray-900"
          }`}
          size={24}
        />
      </button>
    </form>
  );
}
