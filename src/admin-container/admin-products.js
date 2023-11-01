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
    dispatch(fetchProductsData({ currentPage, token }));
  }, [currentPage, addSuccess, deleteSuccess, editSuccess]);

  const handleSearch = () => {
    const query = searchQuery.toLowerCase();
    dispatch(fetchProductsData({
      currentPage: 1,
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
              <div className='d-flex justify-content-around'>
                <h6 className='fw-bold mt-2'>Uploaded File Status</h6>
                <svg className='mt-1' style={{ marginLeft: '830px' }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <g clipPath="url(#clip0_1463_16520)">
                    <path fillRule="evenodd" clipRule="evenodd" d="M3.17007 6.70561C3.36284 5.98576 3.71408 5.31811 4.19809 4.75149C4.68211 4.18486 5.28666 3.73359 5.96753 3.43068C6.6484 3.12777 7.38837 2.98089 8.13331 3.00078C8.87826 3.02066 9.60933 3.20681 10.2731 3.54561C10.3316 3.57542 10.3955 3.5934 10.461 3.59853C10.5266 3.60366 10.5924 3.59583 10.6549 3.57549C10.7174 3.55516 10.7753 3.52271 10.8253 3.48001C10.8752 3.4373 10.9163 3.38518 10.9461 3.32661C10.9759 3.26804 10.9939 3.20417 10.999 3.13865C11.0041 3.07313 10.9963 3.00725 10.976 2.94475C10.9556 2.88226 10.9232 2.82438 10.8805 2.77443C10.8378 2.72447 10.7856 2.68342 10.7271 2.65361C9.464 2.00911 8.01348 1.83279 6.63279 2.15591C5.25209 2.47902 4.03045 3.28071 3.18455 4.41876C2.33864 5.55682 1.92313 6.95769 2.01173 8.37292C2.10032 9.78816 2.68729 11.1263 3.66852 12.1499C4.64975 13.1736 5.96183 13.8167 7.37205 13.9651C8.78226 14.1135 10.1995 13.7577 11.3723 12.9607C12.5451 12.1637 13.3978 10.9771 13.7791 9.61129C14.1603 8.24551 14.0455 6.78883 13.4551 5.49961C13.3998 5.37894 13.2988 5.28517 13.1744 5.23894C13.0499 5.19272 12.9122 5.19781 12.7916 5.25311C12.6709 5.30841 12.5771 5.40938 12.5309 5.53381C12.4847 5.65824 12.4898 5.79594 12.5451 5.91661C12.8794 6.64606 13.0332 7.44526 12.9936 8.24669C12.954 9.04813 12.722 9.82825 12.3174 10.5212C11.9127 11.2141 11.3473 11.7994 10.6688 12.2278C9.99024 12.6561 9.21859 12.9148 8.41901 12.9821C7.61942 13.0494 6.81539 12.9233 6.07482 12.6144C5.33425 12.3055 4.67891 11.8229 4.16415 11.2073C3.64939 10.5918 3.29033 9.86142 3.11731 9.07788C2.94429 8.29435 2.96239 7.48068 3.17007 6.70561Z" fill="#495057" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M8.14689 0.146393C8.24066 0.0526577 8.36781 0 8.50039 0C8.63298 0 8.76013 0.0526577 8.85389 0.146393L11.3539 2.64639C11.4005 2.69284 11.4374 2.74801 11.4626 2.80876C11.4878 2.8695 11.5008 2.93463 11.5008 3.00039C11.5008 3.06616 11.4878 3.13128 11.4626 3.19203C11.4374 3.25277 11.4005 3.30795 11.3539 3.35439L8.85389 5.85439C8.80741 5.90082 8.75223 5.93763 8.69152 5.96273C8.6308 5.98782 8.56574 6.00072 8.50004 6.00067C8.43434 6.00063 8.3693 5.98764 8.30862 5.96245C8.24794 5.93727 8.19282 5.90038 8.14639 5.85389C8.05264 5.76001 8.00002 5.63272 8.00012 5.50004C8.00016 5.43434 8.01315 5.3693 8.03833 5.30862C8.06352 5.24794 8.10041 5.19282 8.14689 5.14639L10.2929 3.00039L8.14689 0.854393C8.10033 0.807948 8.06339 0.752772 8.03818 0.692027C8.01297 0.631282 8 0.566161 8 0.500393C8 0.434626 8.01297 0.369505 8.03818 0.30876C8.06339 0.248014 8.10033 0.192839 8.14689 0.146393Z" fill="#495057" />
                  </g>
                  <defs>
                    <clipPath id="clip0_1463_16520">
                      <rect width="16" height="16" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
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

