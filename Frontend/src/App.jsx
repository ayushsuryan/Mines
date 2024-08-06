import React from "react";
import { RecoilRoot, useRecoilValue } from "recoil";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import { authState } from "./state/auth";

const PrivateRoute = ({ children }) => {
  const auth = useRecoilValue(authState);
  return auth ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <RecoilRoot>
      <Router>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </RecoilRoot>
  );
};

export default App;
