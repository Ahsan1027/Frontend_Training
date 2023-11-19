import React, { useEffect } from 'react';
import Buttons from '../../components/button';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { verifyUser } from '../../redux/Slices/auth-slice';

const UserVerifyingPage = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const token = searchParams.get('token');
  const navigate = useNavigate();
  const {
    loading,
    error,
    isVerified
  } = useSelector((state) => state.login);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(verifyUser({ token }));
  }, []);

  console.log('check verified', isVerified);

  const handleVerifyUser = () => {
    navigate('/login');
  };
  return (
    <div className='d-flex flex-column justify-content-center align-items-center vh-100'>
      {
        loading ? (
          <h1>Verifying</h1>
        ) : !error && isVerified != 'User already verified' ? (
          <>
            <h1>Email Verified !</h1>
            <Buttons onClick={handleVerifyUser}>Go to Login</Buttons>
          </>
        ) : isVerified == 'User already verified' && (
          <>
            <h1>User already verified</h1>
            <Buttons onClick={handleVerifyUser}>Go to Login</Buttons>
          </>
        )
      }
    </div>
  );
};

export default UserVerifyingPage;
