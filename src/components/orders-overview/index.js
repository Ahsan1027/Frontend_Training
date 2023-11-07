import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboardStats } from '../../redux/Slices/dashboard-slice';
import OrdersOverViewWrapper from './style';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const OrdersOverview = () => {
    const dispatch = useDispatch();
    const { totalSold } = useSelector((state) => state.dashboard);
    const { totalUnsold } = useSelector((state) => state.dashboard);
    let { token } = useSelector((state) => state.login);
    useEffect(() => {
        dispatch(fetchDashboardStats(token));
    }, [totalSold, totalUnsold]);

    const data = [
        { name: 'Unsold', value: totalUnsold || 0 },
        { name: 'Sold', value: totalSold || 0 },
    ];
    const COLORS = ['#0088FE', '#00C49F'];
    return (
        <>
            <OrdersOverViewWrapper>
                <h6 className='mt-3'>Orders Overview</h6>
                <div className='custom-size  ' >
                    <PieChart className='p-3' width={500} height={300}>
                        <Pie
                            data={data}
                            cx={120}
                            cy={150}
                            innerRadius={60}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Pie
                            data={data}
                            cx={420}
                            cy={200}
                            startAngle={180}
                            endAngle={0}
                            innerRadius={60}
                            outerRadius={80}
                            fill="#8884d8"
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip formatter={(value, name) => [`${name}: ${value}`, '']} />
                    </PieChart>

                    <div className='d-flex mt-5'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="29" viewBox="0 0 20 20" fill="none">
                            <g filter="url(#filter0_d_1295_22424)">
                                <circle cx="10" cy="8" r="5" fill="#5DDC6B" />
                                <circle cx="10" cy="8" r="5" stroke="white" />
                            </g>
                            <defs>
                                <filter id="filter0_d_1295_22424" x="0.5" y="0.5" width="19" height="19" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                    <feOffset dy="2" />
                                    <feGaussianBlur stdDeviation="2" />
                                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.075 0" />
                                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1295_22424" />
                                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1295_22424" result="shape" />
                                </filter>
                            </defs>
                        </svg> Orders Sold
                        <div className='ms-5'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <g filter="url(#filter0_d_1295_22433)">
                                    <circle cx="10" cy="8" r="5" fill="#5366FF" />
                                    <circle cx="10" cy="8" r="5" stroke="white" />
                                </g>
                                <defs>
                                    <filter id="filter0_d_1295_22433" x="0.5" y="0.5" width="19" height="19" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                        <feOffset dy="2" />
                                        <feGaussianBlur stdDeviation="2" />
                                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.075 0" />
                                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1295_22433" />
                                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1295_22433" result="shape" />
                                    </filter>
                                </defs>
                            </svg>Orders Unsold
                        </div>
                    </div>
                </div>
            </OrdersOverViewWrapper>
        </>
    );
};

export default OrdersOverview;
