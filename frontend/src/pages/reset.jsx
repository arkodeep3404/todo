import BottomWarning from "../components/bottomWarning";
import Button from "../components/button";
import Heading from "../components/heading";
import InputBox from "../components/inputBox";
import SubHeading from "../components/subHeading";
import axios from "axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import useUser from "../hooks/useUser";

export default function Reset() {
  const [password, setPasssword] = useState("");
  const [Error, setError] = useState(false);
  const user = useUser();
  const { token } = useParams();
  const navigate = useNavigate();

  if (user.Loading) {
    return (
      <div className="flex justify-center items-center h-screen w-screen">
        <div className="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-blue-600" />
      </div>
    );
  }

  if (user.UserDetails) {
    return <Navigate to={"/home"} />;
  }

  async function Reset() {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/v1/user/reset/${token}`,
        {
          password,
        }
      );
      alert("Reset successful");
      navigate("/signin");
    } catch (error) {
      setError(true);
    }
  }

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Reset Password"} />
          <SubHeading label={"Enter your new password"} />
          <InputBox
            onChange={(e) => {
              setPasssword(e.target.value);
            }}
            placeholder="123456"
            label={"Password"}
          />
          <div className="pt-4">
            <Button onClick={Reset} label={"Reset Password"} />
          </div>
          <div className={`${!Error ? "hidden" : ""}`}>Incorrect Token</div>
          <BottomWarning
            label={"Don't have an account?"}
            buttonText={"Sign up"}
            to={"/signup"}
          />
        </div>
      </div>
    </div>
  );
}
