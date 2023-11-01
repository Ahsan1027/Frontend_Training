import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';
import { NavDropdown } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Image } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { clearCart } from '../../redux/Slices/user-cart-slice';
import { clearNotifications } from '../../redux/Slices/notification-slice';
import { clearUserNotifications } from '../../redux/Slices/notification-slice';
import Styling from './style';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/Slices/auth-slice';
import { useNavigate } from 'react-router-dom';

const Navbars = ({ userName, profileImageSrc, name = null, value = null }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let cartItems = useSelector((state) => state.cart.items);
  const notifications = useSelector((state) => state.notification.notifications);
  // const userNotifications = useSelector((state) => state.notification.userNotifications);
  let totalItems = cartItems.length;

  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserNotifications, setShowUserNotifications] = useState(false);

  useEffect(() => {
    totalItems = totalItems + cartItems.length;
  }, [cartItems]);

  const handleShopping = () => {
    navigate('/shopping-page');
  };

  const toggleNotifications = () => {
    if (showNotifications) {
      dispatch(clearNotifications());
    }
    setShowNotifications((prev) => !prev);
  };
  const toggleUserNotifications = () => {
    if (showUserNotifications) {
      dispatch(clearUserNotifications());
    }
    setShowUserNotifications((prev) => !prev);
  };
  return (
    <Navbar style={Styling.ContainerAdjust} >
      <Container>
        <Navbar.Brand href="#home" style={Styling.EcommAdjust}>E-commerce</Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Nav>

            {name === 'User' ? (
              <>
                {value === 'invalid' ? (
                  <> <Nav style={Styling.Bell2Adjust}> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="14" viewBox="0 0 16 16" fill="none" role="button">
                    <path fillRule="evenodd" clipRule="evenodd" d="M14 5H2V14C2 14.2652 2.10536 14.5196 2.29289 14.7071C2.48043 14.8946 2.73478 15 3 15H13C13.2652 15 13.5196 14.8946 13.7071 14.7071C13.8946 14.5196 14 14.2652 14 14V5ZM1 4V14C1 14.5304 1.21071 15.0391 1.58579 15.4142C1.96086 15.7893 2.46957 16 3 16H13C13.5304 16 14.0391 15.7893 14.4142 15.4142C14.7893 15.0391 15 14.5304 15 14V4H1Z" fill="#007BFF" />
                    <path d="M8 1.5C7.33696 1.5 6.70107 1.76339 6.23223 2.23223C5.76339 2.70107 5.5 3.33696 5.5 4H4.5C4.5 3.07174 4.86875 2.1815 5.52513 1.52513C6.1815 0.868749 7.07174 0.5 8 0.5C8.92826 0.5 9.8185 0.868749 10.4749 1.52513C11.1313 2.1815 11.5 3.07174 11.5 4H10.5C10.5 3.33696 10.2366 2.70107 9.76777 2.23223C9.29893 1.76339 8.66304 1.5 8 1.5Z" fill="#007BFF" />
                  </svg></Nav>
                    <Nav style={Styling.BellAdjust}> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" role="button"
                    >
                      <g clipPath="url(#clip0_1478_12949)">
                        <path d="M8 16C8.53043 16 9.03914 15.7893 9.41421 15.4142C9.78929 15.0391 10 14.5304 10 14H6C6 14.5304 6.21071 15.0391 6.58579 15.4142C6.96086 15.7893 7.46957 16 8 16Z" fill="#007BFF" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M8 1.9179L7.203 2.0789C6.29896 2.2631 5.48633 2.754 4.90265 3.46852C4.31897 4.18304 4.0001 5.07728 4 5.9999C4 6.6279 3.866 8.1969 3.541 9.7419C3.381 10.5089 3.165 11.3079 2.878 11.9999H13.122C12.835 11.3079 12.62 10.5099 12.459 9.7419C12.134 8.1969 12 6.6279 12 5.9999C11.9997 5.07746 11.6807 4.18345 11.097 3.46913C10.5134 2.75482 9.70087 2.26406 8.797 2.0799L8 1.9169V1.9179ZM14.22 11.9999C14.443 12.4469 14.701 12.8009 15 12.9999H1C1.299 12.8009 1.557 12.4469 1.78 11.9999C2.68 10.1999 3 6.8799 3 5.9999C3 3.5799 4.72 1.5599 7.005 1.0989C6.99104 0.959852 7.00638 0.819425 7.05003 0.686672C7.09368 0.553919 7.16467 0.431788 7.25842 0.328156C7.35217 0.224525 7.4666 0.141693 7.59433 0.0850029C7.72206 0.0283129 7.86026 -0.000976562 8 -0.000976562C8.13974 -0.000976563 8.27794 0.0283129 8.40567 0.0850029C8.5334 0.141693 8.64783 0.224525 8.74158 0.328156C8.83533 0.431788 8.90632 0.553919 8.94997 0.686672C8.99362 0.819425 9.00896 0.959852 8.995 1.0989C10.1253 1.3288 11.1414 1.94226 11.8712 2.8354C12.6011 3.72854 12.9999 4.84647 13 5.9999C13 6.8799 13.32 10.1999 14.22 11.9999Z" fill="#007BFF" />
                      </g>
                      <defs>
                        <clipPath id="clip0_1478_12949">
                          <rect width="16" height="16" fill="white" />
                        </clipPath>
                      </defs>
                    </svg></Nav>
                    <Nav role="button" className='text-primary small ms-2' onClick={() => {
                      navigate('/login');
                    }}>Login</Nav>
                  </>) :
                  (<>
                    <Nav onClick={handleShopping} style={Styling.Bell2Adjust}> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" role="button">
                      <path fillRule="evenodd" clipRule="evenodd" d="M14 5H2V14C2 14.2652 2.10536 14.5196 2.29289 14.7071C2.48043 14.8946 2.73478 15 3 15H13C13.2652 15 13.5196 14.8946 13.7071 14.7071C13.8946 14.5196 14 14.2652 14 14V5ZM1 4V14C1 14.5304 1.21071 15.0391 1.58579 15.4142C1.96086 15.7893 2.46957 16 3 16H13C13.5304 16 14.0391 15.7893 14.4142 15.4142C14.7893 15.0391 15 14.5304 15 14V4H1Z" fill="#007BFF" />
                      <path d="M8 1.5C7.33696 1.5 6.70107 1.76339 6.23223 2.23223C5.76339 2.70107 5.5 3.33696 5.5 4H4.5C4.5 3.07174 4.86875 2.1815 5.52513 1.52513C6.1815 0.868749 7.07174 0.5 8 0.5C8.92826 0.5 9.8185 0.868749 10.4749 1.52513C11.1313 2.1815 11.5 3.07174 11.5 4H10.5C10.5 3.33696 10.2366 2.70107 9.76777 2.23223C9.29893 1.76339 8.66304 1.5 8 1.5Z" fill="#007BFF" />
                    </svg>
                      {totalItems}</Nav>

                    <Nav style={Styling.BellAdjust}> <div onClick={toggleUserNotifications}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" role="button"
                    >
                      <g clipPath="url(#clip0_1478_12949)">
                        <path d="M8 16C8.53043 16 9.03914 15.7893 9.41421 15.4142C9.78929 15.0391 10 14.5304 10 14H6C6 14.5304 6.21071 15.0391 6.58579 15.4142C6.96086 15.7893 7.46957 16 8 16Z" fill="#007BFF" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M8 1.9179L7.203 2.0789C6.29896 2.2631 5.48633 2.754 4.90265 3.46852C4.31897 4.18304 4.0001 5.07728 4 5.9999C4 6.6279 3.866 8.1969 3.541 9.7419C3.381 10.5089 3.165 11.3079 2.878 11.9999H13.122C12.835 11.3079 12.62 10.5099 12.459 9.7419C12.134 8.1969 12 6.6279 12 5.9999C11.9997 5.07746 11.6807 4.18345 11.097 3.46913C10.5134 2.75482 9.70087 2.26406 8.797 2.0799L8 1.9169V1.9179ZM14.22 11.9999C14.443 12.4469 14.701 12.8009 15 12.9999H1C1.299 12.8009 1.557 12.4469 1.78 11.9999C2.68 10.1999 3 6.8799 3 5.9999C3 3.5799 4.72 1.5599 7.005 1.0989C6.99104 0.959852 7.00638 0.819425 7.05003 0.686672C7.09368 0.553919 7.16467 0.431788 7.25842 0.328156C7.35217 0.224525 7.4666 0.141693 7.59433 0.0850029C7.72206 0.0283129 7.86026 -0.000976562 8 -0.000976562C8.13974 -0.000976563 8.27794 0.0283129 8.40567 0.0850029C8.5334 0.141693 8.64783 0.224525 8.74158 0.328156C8.83533 0.431788 8.90632 0.553919 8.94997 0.686672C8.99362 0.819425 9.00896 0.959852 8.995 1.0989C10.1253 1.3288 11.1414 1.94226 11.8712 2.8354C12.6011 3.72854 12.9999 4.84647 13 5.9999C13 6.8799 13.32 10.1999 14.22 11.9999Z" fill="#007BFF" />
                      </g>
                      <defs>
                        <clipPath id="clip0_1478_12949">
                          <rect width="16" height="16" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>{notifications.length > 0 && <span className="">{notifications.length}</span>}</div></Nav>
                    <div className=''>
                      {showUserNotifications && notifications.length > 0 && (
                        <div style={Styling.notification_list} className='mt-5 border small'>
                          {notifications.map((orderId, index) => (
                            <div key={index} className='mt-2'>Order Sent: {orderId}</div>
                          ))}
                        </div>
                      )}
                    </div>

                    <NavDropdown title={userName} style={Styling.NameAdjust}>
                      <NavDropdown.Item
                        className='mb-2 small'
                        onClick={() => {
                          navigate('/orders-page');
                        }}
                      >
                        Order
                      </NavDropdown.Item>
                      <NavDropdown.Item className='small' onClick={() => {
                        dispatch(logout());
                        dispatch(clearCart());
                        navigate('/');
                      }}>Logout</NavDropdown.Item>
                    </NavDropdown>
                    <Row>
                      <Col xs={6} md={4}>
                        <Image src={profileImageSrc} roundedCircle style={Styling.imgAdjust} />
                      </Col>
                    </Row>
                  </>
                  )}
              </>
            ) : (
              <>
                <Nav style={Styling.BellAdjust} >  <div onClick={toggleNotifications}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" role="button">
                    <g clipPath="url(#clip0_1478_12949)">
                      <path d="M8 16C8.53043 16 9.03914 15.7893 9.41421 15.4142C9.78929 15.0391 10 14.5304 10 14H6C6 14.5304 6.21071 15.0391 6.58579 15.4142C6.96086 15.7893 7.46957 16 8 16Z" fill="#007BFF" />
                      <path fillRule="evenodd" clipRule="evenodd" d="M8 1.9179L7.203 2.0789C6.29896 2.2631 5.48633 2.754 4.90265 3.46852C4.31897 4.18304 4.0001 5.07728 4 5.9999C4 6.6279 3.866 8.1969 3.541 9.7419C3.381 10.5089 3.165 11.3079 2.878 11.9999H13.122C12.835 11.3079 12.62 10.5099 12.459 9.7419C12.134 8.1969 12 6.6279 12 5.9999C11.9997 5.07746 11.6807 4.18345 11.097 3.46913C10.5134 2.75482 9.70087 2.26406 8.797 2.0799L8 1.9169V1.9179ZM14.22 11.9999C14.443 12.4469 14.701 12.8009 15 12.9999H1C1.299 12.8009 1.557 12.4469 1.78 11.9999C2.68 10.1999 3 6.8799 3 5.9999C3 3.5799 4.72 1.5599 7.005 1.0989C6.99104 0.959852 7.00638 0.819425 7.05003 0.686672C7.09368 0.553919 7.16467 0.431788 7.25842 0.328156C7.35217 0.224525 7.4666 0.141693 7.59433 0.0850029C7.72206 0.0283129 7.86026 -0.000976562 8 -0.000976562C8.13974 -0.000976563 8.27794 0.0283129 8.40567 0.0850029C8.5334 0.141693 8.64783 0.224525 8.74158 0.328156C8.83533 0.431788 8.90632 0.553919 8.94997 0.686672C8.99362 0.819425 9.00896 0.959852 8.995 1.0989C10.1253 1.3288 11.1414 1.94226 11.8712 2.8354C12.6011 3.72854 12.9999 4.84647 13 5.9999C13 6.8799 13.32 10.1999 14.22 11.9999Z" fill="#007BFF" />
                    </g>
                    <defs>
                      <clipPath id="clip0_1478_12949">
                        <rect width="16" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>{notifications.length > 0 && <span className="">{notifications.length}</span>}
                </div></Nav>
                <div className=''>
                  {showNotifications && notifications.length > 0 && (
                    <div style={Styling.notification_list} className='mt-5 border small'>
                      {notifications.map((orderId, index) => (
                        <div key={index} className='mt-2'>New Order: {orderId}</div>
                      ))}
                    </div>
                  )}
                </div>
                <NavDropdown title={userName} style={Styling.NameAdjust}>
                  <NavDropdown.Item className='small' onClick={() => {
                    dispatch(logout());
                    navigate('/');
                  }}>Logout</NavDropdown.Item>
                </NavDropdown>
                <Row>
                  <Col xs={6} md={4}>
                    <Image src={profileImageSrc} roundedCircle style={Styling.imgAdjust} />
                  </Col>
                </Row>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navbars;


