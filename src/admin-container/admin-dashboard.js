import React, { useEffect } from 'react';
import Rectangle from '../components/rectangle';
import OrdersOverview from '../components/orders-overview';
import Chart from '../components/charts';
import { useSelector, useDispatch } from 'react-redux';
import {  fetchDashboardStats } from '../redux/Slices/dashboard-slice';
import { ProductsTableComponent } from './admin-products';
import Styling from './auth/style';

const Dashboard = () => {
  const headingsFromAPI = ['Title', 'Price', 'Stock', 'Sold', 'Rating'];
  const { productsData, error } = useSelector((state) => state.dashboard);
  let totalOrders = useSelector((state) => state.dashboard.totalOrders);
  let totalAmount = useSelector((state) => state.dashboard.totalAmount);
  let { stats } = useSelector((state) => state.dashboard);
  let { token } = useSelector((state) => state.login);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDashboardStats(token));
  }, []);

  return (
    <div className='content p-4 d-flex-col mt-5 ms-5' style={{ backgroundColor: 'rgba(0, 0, 0, 0.045)' }}>
      <h4 className='ms-2'>Dashboard</h4>
      <div className='d-flex justify-content-between'>
        {stats?.map((data, index) => (
          <Rectangle
            key={index}
            title='Today'
            totalProducts={data.todayStats.totalQuantity}
            totalOrder={data.todayStats.totalOrders}
            totalSales={data.todayStats.totalAmount}
          />
        ))}
        {stats?.map((data, index) => (
          <Rectangle
            key={index}
            title='7 Days'
            totalProducts={data.sevenDayStats.totalQuantity}
            totalOrder={data.sevenDayStats.totalOrders}
            totalSales={data.sevenDayStats.totalAmount}
          />
        ))}
        {stats?.map((data, index) => (
          <Rectangle
            key={index}
            title='30 Days'
            totalProducts={data.thirtyDayStats.totalQuantity}
            totalOrder={data.thirtyDayStats.totalOrders}
            totalSales={data.thirtyDayStats.totalAmount}
          />
        ))}
      </div>
      <div className='d-flex mt-3'>
        <OrdersOverview />
        {totalOrders && totalAmount && (
          <Chart totalOrders={totalOrders.slice()} totalAmount={totalAmount.slice()} />
        )}
      </div>
      <div style={Styling.custom_size} ><h5 className='mt-5 mb-3'>Top 6 Selling Products</h5>
        <ProductsTableComponent headings={headingsFromAPI} data={productsData} error={error} name='dashboard' />
      </div>
    </div>
  );
};

export default Dashboard;