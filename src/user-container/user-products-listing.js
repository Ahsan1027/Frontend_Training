import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Spinner } from 'react-bootstrap';

import Fixeddiv from '../components/fixed-div';
import Sidediv from '../components/side-div';
import Dropdowns from '../components/dropdown';
import _debounce from 'lodash/debounce';
// import Button from '../components/button';
import { fetchProductsData } from '../redux/Slices/products-slice';
import ListingWrapper from './style';

const ProductListing = ({ check = null }) => {
  const dispatch = useDispatch();
  let { productsData, loading, error } = useSelector((state) => state.fetch);
  // const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [sortOrder, setSortOrder] = useState('asc');
  const [Index, setIndex] = useState(0);
  const [filterText, setFilterText] = useState('Price');
  const [sortText, setSortText] = useState('Default Sorting(Asc)');
  const [searchTitle, setTitle] = useState('');
  const limit = 5;

  const handleSearch = _debounce((e) => {
    const query = e.target.value.toLowerCase();
    // setSearchQuery(query);
    setTitle(query);
    debouncedFetchData(query);
  }, 500);

  const debouncedFetchData = (query) => {
    const sortField = 'price';
    dispatch(fetchProductsData({
      currentPage,
      title: query,
      limit,
      skip: 0,
      minPrice,
      maxPrice,
      sortOrder,
      sortField
    }));
  };

  window.onscroll = function () {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      if (productsData?.products?.length < productsData.total) {
        setCurrentPage(currentPage + 1);
      }
    }
  };

  useEffect(() => {
    const sortField = 'price';
    dispatch(fetchProductsData({
      title: searchTitle,
      currentPage,
      minPrice,
      maxPrice,
      sortField,
      sortOrder,
      limit: limit + (limit * (currentPage - 1)),
      skip: 0
    }));
  }, [minPrice, maxPrice, sortOrder, currentPage]);

  return (
    <>
      <ListingWrapper>
        <div className='d-flex ms-5 justify-content-around align-items-center me-3 header-size'>
          <h5 className='text-primary mt-1'>Heading</h5>
          <div className='d-flex'>
            <div className='fw-bold d-flex align-items-center me-3 ms-5'>Filters:</div>
            <Dropdowns onPriceChange={(min, max) => {
              setMaxPrice(max); setMinPrice(min);
              // setCurrentPage(1);
              setFilterText(`${min} - ${max}`);
            }}
              names={filterText} Action1='1 - 200' Action2='200 - 800' Action3='800 - 1800' Action4='1800 - 2800' Action5='2800 - 4000' Action6='All' />
          </div>
          <div className='d-flex '>
            <div className='fw-bold d-flex align-items-center '>Sorting:</div>
            <Dropdowns onSelect={(value) => {
              setSortOrder(value);
              setSortText(value === 'asc' ? 'Asc' : 'Desc');
            }} names={sortText} Action7='Asc' Action8='Desc' />
          </div>
          <Col xs="auto" className="mb-3 mt-4">
            <Row className="align-items-center">
              <Col xs="auto">
                {/* <Button onClick={handleSearch} variant="outline-primary" id="button-addon2" >
                  Search
                </Button> */}
              </Col>
              <Col xs="auto">
                <input
                  type="text"
                  placeholder="Search by name"
                  className="border mw-100 fs-6 me-5"
                  // value={searchQuery}
                  onChange={(e) => handleSearch(e)}
                />
              </Col>
            </Row>
          </Col>
        </div>


        {error && (
          <div className="error-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
            <div className="text-danger">
              <div>Error: {error} </div>
            </div>
          </div>
        )
        }
        {loading && (
          <div className="loading-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(255, 255, 255, 0.7)' }}>
            <div className="loading-overlay text-center">
              <Spinner animation="border" role="status"></Spinner>
              <div>Loading...</div>
            </div>
          </div>
        )}
        {/* {!error && !loading && ( */}
        <>
          <Container className='ms-5 '>
            <Row >
              <div className='d-flex mt-5' >
                <Col className='scrolling custom-size' lg={6}>
                  <div className="d-flex flex-wrap">
                    {
                      productsData?.products?.map((pro, index) => (
                        <Sidediv
                          key={pro?._id}
                          data={pro}
                          index={index}
                          newIndex={(value) => {
                            setIndex(value);
                          }} />
                      ))
                    }
                  </div>
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
        {/* )} */}
      </ListingWrapper>
    </>
  );
};

export default ProductListing;
