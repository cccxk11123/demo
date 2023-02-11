import React from "react";
import App from "./App";
import ReactDOM from "react-dom/client";
import zhCN from "antd/locale/zh_CN";
import { ConfigProvider } from "antd";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import "./index.scss";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Router>
    <ConfigProvider locale={zhCN}>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </ConfigProvider>
  </Router>
);
