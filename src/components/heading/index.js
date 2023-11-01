import React from 'react';
import Container from 'react-bootstrap/Container';

const Heading = ({ text, style }) => {
    return (
        <>
            <Container>
                <h2 className="text-primary" style={style} >{text}</h2>
            </Container>
        </>
    );
};

export default Heading;
