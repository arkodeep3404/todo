import { useRecoilState } from "recoil";
import { todoAtom } from "../store/todo";
import { useEffect, useState } from "react";
import axios from "axios";

export default function DisplayTodo() {
  const [TodoList, setTodoList] = useRecoilState(todoAtom);
  const [Filter, setFilter] = useState("");

  useEffect(() => {
    async function firstFetch() {
      const response = await axios.get(
        import.meta.env.VITE_BACKEND_URL +
          "api/v1/account/todos?filter=" +
          Filter,
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("todo_token"),
          },
        }
      );
      setTodoList(response.data.todos);
    }

    firstFetch();
  }, [Filter]);

  async function deleteTodo(ID) {
    await axios.delete(
      import.meta.env.VITE_BACKEND_URL + "api/v1/account/todo?todoId=" + ID,
      {
        headers: {
          authorization: "Bearer " + localStorage.getItem("todo_token"),
        },
      }
    );

    const response = await axios.get(
      import.meta.env.VITE_BACKEND_URL +
        "api/v1/account/todos?filter=" +
        Filter,
      {
        headers: {
          authorization: "Bearer " + localStorage.getItem("todo_token"),
        },
      }
    );
    setTodoList(response.data.todos);
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        className="w-auto m-3 peer h-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
        onChange={(e) => setFilter(e.target.value)}
      />
      {TodoList.map((Todo) => (
        <div key={Todo._id} className="flex">
          <div className="w-auto m-3 peer h-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50">
            {Todo.title}
          </div>
          <div className="w-auto m-3 peer h-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50">
            {Todo.description}
          </div>
          <button
            onClick={() => deleteTodo(Todo._id)}
            className="m-3 middle none center rounded-lg bg-pink-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
