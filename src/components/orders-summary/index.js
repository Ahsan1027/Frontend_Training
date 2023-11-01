import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Edit from '../drawer';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import Trash from '../trash';
import Button from '../button';
import { addOrder } from '../../redux/Slices/order-slice';
import { addNotifications } from '../../redux/Slices/notification-slice';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../../redux/Slices/user-cart-slice';
import SummaryWrapper from './style';

const OrderSummary = ({ text1 = null, text2 = null, text3 = null, text4 = null, name = null, Active = false, show = false }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const totalWithoutTax = useSelector((state) => state.cart.totalWithoutTax);
    const email = useSelector((state) => state.login.email);
    const totalWithTax = useSelector((state) => state.cart.totalWithTax);
    const productsinCart = useSelector((state) => state.cart.items);
    const username = useSelector((state) => state.login.username);
    let { token } = useSelector((state) => state.login);
    const [Payment, setPayment] = useState(false);
    const [PayNow, setPayNow] = useState(false);
    const [Img, setImg] = useState(false);
    const [Option, setOption] = useState(false);
    const [cardNum, setCardNum] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [title, setTitle] = useState('');
    console.log('productsInCart', productsinCart);

    const placeholders = ['Card number', 'MM/YY', 'CVC', 'Enter Name'];

    const handleCheckout = () => {
        if (productsinCart.length > 0) {
            navigate('/checkout-page');
        } else if (productsinCart.length === 0) {
            alert('Your Cart is Empty');
        }
    };

    const handleShopping = () => {
        navigate('/');
    };

    const handleOrders = async () => {
        const status = 'Paid';
        const orderId = uuidv4();
        setPayNow(true);
        await dispatch(addOrder({ orderId, username, products: productsinCart, email, totalAmount: totalWithTax + 100, status, token })) ;
        dispatch(addNotifications(orderId));
        await dispatch(clearCart());
    };

    const formatCardNumber = (cardNum) => {
        const visibleDigits = cardNum.slice(-4);
        const hiddenDigits = '*'.repeat(cardNum.length - 4);
        const formattedCardNum = hiddenDigits.replace(/(.{4})/g, '$1 ').trim();
        return formattedCardNum + ' ' + visibleDigits;
    };

    return (
        <SummaryWrapper>
            <Container>
                <Row >
                    <Col lg={12} >
                        <h5 className=' mt-2'>Order Summary</h5>
                        {name === 'OrderSummary' && (
                            <>
                                <div className='back'>
                                    <div className='border mt-3 '>
                                        <div className='d-flex mt-2 ms-2'>
                                            {text1}
                                            <div className='margin-end fw-bold me-2'>Rs {totalWithoutTax}</div>
                                        </div>
                                        <div className='d-flex mt-2 ms-2'>
                                            {text2}
                                            <div className='margin-end fw-bold me-2'>5%</div>
                                        </div>
                                        <div className='d-flex mt-2 ms-2'>
                                            {text3}
                                            <div className='margin-end fw-bold me-2'>Rs {totalWithTax}</div>
                                        </div>
                                        <Button onClick={handleCheckout} className={`w-100 my-3 d-flex justify-content-center ${show ? 'disabled' : ''}`} disabled={show}>Proceed to Checkout</Button>
                                    </div>
                                </div>
                            </>
                        )}

                        {name === 'Checkout' && (
                            <>
                                <div className='back'>
                                    <div className='border mt-4 '>
                                        <div className='d-flex mt-2 ms-2'>
                                            {text1}
                                            <div className='margin-end fw-bold me-2'>Rs {totalWithoutTax}</div>
                                        </div>
                                        <div className='d-flex mt-2 ms-2'>
                                            {text2}
                                            <div className='margin-end fw-bold me-2'>Rs 100</div>
                                        </div>
                                        <div className='d-flex mt-2 ms-2'>
                                            {text3}
                                            <div className='margin-end fw-bold me-2'>5%</div>
                                        </div>
                                        <div className='d-flex mt-2 ms-2'>
                                            {text4}
                                            <div className='margin-end fw-bold me-2'>Rs {totalWithTax > 0 ? totalWithTax + 100 : totalWithTax}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className='mt-5 '>
                                    <h5>Select Payment Method</h5>
                                </div>
                                {Option ? (<>   <div className='border d-flex back mt-4 payment-size1'>
                                    <div className='  ms-3 mt-4 border payment-size3' >
                                        <div className='ms-2 mt-2'> <svg xmlns="http://www.w3.org/2000/svg" width="51" height="34" viewBox="0 0 51 34" fill="none">
                                            <path d="M46.75 0H4.25C1.90279 0 0 1.90279 0 4.25V29.75C0 32.0972 1.90279 34 4.25 34H46.75C49.0972 34 51 32.0972 51 29.75V4.25C51 1.90279 49.0972 0 46.75 0Z" fill="#252525" />
                                            <path d="M19.125 27.625C24.993 27.625 29.75 22.868 29.75 17C29.75 11.132 24.993 6.375 19.125 6.375C13.257 6.375 8.5 11.132 8.5 17C8.5 22.868 13.257 27.625 19.125 27.625Z" fill="#EB001B" />
                                            <path d="M31.875 27.625C37.743 27.625 42.5 22.868 42.5 17C42.5 11.132 37.743 6.375 31.875 6.375C26.007 6.375 21.25 11.132 21.25 17C21.25 22.868 26.007 27.625 31.875 27.625Z" fill="#F79E1B" />
                                            <path fillRule="evenodd" clipRule="evenodd" d="M25.5 8.49902C28.0807 10.4375 29.75 13.5237 29.75 16.9998C29.75 20.4759 28.0807 23.5621 25.5 25.5006C22.9193 23.5621 21.25 20.4759 21.25 16.9998C21.25 13.5237 22.9193 10.4375 25.5 8.49902Z" fill="#FF5F00" />
                                        </svg> Master Card</div>
                                        <div className='d-flex justify-content-between mt-2'>
                                            <div className='ms-2 mt-1'>{formatCardNumber(cardNum)}</div>
                                        </div>
                                        <div className='d-flex ms-2 mt-2'>
                                            <div>{expiryDate}</div>
                                        </div>
                                        <div className='ms-2 mt-2'>{title}</div>
                                    </div>
                                </div>
                                    <Button onClick={() => {
                                        handleOrders();
                                    }} className='w-100 d-flex justify-content-center text-white text-dark mt-4'>Pay Now</Button></>

                                ) : (<> <div className='border back mt-4 payment-size'>
                                    <div className='  ms-4  payment-size2' >

                                        {Active ? (<Button onClick={() => setPayment(true)} className='d-flex  border border-primary btn-adjust btn btn-light '>
                                            <svg className='ms-2 plus-adjust' xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                                <path d="M10.5309 15.3544H11.5709V11.5855H15.354V10.5455H11.5709V6.64616H10.5309V10.5455H6.64567V11.5855H10.5309V15.3544ZM11.0074 19.7086C9.80119 19.7086 8.67142 19.4801 7.61814 19.0229C6.56486 18.5658 5.64242 17.9417 4.85084 17.1504C4.05923 16.3592 3.43478 15.4366 2.97747 14.3826C2.52016 13.3287 2.2915 12.1979 2.2915 10.9904C2.2915 9.78871 2.52006 8.65919 2.97717 7.60183C3.43428 6.54447 4.05846 5.62382 4.84969 4.83987C5.64094 4.0559 6.56354 3.43527 7.6175 2.97796C8.67145 2.52065 9.8022 2.29199 11.0097 2.29199C12.2114 2.29199 13.3409 2.52055 14.3983 2.97766C15.4556 3.43477 16.3763 4.05512 17.1602 4.83872C17.9442 5.62233 18.5649 6.54381 19.0222 7.60314C19.4795 8.66245 19.7081 9.7923 19.7081 10.9927C19.7081 12.1989 19.4796 13.3287 19.0225 14.382C18.5653 15.4353 17.945 16.3563 17.1614 17.1451C16.3778 17.9338 15.4563 18.5583 14.397 19.0184C13.3377 19.4785 12.2078 19.7086 11.0074 19.7086ZM11.0113 18.6686C13.1378 18.6686 14.9456 17.9217 16.4346 16.428C17.9236 14.9343 18.6681 13.1213 18.6681 10.9888C18.6681 8.8623 17.925 7.05453 16.4389 5.56552C14.9527 4.07654 13.1397 3.33204 10.9998 3.33204C8.87503 3.33204 7.06579 4.07511 5.57209 5.56124C4.0784 7.04737 3.33155 8.86039 3.33155 11.0003C3.33155 13.1251 4.0784 14.9343 5.57209 16.428C7.06579 17.9217 8.87885 18.6686 11.0113 18.6686Z" fill="#868E96" />
                                            </svg>
                                            <div className=' ms-1 Toggle-color1  btn btn-none'>Add New</div>
                                        </Button>) :
                                            (<Button className='d-flex  border btn-adjust btn btn-light '>
                                                <svg className='ms-2 plus-adjust' xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                                    <path d="M10.5309 15.3544H11.5709V11.5855H15.354V10.5455H11.5709V6.64616H10.5309V10.5455H6.64567V11.5855H10.5309V15.3544ZM11.0074 19.7086C9.80119 19.7086 8.67142 19.4801 7.61814 19.0229C6.56486 18.5658 5.64242 17.9417 4.85084 17.1504C4.05923 16.3592 3.43478 15.4366 2.97747 14.3826C2.52016 13.3287 2.2915 12.1979 2.2915 10.9904C2.2915 9.78871 2.52006 8.65919 2.97717 7.60183C3.43428 6.54447 4.05846 5.62382 4.84969 4.83987C5.64094 4.0559 6.56354 3.43527 7.6175 2.97796C8.67145 2.52065 9.8022 2.29199 11.0097 2.29199C12.2114 2.29199 13.3409 2.52055 14.3983 2.97766C15.4556 3.43477 16.3763 4.05512 17.1602 4.83872C17.9442 5.62233 18.5649 6.54381 19.0222 7.60314C19.4795 8.66245 19.7081 9.7923 19.7081 10.9927C19.7081 12.1989 19.4796 13.3287 19.0225 14.382C18.5653 15.4353 17.945 16.3563 17.1614 17.1451C16.3778 17.9338 15.4563 18.5583 14.397 19.0184C13.3377 19.4785 12.2078 19.7086 11.0074 19.7086ZM11.0113 18.6686C13.1378 18.6686 14.9456 17.9217 16.4346 16.428C17.9236 14.9343 18.6681 13.1213 18.6681 10.9888C18.6681 8.8623 17.925 7.05453 16.4389 5.56552C14.9527 4.07654 13.1397 3.33204 10.9998 3.33204C8.87503 3.33204 7.06579 4.07511 5.57209 5.56124C4.0784 7.04737 3.33155 8.86039 3.33155 11.0003C3.33155 13.1251 4.0784 14.9343 5.57209 16.428C7.06579 17.9217 8.87885 18.6686 11.0113 18.6686Z" fill="#868E96" />
                                                </svg>
                                                <div className=' ms-1 Toggle-color btn btn-light'>Add New</div>
                                            </Button>)}

                                    </div>
                                </div>
                                    <Button className='w-100 d-flex justify-content-center btn-color text-dark mt-4  '>Place Order</Button>
                                </>
                                )}
                            </>
                        )}


                    </Col>
                </Row>
            </Container>
            {Payment && (
                <Edit
                    state={true}
                    placeholders={placeholders}
                    name='Add Payment Method'
                    text='Save'
                    onClose={(value, cardNum, expiryDate, title) => {
                        setPayment(false);
                        setOption(value);
                        setCardNum(cardNum);
                        setExpiryDate(expiryDate);
                        setTitle(title);
                    }}
                    onClose1={() => {
                        setPayment(false);
                    }}
                />
            )}
            {Img && (
                <Edit
                    state={true}
                    name='Payment Method'
                    placeholders={placeholders}
                    text='Save'
                    onClose={() => {
                        setImg(false);
                    }}
                />
            )}

            {PayNow && (
                <Trash
                    state={true} onClose={() => { handleShopping(); setPayNow(false); }} texts='Successfully' svgs={<svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 72 72" fill="none">
                        <path d="M31.5749 48.6402L51.7902 28.4249L49.1768 25.8577L31.5749 43.4884L22.6904 34.6038L20.1519 37.171L31.5749 48.6402ZM36.0049 64.4999C32.0939 64.4999 28.409 63.7518 24.9502 62.2558C21.4914 60.7598 18.4667 58.7171 15.876 56.1276C13.2853 53.5381 11.2416 50.5146 9.74498 47.0574C8.24833 43.6001 7.5 39.9159 7.5 36.0049C7.5 32.0631 8.248 28.358 9.744 24.8896C11.24 21.4212 13.2827 18.4042 15.8723 15.8385C18.4618 13.2728 21.4852 11.2416 24.9424 9.74498C28.3997 8.24833 32.0839 7.5 35.9949 7.5C39.9367 7.5 43.6418 8.248 47.1102 9.744C50.5787 11.24 53.5957 13.2702 56.1614 15.8348C58.7271 18.3993 60.7582 21.415 62.2549 24.8819C63.7515 28.3488 64.4999 32.0531 64.4999 35.9949C64.4999 39.906 63.7519 43.5909 62.2559 47.0497C60.7599 50.5085 58.7296 53.5332 56.1651 56.1238C53.6006 58.7145 50.5848 60.7582 47.1179 62.2549C43.6511 63.7515 39.9468 64.4999 36.0049 64.4999ZM35.9999 61.096C42.9845 61.096 48.9134 58.6518 53.7865 53.7634C58.6595 48.8749 61.0961 42.9538 61.0961 35.9999C61.0961 29.0153 58.6595 23.0865 53.7865 18.2134C48.9134 13.3403 42.9845 10.9038 35.9999 10.9038C29.0461 10.9038 23.1249 13.3403 18.2365 18.2134C13.348 23.0865 10.9038 29.0153 10.9038 35.9999C10.9038 42.9538 13.348 48.8749 18.2365 53.7634C23.1249 58.6518 29.0461 61.096 35.9999 61.096Z" fill="#28A745" />
                    </svg>} Description='Awesome, Your order has been placed successfully.' onContentChange={() => setPayNow(false)} contents={false}
                />
            )}
        </SummaryWrapper>
    );
};

export default OrderSummary;