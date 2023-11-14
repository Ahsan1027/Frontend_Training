import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UserLayout from '../layouts/user-layout';
import ProductListing from '../user-container/user-products-listing';
import ShoppingBag from '../user-container/user-shopping-bag';
import Checkout from '../user-container/user-checkout';
import UserOrders from '../user-container/user-orders';
import NotFound from '../components/not-found';

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/orders-page" element={<UserLayout><UserOrders /></UserLayout>} />
      <Route path="/" element={<UserLayout><ProductListing /></UserLayout>} />
      <Route path="/shopping-page" element={<UserLayout><ShoppingBag /></UserLayout>} />
      <Route path="/checkout-page" element={<UserLayout><Checkout /></UserLayout>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default UserRoutes;
