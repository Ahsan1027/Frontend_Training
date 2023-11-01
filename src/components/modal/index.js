import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { importBulkProduct } from '../../redux/Slices/products-slice';
import ModalWrapper from './style';

function MyVerticallyCenteredModal({ state = false, onClose, onStatus, name, text, ...props }) {
    const dispatch = useDispatch();
    let { token } = useSelector((state) => state.login);
    const [show, setShow] = useState(state);
    const handleClose = () => {
        onClose();
        setShow(false);
    };

    const handleStatus = () => {
        onStatus();
        setShow(false);
    };
    const handleFileSelection = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            dispatch(importBulkProduct({ selectedFile, token }));
        }
    };
    return (
        <ModalWrapper show={show} onHide={handleClose}
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton className='modal-style'>
                <Modal.Title id="contained-modal-title-vcenter">
                    {name}
                </Modal.Title>
            </Modal.Header>
            <div className=' mx-auto outline-size'>
                <div >
                    <input
                        type="file"
                        accept=".csv"
                        onChange={handleFileSelection}
                    />
                    <p className='para-size'>Choose a CSV file or</p>
                    {/* <svg className=' mt-4 custom-size' xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M26.761 18.011C26.9236 17.848 27.1167 17.7187 27.3293 17.6305C27.5419 17.5423 27.7698 17.4969 28 17.4969C28.2302 17.4969 28.4581 17.5423 28.6707 17.6305C28.8833 17.7187 29.0764 17.848 29.239 18.011L36.239 25.011C36.4017 25.1737 36.5308 25.3669 36.6188 25.5795C36.7069 25.792 36.7522 26.0199 36.7522 26.25C36.7522 26.4801 36.7069 26.708 36.6188 26.9205C36.5308 27.1331 36.4017 27.3263 36.239 27.489C36.0763 27.6517 35.8831 27.7808 35.6705 27.8688C35.458 27.9569 35.2301 28.0022 35 28.0022C34.7699 28.0022 34.542 27.9569 34.3295 27.8688C34.1169 27.7808 33.9237 27.6517 33.761 27.489L29.75 23.4745V36.75C29.75 37.2141 29.5656 37.6593 29.2374 37.9874C28.9093 38.3156 28.4641 38.5 28 38.5C27.5359 38.5 27.0908 38.3156 26.7626 37.9874C26.4344 37.6593 26.25 37.2141 26.25 36.75V23.4745L22.239 27.489C21.9104 27.8176 21.4647 28.0022 21 28.0022C20.5353 28.0022 20.0896 27.8176 19.761 27.489C19.4324 27.1604 19.2478 26.7147 19.2478 26.25C19.2478 25.7853 19.4324 25.3396 19.761 25.011L26.761 18.011Z" fill="#3C76FF" />
                        <path d="M15.421 11.697C18.9192 8.68047 23.3809 7.01448 28 7C37.415 7 45.2305 14 46.081 23.0265C51.653 23.814 56 28.4795 56 34.2055C56 40.4915 50.757 45.5 44.4045 45.5H13.2335C5.978 45.5 0 39.781 0 32.613C0 26.4425 4.431 21.3325 10.297 20.0375C10.7975 17.017 12.74 14.007 15.421 11.697ZM17.7065 14.3465C15.057 16.632 13.671 19.3865 13.671 21.5425V23.1105L12.1135 23.282C7.224 23.8175 3.5 27.832 3.5 32.613C3.5 37.7475 7.805 42 13.2335 42H44.4045C48.93 42 52.5 38.458 52.5 34.2055C52.5 29.9495 48.93 26.4075 44.4045 26.4075H42.6545V24.6575C42.658 16.8875 36.148 10.5 28 10.5C24.2196 10.5151 20.5689 11.877 17.7065 14.3465Z" fill="#3C76FF" />
                    </svg>
                    <p className='para-size'>Drag & Drop Files Here or</p> */}
                </div>
            </div>
            <Modal.Footer className='modal-style'>
                <Button onClick={handleStatus}>{text}</Button>
            </Modal.Footer>
        </ModalWrapper>
    );
}

function App({ state = false, onClose, name, text, onStatus }) {
    return (
        <>
            <MyVerticallyCenteredModal
                onClose={onClose} state={state} name={name} text={text} onStatus={onStatus}
            />
        </>
    );
}

export default App;