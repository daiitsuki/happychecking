import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "../../routes/Auth";
import Home from "../../routes/Home";

interface IAppRouterProps {
  isLoggedIn: boolean;
}

const AppRouter: React.FC<IAppRouterProps> = ({ isLoggedIn }) => (
  <BrowserRouter>
    <Routes>
      {isLoggedIn ? (
        <Route path="/" element={<Home />} />
      ) : (
        <Route path="/" element={<Auth />} />
      )}
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
