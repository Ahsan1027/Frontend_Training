import React from 'react';
import { Button } from 'react-bootstrap';

const Buttons = ({ onClick,type, children, style, className }) => {
    return (
        <Button type={type} className={className} style={style} onClick={onClick}>
            {children}
        </Button>
    );
};

export default Buttons;
