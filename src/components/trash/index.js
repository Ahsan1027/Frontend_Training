import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { updateDeliveryStatus } from '../../redux/Slices/order-slice';
// import { addUserNotification } from '../../redux/Slices/notification-slice';
import Modal from 'react-bootstrap/Modal';
import TrashWrapper from './style';

function Trash({ onClose = false, state = false, texts = null, svgs, Description, onContentChange = false, contents = true, status = null, orderId = null }) {
    const dispatch = useDispatch();
    let { token } = useSelector((state) => state.login);
    const [show, setShow] = useState(state);
    const handleShow = () => setShow(true);

    const handleUpdateDeliveryStatus = async () => {
        try {
            await dispatch(updateDeliveryStatus({orderId,token}));
            // const aa = await dispatch(addUserNotification(orderId));
            // console.log('check',aa);
            onContentChange();
        } catch (error) {
            console.error('\n\n Error', error);
        }
    };

    return (
        <TrashWrapper>
            <Button className="hide" variant="primary" onClick={handleShow}></Button>
            <Modal show={show} onHide={onClose}>
                <Modal.Header className="d-flex justify-content-center border-bottom-0">
                    <Modal.Title className="text-primary">{texts}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="d-flex justify-content-center">
                    {svgs}
                </Modal.Body>
                <Modal.Body className="d-flex justify-content-center">{Description}</Modal.Body>
                <Modal.Footer className="d-flex justify-content-center border-top-0">
                    {contents ? (
                        <>
                            <Button variant="secondary" onClick={onClose}>
                                No
                            </Button>
                            <Button variant="primary" onClick={() => {
                                console.log(contents);
                                if (status == 'Delivered') {
                                    handleUpdateDeliveryStatus();
                                } else {
                                    onContentChange();
                                }
                            }}>
                                Yes
                            </Button>
                        </>
                    ) : (
                        <Button variant="secondary" onClick={onClose} >
                            Close
                        </Button>)}
                </Modal.Footer>
            </Modal>
        </TrashWrapper>
    );
}

export default Trash;
