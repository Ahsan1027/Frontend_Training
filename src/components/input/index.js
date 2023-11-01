import React from 'react';
import Form from 'react-bootstrap/Form';

const Input = ({ type, id, value, onChange, placeholder,className }) => {
  return (
      <Form.Control
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={className}
        required
      />
  );
};

export default Input;
