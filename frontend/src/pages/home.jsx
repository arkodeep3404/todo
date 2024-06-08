import AddTodo from "../components/AddTodo";
import DisplayTodo from "../components/DisplayTodo";
import useUser from "../hooks/useUser";
import { Navigate } from "react-router-dom";

export default function Home() {
  const user = useUser();

  if (user.Loading) {
    return (
      <div className="flex justify-center items-center h-screen w-screen">
        <div className="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-blue-600" />
      </div>
    );
  }

  if (!user.UserDetails) {
    return <Navigate to={"/signin"} />;
  }

  return (
    <>
      <AddTodo />
      <DisplayTodo />
    </>
  );
}
