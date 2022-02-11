import React, { Fragment, useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes
 } from 'react-router-dom';

 import Login from "./components/Login";
 import Register from "./components/Register";
 import Dashboard from "./components/dashboard/Dashboard";
 import Landing from "./components/Landing";

function App() {
  const checkAuthenticated = async () => {
    try {
      const res = await fetch("http://localhost:5000/auth/verify", {
        method: "POST",
        headers: { jwt_token: localStorage.token }
      });

      const parseRes = await res.json();
      console.log(parseRes)
      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message, 'Error authenticating user, checkAuthenticaed function in App component');
    }
  };

  useEffect(() => {
    checkAuthenticated();
  }, []);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = boolean => {
    setIsAuthenticated(boolean);
  };

  return (
    <>
      <Router>
        <div >
          <Routes>
            <Route
              exact
              path="/"
              element={
                !isAuthenticated ? (
                  <Landing setAuth={setAuth}/>
                ) : (
                  <Navigate to="/dashboard" />
                )
              }
            />
            <Route
              exact
              path="/login"
              element={
                !isAuthenticated ? (
                  <Login setAuth={setAuth} />
                ) : (
                  <Navigate to="/dashboard" />
                )
              }
            />
            <Route
              exact
              path="/register"
              element={
                !isAuthenticated ? (
                  <Register setAuth={setAuth} />
                ) : (
                  <Navigate to="/dashboard" />
                )
              }
            />
            <Route
              exact
              path="/dashboard"
              element={
                isAuthenticated ? (
                  <Dashboard setAuth={setAuth} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
