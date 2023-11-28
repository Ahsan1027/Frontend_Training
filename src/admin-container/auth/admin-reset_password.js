import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { Form } from 'react-bootstrap';

import Input from '../../components/input';
import Heading from '../../components/heading';
import Button from '../../components/button';
import { notification } from 'antd';

import HeadingStyle from '../../components/heading/style';
import ButtonStyle from '../../components/button/style';
import InputStyle from '../../components/input/style';
import Styling from './style';

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { forgotUser } from '../../redux/Slices/auth-slice';

const Reset = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [EmailError, setEmailError] = useState('');
    const [validationError, setError] = useState('');

    const handlePassword = async (e) => {
        const mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        e.preventDefault();

        if (!mailformat.test(email)) {
            setError(true);
            setEmailError('Invalid email format');
            return;
        }
        setEmailError('');
        const error  = await dispatch(forgotUser({ email }));

        if (error?.payload == 'User not found') {
            setEmailError(error?.payload);
            navigate('/reset-password');
            setError(true);
            // return;
        } else if(error?.payload.message == 'Email sent successfully'){
            setError(false);
            notification.success({
                message: 'success',
                description: 'Email sent successfully',
                type: 'success',
                duration: 1.5,
              });
            // return;
        }
    };

    const LoginPage = () => {
        navigate(-1);
    };

    return (
        <Container>
            <Heading text="Forgot Password" style={HeadingStyle.HeadingAdjust} />
            <div className="p-4 mx-auto" style={Styling.ContainerAdjust_1}>
                <Form onSubmit={handlePassword}>
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

                        {/* {EmailError ? (
                            <div className="text-danger">{EmailError}</div>
                        ) : null} */}

                        {validationError &&
                            <div className="text-danger small">{EmailError}
                            </div>}
                    </Form.Group>

                    <Form.Group>
                        <Button type="submit" style={ButtonStyle.LoginAdjust} >
                            Forgot Password
                        </Button>
                    </Form.Group>

                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                        <Form.Label style={Styling.ForgotPassword}>
                            No, I remember my password
                        </Form.Label>

                        <Form.Label style={Styling.LoginText} onClick={LoginPage}>
                            Login
                        </Form.Label>
                    </div>

                </Form>
            </div >
        </Container >

    );
};

export default Reset;