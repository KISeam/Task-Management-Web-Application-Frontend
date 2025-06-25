export const isAuthenticated = () => {
  const user = localStorage.getItem('user');
  return !!user;
};

export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const logout = () => {
  localStorage.removeItem('user');
};