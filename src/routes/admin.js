import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLayout from '../layouts/admin-layout';
import AdminProducts from '../admin-container/admin-products';
import Orders from '../admin-container/admin-orders';
import Dashboard from '../admin-container/admin-dashboard';
import NotFound from '../components/not-found';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/products-page" element={<AdminLayout><AdminProducts /></AdminLayout>} />
      <Route path="/order-page" element={<AdminLayout><Orders /></AdminLayout>} />
      <Route path="/dashboard-page" element={<AdminLayout><Dashboard /></AdminLayout>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AdminRoutes;
