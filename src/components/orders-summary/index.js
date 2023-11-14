import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Edit from '../drawer';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import Trash from '../trash';
import Button from '../button';
import { addOrder } from '../../redux/Slices/order-slice';
import { getAddress } from '../../redux/Slices/user-cart-slice';
import { getPayment } from '../../redux/Slices/payment-slice';
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
    let { cardId, cards } = useSelector((state) => state.payment);
    const username = useSelector((state) => state.login.username);
    let { token, id, customerId } = useSelector((state) => state.login);
    const [Payment, setPayment] = useState(false);
    const [PayNow, setPayNow] = useState(false);
    const [Img, setImg] = useState(false);
    const [Option, setOption] = useState(false);
    const [selectedCardIndexes, setSelectedCardIndexes] = useState(0);

    useEffect(() => {
        dispatch(getAddress({ id, token }));
        dispatch(getPayment({ customerId }));
    }, []);

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
        const orderId = uuidv4();
        setPayNow(true);
        cardId = cardId[selectedCardIndexes].id;
        await dispatch(addOrder({ orderId, username, products: productsinCart, email, totalAmount: totalWithTax + 100, cardId, customerId, token }));
        await dispatch(clearCart());
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
                                            <div className='margin-end fw-bold me-2'>${totalWithoutTax}</div>
                                        </div>
                                        <div className='d-flex mt-2 ms-2'>
                                            {text2}
                                            <div className='margin-end fw-bold me-2'>5%</div>
                                        </div>
                                        <div className='d-flex mt-2 ms-2'>
                                            {text3}
                                            <div className='margin-end fw-bold me-2'>${totalWithTax}</div>
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
                                            <div className='margin-end fw-bold me-2'>${totalWithoutTax}</div>
                                        </div>
                                        <div className='d-flex mt-2 ms-2'>
                                            {text2}
                                            <div className='margin-end fw-bold me-2'>$100</div>
                                        </div>
                                        <div className='d-flex mt-2 ms-2'>
                                            {text3}
                                            <div className='margin-end fw-bold me-2'>5%</div>
                                        </div>
                                        <div className='d-flex mt-2 ms-2'>
                                            {text4}
                                            <div className='margin-end fw-bold me-2'>${totalWithTax > 0 ? totalWithTax + 100 : totalWithTax}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className='mt-5 '>
                                    <h5>Select Payment Method</h5>
                                </div>
                                {Option ? (<>   <div className='border d-flex back mt-4 payment-size1'>
                                    <div className='  ms-3 mt-4 border payment-size3' >
                                        <div className='ms-2 mt-2'>
                                            {cards[selectedCardIndexes].brand == 'Visa' ? (
                                                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="33" viewBox="0 0 50 33" fill="none">
                                                    <path d="M45.3122 0.515625H4.68717C2.38599 0.515625 0.520508 2.36245 0.520508 4.64062V28.3594C0.520508 30.6376 2.38599 32.4844 4.68717 32.4844H45.3122C47.6134 32.4844 49.4788 30.6376 49.4788 28.3594V4.64062C49.4788 2.36245 47.6134 0.515625 45.3122 0.515625Z" fill="white" stroke="black" strokeOpacity="0.2" strokeWidth="0.5" />
                                                    <path d="M5.80745 12.1985C4.71757 11.6067 3.47371 11.1308 2.08301 10.8005L2.14134 10.5433H7.84338C8.61626 10.5701 9.24341 10.8003 9.44748 11.6133L10.6867 17.4623L11.0663 19.224L14.5371 10.5433H18.2847L12.714 23.2599H8.96627L5.80745 12.1985ZM21.0413 23.2734H17.4972L19.7139 10.5433H23.2578L21.0413 23.2734ZM33.8888 10.8545L33.4068 13.6034L33.0863 13.4682C32.445 13.2108 31.5985 12.9536 30.4463 12.9808C29.0471 12.9808 28.4195 13.5357 28.405 14.0775C28.405 14.6735 29.1641 15.0662 30.4037 15.6487C32.4456 16.5561 33.3927 17.6665 33.3785 19.1156C33.3498 21.7566 30.9289 23.4631 27.2102 23.4631C25.6202 23.4494 24.0888 23.1373 23.2576 22.7856L23.7535 19.928L24.2202 20.1314C25.3724 20.6058 26.1305 20.8085 27.5455 20.8085C28.5658 20.8085 29.6599 20.4154 29.6738 19.5626C29.6738 19.0073 29.2077 18.6007 27.8366 17.9777C26.4951 17.368 24.7014 16.3525 24.7305 14.5241C24.7456 12.0459 27.2102 10.3125 30.7101 10.3125C32.081 10.3125 33.1898 10.5969 33.8888 10.8545ZM38.5992 18.7636H41.5449C41.3992 18.1271 40.7281 15.0799 40.7281 15.0799L40.4804 13.983C40.3054 14.4569 39.9994 15.229 40.0141 15.2018C40.0141 15.2018 38.891 18.0322 38.5992 18.7636ZM42.9738 10.5433L45.833 23.2732H42.5516C42.5516 23.2732 42.2304 21.8106 42.1287 21.3636H37.5784C37.4468 21.702 36.8346 23.2732 36.8346 23.2732H33.1159L38.3802 11.5995C38.7449 10.7733 39.3872 10.5433 40.2325 10.5433H42.9738Z" fill="#171E6C" />
                                                </svg>
                                            ) : (
                                                <svg xmlns="http://www.w3.org/2000/svg" width="51" height="34" viewBox="0 0 51 34" fill="none">
                                                    <path d="M46.75 0H4.25C1.90279 0 0 1.90279 0 4.25V29.75C0 32.0972 1.90279 34 4.25 34H46.75C49.0972 34 51 32.0972 51 29.75V4.25C51 1.90279 49.0972 0 46.75 0Z" fill="#252525" />
                                                    <path d="M19.125 27.625C24.993 27.625 29.75 22.868 29.75 17C29.75 11.132 24.993 6.375 19.125 6.375C13.257 6.375 8.5 11.132 8.5 17C8.5 22.868 13.257 27.625 19.125 27.625Z" fill="#EB001B" />
                                                    <path d="M31.875 27.625C37.743 27.625 42.5 22.868 42.5 17C42.5 11.132 37.743 6.375 31.875 6.375C26.007 6.375 21.25 11.132 21.25 17C21.25 22.868 26.007 27.625 31.875 27.625Z" fill="#F79E1B" />
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M25.5 8.49902C28.0807 10.4375 29.75 13.5237 29.75 16.9998C29.75 20.4759 28.0807 23.5621 25.5 25.5006C22.9193 23.5621 21.25 20.4759 21.25 16.9998C21.25 13.5237 22.9193 10.4375 25.5 8.49902Z" fill="#FF5F00" />
                                                </svg>
                                            )} {cards[selectedCardIndexes].brand}</div>
                                        <div className='d-flex justify-content-between mt-2'>
                                            <div className='ms-2 mt-1'>**** **** **** {cards[selectedCardIndexes].last4}</div>
                                        </div>
                                        <div className='d-flex ms-2 mt-2'>
                                            <div>{cards[selectedCardIndexes].exp_month} / {cards[selectedCardIndexes].exp_year} </div>
                                        </div>
                                    </div>
                                    <Button onClick={() => setImg(true)} className=' mt-3 Toggle-color2  '><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 20 20" fill="none">
                                        <g clipPath="url(#clip0_1295_19693)">
                                            <path d="M1.66699 20V18.0962H18.3337V20H1.66699ZM3.78401 15.6154V13.3254L11.3946 5.73081L13.6686 8.00483L6.07403 15.6154H3.78401ZM4.72949 14.6699H5.61091L12.3096 7.97116L11.4282 7.08977L4.72949 13.7805V14.6699ZM14.4971 7.13622L12.2231 4.87827L13.6285 3.46483C13.7813 3.29495 13.9576 3.20654 14.1574 3.1996C14.3571 3.19265 14.5489 3.28106 14.7327 3.46483L15.8608 4.58497C16.0307 4.76018 16.117 4.94982 16.1197 5.15389C16.1223 5.35795 16.05 5.54758 15.9025 5.72279L14.4971 7.13622Z" fill="#007BFF" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_1295_19693">
                                                <rect width="20" height="20" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg></Button>
                                </div>
                                    <Button onClick={() => {
                                        handleOrders();
                                    }} className='w-100 d-flex justify-content-center text-white text-dark mt-4'>Pay Now</Button></>

                                ) : (<> <div className='border back mt-4 payment-size'>
                                    <div className='  ms-4  payment-size2' >

                                        {Active && cards.length == 0 ? (<Button onClick={() => setPayment(true)} className='d-flex  border border-primary btn-adjust btn btn-light '>
                                            <svg className='ms-2 plus-adjust' xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                                <path d="M10.5309 15.3544H11.5709V11.5855H15.354V10.5455H11.5709V6.64616H10.5309V10.5455H6.64567V11.5855H10.5309V15.3544ZM11.0074 19.7086C9.80119 19.7086 8.67142 19.4801 7.61814 19.0229C6.56486 18.5658 5.64242 17.9417 4.85084 17.1504C4.05923 16.3592 3.43478 15.4366 2.97747 14.3826C2.52016 13.3287 2.2915 12.1979 2.2915 10.9904C2.2915 9.78871 2.52006 8.65919 2.97717 7.60183C3.43428 6.54447 4.05846 5.62382 4.84969 4.83987C5.64094 4.0559 6.56354 3.43527 7.6175 2.97796C8.67145 2.52065 9.8022 2.29199 11.0097 2.29199C12.2114 2.29199 13.3409 2.52055 14.3983 2.97766C15.4556 3.43477 16.3763 4.05512 17.1602 4.83872C17.9442 5.62233 18.5649 6.54381 19.0222 7.60314C19.4795 8.66245 19.7081 9.7923 19.7081 10.9927C19.7081 12.1989 19.4796 13.3287 19.0225 14.382C18.5653 15.4353 17.945 16.3563 17.1614 17.1451C16.3778 17.9338 15.4563 18.5583 14.397 19.0184C13.3377 19.4785 12.2078 19.7086 11.0074 19.7086ZM11.0113 18.6686C13.1378 18.6686 14.9456 17.9217 16.4346 16.428C17.9236 14.9343 18.6681 13.1213 18.6681 10.9888C18.6681 8.8623 17.925 7.05453 16.4389 5.56552C14.9527 4.07654 13.1397 3.33204 10.9998 3.33204C8.87503 3.33204 7.06579 4.07511 5.57209 5.56124C4.0784 7.04737 3.33155 8.86039 3.33155 11.0003C3.33155 13.1251 4.0784 14.9343 5.57209 16.428C7.06579 17.9217 8.87885 18.6686 11.0113 18.6686Z" fill="#868E96" />
                                            </svg>
                                            <div className=' ms-1 Toggle-color1  btn btn-none'>Add New</div>
                                        </Button>) :
                                            (
                                                setOption(true)
                                            )}
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
                    onClose={async (value, customerId) => {
                        setPayment(false);
                        const res = await dispatch(getPayment({ customerId }));
                        cards = res?.payload.cards;
                        setOption(value);
                    }}
                />
            )}
            {Img && (
                <Edit
                    state={true} x
                    name='Payment Method'
                    placeholders={placeholders}
                    text='Save'
                    onClose={() => {
                        setImg(false);
                    }}
                    onClose1={(selectedCardIndex) => {
                        setSelectedCardIndexes(selectedCardIndex);
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