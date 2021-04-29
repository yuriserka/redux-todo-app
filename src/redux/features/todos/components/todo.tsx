import { ITodo } from "@features/todos/todo-interface";
import { todosAction } from "@features/todos/todos-slice";
import { formatDistanceToNow, parseISO } from "date-fns";
import { toArray } from "react-emoji-render";
import { FaRegTrashAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";

const parseEmojis = (value: string) =>
  toArray(value).reduce(
    (previous, current) =>
      `${previous}${
        typeof current === "string" ? current : (current as any).props.children
      }`,
    ""
  );

type Props = {
  todo: ITodo;
};

export default function TodoListItem({ todo }: Props) {
  const dispatch = useDispatch();

  return (
    <div className="group flex justify-center items-center p-4">
      <div className={`space-y-3 ${todo.checked ? "line-through" : ""}`}>
        <h1 className="text-2xl font-semibold capitalize ">
          {parseEmojis(todo.title)}
        </h1>
        <span className="text-sm text-gray-800 ml-4">
          {formatDistanceToNow(parseISO(todo.last_modification))} ago
        </span>
        <p className=" text-lg">{parseEmojis(todo.description)}</p>
      </div>
      <div className="flex flex-col space-y-4 ml-auto items-center justify-between">
        <FaRegTrashAlt
          className="text-red-400 group-hover:text-red-600 cursor-pointer"
          size={20}
          onClick={() => dispatch(todosAction.delete(todo.id))}
        />
        <input
          className={`cursor-pointer form-checkbox`}
          type="checkbox"
          checked={todo.checked}
          onChange={() => dispatch(todosAction.check(todo.id))}
        />
      </div>
    </div>
  );
}
