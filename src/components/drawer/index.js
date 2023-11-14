import React from 'react';
import moment from 'moment';
import { useState, useRef, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Input from '../input';
import { addAddress } from '../../redux/Slices/user-cart-slice';
import { addPayment } from '../../redux/Slices/payment-slice';
import { updateCustomerId } from '../../redux/Slices/auth-slice';
import { getPayment } from '../../redux/Slices/payment-slice';
import { useSelector, useDispatch } from 'react-redux';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Tables from '../table';
import EditWrapper from './style';

function OffCanvasExample({
    state = false,
    onClose,
    onClose1,
    placeholders,
    name,
    text,
    headings = null,
    data = null,
    value = null,
    index = null,
    orderDetail = null,
    addresses = null,
    clickedIndex = null,
    ...props
}) {
    const { id, token, username, email, customerId } = useSelector((state) => state.login);
    const { error } = useSelector((state) => state.fetch);
    const { cards } = useSelector((state) => state.payment);
    let ordersData = useSelector((state) => state.order.productsData.orders);
    const selectedfileRef = useRef(null);
    const productNameRef = useRef(null);
    const priceRef = useRef(null);
    const stockRef = useRef(null);
    const ratingRef = useRef(null);

    const [fullName, setFullName] = useState('');
    const [mobile, setMobile] = useState('');
    const [country, setCountry] = useState('');
    const [province, setProvince] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [cardNum, setCardNum] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [CVC, setCVC] = useState('');
    const [title, setTitle] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [remainingFiles, setRemainingFiles] = useState([]);
    const [selectedUserIndex, setSelectedUserIndex] = useState(clickedIndex);
    const [isEmptyFields, setIsEmptyFields] = useState(false);
    const [checksError, setError] = useState(false);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [selectedColors, setSelectedColors] = useState([]);
    const [selectedCardIndex, setSelectedCardIndex] = useState(0);

    const colorStyles = {
        Green: 'custom-green',
        Grey: 'custom-grey',
        Black: 'custom-black',
        Purple: 'custom-purple',
        Maroon: 'custom-maroon',
    };

    const sizes = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'];
    const dispatch = useDispatch();
    let item, item1;
    if (index !== null && value === null) {
        item = ordersData[index];
    }

    if (index !== null && value !== null) {
        item1 = ordersData[index];
    }
    const headingsFromAPI = ['Title', 'Price', 'Rating', 'Quantity', 'Stock', 'Color', 'Size'];
    const headingsFromAPI_1 = ['Title', 'Price', 'Quantity', 'Color', 'Size'];

    const handleButtonClick = (index, name, mobile, address) => {
        setFullName(name);
        setAddress(address);
        setMobile(mobile);
        setSelectedUserIndex(index);
    };

    const handleSizeClick = (size) => {
        if (selectedSizes.includes(size)) {
            setSelectedSizes(selectedSizes.filter((s) => s !== size));
        } else {
            setSelectedSizes([...selectedSizes, size]);
        }
    };

    const handleColorClick = (color) => {
        if (selectedColors.includes(color)) {
            setSelectedColors(selectedColors.filter((c) => c !== color));
        } else {
            setSelectedColors([...selectedColors, color]);
        }
    };

    const filteredData = [];
    const filteredData1 = [];

    if (index !== null && value === null) {
        for (const itemProduct of item.products) {
            for (const productData of orderDetail) {
                if (itemProduct.product === productData._id) {
                    const color = itemProduct.color || 'N/A';
                    const size = itemProduct.size || 'N/A';
                    filteredData.push({
                        thumbnail: productData.thumbnail,
                        title: productData.title,
                        stock: productData.stock,
                        rating: productData.rating,
                        price: itemProduct.price,
                        quantity: itemProduct.quantity,
                        size: size,
                        color: color
                    });
                }
            }
        }
    }

    if (index !== null && value !== null) {
        for (const itemProduct of item1.products) {
            for (const productData of orderDetail) {
                if (itemProduct.product === productData._id) {
                    const color = itemProduct.color || 'N/A';
                    const size = itemProduct.size || 'N/A';
                    filteredData1.push({
                        thumbnail: productData.thumbnail,
                        title: productData.title,
                        price: itemProduct.price,
                        quantity: itemProduct.quantity,
                        size: size,
                        color: color
                    });
                }
            }
        }
    }
    const [show, setShow] = useState(state);
    const [Name, setName] = useState(name);
    const handleClose = (productName, price, stock, rating) => {
        if (!selectedFile && Name == 'Add Product') {
            setError(true);
            alert('Fill all Empty Fields!');
            return;
        } else if (Name == 'Add Product') {
            onClose(selectedFile, productName, price, stock, rating, remainingFiles, selectedSizes, selectedColors);
        } else if (Name == 'Edit Product') {
            onClose(selectedFile, productName, price, stock, rating, selectedSizes, selectedColors);
        }
    };

    const isFormComplete = () => {
        const isMobileNumber = /^\d+$/.test(mobile);
        const isFullNameValid = /^[A-Za-z\s]+$/.test(fullName);
        const isCountryValid = /^[A-Za-z\s]+$/.test(country);
        const isProvinceValid = /^[A-Za-z\s]+$/.test(province);
        const isCityValid = /^[A-Za-z\s]+$/.test(city);
        const isAddressValid = address.trim() !== '';

        return (
            isMobileNumber &&
            isFullNameValid &&
            isCountryValid &&
            isProvinceValid &&
            isCityValid &&
            isAddressValid
        );
    };

    const isPaymentComplete = () => {
        const cardNumber = /^\d+$/.test(cardNum);
        const Title = /^[A-Za-z\s]+$/.test(title);
        const currentDate = moment();
        const expiryDateFormatted = moment(expiryDate, 'MM/YY');

        return (
            cardNumber &&
            expiryDateFormatted.isValid() &&
            expiryDateFormatted.isSameOrAfter(currentDate, 'month') &&
            Title
        );
    };

    const handleClose1 = async () => {
        if (!isFormComplete()) {
            setIsEmptyFields(true);
            return;
        }
        setIsEmptyFields(false);
        const newAddress = {
            name: fullName,
            mobile: mobile,
            address: address,
        };
        await dispatch(addAddress({ id, addresses: [newAddress], token }));
        onClose(true, fullName, mobile, address, selectedUserIndex);
        setShow(false);
    };
    const handleClose2 = () => {
        setName('Delivery Address');
    };

    const handleClose3 = () => {
        if (fullName || mobile || address) {
            onClose(true, fullName, mobile, address, selectedUserIndex);
        } else {
            onClose(false);
        }
    };

    const handleClose5 = () => {
        onClose();
    };

    const handleClose6 = () => {
        onClose1();
    };

    useEffect(() => {
        dispatch(getPayment({ customerId }));
    }, []);

    const handleClose4 = async () => {
        if (!isPaymentComplete() && selectedCardIndex == null) {
            setIsEmptyFields(true);
            return;
        }
        console.log('check selected user card index', selectedCardIndex);
        setIsEmptyFields(false);
        const dateParts = expiryDate.split('/');

        const expMonth = parseInt(dateParts[0], 10);
        const expYear = parseInt(dateParts[1], 10);

        const res = await dispatch(addPayment({ name: username, cardNum, expMonth, expYear, CVC, title, email, token }));
        const custId = res.payload.customerId;
        await dispatch(updateCustomerId({ custId }));
        onClose(true, custId, selectedCardIndex);
    };

    const handleClose7 = () =>{
        onClose1(selectedCardIndex);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setSelectedFile(event.dataTransfer.files[0]);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleFileChange = (e) => {
        const selectedFiles = e.target.files;
        const firstFile = selectedFiles[0];
        const otherFiles = Array.from(selectedFiles).slice(1);
        setSelectedFile(firstFile);
        setRemainingFiles(otherFiles);
    };

    useEffect(() => {
        console.log('\n\nShow Images in UseEffect', selectedFile, remainingFiles);
    }, [selectedFile, remainingFiles]);

    const isInvalidCardNum = (cardNum) => {
        const cleanCardNum = cardNum.replace(/\D/g, '');
        return cleanCardNum.length !== 16;
    };

    useEffect(() => {
        if (addresses) {
            const initialUser = addresses[selectedUserIndex];
            setFullName(initialUser.name);
            setMobile(initialUser.mobile);
            setAddress(initialUser.address);
        }
    }, []);

    return (
        <>
            {((Name == 'Add Product') || (Name == 'Edit Product')) && (
                <EditWrapper show={show} onHide={handleClose6} width="700px" className='offcanvas.offcanvas-end' {...props}>
                    <Offcanvas.Header>
                        <Offcanvas.Title onClick={handleClose6}> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd" d="M5.85392 4.64592C5.90048 4.69236 5.93742 4.74754 5.96263 4.80828C5.98784 4.86903 6.00081 4.93415 6.00081 4.99992C6.00081 5.06568 5.98784 5.13081 5.96263 5.19155C5.93742 5.2523 5.90048 5.30747 5.85392 5.35392L3.20692 7.99992L5.85392 10.6459C5.90041 10.6924 5.93728 10.7476 5.96244 10.8083C5.9876 10.8691 6.00055 10.9342 6.00055 10.9999C6.00055 11.0657 5.9876 11.1308 5.96244 11.1915C5.93728 11.2522 5.90041 11.3074 5.85392 11.3539C5.80743 11.4004 5.75224 11.4373 5.6915 11.4624C5.63076 11.4876 5.56566 11.5005 5.49992 11.5005C5.43417 11.5005 5.36907 11.4876 5.30833 11.4624C5.24759 11.4373 5.19241 11.4004 5.14592 11.3539L2.14592 8.35392C2.09935 8.30747 2.06241 8.2523 2.0372 8.19155C2.012 8.13081 1.99902 8.06568 1.99902 7.99992C1.99902 7.93415 2.012 7.86903 2.0372 7.80828C2.06241 7.74754 2.09935 7.69236 2.14592 7.64592L5.14592 4.64592C5.19236 4.59935 5.24754 4.56241 5.30828 4.5372C5.36903 4.512 5.43415 4.49902 5.49992 4.49902C5.56568 4.49902 5.63081 4.512 5.69155 4.5372C5.7523 4.56241 5.80747 4.59935 5.85392 4.64592Z" fill="#007BFF" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M2.5 8C2.5 7.86739 2.55268 7.74021 2.64645 7.64645C2.74021 7.55268 2.86739 7.5 3 7.5H13.5C13.6326 7.5 13.7598 7.55268 13.8536 7.64645C13.9473 7.74021 14 7.86739 14 8C14 8.13261 13.9473 8.25979 13.8536 8.35355C13.7598 8.44732 13.6326 8.5 13.5 8.5H3C2.86739 8.5 2.74021 8.44732 2.64645 8.35355C2.55268 8.25979 2.5 8.13261 2.5 8Z" fill="#007BFF" />
                        </svg> {Name} </Offcanvas.Title>
                    </Offcanvas.Header>
                    <div className='border-bottoms ms-3 me-3' />
                    <Offcanvas.Body className='d-flex'>
                        <div className='browserAdjust'>
                            <div
                                className='widths'
                                onDrop={handleDrop}
                                onDragOver={handleDragOver}
                            >
                                {!selectedFile ? (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="auto" height="40" viewBox="0 0 40 40" fill="none">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="auto" height="40" viewBox="0 0 40 40" fill="none">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M19.115 12.865C19.2311 12.7486 19.3691 12.6562 19.5209 12.5932C19.6728 12.5302 19.8356 12.4978 20 12.4978C20.1644 12.4978 20.3272 12.5302 20.4791 12.5932C20.6309 12.6562 20.7689 12.7486 20.885 12.865L25.885 17.865C26.0012 17.9812 26.0934 18.1192 26.1563 18.271C26.2192 18.4229 26.2516 18.5856 26.2516 18.75C26.2516 18.9144 26.2192 19.0771 26.1563 19.229C26.0934 19.3808 26.0012 19.5188 25.885 19.635C25.7688 19.7512 25.6308 19.8434 25.479 19.9063C25.3271 19.9692 25.1644 20.0016 25 20.0016C24.8356 20.0016 24.6729 19.9692 24.521 19.9063C24.3692 19.8434 24.2312 19.7512 24.115 19.635L21.25 16.7675V26.25C21.25 26.5815 21.1183 26.8995 20.8839 27.1339C20.6495 27.3683 20.3315 27.5 20 27.5C19.6685 27.5 19.3505 27.3683 19.1161 27.1339C18.8817 26.8995 18.75 26.5815 18.75 26.25V16.7675L15.885 19.635C15.6503 19.8697 15.3319 20.0016 15 20.0016C14.6681 20.0016 14.3497 19.8697 14.115 19.635C13.8803 19.4003 13.7484 19.0819 13.7484 18.75C13.7484 18.4181 13.8803 18.0997 14.115 17.865L19.115 12.865Z" fill="#3C76FF" />
                                                <path d="M11.015 8.355C13.5137 6.20034 16.7006 5.01035 20 5C26.725 5 32.3075 10 32.915 16.4475C36.895 17.01 40 20.3425 40 24.4325C40 28.9225 36.255 32.5 31.7175 32.5H9.4525C4.27 32.5 0 28.415 0 23.295C0 18.8875 3.165 15.2375 7.355 14.3125C7.7125 12.155 9.1 10.005 11.015 8.355ZM12.6475 10.2475C10.755 11.88 9.765 13.8475 9.765 15.3875V16.5075L8.6525 16.63C5.16 17.0125 2.5 19.88 2.5 23.295C2.5 26.9625 5.575 30 9.4525 30H31.7175C34.95 30 37.5 27.47 37.5 24.4325C37.5 21.3925 34.95 18.8625 31.7175 18.8625H30.4675V17.6125C30.47 12.0625 25.82 7.5 20 7.5C17.2997 7.51079 14.6921 8.48358 12.6475 10.2475Z" fill="#3C76FF" />
                                            </svg>
                                        </svg>
                                        <p className='para'>Drag & Drop Files Here <br></br>or</p>
                                    </>
                                ) : (
                                    <img src={`http://localhost:4000/${selectedFile.name}`} className='ms-5' style={{ width: '80px', height: '80px' }} />
                                )}

                                <Form >
                                    <Form.Group controlId="formFile" >
                                        <div className='browse'>
                                            <input
                                                type="file"
                                                className='browse'
                                                id="customFile"
                                                onChange={handleFileChange}
                                                onClick={(e) => e.target.value = null}
                                                multiple
                                            />
                                        </div>
                                    </Form.Group>
                                </Form>
                                <input type="hidden" ref={selectedfileRef} value={selectedFile ? selectedFile.name : ''} />
                            </div>
                        </div>
                        <div className='d-flex flex-column w-75 ms-3'>
                            <Form.Label className='ms-2'>Product Name</Form.Label>
                            <Form.Control as="textarea" placeholder={placeholders[0]} rows={3} ref={productNameRef} />
                            <Form.Label className="ms-2 mt-4 ">Size</Form.Label>
                            <div className="d-flex flex-wrap justify-content-start ms-1">
                                {sizes.map((size, index) => (
                                    <Button
                                        key={index}
                                        variant="outline-dark"
                                        className={`me-2 mb-2 custom-size ${selectedSizes.includes(size) ? 'selected blue-border' : ''}`}
                                        onClick={() => handleSizeClick(size)}
                                    >
                                        {size}
                                    </Button>
                                ))}
                            </div>
                            <Form.Label className="ms-2 mt-4 ">Color</Form.Label>
                            <div className="d-flex flex-wrap justify-content-start ms-1">
                                {Object.keys(colorStyles).map((color, index) => (
                                    <Button
                                        key={index}
                                        variant="outline-dark"
                                        className={`me-2 mb-2 ${colorStyles[color]} ${selectedColors.includes(color) ? 'selected blue-border' : ''}`}
                                        onClick={() => handleColorClick(color)}
                                    >
                                        {color}
                                    </Button>
                                ))}
                            </div>
                            <Form.Label className="ms-2 mt-4 ">Price</Form.Label>
                            <Form.Control as="textarea" placeholder='$00.00' rows={1} ref={priceRef} />
                            <Form.Label className="ms-2 mt-4 ">Stock</Form.Label>
                            <Form.Control as="textarea" placeholder={placeholders[1]} rows={1} ref={stockRef} />
                            <Form.Label className="ms-2 mt-4 ">Rating</Form.Label>
                            <Form.Control as="textarea" rows={1} ref={ratingRef} />
                            <Button onClick={() => {
                                const productName = productNameRef.current.value;
                                const price = priceRef.current.value;
                                const stock = stockRef.current.value;
                                const rating = ratingRef.current.value;
                                const isAddProduct = Name === 'Add Product';

                                if (isAddProduct && (!productName || !price || !stock || !rating || !selectedSizes.length || !selectedColors.length)) {
                                    setError(true);
                                    console.log('check error', productName, price, stock, rating, selectedSizes, selectedColors);
                                    alert('Fill all Empty Fields!');
                                    return;
                                }
                                console.log('check values ', productName, price, stock, rating, selectedSizes, selectedColors);
                                handleClose(productName, price, stock, rating, selectedSizes, selectedColors);
                            }} className={`mt-5 custom-button ${Name === 'Add Product' && checksError ? 'disable-button' : ''}`}
                                disabled={false}
                            >
                                {text}</Button>
                        </div>
                    </Offcanvas.Body>
                </EditWrapper >
            )
            }

            {
                Name === 'Order Detail' && (
                    <>
                        {value === 'second' ?
                            (<EditWrapper show={show} onHide={handleClose5} width="1100px" className='offcanvas.offcanvas-end' {...props}>
                                <Offcanvas.Header>
                                    <Offcanvas.Title onClick={handleClose5}> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M5.85392 4.64592C5.90048 4.69236 5.93742 4.74754 5.96263 4.80828C5.98784 4.86903 6.00081 4.93415 6.00081 4.99992C6.00081 5.06568 5.98784 5.13081 5.96263 5.19155C5.93742 5.2523 5.90048 5.30747 5.85392 5.35392L3.20692 7.99992L5.85392 10.6459C5.90041 10.6924 5.93728 10.7476 5.96244 10.8083C5.9876 10.8691 6.00055 10.9342 6.00055 10.9999C6.00055 11.0657 5.9876 11.1308 5.96244 11.1915C5.93728 11.2522 5.90041 11.3074 5.85392 11.3539C5.80743 11.4004 5.75224 11.4373 5.6915 11.4624C5.63076 11.4876 5.56566 11.5005 5.49992 11.5005C5.43417 11.5005 5.36907 11.4876 5.30833 11.4624C5.24759 11.4373 5.19241 11.4004 5.14592 11.3539L2.14592 8.35392C2.09935 8.30747 2.06241 8.2523 2.0372 8.19155C2.012 8.13081 1.99902 8.06568 1.99902 7.99992C1.99902 7.93415 2.012 7.86903 2.0372 7.80828C2.06241 7.74754 2.09935 7.69236 2.14592 7.64592L5.14592 4.64592C5.19236 4.59935 5.24754 4.56241 5.30828 4.5372C5.36903 4.512 5.43415 4.49902 5.49992 4.49902C5.56568 4.49902 5.63081 4.512 5.69155 4.5372C5.7523 4.56241 5.80747 4.59935 5.85392 4.64592Z" fill="#007BFF" />
                                        <path fillRule="evenodd" clipRule="evenodd" d="M2.5 8C2.5 7.86739 2.55268 7.74021 2.64645 7.64645C2.74021 7.55268 2.86739 7.5 3 7.5H13.5C13.6326 7.5 13.7598 7.55268 13.8536 7.64645C13.9473 7.74021 14 7.86739 14 8C14 8.13261 13.9473 8.25979 13.8536 8.35355C13.7598 8.44732 13.6326 8.5 13.5 8.5H3C2.86739 8.5 2.74021 8.44732 2.64645 8.35355C2.55268 8.25979 2.5 8.13261 2.5 8Z" fill="#007BFF" />
                                    </svg> {Name}</Offcanvas.Title>
                                </Offcanvas.Header>
                                <div className='border-bottoms ms-3 me-3' />
                                <div className='d-flex mt-4 justify-content-between ms-3 me-3'>
                                    {headings.map((heading) => (
                                        <>
                                            <div className='d-flex flex-column' key={heading}>
                                                <span>{heading}</span>
                                                {heading === 'Products' ? (
                                                    <span>{item1.products.length}</span>
                                                ) : (
                                                    <span>{item1[heading]}</span>
                                                )}
                                            </div>
                                        </>
                                    ))}
                                </div>
                                <div className='border-bottoms_1 mt-5 ms-3 me-3' />
                                <h5 className='mt-3 ms-3 d-inline-flex'>Product Information</h5>
                                <Tables headings={headingsFromAPI_1} data={filteredData1} name='orderCart' />
                                {error && (
                                    <div style={{ color: 'red', display: 'flex', justifyContent: 'center' }}>
                                        {error}
                                    </div>
                                )}
                            </EditWrapper>) : (
                                <EditWrapper show={show} onHide={handleClose5} width="1100px" className='offcanvas.offcanvas-end' {...props}>
                                    <Offcanvas.Header>
                                        <Offcanvas.Title onClick={handleClose5}> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M5.85392 4.64592C5.90048 4.69236 5.93742 4.74754 5.96263 4.80828C5.98784 4.86903 6.00081 4.93415 6.00081 4.99992C6.00081 5.06568 5.98784 5.13081 5.96263 5.19155C5.93742 5.2523 5.90048 5.30747 5.85392 5.35392L3.20692 7.99992L5.85392 10.6459C5.90041 10.6924 5.93728 10.7476 5.96244 10.8083C5.9876 10.8691 6.00055 10.9342 6.00055 10.9999C6.00055 11.0657 5.9876 11.1308 5.96244 11.1915C5.93728 11.2522 5.90041 11.3074 5.85392 11.3539C5.80743 11.4004 5.75224 11.4373 5.6915 11.4624C5.63076 11.4876 5.56566 11.5005 5.49992 11.5005C5.43417 11.5005 5.36907 11.4876 5.30833 11.4624C5.24759 11.4373 5.19241 11.4004 5.14592 11.3539L2.14592 8.35392C2.09935 8.30747 2.06241 8.2523 2.0372 8.19155C2.012 8.13081 1.99902 8.06568 1.99902 7.99992C1.99902 7.93415 2.012 7.86903 2.0372 7.80828C2.06241 7.74754 2.09935 7.69236 2.14592 7.64592L5.14592 4.64592C5.19236 4.59935 5.24754 4.56241 5.30828 4.5372C5.36903 4.512 5.43415 4.49902 5.49992 4.49902C5.56568 4.49902 5.63081 4.512 5.69155 4.5372C5.7523 4.56241 5.80747 4.59935 5.85392 4.64592Z" fill="#007BFF" />
                                            <path fillRule="evenodd" clipRule="evenodd" d="M2.5 8C2.5 7.86739 2.55268 7.74021 2.64645 7.64645C2.74021 7.55268 2.86739 7.5 3 7.5H13.5C13.6326 7.5 13.7598 7.55268 13.8536 7.64645C13.9473 7.74021 14 7.86739 14 8C14 8.13261 13.9473 8.25979 13.8536 8.35355C13.7598 8.44732 13.6326 8.5 13.5 8.5H3C2.86739 8.5 2.74021 8.44732 2.64645 8.35355C2.55268 8.25979 2.5 8.13261 2.5 8Z" fill="#007BFF" />
                                        </svg> {Name}</Offcanvas.Title>
                                    </Offcanvas.Header>
                                    <div className='border-bottoms ms-3 me-3' />
                                    <div className='d-flex mt-4 justify-content-between ms-3 me-3'>
                                        {headings.map((heading) => (
                                            <div className='d-flex flex-column' key={heading}>
                                                <span>{heading}</span>
                                                {heading === 'Products' ? (
                                                    <span>{item.products.length}</span>
                                                ) : (
                                                    <span>{item[heading]}</span>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                    <div className='border-bottoms_1 mt-5 ms-3 me-3' />
                                    <h5 className='mt-3 ms-3 d-inline-flex'>Product Information</h5>
                                    <Tables headings={headingsFromAPI} data={filteredData} name='order' />
                                    {error && (
                                        <div style={{ color: 'red', display: 'flex', justifyContent: 'center' }}>
                                            {error}
                                        </div>
                                    )}
                                </EditWrapper>
                            )}
                    </>
                )
            }
            {
                Name === 'Uploaded File Errors' && (
                    <>
                        <EditWrapper show={show} onHide={handleClose5} width="500px" className='offcanvas.offcanvas-end' {...props}>
                            <Offcanvas.Header>
                                <Offcanvas.Title onClick={handleClose5}> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M5.85392 4.64592C5.90048 4.69236 5.93742 4.74754 5.96263 4.80828C5.98784 4.86903 6.00081 4.93415 6.00081 4.99992C6.00081 5.06568 5.98784 5.13081 5.96263 5.19155C5.93742 5.2523 5.90048 5.30747 5.85392 5.35392L3.20692 7.99992L5.85392 10.6459C5.90041 10.6924 5.93728 10.7476 5.96244 10.8083C5.9876 10.8691 6.00055 10.9342 6.00055 10.9999C6.00055 11.0657 5.9876 11.1308 5.96244 11.1915C5.93728 11.2522 5.90041 11.3074 5.85392 11.3539C5.80743 11.4004 5.75224 11.4373 5.6915 11.4624C5.63076 11.4876 5.56566 11.5005 5.49992 11.5005C5.43417 11.5005 5.36907 11.4876 5.30833 11.4624C5.24759 11.4373 5.19241 11.4004 5.14592 11.3539L2.14592 8.35392C2.09935 8.30747 2.06241 8.2523 2.0372 8.19155C2.012 8.13081 1.99902 8.06568 1.99902 7.99992C1.99902 7.93415 2.012 7.86903 2.0372 7.80828C2.06241 7.74754 2.09935 7.69236 2.14592 7.64592L5.14592 4.64592C5.19236 4.59935 5.24754 4.56241 5.30828 4.5372C5.36903 4.512 5.43415 4.49902 5.49992 4.49902C5.56568 4.49902 5.63081 4.512 5.69155 4.5372C5.7523 4.56241 5.80747 4.59935 5.85392 4.64592Z" fill="#007BFF" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M2.5 8C2.5 7.86739 2.55268 7.74021 2.64645 7.64645C2.74021 7.55268 2.86739 7.5 3 7.5H13.5C13.6326 7.5 13.7598 7.55268 13.8536 7.64645C13.9473 7.74021 14 7.86739 14 8C14 8.13261 13.9473 8.25979 13.8536 8.35355C13.7598 8.44732 13.6326 8.5 13.5 8.5H3C2.86739 8.5 2.74021 8.44732 2.64645 8.35355C2.55268 8.25979 2.5 8.13261 2.5 8Z" fill="#007BFF" />
                                </svg> {Name}</Offcanvas.Title>
                            </Offcanvas.Header>
                            <div className='border-bottoms ms-3 me-3 mb-3' />
                            <Tables headings={headings} data={data} name='third' />
                            {error && (
                                <div style={{ color: 'red', display: 'flex', justifyContent: 'center' }}>
                                    {error}
                                </div>
                            )}
                            <Button onClick={handleClose5} className=' mt-5 custom-button'>{text}</Button>
                        </EditWrapper>
                    </>
                )
            }
            {
                Name === 'Delivery Address' && (
                    <>
                        <EditWrapper show={show} onHide={handleClose3} width="600px" className='offcanvas.offcanvas-end' {...props}>
                            <Offcanvas.Header>
                                <Offcanvas.Title onClick={handleClose3}> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M5.85392 4.64592C5.90048 4.69236 5.93742 4.74754 5.96263 4.80828C5.98784 4.86903 6.00081 4.93415 6.00081 4.99992C6.00081 5.06568 5.98784 5.13081 5.96263 5.19155C5.93742 5.2523 5.90048 5.30747 5.85392 5.35392L3.20692 7.99992L5.85392 10.6459C5.90041 10.6924 5.93728 10.7476 5.96244 10.8083C5.9876 10.8691 6.00055 10.9342 6.00055 10.9999C6.00055 11.0657 5.9876 11.1308 5.96244 11.1915C5.93728 11.2522 5.90041 11.3074 5.85392 11.3539C5.80743 11.4004 5.75224 11.4373 5.6915 11.4624C5.63076 11.4876 5.56566 11.5005 5.49992 11.5005C5.43417 11.5005 5.36907 11.4876 5.30833 11.4624C5.24759 11.4373 5.19241 11.4004 5.14592 11.3539L2.14592 8.35392C2.09935 8.30747 2.06241 8.2523 2.0372 8.19155C2.012 8.13081 1.99902 8.06568 1.99902 7.99992C1.99902 7.93415 2.012 7.86903 2.0372 7.80828C2.06241 7.74754 2.09935 7.69236 2.14592 7.64592L5.14592 4.64592C5.19236 4.59935 5.24754 4.56241 5.30828 4.5372C5.36903 4.512 5.43415 4.49902 5.49992 4.49902C5.56568 4.49902 5.63081 4.512 5.69155 4.5372C5.7523 4.56241 5.80747 4.59935 5.85392 4.64592Z" fill="#007BFF" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M2.5 8C2.5 7.86739 2.55268 7.74021 2.64645 7.64645C2.74021 7.55268 2.86739 7.5 3 7.5H13.5C13.6326 7.5 13.7598 7.55268 13.8536 7.64645C13.9473 7.74021 14 7.86739 14 8C14 8.13261 13.9473 8.25979 13.8536 8.35355C13.7598 8.44732 13.6326 8.5 13.5 8.5H3C2.86739 8.5 2.74021 8.44732 2.64645 8.35355C2.55268 8.25979 2.5 8.13261 2.5 8Z" fill="#007BFF" />
                                </svg> {Name}</Offcanvas.Title>
                            </Offcanvas.Header>
                            <div className='border-bottoms ms-3 me-3 mb-3' />
                            <Form>
                                <Form.Group className="mb-3 ms-3 me-4 mt-2">
                                    <Form.Label className='mt-4' >
                                        Full Name
                                    </Form.Label>

                                    <Input
                                        type="text"
                                        placeholder={placeholders[0]}
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                    />
                                    <Row>
                                        <Col md={6}>
                                            <Form.Label className='mt-4'>
                                                Mobile #
                                            </Form.Label>
                                            <Input
                                                type="text"
                                                placeholder={placeholders[1]}
                                                value={mobile}
                                                onChange={(e) => setMobile(e.target.value)}
                                            />
                                        </Col>
                                        <Col md={6}>
                                            <Form.Label className='mt-4'>
                                                Country
                                            </Form.Label>
                                            <Input
                                                type="text"
                                                placeholder={placeholders[2]}
                                                value={country}
                                                onChange={(e) => setCountry(e.target.value)}
                                            />
                                        </Col>
                                        <Col md={6}>
                                            <Form.Label className='mt-4'>
                                                Province
                                            </Form.Label>
                                            <Input
                                                type="text"
                                                placeholder={placeholders[3]}
                                                value={province}
                                                onChange={(e) => setProvince(e.target.value)}
                                            />
                                        </Col>
                                        <Col md={6}>
                                            <Form.Label className='mt-4'>
                                                City
                                            </Form.Label>
                                            <Input
                                                type="text"
                                                placeholder={placeholders[4]}
                                                value={city}
                                                onChange={(e) => setCity(e.target.value)}
                                            />
                                        </Col>
                                    </Row>
                                    <Form.Label className='mt-4'>
                                        Address
                                    </Form.Label>

                                    <Input
                                        type="text"
                                        placeholder={placeholders[5]}
                                        className='Address-height'
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                    />
                                </Form.Group>
                            </Form>
                            {isEmptyFields && (
                                alert('Fill empty fields first')
                            )}

                            <Button onClick={handleClose1} disabled={!isFormComplete()}
                                className=' mt-3 custom-button1'>{text}</Button>
                        </EditWrapper>
                    </>
                )
            }
            {
                Name === 'Choose Address' && (
                    <>
                        <EditWrapper show={show} onHide={handleClose3} width="600px" className='offcanvas.offcanvas-end' {...props}>
                            <Offcanvas.Header>
                                <Offcanvas.Title onClick={handleClose3}> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M5.85392 4.64592C5.90048 4.69236 5.93742 4.74754 5.96263 4.80828C5.98784 4.86903 6.00081 4.93415 6.00081 4.99992C6.00081 5.06568 5.98784 5.13081 5.96263 5.19155C5.93742 5.2523 5.90048 5.30747 5.85392 5.35392L3.20692 7.99992L5.85392 10.6459C5.90041 10.6924 5.93728 10.7476 5.96244 10.8083C5.9876 10.8691 6.00055 10.9342 6.00055 10.9999C6.00055 11.0657 5.9876 11.1308 5.96244 11.1915C5.93728 11.2522 5.90041 11.3074 5.85392 11.3539C5.80743 11.4004 5.75224 11.4373 5.6915 11.4624C5.63076 11.4876 5.56566 11.5005 5.49992 11.5005C5.43417 11.5005 5.36907 11.4876 5.30833 11.4624C5.24759 11.4373 5.19241 11.4004 5.14592 11.3539L2.14592 8.35392C2.09935 8.30747 2.06241 8.2523 2.0372 8.19155C2.012 8.13081 1.99902 8.06568 1.99902 7.99992C1.99902 7.93415 2.012 7.86903 2.0372 7.80828C2.06241 7.74754 2.09935 7.69236 2.14592 7.64592L5.14592 4.64592C5.19236 4.59935 5.24754 4.56241 5.30828 4.5372C5.36903 4.512 5.43415 4.49902 5.49992 4.49902C5.56568 4.49902 5.63081 4.512 5.69155 4.5372C5.7523 4.56241 5.80747 4.59935 5.85392 4.64592Z" fill="#007BFF" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M2.5 8C2.5 7.86739 2.55268 7.74021 2.64645 7.64645C2.74021 7.55268 2.86739 7.5 3 7.5H13.5C13.6326 7.5 13.7598 7.55268 13.8536 7.64645C13.9473 7.74021 14 7.86739 14 8C14 8.13261 13.9473 8.25979 13.8536 8.35355C13.7598 8.44732 13.6326 8.5 13.5 8.5H3C2.86739 8.5 2.74021 8.44732 2.64645 8.35355C2.55268 8.25979 2.5 8.13261 2.5 8Z" fill="#007BFF" />
                                </svg> {Name}</Offcanvas.Title>
                            </Offcanvas.Header>
                            <div className='border-bottoms ms-3 me-3' />
                            <Button onClick={handleClose2} className='mt-3 ms-2 custom-button3' >Add New</Button>
                            {addresses.map((user, index) => (
                                <div key={index} className='UpperDiv border mt-4 py-2 mx-2 back'>
                                    <div className='d-flex ms-3 mt-1 small justify-content-between me-2'>
                                        <div className='fw-bold'>
                                            {user?.name}
                                        </div>
                                        <Button
                                            className={`btn btn-light border border-primary change-size ${selectedUserIndex === index
                                                ? 'text-primary'
                                                : 'text-secondary border border-secondary'
                                                }`}
                                            onClick={() => handleButtonClick(index, user?.name, user?.mobile, user?.address)}
                                        >
                                            {selectedUserIndex === index ? 'Selected' : 'Select'}
                                        </Button>
                                    </div>
                                    <div className='d-flex ms-3 small'>
                                        <div>{user?.mobile}</div>
                                    </div>
                                    <div className='d-flex ms-3 mt-1 small'>
                                        <div>{user?.address}</div>
                                    </div>
                                </div>
                            ))}
                            <Button onClick={handleClose3} className=' mt-3 custom-button1'>{text}</Button>
                        </EditWrapper>
                    </>
                )
            }
            {
                Name === 'Add Payment Method' && (
                    <>
                        <EditWrapper show={show} onHide={handleClose3} width="600px" className='offcanvas.offcanvas-end' {...props}>
                            <Offcanvas.Header>
                                <Offcanvas.Title onClick={handleClose3}> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M5.85392 4.64592C5.90048 4.69236 5.93742 4.74754 5.96263 4.80828C5.98784 4.86903 6.00081 4.93415 6.00081 4.99992C6.00081 5.06568 5.98784 5.13081 5.96263 5.19155C5.93742 5.2523 5.90048 5.30747 5.85392 5.35392L3.20692 7.99992L5.85392 10.6459C5.90041 10.6924 5.93728 10.7476 5.96244 10.8083C5.9876 10.8691 6.00055 10.9342 6.00055 10.9999C6.00055 11.0657 5.9876 11.1308 5.96244 11.1915C5.93728 11.2522 5.90041 11.3074 5.85392 11.3539C5.80743 11.4004 5.75224 11.4373 5.6915 11.4624C5.63076 11.4876 5.56566 11.5005 5.49992 11.5005C5.43417 11.5005 5.36907 11.4876 5.30833 11.4624C5.24759 11.4373 5.19241 11.4004 5.14592 11.3539L2.14592 8.35392C2.09935 8.30747 2.06241 8.2523 2.0372 8.19155C2.012 8.13081 1.99902 8.06568 1.99902 7.99992C1.99902 7.93415 2.012 7.86903 2.0372 7.80828C2.06241 7.74754 2.09935 7.69236 2.14592 7.64592L5.14592 4.64592C5.19236 4.59935 5.24754 4.56241 5.30828 4.5372C5.36903 4.512 5.43415 4.49902 5.49992 4.49902C5.56568 4.49902 5.63081 4.512 5.69155 4.5372C5.7523 4.56241 5.80747 4.59935 5.85392 4.64592Z" fill="#007BFF" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M2.5 8C2.5 7.86739 2.55268 7.74021 2.64645 7.64645C2.74021 7.55268 2.86739 7.5 3 7.5H13.5C13.6326 7.5 13.7598 7.55268 13.8536 7.64645C13.9473 7.74021 14 7.86739 14 8C14 8.13261 13.9473 8.25979 13.8536 8.35355C13.7598 8.44732 13.6326 8.5 13.5 8.5H3C2.86739 8.5 2.74021 8.44732 2.64645 8.35355C2.55268 8.25979 2.5 8.13261 2.5 8Z" fill="#007BFF" />
                                </svg> {Name} </Offcanvas.Title>
                            </Offcanvas.Header>
                            <div className='border-bottoms ms-3 me-3 mb-3' />
                            <Form>
                                <Form.Group className="mb-3 ms-3 me-4 mt-2">
                                    <Form.Label className='mt-4'>
                                        Card number
                                    </Form.Label>

                                    <Input
                                        type="text"
                                        value={cardNum}
                                        onChange={(e) => setCardNum(e.target.value)}
                                        placeholder={placeholders[0]}
                                        className={isInvalidCardNum(cardNum) ? 'text-danger' : ''}
                                    />
                                    <Row>
                                        <Col >
                                            <Form.Label className='mt-4'>
                                                Expiry date
                                            </Form.Label>
                                            <Input
                                                type="text"
                                                placeholder={placeholders[1]}
                                                value={expiryDate}
                                                onChange={(e) => setExpiryDate(e.target.value)}
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col >
                                            <Form.Label className='mt-4'>
                                                CVC
                                            </Form.Label>
                                            <Input
                                                type="text"
                                                placeholder={placeholders[2]}
                                                value={CVC}
                                                onChange={(e) => setCVC(e.target.value)}
                                            />
                                        </Col>
                                    </Row>
                                    <Form.Label className='mt-4'>
                                        Title
                                    </Form.Label>
                                    <Input
                                        type="text"
                                        placeholder={placeholders[3]}
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </Form.Group>
                            </Form>
                            {isEmptyFields && (
                                alert('Fill empty fields first')
                            )}
                            <Button onClick={() => {
                                if (!isInvalidCardNum(cardNum)) {
                                    handleClose4();
                                } else {
                                    alert('Card number is not valid.');
                                }
                            }} className='mt-3 custom-button1' disabled={!isPaymentComplete()}>{text}</Button>
                        </EditWrapper>
                    </>
                )
            }
            {
                Name === 'Payment Method' && (
                    <>
                        <EditWrapper show={show} onHide={handleClose5} width="600px" className='offcanvas.offcanvas-end' {...props}>
                            <Offcanvas.Header>
                                <Offcanvas.Title onClick={handleClose5}> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M5.85392 4.64592C5.90048 4.69236 5.93742 4.74754 5.96263 4.80828C5.98784 4.86903 6.00081 4.93415 6.00081 4.99992C6.00081 5.06568 5.98784 5.13081 5.96263 5.19155C5.93742 5.2523 5.90048 5.30747 5.85392 5.35392L3.20692 7.99992L5.85392 10.6459C5.90041 10.6924 5.93728 10.7476 5.96244 10.8083C5.9876 10.8691 6.00055 10.9342 6.00055 10.9999C6.00055 11.0657 5.9876 11.1308 5.96244 11.1915C5.93728 11.2522 5.90041 11.3074 5.85392 11.3539C5.80743 11.4004 5.75224 11.4373 5.6915 11.4624C5.63076 11.4876 5.56566 11.5005 5.49992 11.5005C5.43417 11.5005 5.36907 11.4876 5.30833 11.4624C5.24759 11.4373 5.19241 11.4004 5.14592 11.3539L2.14592 8.35392C2.09935 8.30747 2.06241 8.2523 2.0372 8.19155C2.012 8.13081 1.99902 8.06568 1.99902 7.99992C1.99902 7.93415 2.012 7.86903 2.0372 7.80828C2.06241 7.74754 2.09935 7.69236 2.14592 7.64592L5.14592 4.64592C5.19236 4.59935 5.24754 4.56241 5.30828 4.5372C5.36903 4.512 5.43415 4.49902 5.49992 4.49902C5.56568 4.49902 5.63081 4.512 5.69155 4.5372C5.7523 4.56241 5.80747 4.59935 5.85392 4.64592Z" fill="#007BFF" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M2.5 8C2.5 7.86739 2.55268 7.74021 2.64645 7.64645C2.74021 7.55268 2.86739 7.5 3 7.5H13.5C13.6326 7.5 13.7598 7.55268 13.8536 7.64645C13.9473 7.74021 14 7.86739 14 8C14 8.13261 13.9473 8.25979 13.8536 8.35355C13.7598 8.44732 13.6326 8.5 13.5 8.5H3C2.86739 8.5 2.74021 8.44732 2.64645 8.35355C2.55268 8.25979 2.5 8.13261 2.5 8Z" fill="#007BFF" />
                                </svg> {Name}</Offcanvas.Title>
                            </Offcanvas.Header>
                            <div className='border-bottoms ms-3 me-3 mb-3' />
                            <div className='d-flex'>
                                {cards.map((card, index) => (
                                    <div key={index}
                                    className={'ms-3 mt-4 payment-size3'}
                                    style={{
                                        border: selectedCardIndex === index ? '2px solid #007BFF' : '1px solid #000',
                                        cursor: 'pointer',
                                      }}
                                        onClick={() => setSelectedCardIndex(index)}
                                    >
                                        <div className='ms-2 mt-2'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="33" viewBox="0 0 50 33" fill="none">
                                                <path d="M45.3122 0.515625H4.68717C2.38599 0.515625 0.520508 2.36245 0.520508 4.64062V28.3594C0.520508 30.6376 2.38599 32.4844 4.68717 32.4844H45.3122C47.6134 32.4844 49.4788 30.6376 49.4788 28.3594V4.64062C49.4788 2.36245 47.6134 0.515625 45.3122 0.515625Z" fill="white" stroke="black" strokeOpacity="0.2" strokeWidth="0.5" />
                                                <path d="M5.80745 12.1985C4.71757 11.6067 3.47371 11.1308 2.08301 10.8005L2.14134 10.5433H7.84338C8.61626 10.5701 9.24341 10.8003 9.44748 11.6133L10.6867 17.4623L11.0663 19.224L14.5371 10.5433H18.2847L12.714 23.2599H8.96627L5.80745 12.1985ZM21.0413 23.2734H17.4972L19.7139 10.5433H23.2578L21.0413 23.2734ZM33.8888 10.8545L33.4068 13.6034L33.0863 13.4682C32.445 13.2108 31.5985 12.9536 30.4463 12.9808C29.0471 12.9808 28.4195 13.5357 28.405 14.0775C28.405 14.6735 29.1641 15.0662 30.4037 15.6487C32.4456 16.5561 33.3927 17.6665 33.3785 19.1156C33.3498 21.7566 30.9289 23.4631 27.2102 23.4631C25.6202 23.4494 24.0888 23.1373 23.2576 22.7856L23.7535 19.928L24.2202 20.1314C25.3724 20.6058 26.1305 20.8085 27.5455 20.8085C28.5658 20.8085 29.6599 20.4154 29.6738 19.5626C29.6738 19.0073 29.2077 18.6007 27.8366 17.9777C26.4951 17.368 24.7014 16.3525 24.7305 14.5241C24.7456 12.0459 27.2102 10.3125 30.7101 10.3125C32.081 10.3125 33.1898 10.5969 33.8888 10.8545ZM38.5992 18.7636H41.5449C41.3992 18.1271 40.7281 15.0799 40.7281 15.0799L40.4804 13.983C40.3054 14.4569 39.9994 15.229 40.0141 15.2018C40.0141 15.2018 38.891 18.0322 38.5992 18.7636ZM42.9738 10.5433L45.833 23.2732H42.5516C42.5516 23.2732 42.2304 21.8106 42.1287 21.3636H37.5784C37.4468 21.702 36.8346 23.2732 36.8346 23.2732H33.1159L38.3802 11.5995C38.7449 10.7733 39.3872 10.5433 40.2325 10.5433H42.9738Z" fill="#171E6C" />
                                            </svg>
                                            {card.brand} Card
                                        </div>
                                        <div className='d-flex justify-content-between mt-2'>
                                            <div className='mt-1 ms-2'>**** **** **** {card.last4}</div>
                                        </div>
                                        <div className='d-flex ms-2 mt-2'>
                                            <div>{card.exp_month} / {card.exp_year}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className='border-bottoms ms-3 mt-4 me-3 mb-3' />
                            <Offcanvas.Header>
                                <Offcanvas.Title>Add Payment Method</Offcanvas.Title>
                            </Offcanvas.Header>
                            <Form>
                                <Form.Group className="mb-3 ms-3 me-4 ">
                                    <Form.Label className='mt-1'>
                                        Card number
                                    </Form.Label>

                                    <Input
                                        type="text"
                                        value={cardNum}
                                        onChange={(e) => setCardNum(e.target.value)}
                                        placeholder={placeholders[0]}
                                        className={isInvalidCardNum(cardNum) ? 'text-danger' : ''}
                                    />
                                    <Row>
                                        <Col md={6}>
                                            <Form.Label className='mt-4'>
                                                Expiry date
                                            </Form.Label>
                                            <Input
                                                type="text"
                                                placeholder={placeholders[1]}
                                                value={expiryDate}
                                                onChange={(e) => setExpiryDate(e.target.value)}
                                            />
                                        </Col>
                                        <Col md={6}>
                                            <Form.Label className='mt-4'>
                                                CVC
                                            </Form.Label>
                                            <Input
                                                type="text"
                                                placeholder={placeholders[2]}
                                                value={CVC}
                                                onChange={(e) => setCVC(e.target.value)}
                                            />
                                        </Col>
                                    </Row>
                                    <Form.Label className='mt-4'>
                                        Title
                                    </Form.Label>
                                    <Input
                                        type="text"
                                        placeholder={placeholders[3]}
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </Form.Group>
                            </Form>
                            {selectedCardIndex != null && (
                                handleClose7()
                            )}
                            {isEmptyFields && (
                                alert('Fill empty fields first')
                            )}
                            <Button onClick={() => {
                                if (!isInvalidCardNum(cardNum)) {
                                    handleClose4();
                                } else {
                                    alert('Card number is not valid.');
                                }
                            }} className='mt-3 custom-button1' disabled={!isPaymentComplete()}>{text}</Button>
                        </EditWrapper>
                    </>
                )
            }
        </>
    );
}

function Example({
    state = false,
    onClose,
    onClose1,
    placeholders = null,
    name, text,
    data = null,
    headings = null,
    value = null,
    index = null,
    orderDetail = null,
    addresses = null,
    clickedIndex = null
}) {
    return (
        <>
            <OffCanvasExample
                onClose={onClose}
                onClose1={onClose1}
                state={state}
                placement='end'
                name={name}
                placeholders={placeholders}
                text={text}
                data={data}
                headings={headings}
                value={value}
                index={index}
                orderDetail={orderDetail}
                addresses={addresses}
                clickedIndex={clickedIndex} />
        </>
    );
}

export default Example;