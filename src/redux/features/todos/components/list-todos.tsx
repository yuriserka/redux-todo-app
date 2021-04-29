import Emoji from "@components/emoji";
import TodoListItem from "@features/todos/components/todo";
import { ITodo } from "@features/todos/todo-interface";
import {
  selectCompletedTodos,
  selectNotCompletedTodos,
} from "@features/todos/todo-selectors";
import { useAppSelector } from "@store/hooks";
import { compareAsc, compareDesc } from "date-fns";

type Props = {
  view: "completed" | "uncompleted";
};

type SortOrder = "asc" | "desc";

const sortByLastModificationDate = (v: ITodo[], order: SortOrder = "asc") => {
  const cmpDateFn: { [k in SortOrder]: Function } = {
    asc: compareAsc,
    desc: compareDesc,
  };

  return v.sort((a, b) =>
    cmpDateFn[order](
      new Date(b.last_modification),
      new Date(a.last_modification)
    )
  );
};

export default function TodoList({ view }: Props) {
  const entities = useAppSelector(
    view === "uncompleted" ? selectNotCompletedTodos : selectCompletedTodos
  );

  if (!entities.length) {
    return (
      <h1 className="text-3xl font-bold centered">
        {view === "uncompleted" ? (
          <p className="text-center">
            You don't have any unfinished Todo. Great job!
            <Emoji className="ml-2" symbol={0x1f600} />
          </p>
        ) : (
          <p className="text-center">
            You don't have any finished Todo. Keep working!
            <Emoji className="ml-2" symbol={0x1f635} />
          </p>
        )}
      </h1>
    );
  }

  return (
    <div className="grid grid-cols-1 w-full sm:grid-cols-2 lg:grid-cols-3 gap-5 items-center justify-center">
      {sortByLastModificationDate(entities).map((t) => (
        <div
          key={t.id}
          className="shadow-md rounded-xl bg-gray-100 hover:bg-gray-300"
        >
          <TodoListItem todo={t} />
        </div>
      ))}
    </div>
  );
}
