import useUser from "../hooks/useUser";
import { Navigate, useNavigate } from "react-router-dom";
import DisplayBox from "../components/displayBox";
import Heading from "../components/heading";
import Button from "../components/button";

export default function Profile() {
  const user = useUser();
  const navigate = useNavigate();

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

  function Update() {
    navigate("/update");
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
          <div className="pt-6">
            <Button onClick={Update} label={"Update Password"} />
          </div>
        </div>
      </div>
    </div>
  );
}
