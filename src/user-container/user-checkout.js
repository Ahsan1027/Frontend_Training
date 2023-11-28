import React, { useState } from 'react';
import ShoppingCart from '../components/shopping-cart';
import OrderSummary from '../components/orders-summary';
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { getAddress } from '../redux/Slices/user-cart-slice';
import Buttons from '../components/button';
import Edit from '../components/drawer';
import { useNavigate } from 'react-router-dom';
import ListingWrapper from './style';

const Checkout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const addresses = useSelector(state => state.cart.addresses);
    let cartItems = useSelector((state) => state.cart.items);
    // let { orderSuccess } = useSelector((state) => state.cart);
    const { id, token } = useSelector((state) => state.login);
    const totalItems = cartItems.length;
    const [Details, setDetails] = useState(false);
    const [Active, setActive] = useState(false);
    const [Name, setName] = useState(false);
    const [Mobile, setMobile] = useState(false);
    const [Address1, setAddress1] = useState(false);
    const [Address, setAddress] = useState(false);
    const [Open, setOpen] = useState(false);
    const [show, setShow] = useState(false);
    const [clickedIndex, setClickedIndex] = useState(0);
    const placeholders = ['Full name', 'Mobile #', 'Country', 'Province', 'City', 'Address', '100'];

    const handleGetAddressClick = async () => {
        await dispatch(getAddress({ id, token }));
        setClickedIndex(clickedIndex);
        setAddress(true);
    };

    const backPage = () => {
        navigate('/shopping-page');
    };

    return (
        <ListingWrapper>
            <Container>
                <Row>
                    <div className='d-flex mt-5 '>
                        <Col lg={8}>
                            <div className='d-flex custom-heading mt-4 '>
                                <div><svg onClick={backPage} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M5.85392 4.64592C5.90048 4.69236 5.93742 4.74754 5.96263 4.80828C5.98784 4.86903 6.00081 4.93415 6.00081 4.99992C6.00081 5.06568 5.98784 5.13081 5.96263 5.19155C5.93742 5.2523 5.90048 5.30747 5.85392 5.35392L3.20692 7.99992L5.85392 10.6459C5.90041 10.6924 5.93728 10.7476 5.96244 10.8083C5.9876 10.8691 6.00055 10.9342 6.00055 10.9999C6.00055 11.0657 5.9876 11.1308 5.96244 11.1915C5.93728 11.2522 5.90041 11.3074 5.85392 11.3539C5.80743 11.4004 5.75224 11.4373 5.6915 11.4624C5.63076 11.4876 5.56566 11.5005 5.49992 11.5005C5.43417 11.5005 5.36907 11.4876 5.30833 11.4624C5.24759 11.4373 5.19241 11.4004 5.14592 11.3539L2.14592 8.35392C2.09935 8.30747 2.06241 8.2523 2.0372 8.19155C2.012 8.13081 1.99902 8.06568 1.99902 7.99992C1.99902 7.93415 2.012 7.86903 2.0372 7.80828C2.06241 7.74754 2.09935 7.69236 2.14592 7.64592L5.14592 4.64592C5.19236 4.59935 5.24754 4.56241 5.30828 4.5372C5.36903 4.512 5.43415 4.49902 5.49992 4.49902C5.56568 4.49902 5.63081 4.512 5.69155 4.5372C5.7523 4.56241 5.80747 4.59935 5.85392 4.64592Z" fill="#007BFF" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M2.5 8C2.5 7.86739 2.55268 7.74021 2.64645 7.64645C2.74021 7.55268 2.86739 7.5 3 7.5H13.5C13.6326 7.5 13.7598 7.55268 13.8536 7.64645C13.9473 7.74021 14 7.86739 14 8C14 8.13261 13.9473 8.25979 13.8536 8.35355C13.7598 8.44732 13.6326 8.5 13.5 8.5H3C2.86739 8.5 2.74021 8.44732 2.64645 8.35355C2.55268 8.25979 2.5 8.13261 2.5 8Z" fill="#007BFF" />
                                </svg></div>
                                <div className='text-primary ms-2 custom-text'>Checkout</div>
                            </div>
                            {Open ? (
                                <>
                                    <div className='UpperDiv border mt-4 py-2 back'>
                                        <div className='d-flex ms-3 mt-1 small'>
                                            <div>Deliver to:</div>
                                            <div className='fw-bold ms-1'>{Name}</div>
                                            <Buttons onClick={handleGetAddressClick} className='text-primary border border-primary change-size '><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                <g clipPath="url(#clip0_1295_19693)">
                                                    <path d="M1.66699 20V18.0962H18.3337V20H1.66699ZM3.78401 15.6154V13.3254L11.3946 5.73081L13.6686 8.00483L6.07403 15.6154H3.78401ZM4.72949 14.6699H5.61091L12.3096 7.97116L11.4282 7.08977L4.72949 13.7805V14.6699ZM14.4971 7.13622L12.2231 4.87827L13.6285 3.46483C13.7813 3.29495 13.9576 3.20654 14.1574 3.1996C14.3571 3.19265 14.5489 3.28106 14.7327 3.46483L15.8608 4.58497C16.0307 4.76018 16.117 4.94982 16.1197 5.15389C16.1223 5.35795 16.05 5.54758 15.9025 5.72279L14.4971 7.13622Z" fill="#007BFF" />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_1295_19693">
                                                        <rect width="20" height="20" fill="white" />
                                                    </clipPath>
                                                </defs>
                                            </svg></Buttons>
                                        </div>
                                        <div className='d-flex ms-3 small'>
                                            <div>Mobile #: {Mobile}</div>
                                        </div>
                                        <div className='d-flex ms-3 mt-1 small'>
                                            <div>Address: {Address1}</div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    {addresses.length !== 0 && (
                                        <>
                                            {setName(addresses[0]?.name)}
                                            {setMobile(addresses[0]?.mobile)}
                                            {setAddress1(addresses[0]?.address)}
                                            {setOpen(true)}
                                            {setActive(true)}
                                        </>
                                    )}
                                    {addresses.length == 0 && (
                                        <div className='UpperDiv border mt-4 py-2 back'>
                                            <Buttons onClick={() => setDetails(true)} className='ms-2'>
                                                Add Delivery Address
                                            </Buttons>
                                        </div>
                                    )}
                                </>

                            )}
                            {cartItems.map((item, index) => {
                                return (
                                    <ShoppingCart
                                        key={index}
                                        images={item.product.thumbnail}
                                        colors={item.color}
                                        sizes={item.size}
                                        title={item.product.title}
                                        price={item.price}
                                        quantity={item.quantity}
                                        click={index}
                                        stock={item.product.stock}
                                        onClose={(val) => {
                                            setShow(val);
                                        }}
                                        name='OrderSummary'
                                    />
                                );
                            })}
                        </Col>
                        <Col lg={4} className='ms-5 mt-5 small'>
                            <OrderSummary text1={`Sub Total: ${totalItems} item(s)`} text2='Delivery Fees:' text3='Tax:' text4='Total Payment:' show={show} name='Checkout' Active={Active} />
                        </Col>
                    </div>
                </Row>
            </Container>
            {Details && cartItems.length > 0 && (
                <Edit
                    state={true}
                    placeholders={placeholders}
                    name='Delivery Address'
                    text='Save'
                    onClose={(value, Name, mobile, Address1) => {
                        setDetails(false);
                        setAddress1(Address1);
                        setMobile(mobile);
                        setName(Name);
                        setOpen(value);
                        setActive(value);
                    }}
                    onClose1={() => {
                        setDetails(false);
                    }}
                />
            )}
            {Address && (
                <Edit
                    state={true}
                    placeholders={placeholders}
                    name='Choose Address'
                    addresses={addresses}
                    clickedIndex={clickedIndex}
                    text='Confirm'
                    onClose={(value, fullName, mobile, address, selectedUserIndex) => {
                        setClickedIndex(selectedUserIndex);
                        setAddress(false);
                        setMobile(mobile);
                        setAddress1(address);
                        setName(fullName);
                        setOpen(value);
                    }}
                />
            )}
        </ListingWrapper>
    );
};

export default Checkout;
