import { todosAction } from "@features/todos/todos-slice";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";

function Input({ onChange, name, value }: any) {
  return (
    <input
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

    if (!form.title) {
      return;
    }

    dispatch(todosAction.add(form));
    setForm(initialState);
  }

  return (
    <form
      className="centered flex-col space-y-3 bg-gradient-to-br from-indigo-400 to-green-500 h-60 w-full"
      onSubmit={handleSubmit}
    >
      <h1 className="text-5xl font-bold text-gray-800 mb-2">Create Todo</h1>
      <Input name="title" value={form?.title} onChange={handleChange} />
      <Input
        name="description"
        value={form?.description}
        onChange={handleChange}
      />
      <button
        type="submit"
        className="hover:opacity-75 rounded-full hover:bg-blue-700 p-2"
      >
        <FaPlus className="sm:hidden text-white" size={24} />
      </button>
    </form>
  );
}
