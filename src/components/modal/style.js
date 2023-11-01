import styled from 'styled-components';
import { Modal } from 'react-bootstrap';
const ModalWrapper = styled(Modal)`

.custom-size{
    margin-left: 300px;
    /* justify-content: center;
    align-items: center; */
}

.para-size{
    /* margin-left: 300px; */
    color: var(--Body-Color, #5A5F7D);
text-align: center;
/* Body/Small */
font-family: Inter;
font-size: 12.8px;
font-style: normal;
font-weight: 400;
line-height: 19.2px; /* 150% */
}

.outline-size{
    width: 648px;
height: 154px;
flex-shrink: 0;
border-radius: 8px;
border: 1px dashed var(--V-Light, #D9D9D9);
}
.modal-style {
    border: none;
}
`;
export default ModalWrapper;