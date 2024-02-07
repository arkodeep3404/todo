import AddTodo from "./components/addTodo.jsx"
import DisplayTodo from "./components/displayTodo.jsx"
import { RecoilRoot } from "recoil"

export default function App() {
  return (
    <RecoilRoot>
      <AddTodo />
      <DisplayTodo />
    </RecoilRoot>
  )
}