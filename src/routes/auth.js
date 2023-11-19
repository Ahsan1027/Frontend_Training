import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../admin-container/auth/admin-login';
import Reset from '../admin-container/auth/admin-reset_password';
import NewPassword from '../admin-container/auth/admin-newpassword';
import NotFound from '../components/not-found';
import ProductListing from '../user-container/user-products-listing';
import UserVerifyingPage from '../admin-container/auth/user-verifying-page';
import UserLayout from '../layouts/user-layout';
import Signup from '../user-container/user-signup';

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login user='User' />} />
      <Route path="/Signup" element={<Signup />} />
      <Route path="/reset-password" element={<Reset />} />
      <Route path="/new-password" element={<NewPassword />} />
      <Route path="/user-verifying" element={<UserVerifyingPage />} />
      <Route path="/" element={<UserLayout value='invalid'><ProductListing check='invalid' /></UserLayout>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AuthRoutes;
