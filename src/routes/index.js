import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import AuthRoutes from './auth';
import UserRoutes from './user';
import AdminRoutes from './admin';

const AppRoutes = () => {
  const navigate = useNavigate();
  const tokenInLocalStorage = useSelector((state) => state.login.token);
  const { role } = useSelector((state) => state.login);

  useEffect(() => {
    if (role === 'user') {
      navigate('/');
    } else if (role === 'admin') {
      navigate('/dashboard-page');
    }
  }, [role]);

  return (
    <>
      {tokenInLocalStorage ? (
        <>
          {role === 'user' ? <UserRoutes /> : <AdminRoutes />}
        </>
      ) : (
        <AuthRoutes />
      )}
    </>
  );
};

export default AppRoutes;