import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Rectangle from '../components/rectangle';
import { ProductsTableComponent, PaginationComponent } from './admin-products';
import { fetchOrdersData } from '../redux/Slices/order-slice';
import { fetchOrderStats } from '../redux/Slices/order-slice';
// import Button from '../components/button';
import _debounce from 'lodash/debounce';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import Styling from './auth/style';

const Orders = () => {
    const headingsFromAPI = ['Date', 'Order#', 'User', 'Products', 'Amount', 'Status', 'Action'];
    const [currentPage, setCurrentPage] = useState(1);
    // const [searchQuery, setSearchQuery] = useState('');
    let { productsData, error, orderCheckSuccess, orderDeliverSuccess } = useSelector((state) => state.order);
    let { stats } = useSelector((state) => state.order);
    let { token } = useSelector((state) => state.login);
    const dispatch = useDispatch();

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        dispatch(fetchOrderStats(token));
        dispatch(fetchOrdersData({ currentPage, token }));
    }, [currentPage, orderCheckSuccess, orderDeliverSuccess]);

    const debouncedFetchData = ((query) => {
        dispatch(fetchOrdersData({
            currentPage: 1,
            orderId: query,
            token
        }));
    });

    const handleSearch = _debounce((e) => {
        const query = e.target.value.toString();
        // setSearchQuery(query);
        debouncedFetchData(query);
    }, 500);

    return (
        <>
            <div className='content p-4 d-flex-col mt-5 ms-5' style={{ backgroundColor: 'rgba(0, 0, 0, 0.045)' }}>
                <div className='d-flex justify-content-between '>
                    {stats.map((data, index) => (
                        <Rectangle
                            value='orders'
                            key={index}
                            title='Total Orders'
                            totalOrder={data.totalOrders}
                        />
                    ))}
                    {stats.map((data, index) => (
                        <Rectangle
                            value='orders'
                            key={index}
                            title='Total Products'
                            totalProducts={data.totalQuantity}
                        />
                    ))}
                    {stats.map((data, index) => (
                        <Rectangle
                            value='orders'
                            key={index}
                            title='Total Amount'
                            totalSales={data.totalAmount}
                        />
                    ))}
                </div>

                <div style={Styling.custom_size} >
                    <Row className='d-flex justify-content-between align-items-center mt-3 '>
                        <Col xs="auto" className="mb-3">
                            <h5 className='mt-3 d-inline-flex text-primary'>Orders</h5>
                        </Col>
                        <Col xs="auto" className="mb-3">
                            <Row className="align-items-center">
                                <Col xs="auto">
                                    <input
                                        type="text"
                                        placeholder="Search using Order ID"
                                        className="border-black mw-100 fs-6"
                                        // value={searchQuery}
                                        onChange={(e) => handleSearch(e)}
                                    />
                                </Col>
                                {/* <Col xs="auto">
                                    <Button variant="outline-primary" id="button-addon2" onClick={handleSearch}>
                                        Search
                                    </Button>
                                </Col> */}
                            </Row>
                        </Col>
                    </Row>
                    <ProductsTableComponent headings={headingsFromAPI} data={productsData.orders} error={error} name='second' />
                    <PaginationComponent currentPage={currentPage} totalPages={productsData.total} onPageChange={handlePageChange} error={error} />
                </div>
            </div>
        </>
    );
};

export default Orders;
