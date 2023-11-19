import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import Input from '../components/input';
import Heading from '../components/heading';
import Button from '../components/button';
import HeadingStyle from '../components/heading/style';
import ButtonStyle from '../components/button/style';
import InputStyle from '../components/input/style';
import BlackBorder from './style';
import ListingWrapper from './style';

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { SignupUser } from '../redux/Slices/auth-slice';

const Signup = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const { error } = useSelector((state) => state.login);

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');

    const [passwordError, setPasswordError] = useState('');
    const [EmailError, setEmailError] = useState('');
    const [validationError, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        const mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (!mailformat.test(email)) {
            setEmailError('Invalid email format');
            return;
        }
        if (password.length < 8) {
            setPasswordError('Password must be at least 8 characters long and must contain special characters.');
            return;
        }
        const  error  = await dispatch(SignupUser({ name, email, password, mobile }));
        if (error?.payload == 'Email already in use') {
            setEmailError(error.payload);
            navigate('/Signup');
            setError(true);
        } else {
            setError(false);
            alert(`Welcome ${name}`);
            navigate('/login');
        }
    };

    const handleLogin1 = () => {
        navigate('/login');
    };


    const ForgotPassword = {
        color: 'black',
        fontFamily: 'Inter',
        fontSize: '14px',
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: '49px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: '5px',
    };

    const Reset = {
        color: 'var(--primary-color, #3C76FF)',
        fontFamily: 'Inter',
        fontSize: '14px',
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: '21px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };

    const custom_size = {
        width: '700px',
    };

    return (
        <ListingWrapper>
            <div className='App-header '>
                <Container className=' ' style={custom_size} >
                    <Heading text="SignUp" style={HeadingStyle.HeadingAdjust1} />
                    <div className="p-4 mx-auto border colors" style={BlackBorder.ContainerAdjust}>
                        <Form onSubmit={handleLogin}>
                            <Form.Group className="mb-3">
                                <Form.Label style={InputStyle.TextSize}>
                                    Fullname
                                </Form.Label>

                                <Input
                                    type="text"
                                    id="email"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Fullname"
                                />
                            </Form.Group>
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
                            {/* {EmailError ? (
                                <div className="text-danger">{EmailError}</div>
                            ) : null} */}
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
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label style={InputStyle.TextSize}>
                                    Mobile
                                </Form.Label>

                                <Input
                                    type="text"
                                    id="email"
                                    value={mobile}
                                    onChange={(e) => setMobile(e.target.value)}
                                    placeholder="mobile number"
                                />
                            </Form.Group>
                            {validationError &&
                                <div className="text-danger">{EmailError}
                                </div>}
                            <Form.Group>
                                <Button type="submit" className='ms-4 ' style={ButtonStyle.SignupAdjust} >
                                    SignUp
                                </Button>
                            </Form.Group>

                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                                <Form.Label style={ForgotPassword}>
                                    Already have an account!
                                </Form.Label>
                                <Form.Label style={Reset} onClick={handleLogin1}>
                                    Login
                                </Form.Label>

                            </div>

                        </Form>
                    </div >
                </Container >
            </div>
        </ListingWrapper>
    );
};

export default Signup;
