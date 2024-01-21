import { useState } from "react"
import { useRecoilState } from "recoil"
import { todoAtom } from "../store/todo"

let ID = 0;

export default function AddTodo() {
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [TodoList, setTodoList] = useRecoilState(todoAtom);
  
  function addTodo() {
    setTodoList([...TodoList, {
      "ID": ID,
      "Title": Title,
      "Description": Description, 
      "Completed": false
    }]);
    ID ++;
  }

  return (
    <>
      <input type="text" placeholder="Title" className="border-2 border-black" onChange={(e) => setTitle(e.target.value)} />
      <input type="text" placeholder="Description" className=" border-2 border-black" onChange={(e) => setDescription(e.target.value)} />
      <button onClick={addTodo} className="border-2 border-black">Add Todo</button>
    </>
  );
}