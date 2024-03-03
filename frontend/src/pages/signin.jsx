import BottomWarning from "../components/bottomWarning";
import Button from "../components/button";
import Heading from "../components/heading";
import InputBox from "../components/inputBox";
import SubHeading from "../components/subHeading";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import useUser from "../hooks/useUser";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Error, setError] = useState(false);
  const user = useUser();
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

  async function Signin() {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/signin",
        {
          email,
          password,
        }
      );
      localStorage.setItem("todo_token", response.data.token);
      navigate("/home");
    } catch (error) {
      setError(true);
    }
  }

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign in"} />
          <SubHeading label={"Enter your credentials to access your account"} />
          <InputBox
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="harkirat@gmail.com"
            label={"Email"}
          />
          <InputBox
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="123456"
            label={"Password"}
          />
          <div className="pt-4">
            <Button onClick={Signin} label={"Sign in"} />
          </div>
          <div className={`${!Error ? "hidden" : ""}`}>
            Incorrect Email or Password/ Email not verified
          </div>
          <BottomWarning
            label={"Don't have an account?"}
            buttonText={"Sign up"}
            to={"/signup"}
          />
          <BottomWarning
            label={"Forgot password?"}
            buttonText={"Reset"}
            to={"/forogt"}
          />
        </div>
      </div>
    </div>
  );
}
