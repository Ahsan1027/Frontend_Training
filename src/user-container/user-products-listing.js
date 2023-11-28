import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Spinner } from 'react-bootstrap';

import Fixeddiv from '../components/fixed-div';
import Sidediv from '../components/side-div';
import Dropdowns from '../components/dropdown';
import _debounce from 'lodash/debounce';
import { fetchProductsData } from '../redux/Slices/products-slice';
import { getProductData } from '../redux/Slices/products-slice';
import ListingWrapper from './style';

const ProductListing = ({ check = null }) => {
  const dispatch = useDispatch();
  let { productsData, loading, error, total } = useSelector((state) => state.fetch);
  const [currentPage, setCurrentPage] = useState(1);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [sortOrder, setSortOrder] = useState('asc');
  const [Index, setIndex] = useState(0);
  const [filterText, setFilterText] = useState('Price');
  const [color, setColor] = useState('');
  const [colorText, setColorText] = useState('Color');
  const [data, setData] = useState(null);
  const [size, setSize] = useState('');
  const [sizeText, setSizeText] = useState('Size');
  const [sortText, setSortText] = useState('Default Sorting(Asc)');

  const [searchTitle, setTitle] = useState('');
  const limit = 5;

  const handleSearch = _debounce((e) => {
    const query = e.target.value.toLowerCase();
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
      sortField,
      color,
      size
    }));
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
      color,
      size,
      limit: limit + (limit * (currentPage - 1)),
      skip: 0
    }));
  }, [minPrice, maxPrice, sortOrder, currentPage, color, size, data]);

  const handleClick = async () => {
    const prodId = productsData.products[0]._id;
    const data1 = await dispatch(getProductData({ productId: prodId }));
    setData(data1?.payload?.product);
  };


  window.onscroll = function () {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      if (productsData?.products?.length < productsData.total) {
        setCurrentPage(currentPage + 1);
      }
    }
  };

  return (
    <>
      <ListingWrapper>
        <div className='d-flex ms-5 justify-content-around align-items-center me-3 header-size'>
          <h5 className='text-primary mt-1'>Heading</h5>
          <div className='d-flex'>
            <div className='fw-bold d-flex align-items-center me-3 ms-5'>Filters:</div>
            <Dropdowns onPriceChange={(min, max) => {
              setMaxPrice(max); setMinPrice(min);
              setFilterText(`${min} - ${max}`);
            }}
              names={filterText}
              actions={['1 - 200', '200 - 800', '800 - 1800', '1800 - 2800', '2800 - 4000', 'All']} />
          </div>
          <div className='d-flex '>
            <Dropdowns onSelect={(value) => {
              setSortOrder(value);
              setSortText(value === 'asc' ? 'Asc' : 'Desc');
            }} names={sortText}
              actions={['Asc', 'Desc']} />
          </div>

          <div className='d-flex '>
            <Dropdowns
              onSelectColor={(selectedColor) => {
                if (selectedColor == '') {
                  setColorText('AllColors');
                  setColor(selectedColor);
                } else {
                  setColor(selectedColor);
                  setColorText(selectedColor);
                }
              }}
              names={colorText}
              actions={['Grey', 'Black', 'Green', 'Maroon', 'Purple', 'NoColor']}
            />
          </div>

          <div className='d-flex '>
            <Dropdowns
              onSelectSize={(selectedSize) => {
                if (selectedSize == '') {
                  setSizeText('AllSizes');
                  setSize(selectedSize);
                } else {
                  setSize(selectedSize);
                  setSizeText(selectedSize);
                }
              }}
              names={sizeText}
              actions={['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', 'NoSize']}
            />
          </div>


          <Col xs="auto" className="mb-3 mt-4">
            <Row className="align-items-center">
              <Col xs="auto">
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
        {!error && !loading && (
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
                            newIndex={async (value) => {
                              setIndex(value);
                              const productId = productsData.products[value]._id;
                              const data1 = await dispatch(getProductData({ productId }));
                              setData(data1?.payload?.product);
                            }} />
                        ))
                      }
                    </div>
                  </Col>
                  <Col className='ms-3 custom-size1'>
                    {total - 1 < (Index) ?
                      <>
                        {handleClick}
                        <Fixeddiv check={check} Index={0} data={data} />
                      </>
                      : <Fixeddiv check={check} Index={Index} data={data} />
                    }
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
