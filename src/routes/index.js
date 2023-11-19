import React from 'react';
import { useSelector } from 'react-redux';
import AuthRoutes from './auth';
import UserRoutes from './user';
import AdminRoutes from './admin';

const AppRoutes = () => {
  const tokenInLocalStorage = useSelector((state) => state.login.token);
  const { role } = useSelector((state) => state.login);

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