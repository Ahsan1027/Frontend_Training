import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Image, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { notification } from 'antd';
import { addToCart } from '../../redux/Slices/user-cart-slice';
// import { getProductData } from '../../redux/Slices/products-slice';
import SidedivWrapper from './style';
import { useNavigate } from 'react-router-dom';

const Fixeddiv = (
    {
        check = null,
        // Index = 0,
        data = null,
    }
) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // let { productsData } = useSelector((state) => state.fetch);
    const [quantity, setQuantity] = useState(1);
    // const [newIndex, setIndex] = useState(0);
    const [newColorIndex, setColorIndex] = useState();
    const [newSizeIndex, setSizeIndex] = useState();
    const [selectedThumbnail, setSelectedThumbnail] = useState(null);

    const colorClassMap = {
        'Green': 'Green',
        'Grey': 'Grey',
        'Black': 'Black',
        'Purple': 'Purple',
        'Maroon': 'Maroon',
    };

    const handleIncrement = () => {
        const newQuantity = quantity + 1;
        const stockQuantity = data?.stock;
        if (newQuantity <= stockQuantity) {
            setQuantity(quantity + 1);
        } else {
            notification.error({
                message: 'Error',
                description: 'Not enough Stock !',
                type: 'error',
                duration: 1.5,
            });
        }
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleLogin = () => {
        navigate('/login');
    };

    const handleShopping = () => {
        const selectedColor = data?.colors[newColorIndex];
        const selectedSize = data?.sizes[newSizeIndex];

        if (!selectedColor || !selectedSize) {
            notification.info({
                message: 'Info',
                description: 'Please select color and size !',
                type: 'info',
                duration: 1.5,
            });
            return;
        }
        const newQuantity = quantity;
        const stockQuantity = data?.stock;
        if (newQuantity <= stockQuantity) {
            setQuantity(quantity + 1);
        } else {
            notification.info({
                message: 'Info',
                description: 'Not enough Stock !',
                type: 'info',
                duration: 1.5,
            });
            return;
        }

        const data1 = {
            product: data,
            color: data?.colors[newColorIndex],
            size: data?.sizes[newSizeIndex],
            quantity: quantity,
        };
        if (quantity == 0) {
            notification.error({
                message: 'Error',
                description: 'Select atleast 1 quantity !',
                type: 'error',
                duration: 1.5,
            });
        } else {
            dispatch(addToCart(data1));
            navigate('/shopping-page');
        }
    };

    return (
        <SidedivWrapper>
            <Container className='ms-auto'>
                <Row>
                    {data &&
                        <>
                            <Col lg={6} md={3} sm={2}>
                                <div className="p-2 mt-4 border div-size mx-auto justify-content-end color ">
                                    <Image className='image-size' src={`http://localhost:4000/${selectedThumbnail || data?.thumbnail}`} />
                                    <div className='mt-4 custom-size1 d-flex justify-content-between'>
                                        <div className='d-flex align-items-center  '>
                                        </div>
                                        <div className='image-container d-flex'>
                                            {data?.images.map((image, index) => (
                                                <div
                                                    key={index}
                                                    className='custom-size2 border'
                                                    onClick={() => setSelectedThumbnail(image)}
                                                >
                                                    <Image
                                                        className='mt-1 ms-1'
                                                        src={`http://localhost:4000/${image}`}
                                                        style={{ height: '50px' }}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                        <div className='d-flex align-items-center'></div>
                                    </div>
                                    <div className='border mt-4 mx-3' />
                                    <div className='mt-3 ms-2'>
                                        Quantity:
                                        <div className='mt-2 d-flex'>
                                            <div className='border width1' onClick={handleDecrement} role='button'>
                                                <div>-</div>
                                            </div>
                                            <div className='width'>
                                                <input
                                                    value={quantity}
                                                    onChange={(e) => {
                                                        const newQuantity = parseInt(e.target.value, 10);
                                                        if (!isNaN(newQuantity) && newQuantity > 0) {
                                                            setQuantity(newQuantity);
                                                        }
                                                    }}
                                                    style={{ width: '60px' }}
                                                />
                                            </div>
                                            <div className='border width1' onClick={handleIncrement} role='button'>
                                                <div>+</div>
                                            </div>
                                        </div>
                                    </div>
                                    {check === 'invalid' ?
                                        (<Button onClick={handleLogin} className='w-100 my-3'>Add to Cart</Button>)
                                        :
                                        (
                                            <Button onClick={handleShopping} className='w-100 my-3'>Add to Cart</Button>
                                        )}
                                </div>
                            </Col>
                            <>
                                <Col lg={4} sm={4} md={4} className='d-flex flex-column no-left-margin'>
                                    <>
                                        <div className='mt-5 ms-3 '>{data?.title}</div>
                                        <div className='ms-3 mt-4 fw-bold'>Color:
                                            <div className='d-flex mt-2' >
                                                {data?.colors.map((color, colorIndex) => (
                                                    <div
                                                        key={colorIndex}
                                                        onClick={() => setColorIndex(colorIndex)}
                                                        className={`mx-1 ${colorClassMap[color]} ${colorIndex === newColorIndex ? 'blue-border' : ''}`}
                                                        style={{ background: color }}
                                                    ></div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className='ms-3 mt-3 fw-bold'>Sizes:
                                            <div className="d-flex flex-wrap justify-content-start ms-1 mt-2">
                                                {data?.sizes.map((size, sizeIndex) => (
                                                    <Button
                                                        key={sizeIndex}
                                                        onClick={() => setSizeIndex(sizeIndex)}
                                                        variant="outline-dark"
                                                        className={`me-2 mb-2 ${sizeIndex === newSizeIndex ? 'blue-border' : ''}`}
                                                    >
                                                        {size}
                                                    </Button>
                                                ))}
                                            </div>
                                        </div>
                                        <div className='ms-3 mt-3'>
                                            <div className='d-flex'>
                                                <div className=''>Price:</div>
                                                <div className='ms-3 fw-bold text-primary'>${data?.price}</div>
                                            </div>
                                        </div>
                                    </>
                                </Col>
                            </>
                        </>
                    }



                </Row>
            </Container>
        </SidedivWrapper>
    );
};

export default Fixeddiv;
