import React, { createContext, useState, useEffect } from "react";

export const TasksContext = createContext({
  tasks: [],
  addTask: () => {},
  updateTask: () => {},
  deleteTask: () => {},
});

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  // Use useEffect to sync with localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks((prev) => [...prev, task]);
  };

  const updateTask = (updatedTask) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const closeCongratulations = () => {
    setShowConfetti(false);
    navigate("/dashboard");
  };

  return (
    <TasksContext.Provider
      value={{ tasks, addTask, updateTask, deleteTask, closeCongratulations }}
    >
      {children}
    </TasksContext.Provider>
  );
};
