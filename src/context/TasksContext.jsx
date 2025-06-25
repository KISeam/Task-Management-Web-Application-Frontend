import React, { createContext, useState, useEffect, useContext } from "react";

export const TasksContext = createContext({
  tasks: [],
  addTask: () => {},
  updateTask: () => {},
  deleteTask: () => {},
  tokens: [],
  setToken: () => {},
  clearToken: () => {},
  clearAllTokens: () => {},
  user: null,
  setUser: () => {},
  clearUser: () => {},
});

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [tokens, setTokens] = useState(() => {
    const savedTokens = localStorage.getItem("tokens");
    return savedTokens ? JSON.parse(savedTokens) : [];
  });

  const [user, setUserState] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Sync with localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    if (tokens.length > 0) {
      localStorage.setItem("tokens", JSON.stringify(tokens));
    } else {
      localStorage.removeItem("tokens");
    }
  }, [tokens]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const addTask = (task) => {
    setTasks((prev) => [...prev, { ...task, id: Date.now() }]);
  };

  const updateTask = (updatedTask) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const setToken = (newToken) => {
    setTokens((prev) => [...new Set([...prev, newToken])]);
  };

  const clearToken = (tokenToClear) => {
    setTokens((prev) => prev.filter((t) => t !== tokenToClear));
  };

  const clearAllTokens = () => {
    setTokens([]);
  };

  const setUser = (userData) => {
    setUserState(userData);
  };

  const clearUser = () => {
    setUserState(null);
  };

  return (
    <TasksContext.Provider
      value={{
        tasks,
        addTask,
        updateTask,
        deleteTask,
        tokens,
        setToken,
        clearToken,
        clearAllTokens,
        user,
        setUser,
        clearUser,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TasksContext);
  if (context === undefined) {
    throw new Error("useTasks must be used within a TasksProvider");
  }
  return context;
};
