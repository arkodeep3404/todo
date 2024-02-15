import { RecoilRoot } from "recoil";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./pages/signup";
import Signin from "./pages/signin";
import Home from "./pages/home";
import Index from "./pages/index";
import Profile from "./pages/profile";
import Test from "./pages/test";

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
          <Route path="/test" element={<Test />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}
