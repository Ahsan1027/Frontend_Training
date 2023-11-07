import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Image } from 'react-bootstrap';
import { removeFromCart } from '../../redux/Slices/user-cart-slice';
import { useDispatch } from 'react-redux';
import { updateItemQuantity } from '../../redux/Slices/user-cart-slice';
import Button from '../button';
import Trash from '../trash';
import ShoppingWrapper from './style';

const ShoppingCart = ({ images, title, price, quantity, click, colors, sizes, name = null, stock, onClose }) => {
    const dispatch = useDispatch();
    const [showTrashModal, setShowTrashModal] = useState(false);
    const [currentquantity, setQuantity] = useState(quantity);

    if (currentquantity > stock) {
        onClose(true);
    }

    const handleIncrement = () => {
        const newQuantity = currentquantity + 1;
        if (newQuantity <= stock) {
            setQuantity(newQuantity);
        } else {
            alert('Not enough Stock');
        }
    };

    const handleDecrement = () => {
        if (currentquantity > 0) {
            setQuantity(currentquantity - 1);
            onClose(false);
        }
    };

    useEffect(() => {
        dispatch(updateItemQuantity({ click, currentquantity }));
    }, [currentquantity]);

    const deleteCartHandler = async () => {
        try {
            await dispatch(removeFromCart(click));
        } catch (error) {
            console.error('\n\n Error deleting product:', error);
        } finally {
            setShowTrashModal(false);
        }
    };

    return (
        <ShoppingWrapper>
            <Container>
                <Row >
                    <Col lg={12} className=' div5-size border mt-5 back '>
                        <div className='d-flex'>
                            <div className=' mt-5'></div>
                            <div className='border ms-3 div4-size mt-2' >
                                <Image src={`http://localhost:4000/${images}`} style={{ height: '100px' }} />
                            </div>
                            <div className='d-flex flex-column containerAdjust ms-3 justify-content-between'>
                                <div className='d-flex w-25'>
                                <div className='ms-3 div2-size mt-2'>{title}</div>
                                <div className='ms-3 div2-size mt-2'>{colors}</div>
                                <div className='ms-3 div2-size mt-2'>{sizes}</div>
                                </div>
                                <Button onClick={() => setShowTrashModal(true)} className=' deleteAdjust' ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M5.5 5.5C5.63261 5.5 5.75979 5.55268 5.85355 5.64645C5.94732 5.74021 6 5.86739 6 6V12C6 12.1326 5.94732 12.2598 5.85355 12.3536C5.75979 12.4473 5.63261 12.5 5.5 12.5C5.36739 12.5 5.24021 12.4473 5.14645 12.3536C5.05268 12.2598 5 12.1326 5 12V6C5 5.86739 5.05268 5.74021 5.14645 5.64645C5.24021 5.55268 5.36739 5.5 5.5 5.5ZM8 5.5C8.13261 5.5 8.25979 5.55268 8.35355 5.64645C8.44732 5.74021 8.5 5.86739 8.5 6V12C8.5 12.1326 8.44732 12.2598 8.35355 12.3536C8.25979 12.4473 8.13261 12.5 8 12.5C7.86739 12.5 7.74021 12.4473 7.64645 12.3536C7.55268 12.2598 7.5 12.1326 7.5 12V6C7.5 5.86739 7.55268 5.74021 7.64645 5.64645C7.74021 5.55268 7.86739 5.5 8 5.5ZM11 6C11 5.86739 10.9473 5.74021 10.8536 5.64645C10.7598 5.55268 10.6326 5.5 10.5 5.5C10.3674 5.5 10.2402 5.55268 10.1464 5.64645C10.0527 5.74021 10 5.86739 10 6V12C10 12.1326 10.0527 12.2598 10.1464 12.3536C10.2402 12.4473 10.3674 12.5 10.5 12.5C10.6326 12.5 10.7598 12.4473 10.8536 12.3536C10.9473 12.2598 11 12.1326 11 12V6Z" fill="#DC3545" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M14.5 3C14.5 3.26522 14.3946 3.51957 14.2071 3.70711C14.0196 3.89464 13.7652 4 13.5 4H13V13C13 13.5304 12.7893 14.0391 12.4142 14.4142C12.0391 14.7893 11.5304 15 11 15H5C4.46957 15 3.96086 14.7893 3.58579 14.4142C3.21071 14.0391 3 13.5304 3 13V4H2.5C2.23478 4 1.98043 3.89464 1.79289 3.70711C1.60536 3.51957 1.5 3.26522 1.5 3V2C1.5 1.73478 1.60536 1.48043 1.79289 1.29289C1.98043 1.10536 2.23478 1 2.5 1H6C6 0.734784 6.10536 0.48043 6.29289 0.292893C6.48043 0.105357 6.73478 0 7 0L9 0C9.26522 0 9.51957 0.105357 9.70711 0.292893C9.89464 0.48043 10 0.734784 10 1H13.5C13.7652 1 14.0196 1.10536 14.2071 1.29289C14.3946 1.48043 14.5 1.73478 14.5 2V3ZM4.118 4L4 4.059V13C4 13.2652 4.10536 13.5196 4.29289 13.7071C4.48043 13.8946 4.73478 14 5 14H11C11.2652 14 11.5196 13.8946 11.7071 13.7071C11.8946 13.5196 12 13.2652 12 13V4.059L11.882 4H4.118ZM2.5 3V2H13.5V3H2.5Z" fill="#DC3545" />
                                </svg></Button>
                                <div className='d-flex div2-size ms-3 mt-3'>
                                    <div>Price: </div>
                                    <div className=' fw-bold ms-1'> {price}</div>
                                    {name === 'OrderSummary' && (
                                        <>
                                            <div className=' d-flex flex-column QuantityAdjust '>
                                                <div className=''>Quantity:</div>
                                                <div className='d-flex mt-1'>
                                                    <Button onClick={handleDecrement} className='btn-color text-dark'>-</Button>
                                                    <div className='width border'>{currentquantity}
                                                    </div>
                                                    <Button onClick={handleIncrement} className='btn-color text-dark'>+</Button>
                                                </div>
                                            </div>
                                        </>
                                    )}

                                    {name === 'Checkout' && (
                                        <>
                                            <div className='ms-5'>Qty: 04 </div>
                                        </>
                                    )}

                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
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
            </svg>} Description='Are you sure you want to Delete the Item!' onContentChange={() => deleteCartHandler()} />}
        </ShoppingWrapper>
    );
};

export default ShoppingCart;
