import useUser from "../hooks/useUser";
import { Navigate } from "react-router-dom";
import DisplayBox from "../components/displayBox";
import Heading from "../components/heading";

export default function Profile() {
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
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Profile"} />
          <DisplayBox
            label={"First Name"}
            content={user.UserDetails.user.firstName}
          />
          <DisplayBox
            label={"Last Name"}
            content={user.UserDetails.user.lastName}
          />
          <DisplayBox label={"Email"} content={user.UserDetails.user.email} />
        </div>
      </div>
    </div>
  );
}
