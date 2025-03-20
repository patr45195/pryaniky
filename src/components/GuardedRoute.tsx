import { Navigate, Outlet } from 'react-router-dom';

const GuardedRoute = () => {
  const token = localStorage.getItem('token');

  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default GuardedRoute;
