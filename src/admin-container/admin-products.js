import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { Spinner } from 'react-bootstrap';
import ProductsTable from '../components/table';
import ButtonStyle from '../components/button/style';
import Edit from '../components/drawer';
import Button from '../components/button';
import Styling from './auth/style';
import Paginations from '../components/pagination';
import { fetchProductsData, addProduct } from '../redux/Slices/products-slice';
import Modal from '../components/modal';
import Trash from '../components/trash';

const ProductsTableComponent = ({ headings = null, data = null, error = null, name = null, value = null }) => {
  return (
    <>
      {error ? (
        <div style={{ color: 'red', display: 'flex', justifyContent: 'center' }}>
          {error}
        </div>
      ) : (
        <ProductsTable headings={headings} data={data} name={name} value={value} />
      )}
    </>
  );
};

const PaginationComponent = ({ currentPage, totalPages, onPageChange, itemsPerPage = 5, error = null }) => {
  return (
    <>
      {error ? (
        <div style={{ color: 'red', display: 'flex', justifyContent: 'center' }}>
        </div>
      ) : (
        <Paginations
          style={{ display: 'flex', justifyContent: 'end', marginRight: '70px' }}
          currentPage={currentPage}
          totalPages={Math.ceil(totalPages / itemsPerPage)}
          onPageChange={onPageChange}
        />)}
    </>
  );
};

const AdminProducts = () => {
  const headingsFromAPI = ['Title', 'Price', 'Stock', 'Rating', 'Colors', 'Sizes', 'Actions'];
  const headingsFromFile = ['Row', 'MissingFields'];
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [add, setAdd] = useState(false);
  const [Cross, setCross] = useState(false);
  const [Status, setStatus] = useState(false);
  const [FileError, setFileError] = useState(false);
  const [Bulk, setBulk] = useState(false);
  const placeholders = ['Add Product Name', 'Quantity'];
  const limit = 5;

  const dispatch = useDispatch();
  let { productsData, loading, error, addSuccess, deleteSuccess, editSuccess, fileName, fileData, fileError, fileErrors } = useSelector((state) => state.fetch);
  console.log('check filedata', fileData);
  let { token } = useSelector((state) => state.login);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const addProductHandler = async (thumbnail, title, price, stock, rating, images, selectedSizes, selectedColors) => {
    try {
      const editedProduct = {
        title,
        price,
        stock,
        rating,
        thumbnail,
        images,
        selectedSizes,
        selectedColors,
        token,
      };
      await dispatch(addProduct(editedProduct));
    } catch (error) {
      console.error('\n\n Error Editing Product:', error);
    } finally {
      setAdd(false);
    }
  };

  useEffect(() => {
    dispatch(fetchProductsData({
      token,
      limit,
      skip: (limit * (currentPage - 1))
    }));
  }, [currentPage, addSuccess, deleteSuccess, editSuccess]);

  const handleSearch = () => {
    const query = searchQuery.toLowerCase();
    dispatch(fetchProductsData({
      limit,
      skip: 0,
      title: query,
      token,
    }));
  };

  return (
    <div className='mt-4 '>
      <div style={{ display: loading ? 'none' : 'block' }}>
        <div className="content p-5 " style={{ backgroundColor: 'rgba(0, 0, 0, 0.045)' }}>
          {Status && (
            <div className='border border-dark' style={Styling.border_color}>
              <div className='d-flex justify-content-between'>
                <h6 className='fw-bold mt-2'>Uploaded File Status</h6>
                <div><svg onClick={() => setCross(true)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path fillRule="evenodd" clipRule="evenodd" d="M9.6979 8L14 12.3021L12.3021 14L8 9.6979L3.6979 14L2 12.3021L6.3021 8L2 3.6979L3.6979 2L8 6.3021L12.3021 2L14 3.6979L9.6979 8Z" fill="#495057" />
                </svg>
                </div>
              </div>
              <div className='d-flex justify-content-between mx-2 my-2'>
                <div className="mt-2" style={{ fontSize: '13px' }}>
                  File Name:
                  <div className="fw-bold">{fileName}</div>
                </div>
                <div className="mt-2" style={{ fontSize: '13px' }}>
                  Status:
                  <div className="fw-bold">In-Process
                    <ProgressBar>
                      <ProgressBar striped variant="success" now={(fileData / fileError) * 100} />
                      <ProgressBar striped variant="danger" now={(fileError - fileData) / (fileError) * 100} />
                    </ProgressBar>
                  </div>
                </div>
                <div className="mt-2" style={{ fontSize: '13px' }}>
                  Total Products:
                  <div className="fw-bold">{fileError}</div>
                </div>
                <div className="mt-2" style={{ fontSize: '13px' }}>
                  Successful:
                  <div className="fw-bold text-success">{fileData}</div>
                </div>
                <div className="mt-2" style={{ fontSize: '13px' }}>
                  Error:
                  <div className="fw-bold text-danger">{fileError - fileData}</div>
                </div>
                <div>
                  <Button className='bg-white text-primary' onClick={() => setFileError(true)}>View Errors</Button>
                </div>
              </div>
            </div>
          )}

          <div className="d-flex justify-content-between mt-5">
            <h4 style={Styling.ProductHeadingAdjust} className='mt-2'>Products</h4>
            <div>
              <Row style={{ marginLeft: '370px' }} >
                <Col xs="auto">
                  <Button variant="outline-primary" id="button-addon2" onClick={handleSearch} >
                    Search
                  </Button>
                </Col>
                <Col xs="auto" className="mt-2">
                  <input
                    type="text"
                    placeholder="Search"
                    className="mr-2 border-black"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </Col>
              </Row>
            </div>

            <div className="d-flex pb-4 ">
              <Button onClick={() => setBulk(true)} type="submit" className="me-4" style={ButtonStyle.ImportBulkProductsButton}>
                Import Bulk Products
              </Button>
              <Button onClick={() => setAdd(true)} type="submit" style={ButtonStyle.AddNewButton}>
                Add New
              </Button>
            </div>
          </div>

          {loading ? (
            <div className="loading-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(255, 255, 255, 0.7)' }}>
              <div className="loading-overlay text-center">
                <Spinner animation="border" role="status"></Spinner>
                <div>Loading...</div>
              </div>
            </div>
          ) : (
            <>
              <ProductsTableComponent
                headings={headingsFromAPI}
                data={productsData.products}
                error={error}
                name='first'
              />
              <PaginationComponent
                currentPage={currentPage}
                totalPages={productsData.total}
                onPageChange={handlePageChange}
                itemsPerPage={itemsPerPage}
                error={error}
              />
            </>
          )}
        </div>
      </div>
      {loading && (
        <div className="loading-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(255, 255, 255, 0.7)' }}>
          <div className="loading-overlay text-center">
            <Spinner className='text-danger' animation="border" role="status"></Spinner>
            <div>Loading...</div>
          </div>
        </div>
      )}

      {add && (
        <Edit
          state={true}
          name='Add Product'
          placeholders={placeholders}
          text='Save'
          onClose={(thumbnail, title, price, stock, rating, images, selectedSizes, selectedColors) => {
            addProductHandler(thumbnail, title, price, stock, rating, images, selectedSizes, selectedColors);
          }}
          onClose1={() => {
            setAdd(false);
          }}
        />
      )}

      {FileError && (
        <Edit
          state={true}
          name='Uploaded File Errors'
          text='Close'
          headings={headingsFromFile}
          data={fileErrors}
          onClose={() => {
            setFileError(false);
          }}
        />
      )}

      {Bulk && (
        <Modal
          state={true}
          name='Import Bulk Products'
          text='Save'
          onClose={() => {
            setBulk(false);
          }}
          onStatus={() => {
            setBulk(false);
            setStatus(true);
          }}
        />
      )}

      {Cross && (
        <Trash
          state={true}
          onClose={() => setCross(false)}
          texts='Remove Message'
          svgs={<svg xmlns="http://www.w3.org/2000/svg" width="73" height="72" viewBox="0 0 73 72" fill="none">
            <g clipPath="url(#clip0_1295_22806)">
              <path fillRule="evenodd" clipRule="evenodd" d="M36.2211 9.07252C36.1182 9.13422 36.0342 9.22293 35.9781 9.32902L5.12162 61.8305C5.04475 61.9538 5.00326 62.0958 5.00167 62.241C5.00008 62.3862 5.03847 62.5291 5.11262 62.654C5.18462 62.789 5.27912 62.879 5.35562 62.924C5.42312 62.969 5.50862 63.0005 5.65262 63.0005H67.3611C67.4654 63.0043 67.5686 62.9777 67.6581 62.924C67.7621 62.8564 67.8473 62.7635 67.9056 62.654C67.9791 62.5287 68.0167 62.3856 68.0143 62.2404C68.012 62.0951 67.9697 61.9533 67.8921 61.8305L37.0401 9.32902C36.9841 9.22293 36.9 9.13422 36.7971 9.07252C36.7089 9.02415 36.6097 8.99935 36.5091 9.00052C36.4085 8.99935 36.3093 9.02415 36.2211 9.07252ZM40.9191 7.04752C40.4737 6.27155 39.8314 5.62686 39.0571 5.17854C38.2827 4.73022 37.4039 4.49414 36.5091 4.49414C35.6144 4.49414 34.7355 4.73022 33.9612 5.17854C33.1869 5.62686 32.5446 6.27155 32.0991 7.04752L1.24262 59.549C-0.813877 63.05 1.65212 67.5005 5.65262 67.5005H67.3611C71.3616 67.5005 73.8321 63.0455 71.7711 59.549L40.9191 7.04752Z" fill="#FFC107" />
              <path d="M32.0088 54C32.0088 53.4091 32.1252 52.8239 32.3513 52.278C32.5775 51.732 32.9089 51.2359 33.3268 50.8181C33.7447 50.4002 34.2407 50.0687 34.7867 49.8426C35.3327 49.6164 35.9178 49.5 36.5088 49.5C37.0997 49.5 37.6849 49.6164 38.2309 49.8426C38.7768 50.0687 39.2729 50.4002 39.6908 50.8181C40.1086 51.2359 40.4401 51.732 40.6662 52.278C40.8924 52.8239 41.0088 53.4091 41.0088 54C41.0088 55.1935 40.5347 56.3381 39.6908 57.182C38.8469 58.0259 37.7023 58.5 36.5088 58.5C35.3153 58.5 34.1707 58.0259 33.3268 57.182C32.4829 56.3381 32.0088 55.1935 32.0088 54ZM32.4498 26.9775C32.3899 26.4098 32.45 25.8359 32.6262 25.2929C32.8024 24.7499 33.0908 24.25 33.4727 23.8257C33.8546 23.4014 34.3215 23.0621 34.8429 22.8298C35.3644 22.5976 35.9289 22.4775 36.4998 22.4775C37.0707 22.4775 37.6352 22.5976 38.1566 22.8298C38.6781 23.0621 39.145 23.4014 39.5269 23.8257C39.9087 24.25 40.1972 24.7499 40.3734 25.2929C40.5496 25.8359 40.6097 26.4098 40.5498 26.9775L38.9748 42.759C38.9219 43.379 38.6382 43.9565 38.1799 44.3774C37.7216 44.7983 37.122 45.0318 36.4998 45.0318C35.8776 45.0318 35.278 44.7983 34.8197 44.3774C34.3614 43.9565 34.0777 43.379 34.0248 42.759L32.4498 26.9775Z" fill="#FFC107" />
            </g>
            <defs>
              <clipPath id="clip0_1295_22806">
                <rect width="72" height="72" fill="white" transform="translate(0.5)" />
              </clipPath>
            </defs>
          </svg>}
          Description='Are you sure you wanna hide this permanently?'
          onContentChange={() => {
            setCross(false);
            setStatus(false);
          }}
        />
      )}
    </div>
  );
};

export default AdminProducts;
export { ProductsTableComponent, PaginationComponent };

