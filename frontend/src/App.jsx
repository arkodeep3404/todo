import AddTodo from "./components/AddTodo.jsx"
import DisplayTodo from "./components/DisplayTodo.jsx"
import { RecoilRoot } from "recoil"

export default function App() {
  return (
    <>
    <RecoilRoot>
      <AddTodo />
      <DisplayTodo />
    </RecoilRoot>
    </>
  )
}