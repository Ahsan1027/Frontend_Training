// import React, { useEffect } from 'react';
// import AdminLayout from '../layouts/admin-layout';
// import UserLayout from '../layouts/user-layout';
// import Login from '../admin-container/auth/admin-login';
// import Reset from '../admin-container/auth/admin-reset_password';
// import NewPassword from '../admin-container/auth/admin-newpassword';
// import AdminProducts from '../admin-container/admin-products';
// import Orders from '../admin-container/admin-orders';
// import ProductListing from '../user-container/user-products-listing';
// import ShoppingBag from '../user-container/user-shopping-bag';
// import Checkout from '../user-container/user-checkout';
// import Signup from '../user-container/user-signup';
// import UserOrders from '../user-container/user-orders';
// import { Routes, Route } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import Dashboard from '../admin-container/admin-dashboard';
// import NotFound from '../components/not-found';

// const AppRoutes = () => {
//   const navigate = useNavigate();
//   const tokenInLocalStorage = useSelector((state) => state.login.token);
//   const { role } = useSelector((state) => state.login);

//   useEffect(() => {
//     if (role === 'user') {
//       navigate('/');
//     } else if (role === 'admin') {
//       navigate('/dashboard-page');
//     }
//     console.log('\n\n', 'role', role);
//   }, [role]);

//   return (
//     <Routes>
//       {tokenInLocalStorage ? (
//         <>
//           {role === 'user' ? (
//             <>
//               <Route path="/orders-page" element={<UserLayout>< UserOrders /></UserLayout>} />
//               <Route path="/" element={<UserLayout ><ProductListing /></UserLayout>} />
//               <Route path="/shopping-page" element={<UserLayout ><ShoppingBag /></UserLayout>} />
//               <Route path="/checkout-page" element={<UserLayout ><Checkout /></UserLayout>} />
//             </>
//           )
//             :
//             (
//               <>
//                 <Route path="/products-page" element={<AdminLayout><AdminProducts /></AdminLayout>} />
//                 <Route path="/order-page" element={<AdminLayout>< Orders /></AdminLayout>} />
//                 <Route path="/dashboard-page" element={<AdminLayout>< Dashboard /></AdminLayout>} />
//               </>
//             )
//           }
//         </>
//       ) : (
//         <>
//           <>
//             <Route path="/login" element={<Login user='User' />} />
//             <Route path="/Signup" element={<Signup />} />
//             <Route path="/" element={<UserLayout value='invalid'><ProductListing check='invalid' /></UserLayout>} />
//             <Route path="/reset-password" element={<Reset />} />
//             <Route path="/new-password" element={<NewPassword />} />
//           </>

//         </>
//       )}
//       <Route path="*" element={<NotFound />} />
//     </Routes>
//   );
// };

// export default AppRoutes;

