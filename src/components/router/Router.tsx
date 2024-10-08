import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "../../routes/Auth";
import Home from "../../routes/Home";

interface IAppRouterProps {
  isLoggedIn: boolean;
}

const AppRouter: React.FC<IAppRouterProps> = ({ isLoggedIn }) => (
  <Router>
    <Routes>
      {isLoggedIn ? (
        <Route path="/" element={<Home />} />
      ) : (
        <Route path="/" element={<Auth />} />
      )}
    </Routes>
  </Router>
);

export default AppRouter;
