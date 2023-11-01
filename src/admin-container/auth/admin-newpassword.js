import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { Form } from 'react-bootstrap';

import Input from '../../components/input';
import Heading from '../../components/heading';
import Button from '../../components/button';

import HeadingStyle from '../../components/heading/style';
import ButtonStyle from '../../components/button/style';
import InputStyle from '../../components/input/style';
import BlackBorder from './style';

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { newPassword } from '../../redux/Slices/auth-slice';

const NewPassword = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const searchParams = new URLSearchParams(window.location.search);
    const token = searchParams.get('token');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const handlePassword = async (e) => {
        e.preventDefault();

        const resp = await dispatch(newPassword({ password, confirmPassword, token }));
        if (resp?.error) {
            setConfirmPasswordError('Passwords do not match.');
        }
        else {
            navigate('/login');
            setPasswordError('');
            setConfirmPasswordError('');
        }
    };

    return (
        <Container>
            <Heading text="New Password" style={HeadingStyle.HeadingAdjust} />
            <div className="p-4 mx-auto" style={BlackBorder.ContainerAdjust_2}>
                <Form onSubmit={handlePassword}>
                    <Form.Group className="mb-3">
                        <Form.Label style={InputStyle.TextSize}>
                            Enter new password
                        </Form.Label>
                        <Input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="enter password"
                        />
                        {passwordError ? (
                            <div className="text-danger">{passwordError}</div>
                        ) : null}
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label style={InputStyle.TextSize}>
                            Confirm password
                        </Form.Label>

                        <Input
                            type="password"
                            id="confirmpassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="confirm password"
                        />
                        {confirmPasswordError ? (
                            <div className="text-danger">{confirmPasswordError}</div>
                        ) : null}
                    </Form.Group>

                    <Form.Group>
                        <Button type="submit" style={ButtonStyle.LoginAdjust} >
                            Reset Password
                        </Button>
                    </Form.Group>

                </Form>
            </div >
        </Container >

    );
};

export default NewPassword;