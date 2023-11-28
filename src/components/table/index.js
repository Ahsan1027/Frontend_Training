import React, { useState } from 'react';
import moment from 'moment';
import { Table } from 'react-bootstrap';
import Trash from '../trash';
import Edit from '../drawer';
import { deleteProduct, editProduct } from '../../redux/Slices/products-slice';
import { notification } from 'antd';
import { getOrderDetail } from '../../redux/Slices/order-slice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Styling from './style';
import Button from 'react-bootstrap/Button';

const Tables = ({ headings, data, name }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    let { token } = useSelector((state) => state.login);
    const [showTrashModal, setShowTrashModal] = useState(false);
    const [Delivered, setDelivered] = useState(false);
    const [Confirm, setConfirm] = useState(false);
    const [editItemId, setEditItemId] = useState(null);
    const [selectedProductId, setselectedProductId] = useState(null);
    const [id, setId] = useState(null);
    const [Details, setDetails] = useState(false);
    const [orderIndex, setIndex] = useState('');
    const [editIndex, setEditIndex] = useState(0);
    // const [deleteIndex, setDeleteIndex] = useState(0);
    const [orderDetail, setOrderDetail] = useState('');
    const placeholders = ['Cargo Trousers for Men - 6 Pocket Trousers - 6 Pocket Cargo Trousers', '100'];
    const orderheadings = ['date', 'orderId', 'username', 'Products', 'totalAmount'];

    const handleMarkAsDelivered = (orderId) => {
        setId(orderId);
        setDelivered(true);
    };

    const handleDetailsClick = async (orderId, index) => {
        const response = await dispatch(getOrderDetail({ orderId, token }));
        const orderDetailResponse = response?.payload;
        setOrderDetail(orderDetailResponse);
        setIndex(index);
        setDetails(true);
    };

    const deleteProductHandler = async (productId) => {
        try {
            await dispatch(deleteProduct({ productId, token }));
        } catch (error) {
            console.error('\n\n Error Deleting Product:', error);
        } finally {
            setShowTrashModal(false);
        }
    };

    const deleteProducts = (productId) => {
        setShowTrashModal(true);
        setselectedProductId(productId);
    };

    const editProductHandler = async (thumbnail, title, price, stock, rating, prodImages, images, deleted, selectedSizes, selectedColors, prodId) => {
        try {
            if (isNaN(price) || isNaN(stock) || isNaN(rating)) {
                notification.error({
                    message: 'Error',
                    description: 'Must be a Number !',
                    type: 'error',
                    duration: 1.5,
                });
                return;
            }

            const editedProduct = {
                prodId,
                title,
                price,
                stock,
                rating,
                prodImages,
                images,
                deleted,
                thumbnail,
                selectedSizes,
                selectedColors,
                token
            };
            dispatch(editProduct(editedProduct));
        } catch (error) {
            console.error('\n\n Error Editing Product:', error);
        } finally {
            setEditItemId(null);
        }
    };

    const editProducts = (productId, index) => {
        setEditIndex(index);
        setEditItemId(productId);
        setselectedProductId(productId);
    };

    const backPage = () => {
        navigate('/');
    };

    return (
        <>
            {name === 'User' ? (
                <>
                    <div className=' ms-5 text-primary d-flex' style={Styling.div_size}><svg onClick={backPage} xmlns="http://www.w3.org/2000/svg" width="16" height="30" viewBox="0 0 16 16" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M5.85392 4.64592C5.90048 4.69236 5.93742 4.74754 5.96263 4.80828C5.98784 4.86903 6.00081 4.93415 6.00081 4.99992C6.00081 5.06568 5.98784 5.13081 5.96263 5.19155C5.93742 5.2523 5.90048 5.30747 5.85392 5.35392L3.20692 7.99992L5.85392 10.6459C5.90041 10.6924 5.93728 10.7476 5.96244 10.8083C5.9876 10.8691 6.00055 10.9342 6.00055 10.9999C6.00055 11.0657 5.9876 11.1308 5.96244 11.1915C5.93728 11.2522 5.90041 11.3074 5.85392 11.3539C5.80743 11.4004 5.75224 11.4373 5.6915 11.4624C5.63076 11.4876 5.56566 11.5005 5.49992 11.5005C5.43417 11.5005 5.36907 11.4876 5.30833 11.4624C5.24759 11.4373 5.19241 11.4004 5.14592 11.3539L2.14592 8.35392C2.09935 8.30747 2.06241 8.2523 2.0372 8.19155C2.012 8.13081 1.99902 8.06568 1.99902 7.99992C1.99902 7.93415 2.012 7.86903 2.0372 7.80828C2.06241 7.74754 2.09935 7.69236 2.14592 7.64592L5.14592 4.64592C5.19236 4.59935 5.24754 4.56241 5.30828 4.5372C5.36903 4.512 5.43415 4.49902 5.49992 4.49902C5.56568 4.49902 5.63081 4.512 5.69155 4.5372C5.7523 4.56241 5.80747 4.59935 5.85392 4.64592Z" fill="#007BFF" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M2.5 8C2.5 7.86739 2.55268 7.74021 2.64645 7.64645C2.74021 7.55268 2.86739 7.5 3 7.5H13.5C13.6326 7.5 13.7598 7.55268 13.8536 7.64645C13.9473 7.74021 14 7.86739 14 8C14 8.13261 13.9473 8.25979 13.8536 8.35355C13.7598 8.44732 13.6326 8.5 13.5 8.5H3C2.86739 8.5 2.74021 8.44732 2.64645 8.35355C2.55268 8.25979 2.5 8.13261 2.5 8Z" fill="#007BFF" />
                    </svg>
                        <h4 className='ms-2'>Orders</h4>
                    </div>
                    <Table className='mt-4 mx-5 ' style={Styling.RowAdjust1}>
                        <thead className="table-secondary" >
                            <tr >
                                {headings.map((heading) => (
                                    <th className="fw-bold" key={heading.id} style={Styling.HeaderTitlesAdjust}>
                                        {heading}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <>
                            <tbody >
                                <>
                                    {data?.map((item, index) => (
                                        <tr key={item.id}>
                                            <td>{moment(item.date).format('ll')}</td>
                                            <td className='fw-bold'>{item.orderId}</td>
                                            <td>{item.username}</td>
                                            <td>
                                                {item.products.map((productItem, productIndex) => (
                                                    <tr key={productIndex}>
                                                        {productIndex === 0 && (
                                                            <td>{item.products.length}</td>
                                                        )}
                                                    </tr>
                                                ))}
                                            </td>
                                            <td className='fw-bold'>{item.totalAmount}</td>
                                            <td><div className=' text-light bg-success small' style={{ width: '55px', height: '25px' }}>
                                                <div className='ms-2'>{item.status}</div></div></td>
                                            <td ><svg onClick={() => {
                                                handleDetailsClick(item.orderId, index);
                                            }} xmlns="http://www.w3.org/2000/svg" width="44" height="16" viewBox="0 0 16 16" fill="none">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M6.5 4C6.5 3.86739 6.55268 3.74021 6.64645 3.64645C6.74021 3.55268 6.86739 3.5 7 3.5H12C12.1326 3.5 12.2598 3.55268 12.3536 3.64645C12.4473 3.74021 12.5 3.86739 12.5 4V9C12.5 9.13261 12.4473 9.25979 12.3536 9.35355C12.2598 9.44732 12.1326 9.5 12 9.5C11.8674 9.5 11.7402 9.44732 11.6464 9.35355C11.5527 9.25979 11.5 9.13261 11.5 9V4.5H7C6.86739 4.5 6.74021 4.44732 6.64645 4.35355C6.55268 4.25979 6.5 4.13261 6.5 4Z" fill="black" />
                                                <path fillRule="evenodd" clipRule="evenodd" d="M12.3537 3.64592C12.4002 3.69236 12.4372 3.74754 12.4624 3.80828C12.4876 3.86903 12.5005 3.93415 12.5005 3.99992C12.5005 4.06568 12.4876 4.13081 12.4624 4.19155C12.4372 4.2523 12.4002 4.30747 12.3537 4.35392L3.35366 13.3539C3.25977 13.4478 3.13243 13.5005 2.99966 13.5005C2.86688 13.5005 2.73954 13.4478 2.64565 13.3539C2.55177 13.26 2.49902 13.1327 2.49902 12.9999C2.49902 12.8671 2.55177 12.7398 2.64565 12.6459L11.6457 3.64592C11.6921 3.59935 11.7473 3.56241 11.808 3.5372C11.8688 3.512 11.9339 3.49902 11.9997 3.49902C12.0654 3.49902 12.1305 3.512 12.1913 3.5372C12.252 3.56241 12.3072 3.59935 12.3537 3.64592Z" fill="black" />
                                            </svg>
                                            </td>
                                        </tr>
                                    ))}
                                </>
                            </tbody>
                        </>
                        {Details && orderDetail && (
                            <Edit
                                state={true}
                                placeholders={placeholders}
                                name='Order Detail'
                                orderDetail={orderDetail}
                                value='second'
                                headings={orderheadings}
                                onClose={() => {
                                    setDetails(false);
                                    setIndex('');
                                }}
                                index={orderIndex}
                            />
                        )}
                    </Table>
                </>) : (
                <Table className='mt-2 ms-3' style={Styling.RowAdjust}>
                    <thead className="table-secondary" >
                        <tr >
                            {headings.map((heading) => (
                                <th className="fw-bold" key={heading.id} style={Styling.HeaderTitlesAdjust}>
                                    {heading}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <>
                        <tbody >
                            {name === 'first' && (
                                <>
                                    {data?.map((item, index) => (
                                        <tr key={item._id}>
                                            {headings.map((heading) => (
                                                <td key={heading}>
                                                    {heading === 'Title' && (
                                                        <img src={`http://localhost:4000/${item.thumbnail}`} style={{ width: '30px', height: '30px' }} />
                                                    )}
                                                    {heading === 'Actions' && (
                                                        <>
                                                            <svg onClick={() => editProducts(item._id, index)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                                <path d="M15.5022 1.94039C15.5956 2.03412 15.6481 2.16106 15.6481 2.29339C15.6481 2.42573 15.5956 2.55267 15.5022 2.64639L14.4592 3.69039L12.4592 1.69039L13.5022 0.646393C13.596 0.552658 13.7231 0.5 13.8557 0.5C13.9883 0.5 14.1154 0.552658 14.2092 0.646393L15.5022 1.93939V1.94039ZM13.7522 4.39639L11.7522 2.39639L4.9392 9.21039C4.88417 9.26542 4.84273 9.33253 4.8182 9.40639L4.0132 11.8204C3.9986 11.8644 3.99653 11.9116 4.00722 11.9567C4.0179 12.0018 4.04093 12.0431 4.07371 12.0759C4.1065 12.1087 4.14776 12.1317 4.19288 12.1424C4.23799 12.1531 4.2852 12.151 4.3292 12.1364L6.7432 11.3314C6.81697 11.3072 6.88407 11.2661 6.9392 11.2114L13.7522 4.39739V4.39639Z" fill="#007BFF" />
                                                                <path fillRule="evenodd" clipRule="evenodd" d="M1 13.5C1 13.8978 1.15804 14.2794 1.43934 14.5607C1.72064 14.842 2.10218 15 2.5 15H13.5C13.8978 15 14.2794 14.842 14.5607 14.5607C14.842 14.2794 15 13.8978 15 13.5V7.5C15 7.36739 14.9473 7.24021 14.8536 7.14645C14.7598 7.05268 14.6326 7 14.5 7C14.3674 7 14.2402 7.05268 14.1464 7.14645C14.0527 7.24021 14 7.36739 14 7.5V13.5C14 13.6326 13.9473 13.7598 13.8536 13.8536C13.7598 13.9473 13.6326 14 13.5 14H2.5C2.36739 14 2.24021 13.9473 2.14645 13.8536C2.05268 13.7598 2 13.6326 2 13.5V2.5C2 2.36739 2.05268 2.24021 2.14645 2.14645C2.24021 2.05268 2.36739 2 2.5 2H9C9.13261 2 9.25979 1.94732 9.35355 1.85355C9.44732 1.75979 9.5 1.63261 9.5 1.5C9.5 1.36739 9.44732 1.24021 9.35355 1.14645C9.25979 1.05268 9.13261 1 9 1H2.5C2.10218 1 1.72064 1.15804 1.43934 1.43934C1.15804 1.72064 1 2.10218 1 2.5V13.5Z" fill="#007BFF" />
                                                            </svg>
                                                            <svg onClick={() => deleteProducts(item._id)} xmlns="http://www.w3.org/2000/svg" width="35px" height="16" viewBox="0 0 16 16" fill="none">
                                                                <path d="M5.5 5.5C5.63261 5.5 5.75979 5.55268 5.85355 5.64645C5.94732 5.74021 6 5.86739 6 6V12C6 12.1326 5.94732 12.2598 5.85355 12.3536C5.75979 12.4473 5.63261 12.5 5.5 12.5C5.36739 12.5 5.24021 12.4473 5.14645 12.3536C5.05268 12.2598 5 12.1326 5 12V6C5 5.86739 5.05268 5.74021 5.14645 5.64645C5.24021 5.55268 5.36739 5.5 5.5 5.5ZM8 5.5C8.13261 5.5 8.25979 5.55268 8.35355 5.64645C8.44732 5.74021 8.5 5.86739 8.5 6V12C8.5 12.1326 8.44732 12.2598 8.35355 12.3536C8.25979 12.4473 8.13261 12.5 8 12.5C7.86739 12.5 7.74021 12.4473 7.64645 12.3536C7.55268 12.2598 7.5 12.1326 7.5 12V6C7.5 5.86739 7.55268 5.74021 7.64645 5.64645C7.74021 5.55268 7.86739 5.5 8 5.5ZM11 6C11 5.86739 10.9473 5.74021 10.8536 5.64645C10.7598 5.55268 10.6326 5.5 10.5 5.5C10.3674 5.5 10.2402 5.55268 10.1464 5.64645C10.0527 5.74021 10 5.86739 10 6V12C10 12.1326 10.0527 12.2598 10.1464 12.3536C10.2402 12.4473 10.3674 12.5 10.5 12.5C10.6326 12.5 10.7598 12.4473 10.8536 12.3536C10.9473 12.2598 11 12.1326 11 12V6Z" fill="#DC3545" />
                                                                <path fillRule="evenodd" clipRule="evenodd" d="M14.5 3C14.5 3.26522 14.3946 3.51957 14.2071 3.70711C14.0196 3.89464 13.7652 4 13.5 4H13V13C13 13.5304 12.7893 14.0391 12.4142 14.4142C12.0391 14.7893 11.5304 15 11 15H5C4.46957 15 3.96086 14.7893 3.58579 14.4142C3.21071 14.0391 3 13.5304 3 13V4H2.5C2.23478 4 1.98043 3.89464 1.79289 3.70711C1.60536 3.51957 1.5 3.26522 1.5 3V2C1.5 1.73478 1.60536 1.48043 1.79289 1.29289C1.98043 1.10536 2.23478 1 2.5 1H6C6 0.734784 6.10536 0.48043 6.29289 0.292893C6.48043 0.105357 6.73478 0 7 0L9 0C9.26522 0 9.51957 0.105357 9.70711 0.292893C9.89464 0.48043 10 0.734784 10 1H13.5C13.7652 1 14.0196 1.10536 14.2071 1.29289C14.3946 1.48043 14.5 1.73478 14.5 2V3ZM4.118 4L4 4.059V13C4 13.2652 4.10536 13.5196 4.29289 13.7071C4.48043 13.8946 4.73478 14 5 14H11C11.2652 14 11.5196 13.8946 11.7071 13.7071C11.8946 13.5196 12 13.2652 12 13V4.059L11.882 4H4.118ZM2.5 3V2H13.5V3H2.5Z" fill="#DC3545" />
                                                            </svg>
                                                        </>
                                                    )}
                                                    {heading == 'Price' && (
                                                        <>
                                                            <td className='fw-bold'>${item.price}</td>
                                                        </>
                                                    )}
                                                    {heading === 'Colors' || heading === 'Sizes' ? (
                                                        <>
                                                            {item[heading.toLowerCase()] ? item[heading.toLowerCase()].join(', ') : ''}
                                                        </>
                                                    ) : (
                                                        heading != 'Colors' && heading != 'Sizes' && heading != 'Price' && (
                                                            <>
                                                                {item[heading.toLowerCase()]}
                                                            </>
                                                        ))}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </>
                            )}
                            {name === 'dashboard' && (
                                <>
                                    {data?.map((item) => (
                                        <tr key={item._id}>
                                            {headings.map((heading) => (
                                                <td key={heading}>
                                                    {heading === 'Title' && (
                                                        <img src={`http://localhost:4000/${item.thumbnail}`} style={{ width: '30px', height: '30px' }} />
                                                    )}
                                                    {heading === 'Price' ? (
                                                        <td>${item.price}</td>
                                                    ) : (
                                                        item[heading.toLowerCase()]
                                                    )}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </>
                            )}
                            {name === 'order' && (
                                <>
                                    {data?.map((item) => (
                                        <tr key={item._id}>
                                            {headings.map((heading) => (
                                                <td key={heading}>
                                                    {heading === 'Title' && (
                                                        <img src={`http://localhost:4000/${item.thumbnail}`} style={{ width: '30px', height: '30px' }} />
                                                    )}
                                                    {item[heading.toLowerCase()]}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </>
                            )}
                            {name === 'orderCart' && (
                                <>
                                    {data?.map((it) => (
                                        <tr key={it._id}>
                                            {headings.map((heading) => (
                                                <td key={heading}>
                                                    {heading === 'Title' && (
                                                        <img src={`http://localhost:4000/${it.thumbnail}`} style={{ width: '30px', height: '30px' }} />
                                                    )}
                                                    {it[heading.toLowerCase()]}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </>
                            )}

                            {name === 'second' && (
                                <>
                                    {data?.map((item, index) => (
                                        <tr key={item.id}>
                                            <td>{moment(item.date).format('ll')}</td>
                                            <td className='fw-bold small'>{item.orderId}</td>
                                            <td>{item.username}</td>
                                            <td>
                                                {item.products.map((productItem, productIndex) => (
                                                    <tr className='custom-tr-wrapper' key={productIndex}>
                                                        {productIndex === 0 && (
                                                            <td>{item.products.length}</td>
                                                        )}
                                                    </tr>
                                                ))}
                                            </td>
                                            <td className='fw-bold'>${item.totalAmount}</td>
                                            <td><div className=' text-light bg-success small' style={{ width: '55px', height: '25px' }}>
                                                <div className='ms-2'>{item.status}</div></div></td>
                                            <td ><svg onClick={() => {
                                                handleDetailsClick(item.orderId, index);
                                            }} xmlns="http://www.w3.org/2000/svg" width="44" height="16" viewBox="0 0 16 16" fill="none">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M6.5 4C6.5 3.86739 6.55268 3.74021 6.64645 3.64645C6.74021 3.55268 6.86739 3.5 7 3.5H12C12.1326 3.5 12.2598 3.55268 12.3536 3.64645C12.4473 3.74021 12.5 3.86739 12.5 4V9C12.5 9.13261 12.4473 9.25979 12.3536 9.35355C12.2598 9.44732 12.1326 9.5 12 9.5C11.8674 9.5 11.7402 9.44732 11.6464 9.35355C11.5527 9.25979 11.5 9.13261 11.5 9V4.5H7C6.86739 4.5 6.74021 4.44732 6.64645 4.35355C6.55268 4.25979 6.5 4.13261 6.5 4Z" fill="black" />
                                                <path fillRule="evenodd" clipRule="evenodd" d="M12.3537 3.64592C12.4002 3.69236 12.4372 3.74754 12.4624 3.80828C12.4876 3.86903 12.5005 3.93415 12.5005 3.99992C12.5005 4.06568 12.4876 4.13081 12.4624 4.19155C12.4372 4.2523 12.4002 4.30747 12.3537 4.35392L3.35366 13.3539C3.25977 13.4478 3.13243 13.5005 2.99966 13.5005C2.86688 13.5005 2.73954 13.4478 2.64565 13.3539C2.55177 13.26 2.49902 13.1327 2.49902 12.9999C2.49902 12.8671 2.55177 12.7398 2.64565 12.6459L11.6457 3.64592C11.6921 3.59935 11.7473 3.56241 11.808 3.5372C11.8688 3.512 11.9339 3.49902 11.9997 3.49902C12.0654 3.49902 12.1305 3.512 12.1913 3.5372C12.252 3.56241 12.3072 3.59935 12.3537 3.64592Z" fill="black" />
                                            </svg>
                                                {item.deliveredStatus === false && item.status == 'paid' && (
                                                    <Button className='bg-white text-primary' onClick={() => handleMarkAsDelivered(item.orderId)}>Mark as delivered</Button>
                                                )}

                                            </td>
                                        </tr>
                                    ))}
                                </>
                            )}

                            {name === 'third' && (
                                <>
                                    {data?.map((item, rowIndex) => (
                                        <tr key={rowIndex}>
                                            <td>
                                                {item['rowIndex']}
                                            </td>
                                            <td>
                                                {
                                                    <div className='d-flex'>
                                                        {item['missingFields']?.length > 0 && (
                                                            <p className='ms-1'>
                                                                {item['missingFields'].join(', ')}
                                                            </p>
                                                        )}
                                                    </div>
                                                }
                                            </td>
                                        </tr>
                                    ))}
                                </>
                            )}
                        </tbody>
                    </>
                    {showTrashModal && <Trash state={true} onClose={() => setShowTrashModal(false)} texts='Remove Product' svgs={<svg xmlns="http://www.w3.org/2000/svg" width="73" height="72" viewBox="0 0 73 72" fill="none">
                        <g clipPath="url(#clip0_1295_22806)">
                            <path fillRule="evenodd" clipRule="evenodd" d="M36.2211 9.07252C36.1182 9.13422 36.0342 9.22293 35.9781 9.32902L5.12162 61.8305C5.04475 61.9538 5.00326 62.0958 5.00167 62.241C5.00008 62.3862 5.03847 62.5291 5.11262 62.654C5.18462 62.789 5.27912 62.879 5.35562 62.924C5.42312 62.969 5.50862 63.0005 5.65262 63.0005H67.3611C67.4654 63.0043 67.5686 62.9777 67.6581 62.924C67.7621 62.8564 67.8473 62.7635 67.9056 62.654C67.9791 62.5287 68.0167 62.3856 68.0143 62.2404C68.012 62.0951 67.9697 61.9533 67.8921 61.8305L37.0401 9.32902C36.9841 9.22293 36.9 9.13422 36.7971 9.07252C36.7089 9.02415 36.6097 8.99935 36.5091 9.00052C36.4085 8.99935 36.3093 9.02415 36.2211 9.07252ZM40.9191 7.04752C40.4737 6.27155 39.8314 5.62686 39.0571 5.17854C38.2827 4.73022 37.4039 4.49414 36.5091 4.49414C35.6144 4.49414 34.7355 4.73022 33.9612 5.17854C33.1869 5.62686 32.5446 6.27155 32.0991 7.04752L1.24262 59.549C-0.813877 63.05 1.65212 67.5005 5.65262 67.5005H67.3611C71.3616 67.5005 73.8321 63.0455 71.7711 59.549L40.9191 7.04752Z" fill="#FFC107" />
                            <path d="M32.0088 54C32.0088 53.4091 32.1252 52.8239 32.3513 52.278C32.5775 51.732 32.9089 51.2359 33.3268 50.8181C33.7447 50.4002 34.2407 50.0687 34.7867 49.8426C35.3327 49.6164 35.9178 49.5 36.5088 49.5C37.0997 49.5 37.6849 49.6164 38.2309 49.8426C38.7768 50.0687 39.2729 50.4002 39.6908 50.8181C40.1086 51.2359 40.4401 51.732 40.6662 52.278C40.8924 52.8239 41.0088 53.4091 41.0088 54C41.0088 55.1935 40.5347 56.3381 39.6908 57.182C38.8469 58.0259 37.7023 58.5 36.5088 58.5C35.3153 58.5 34.1707 58.0259 33.3268 57.182C32.4829 56.3381 32.0088 55.1935 32.0088 54ZM32.4498 26.9775C32.3899 26.4098 32.45 25.8359 32.6262 25.2929C32.8024 24.7499 33.0908 24.25 33.4727 23.8257C33.8546 23.4014 34.3215 23.0621 34.8429 22.8298C35.3644 22.5976 35.9289 22.4775 36.4998 22.4775C37.0707 22.4775 37.6352 22.5976 38.1566 22.8298C38.6781 23.0621 39.145 23.4014 39.5269 23.8257C39.9087 24.25 40.1972 24.7499 40.3734 25.2929C40.5496 25.8359 40.6097 26.4098 40.5498 26.9775L38.9748 42.759C38.9219 43.379 38.6382 43.9565 38.1799 44.3774C37.7216 44.7983 37.122 45.0318 36.4998 45.0318C35.8776 45.0318 35.278 44.7983 34.8197 44.3774C34.3614 43.9565 34.0777 43.379 34.0248 42.759L32.4498 26.9775Z" fill="#FFC107" />
                        </g>
                        <defs>
                            <clipPath id="clip0_1295_22806">
                                <rect width="72" height="72" fill="white" transform="translate(0.5)" />
                            </clipPath>
                        </defs>
                    </svg>} Description='Are you sure you want to Delete the Item!' onContentChange={() => deleteProductHandler(selectedProductId)} />}

                    {Delivered && <Trash state={true} onClose={() => setDelivered(false)} texts='Mark as Delivered' status='Delivered' orderId={id} svgs={<svg xmlns="http://www.w3.org/2000/svg" width="73" height="72" viewBox="0 0 73 72" fill="none">
                        <g clipPath="url(#clip0_1295_22806)">
                            <path fillRule="evenodd" clipRule="evenodd" d="M36.2211 9.07252C36.1182 9.13422 36.0342 9.22293 35.9781 9.32902L5.12162 61.8305C5.04475 61.9538 5.00326 62.0958 5.00167 62.241C5.00008 62.3862 5.03847 62.5291 5.11262 62.654C5.18462 62.789 5.27912 62.879 5.35562 62.924C5.42312 62.969 5.50862 63.0005 5.65262 63.0005H67.3611C67.4654 63.0043 67.5686 62.9777 67.6581 62.924C67.7621 62.8564 67.8473 62.7635 67.9056 62.654C67.9791 62.5287 68.0167 62.3856 68.0143 62.2404C68.012 62.0951 67.9697 61.9533 67.8921 61.8305L37.0401 9.32902C36.9841 9.22293 36.9 9.13422 36.7971 9.07252C36.7089 9.02415 36.6097 8.99935 36.5091 9.00052C36.4085 8.99935 36.3093 9.02415 36.2211 9.07252ZM40.9191 7.04752C40.4737 6.27155 39.8314 5.62686 39.0571 5.17854C38.2827 4.73022 37.4039 4.49414 36.5091 4.49414C35.6144 4.49414 34.7355 4.73022 33.9612 5.17854C33.1869 5.62686 32.5446 6.27155 32.0991 7.04752L1.24262 59.549C-0.813877 63.05 1.65212 67.5005 5.65262 67.5005H67.3611C71.3616 67.5005 73.8321 63.0455 71.7711 59.549L40.9191 7.04752Z" fill="#FFC107" />
                            <path d="M32.0088 54C32.0088 53.4091 32.1252 52.8239 32.3513 52.278C32.5775 51.732 32.9089 51.2359 33.3268 50.8181C33.7447 50.4002 34.2407 50.0687 34.7867 49.8426C35.3327 49.6164 35.9178 49.5 36.5088 49.5C37.0997 49.5 37.6849 49.6164 38.2309 49.8426C38.7768 50.0687 39.2729 50.4002 39.6908 50.8181C40.1086 51.2359 40.4401 51.732 40.6662 52.278C40.8924 52.8239 41.0088 53.4091 41.0088 54C41.0088 55.1935 40.5347 56.3381 39.6908 57.182C38.8469 58.0259 37.7023 58.5 36.5088 58.5C35.3153 58.5 34.1707 58.0259 33.3268 57.182C32.4829 56.3381 32.0088 55.1935 32.0088 54ZM32.4498 26.9775C32.3899 26.4098 32.45 25.8359 32.6262 25.2929C32.8024 24.7499 33.0908 24.25 33.4727 23.8257C33.8546 23.4014 34.3215 23.0621 34.8429 22.8298C35.3644 22.5976 35.9289 22.4775 36.4998 22.4775C37.0707 22.4775 37.6352 22.5976 38.1566 22.8298C38.6781 23.0621 39.145 23.4014 39.5269 23.8257C39.9087 24.25 40.1972 24.7499 40.3734 25.2929C40.5496 25.8359 40.6097 26.4098 40.5498 26.9775L38.9748 42.759C38.9219 43.379 38.6382 43.9565 38.1799 44.3774C37.7216 44.7983 37.122 45.0318 36.4998 45.0318C35.8776 45.0318 35.278 44.7983 34.8197 44.3774C34.3614 43.9565 34.0777 43.379 34.0248 42.759L32.4498 26.9775Z" fill="#FFC107" />
                        </g>
                        <defs>
                            <clipPath id="clip0_1295_22806">
                                <rect width="72" height="72" fill="white" transform="translate(0.5)" />
                            </clipPath>
                        </defs>
                    </svg>} Description='Are you sure you want to mark as delivered this order?' onContentChange={() => { setDelivered(false); setConfirm(true); }} />}

                    {Confirm && <Trash state={true} onClose={() => { setDelivered(false); setConfirm(false); }} texts='Successfully' svgs={<svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 72 72" fill="none">
                        <path d="M31.5749 48.6402L51.7902 28.4249L49.1768 25.8577L31.5749 43.4884L22.6904 34.6038L20.1519 37.171L31.5749 48.6402ZM36.0049 64.4999C32.0939 64.4999 28.409 63.7518 24.9502 62.2558C21.4914 60.7598 18.4667 58.7171 15.876 56.1276C13.2853 53.5381 11.2416 50.5146 9.74498 47.0574C8.24833 43.6001 7.5 39.9159 7.5 36.0049C7.5 32.0631 8.248 28.358 9.744 24.8896C11.24 21.4212 13.2827 18.4042 15.8723 15.8385C18.4618 13.2728 21.4852 11.2416 24.9424 9.74498C28.3997 8.24833 32.0839 7.5 35.9949 7.5C39.9367 7.5 43.6418 8.248 47.1102 9.744C50.5787 11.24 53.5957 13.2702 56.1614 15.8348C58.7271 18.3993 60.7582 21.415 62.2549 24.8819C63.7515 28.3488 64.4999 32.0531 64.4999 35.9949C64.4999 39.906 63.7519 43.5909 62.2559 47.0497C60.7599 50.5085 58.7296 53.5332 56.1651 56.1238C53.6006 58.7145 50.5848 60.7582 47.1179 62.2549C43.6511 63.7515 39.9468 64.4999 36.0049 64.4999ZM35.9999 61.096C42.9845 61.096 48.9134 58.6518 53.7865 53.7634C58.6595 48.8749 61.0961 42.9538 61.0961 35.9999C61.0961 29.0153 58.6595 23.0865 53.7865 18.2134C48.9134 13.3403 42.9845 10.9038 35.9999 10.9038C29.0461 10.9038 23.1249 13.3403 18.2365 18.2134C13.348 23.0865 10.9038 29.0153 10.9038 35.9999C10.9038 42.9538 13.348 48.8749 18.2365 53.7634C23.1249 58.6518 29.0461 61.096 35.9999 61.096Z" fill="#28A745" />
                    </svg>} Description='Awesome, Your order has been mark as delivered successfully.' contents={false} />}
                    {editItemId && (
                        <Edit
                            state={true}
                            name='Edit Product'
                            placeholders={placeholders}
                            prodPrice={data[editIndex].price}
                            prodRating={data[editIndex].rating}
                            prodStock={data[editIndex].stock}
                            productName={data[editIndex].title}
                            productSizes={data[editIndex].sizes}
                            productColors={data[editIndex].colors}
                            productImages={data[editIndex].images}
                            text='Save'
                            onClose={(thumbnail, title, price, stock, rating, prodImages, images, deleted, selectedSizes, selectedColors) => {
                                editProductHandler(thumbnail, title, price, stock, rating, prodImages, images, deleted, selectedSizes, selectedColors, selectedProductId);
                            }}
                            onClose1={() => {
                                setEditItemId(null);
                            }}
                        />
                    )}
                    {Details && orderDetail && (
                        <Edit
                            state={true}
                            placeholders={placeholders}
                            name='Order Detail'
                            orderDetail={orderDetail}
                            headings={orderheadings}
                            onClose={() => {
                                setDetails(false);
                                setIndex('');
                            }}
                            index={orderIndex}
                        />
                    )}
                </Table>
            )}
        </>
    );
};

export default Tables;






