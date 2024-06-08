import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { todoAtom } from "../store/todo";

export default function AddTodo() {
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const setTodoList = useSetRecoilState(todoAtom);
  const [Filter, setFilter] = useState("");
  const navigate = useNavigate();

  async function addTodo(e) {
    e.preventDefault();

    await axios.post(
      import.meta.env.VITE_BACKEND_URL + "api/v1/account/todo",
      {
        title: Title,
        description: Description,
      },
      {
        headers: {
          authorization: "Bearer " + localStorage.getItem("todo_token"),
        },
      }
    );

    setTitle("");
    setDescription("");

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

  function Profile() {
    navigate("/profile");
  }

  function Logout() {
    localStorage.removeItem("todo_token");
    navigate("/signin");
  }

  return (
    <div className="flex items-center justify-between">
      <form
        onSubmit={(e) => {
          addTodo(e);
        }}
      >
        <div>
          <input
            required
            type="text"
            placeholder="Title"
            value={Title}
            className="w-fit m-3 peer h-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Description"
            value={Description}
            className="w-auto m-3 peer h-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            onChange={(e) => setDescription(e.target.value)}
          />
          <button className="m-3 middle none center rounded-lg bg-pink-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
            Add
          </button>
        </div>
      </form>
      <div>
        <button
          onClick={Profile}
          className="m-3 middle none center rounded-lg bg-pink-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        >
          Profile
        </button>
        <button
          onClick={Logout}
          className="m-3 middle none center rounded-lg bg-pink-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
