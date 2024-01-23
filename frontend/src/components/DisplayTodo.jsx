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
                <div className="border-2 border-black">{Todo.Title}</div>
                <div className="border-2 border-black">{Todo.Description}</div>
                <button onClick={() => deleteTodo(Todo.ID)} className="border-2 border-black">Delete</button>
            </div>
        ))
    );
}  