import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Image } from 'react-bootstrap';
import Button from '../button';
import SidedivWrapper from './style';

const Sidediv = ({ data, newIndex }) => {
  const changeIndex = (value) => {
    newIndex(value);
  };

  return (
    <SidedivWrapper>
      <Container >
        <Row >
          {data?.map((data, index) => (
            <Col key={index} className='' lg={6}  >
              <div className="p-2 mt-4 border div-size">
                <div className='w-100 border h-50'>
                  <Image src={`http://localhost:4000/${data.thumbnail}`} style={{ height: '200px' }} />
                </div>
                <div className='div2-size mt-4'>{data.title}</div>
                <span >Price:</span>
                <span className='ms-2 text-primary'>Rs {data.price}</span>
                {data?.stock === 0 ? (
                  <Button className='d-flex ms-auto btn btn-secondary' disabled>Out of Stock</Button>
                ) : (
                  <Button onClick={() => changeIndex(index)} className='d-flex ms-auto'>Details</Button>
                )}
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </SidedivWrapper>
  );
};

export default Sidediv;
