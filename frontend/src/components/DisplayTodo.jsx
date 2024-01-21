import { useRecoilValue } from "recoil";
import { todoAtom } from "../store/todo";

export default function DisplayTodo() {
    const TodoList = useRecoilValue(todoAtom);
    return (
        TodoList.map((Todo) => (
            <>
                <div>{Todo.Title}</div>
                <div>{Todo.Description}</div>
                <div>{Todo.Completed}</div>
            </>
        ))
    );
}  