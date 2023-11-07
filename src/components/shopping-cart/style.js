import styled from 'styled-components';
const ShoppingWrapper = styled.div`

.div-size{
/* width: 289px; */
height: 118px;
background: var(--global-09-white, #FFF);
}

.div3-size{
    height:30px;
    width:auto;
}

.div2-size{
    width: 300px;
    height: 40px;
    color: var(--components-forms-input-text, #495057);
font-family: Inter;
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: 21px; 
}

.div4-size{
width: fit-content; 
height: 110px;
}

.div5-size{
/* width: auto; */
height: 130px;
}

.containerAdjust{
    width:700px;
}

.QuantityAdjust{
    /* display:f; */
    /* justify-content: start; */
    /* margin-top: 200px; */
    width: 200px;
    height:80px;
    color: var(--components-forms-input-text, #495057);
    margin-left: 380px;
    margin-top: -20px;
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 21px; 
}



.deleteAdjust{
    color: var(--components-forms-input-text, #495057);
    margin-left: 580px;
    margin-top: -60px;
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 21px; 
    border:none;
    background: var(--global-09-white, #FFF);
}

.width{
    width: 80px;
    padding: 6px 30px;
    margin-left: 14px;
    margin-right: 14px;
}
.btn-color{
    background: var(--components-forms-disabled-fill, #E9ECEF);
    border-color: var(--components-forms-disabled-fill, #E9ECEF);;
}
.width-text{
    /* width: 230px; */
}

.back{
    background: var(--global-09-white, #FFF);
}

`;

export default ShoppingWrapper;