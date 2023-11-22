import React, { useState, useEffect } from 'react';
import { ProductsTableComponent } from '../admin-container/admin-products';
import { PaginationComponent } from '../admin-container/admin-products';
import { fetchOrdersData } from '../redux/Slices/order-slice';
import { useSelector, useDispatch } from 'react-redux';
import ListingWrapper from './style';

const Orders = () => {
    const dispatch = useDispatch();
    let { productsData, error } = useSelector((state) => state.order);
    let email = useSelector((state) => state.login.email);
    let { token } = useSelector((state) => state.login);
    const [currentPage, setCurrentPage] = useState(1);
    const headingsFromAPI = ['Date', 'Order#', 'User', 'Products', 'Amount', 'Status', 'Action'];
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        dispatch(fetchOrdersData({ currentPage, email, token }));
    }, [currentPage]);
    return (
        <>
            <ListingWrapper>
                <div className='border orders-size'>
                    <ProductsTableComponent
                        headings={headingsFromAPI}
                        data={productsData?.orders}
                        error={error}
                        name='User'
                    />
                    <PaginationComponent
                        currentPage={currentPage}
                        totalPages={productsData?.total}
                        onPageChange={handlePageChange}
                    />
                </div>
            </ListingWrapper>
        </>
    );
};

export default Orders;
