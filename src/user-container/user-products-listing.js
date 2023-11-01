import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Spinner } from 'react-bootstrap';

import Fixeddiv from '../components/fixed-div';
import Sidediv from '../components/side-div';
import Dropdowns from '../components/dropdown';
import Button from '../components/button';
import { PaginationComponent } from '../admin-container/admin-products';
import { fetchProductsData } from '../redux/Slices/products-slice';
import ListingWrapper from './style';

const ProductListing = ({ check = null }) => {
  const dispatch = useDispatch();
  let { productsData, loading, error } = useSelector((state) => state.fetch);
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [sortOrder, setSortOrder] = useState('asc');
  const [Index, setIndex] = useState(0);
  const [filterText, setFilterText] = useState('Price');
  const [sortText, setSortText] = useState('Default Sorting(Asc)');

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = () => {
    const query = searchQuery.toLowerCase();
    dispatch(fetchProductsData({
      currentPage: 1,
      title: query,
    }));
  };

  useEffect(() => {
    const sortField = 'price';
    dispatch(fetchProductsData({ currentPage, minPrice, maxPrice, sortField, sortOrder }));
  }, [currentPage, minPrice, maxPrice, sortOrder]);

  return (
    <>
      <ListingWrapper>
        <div className='d-flex ms-5 justify-content-around align-items-center me-3 header-size'>
          <h5 className='text-primary mt-1'>Heading</h5>
          <div className='d-flex'>
            <div className='fw-bold d-flex align-items-center me-3 ms-5'>Filters:</div>
            <Dropdowns onPriceChange={(min, max) => {
              setMaxPrice(max); setMinPrice(min);
              setCurrentPage(1);
              setFilterText(`${min} - ${max}`);
            }}
              names={filterText} Action1='1 - 200' Action2='200 - 800' Action3='800 - 1800' Action4='1800 - 2800' Action5='2800 - 4000' />
          </div>
          <div className='d-flex '>
            <div className='fw-bold d-flex align-items-center '>Sorting:</div>
            <Dropdowns onSelect={(value) => {
              setSortOrder(value);
              setSortText(value === 'asc' ? 'Asc' : 'Desc');
            }} names={sortText} Action1='Asc' Action2='Desc' />
          </div>
          <Col xs="auto" className="mb-3 mt-4">
            <Row className="align-items-center">
              <Col xs="auto">
                <Button onClick={handleSearch} variant="outline-primary" id="button-addon2" >
                  Search
                </Button>
              </Col>
              <Col xs="auto">
                <input
                  type="text"
                  placeholder="Search by name"
                  className="border mw-100 fs-6 me-5"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </Col>
            </Row>
          </Col>
        </div>


        {error ? (
          <div className="error-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
            <div className="text-danger">
              <div>Error: {error} </div>
            </div>
          </div>
        ) : loading ? (
          <div className="loading-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(255, 255, 255, 0.7)' }}>
            <div className="loading-overlay text-center">
              <Spinner animation="border" role="status"></Spinner>
              <div>Loading...</div>
            </div>
          </div>
        ) : (
          <>
            <Container className='ms-5 '>
              <Row >
                <div className='d-flex mt-5' >
                  <Col className='scrolling custom-size' lg={6}>
                    <div className="d-flex flex-wrap">
                      <Sidediv
                        data={productsData.products}
                        newIndex={(value) => {
                          setIndex(value);
                        }} />
                    </div>
                    <PaginationComponent currentPage={currentPage} totalPages={productsData.total} onPageChange={handlePageChange} itemsPerPage={itemsPerPage} />
                  </Col>
                  <Col className='ms-3 custom-size1'>
                    <Fixeddiv
                      check={check}
                      Index={Index}
                    />
                  </Col>
                </div>
              </Row>
            </Container>
          </>
        )}
      </ListingWrapper>
    </>
  );
};

export default ProductListing;
