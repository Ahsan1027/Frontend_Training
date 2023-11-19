import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import Input from '../../components/input';
import Heading from '../../components/heading';
import Button from '../../components/button';
import HeadingStyle from '../../components/heading/style';
import ButtonStyle from '../../components/button/style';
import InputStyle from '../../components/input/style';
import Styling from './style';

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/Slices/auth-slice';

const Login = ({ user = null }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [emailError, setEmailError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!isValidEmail(email)) {
            setEmailError('Invalid email address.');
            return;
        }
        if (password.length < 8) {
            setPasswordError('Password must be at least 8 characters long.');
            return;
        }

        setPasswordError('');
        setEmailError('');
        const resp = await dispatch(loginUser({ email, password }));
        if(resp?.payload.message == 'User not found'){
            setEmailError(resp.payload.message);
            return;
        } else if (resp?.payload.message == 'Invalid password'){
            setPasswordError(resp.payload.message);
            return;
        } else if(resp?.payload.message == 'Please verify your account first on your Email !'){
            alert(resp.payload.message);
            return;
        }

        if (resp?.payload.role === 'user') {
            console.log('in login page');
            navigate('/');
        } else if (resp?.payload.role === 'admin' ) {
            navigate('/dashboard-page');
        }
    };

    const handleResetPassword = () => {
        navigate('/reset-password');
    };

    const handleSignUp = () => {
        navigate('/Signup');
    };

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    return (
        <div className='App-header'>
            <Container>
                <Heading text="Login" style={HeadingStyle.HeadingAdjust1} />
                <div className="p-4 mx-auto" style={Styling.ContainerAdjust}>
                    <Form onSubmit={handleLogin}>
                        <Form.Group className="mb-3">
                            <Form.Label style={InputStyle.TextSize}>
                                Enter email address
                            </Form.Label>

                            <Input
                                type="text"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Please enter your email"
                            />
                        </Form.Group>
                        {emailError ? (
                            <div className="text-danger">{emailError}</div>
                        ) : null}
                        <Form.Group className="mb-3">
                            <Form.Label style={InputStyle.TextSize}>
                                Password
                            </Form.Label>

                            <Input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Please enter password"
                            />
                            {passwordError ? (
                                <div className="text-danger">{passwordError}</div>
                            ) : null}
                            {/* {error ? (
                                <div className="text-danger">{error}</div>
                            ) : null} */}
                        </Form.Group>

                        <Form.Group>
                            <Button type="submit" style={ButtonStyle.LoginAdjust} >
                                Login
                            </Button>
                        </Form.Group>

                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '40px' }} >
                            <Form.Label style={Styling.ForgotPassword}>
                                Forgot Password!
                            </Form.Label>
                            <Form.Label style={Styling.Reset} onClick={handleResetPassword}>
                                Reset
                            </Form.Label>
                        </div>

                        {user === 'User' && (<div className='' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '40px' }} >
                            <Form.Label style={Styling.ForgotPassword}>
                                I dont have an Account!
                            </Form.Label>
                            <Form.Label style={Styling.Reset} onClick={handleSignUp}>
                                SignUp
                            </Form.Label>

                        </div>)}
                    </Form>
                </div >
            </Container >
        </div>
    );
};

export default Login;
