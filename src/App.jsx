import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Root from "./Layout/Root";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import ResetPassword from "./pages/Reset Password/ResetPassword";
import Dashboard from "./pages/Dashboard/Dashboard";
import { TasksProvider } from "./context/TasksContext";
import AddNewTask from "./pages/Add New Task/AddNewTask";
import EditTask from "./pages/Edit Task/EditTask";
import Spin from "./pages/Spin/Spin";
import PrivateRoute from "./components/PrivateRoute";
import ErrorPage from "./pages/404 Page/ErrorPage";

function App() {
  return (
    <>
      <div>
        <TasksProvider>
          <Routes>
            <Route path="/" element={<Root />}>
              <Route index element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Signup />} />
              <Route
                path="/resetPassword"
                element={
                  <PrivateRoute>
                    <ResetPassword />
                  </PrivateRoute>
                }
              />

              {/* Protected Routes */}
              <Route
                path="/addTask"
                element={
                  <PrivateRoute>
                    <AddNewTask />
                  </PrivateRoute>
                }
              />
              <Route
                path="/addTask/:id"
                element={
                  <PrivateRoute>
                    <EditTask />
                  </PrivateRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/spin"
                element={
                  <PrivateRoute>
                    <Spin />
                  </PrivateRoute>
                }
              />
            </Route>
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </TasksProvider>
      </div>
    </>
  );
}

export default App;
