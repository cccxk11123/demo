import React from "react";
import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MyLayout from "./components/Mylayout";
import Contest from "./pages/contest/contest";
import Problem from "./pages/problem/problem";
import Home from "./pages/home/home";
import Rank from "./pages/rank/rank";
import Status from "./pages/status/status";
import ProblemInfo from "./pages/problem/problemInfo";
import ContestInfo from "./pages/contest/contestInfo";
import UserInfo from "./pages/user/userInfo";
import UpdatePassword from "./pages/user/updatePassword";

//路由设置
function App() {
  return (
    <MyLayout>
      <Routes>
        <Route path="contest" element={<Contest />} />
        <Route path="contest/:id" element={<ContestInfo />} />
        <Route path="problem" element={<Problem />} />
        <Route path="problem/:id" element={<ProblemInfo />} />
        <Route path="home" element={<Home />} />
        <Route path="rank" element={<Rank />} />
        <Route path="status" element={<Status />} />
        <Route path="userinfo" element={<UserInfo />} />
        <Route path="updatepassword" element={<UpdatePassword />} />

        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </MyLayout>
  );
}

export default App;
