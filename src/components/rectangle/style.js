import styled from 'styled-components';
const RectangleWrapper = styled.div`
width: auto;
height: 110px;
flex-shrink: 0;
/* display: flex; */

.custom-border{
    border: 1px solid var(--components-bradcrumb-fill, #E9ECEF);
background: var(--global-09-white, #FFF);
width: 300px;
height:100px;

}

.custom-size{
    color: var(--components-forms-input-text, #495057);
text-align: center;

/* Components/Popovers/Body */
font-family: Inter;
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: 20px; /* 142.857% */
}
`;
export default RectangleWrapper;