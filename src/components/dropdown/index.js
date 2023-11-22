import React from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import DropDownWrapper from './style';

function Dropdowns({
    names = null,
    actions = [],
    onPriceChange = null,
    onSelect = null,
    onSelectColor = null,
    onSelectSize = null
}) {
    const handleActionClick = (action) => {
        if (action.startsWith('All')) {
            onPriceChange(0, 0);
        } else if (action === 'Asc' || action === 'Desc') {
            const order = action.toLowerCase();
            onSelect(order);
        } else if (action == 'Black' || action == 'Green' || action == 'Grey' || action == 'Maroon' || action == 'Purple') {
            onSelectColor(action);
        } else if (action == 'XS' || action == 'S' || action == 'M' || action == 'L' || action == 'XL' || action == '2XL' || action == '3XL') {
            onSelectSize(action);
        } else if (action == 'NoSize') {
            onSelectSize('');
        } else if (action == 'NoColor') {
            onSelectColor('');
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
                    {actions.map((action, index) => (
                        <Dropdown.Item
                            key={index}
                            eventKey={index.toString()}
                            className={index < actions.length - 1 ? 'border-bottom' : ''}
                            onClick={() => handleActionClick(action)}
                        >
                            {action}
                        </Dropdown.Item>
                    ))}
                </DropdownButton>
            </DropDownWrapper>
        </>
    );
}

export default Dropdowns;
