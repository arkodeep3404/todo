import { useRecoilState } from "recoil";
import { todoAtom } from "../store/todo";

export default function DisplayTodo() {
    const [TodoList, setTodoList] = useRecoilState(todoAtom);

    function deleteTodo(ID) {
        setTodoList(TodoList => TodoList.filter(Todo => Todo.ID != ID));
    }
      
    return (
        TodoList.map((Todo) => (
            <div key={Todo.ID}>  
                <div className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50">{Todo.Title}</div>
                <div className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50">{Todo.Description}</div>
                <button onClick={() => deleteTodo(Todo.ID)} className="middle none center rounded-lg bg-pink-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">Delete</button>
            </div>
        ))
    );
}  