import React from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import DropDownWrapper from './style';

function Dropdowns({
    names = null,
    Action1 = null,
    Action2 = null,
    Action3 = null,
    Action4 = null,
    Action5 = null,
    Action6 = null,
    Action7 = null,
    Action8 = null,
    onPriceChange,
    onSelect
}) {
    const handleActionClick = (action) => {
        if (action.startsWith('All')) {
            onPriceChange(0, 0);
        } else if (action === 'Asc' || action === 'Desc') {
            const order = action.toLowerCase();
            onSelect(order);
        } else {
            const [min, max] = action.split(' - ');
            onPriceChange(min, max);
        }
    };
    return (
        <>
            <DropDownWrapper>
                <DropdownButton
                    as={ButtonGroup}
                    id={`dropdown-variants-${names}`}
                    variant={names.toLowerCase()}
                    title={names}
                    className='border mx-2 color'
                >
                    {Action7 && Action8 ? (
                        <>
                            <Dropdown.Item eventKey="1" className='border-bottom' onClick={() => handleActionClick(Action7)}>
                                {Action7}
                            </Dropdown.Item>
                            <Dropdown.Item eventKey="2" className='border-bottom' onClick={() => handleActionClick(Action8)}>
                                {Action8}
                            </Dropdown.Item>
                        </>
                    ) : (
                        <>
                            <Dropdown.Item eventKey="1" className='border-bottom' onClick={() => handleActionClick(Action1)}>
                                {Action1}
                            </Dropdown.Item>
                            <Dropdown.Item eventKey="2" className='border-bottom' onClick={() => handleActionClick(Action2)}>
                                {Action2}
                            </Dropdown.Item>
                            <Dropdown.Item eventKey="3" className='border-bottom' onClick={() => handleActionClick(Action3)}>
                                {Action3}
                            </Dropdown.Item>
                            <Dropdown.Item eventKey="4" className='border-bottom' onClick={() => handleActionClick(Action4)}>
                                {Action4}
                            </Dropdown.Item>
                            <Dropdown.Item eventKey="5" className='border-bottom' onClick={() => handleActionClick(Action5)}>
                                {Action5}
                            </Dropdown.Item>
                            <Dropdown.Item eventKey="6" onClick={() => handleActionClick(Action6)}>
                                {Action6}
                            </Dropdown.Item>
                        </>
                    )}
                </DropdownButton>
            </DropDownWrapper>

        </>
    );
}

export default Dropdowns;