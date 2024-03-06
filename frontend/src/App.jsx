import { RecoilRoot } from "recoil";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./pages/signup";
import Signin from "./pages/signin";
import Home from "./pages/home";
import Index from "./pages/index";
import Profile from "./pages/profile";
import Forgot from "./pages/forgot";
import Reset from "./pages/reset";
import Resend from "./pages/resend";
import Update from "./pages/update";
import Test from "./pages/test";
import Error from "./pages/error";

export default function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<Index />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/reset/:token" element={<Reset />} />
          <Route path="/resend" element={<Resend />} />
          <Route path="/update" element={<Update />} />
          <Route path="/test" element={<Test />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}
