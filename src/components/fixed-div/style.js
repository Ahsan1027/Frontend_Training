import styled from 'styled-components';
const FixeddivWrapper = styled.div`
position: fixed;
margin-top: 40px;
z-index: 0;
.div-size{
    width: 608px;
height: 630px;
margin-left: auto;
}
.color{
    background: var(--global-09-white, #FFF);
}
.no-left-margin {
  margin-left: 0 !important;
}

.div2-size{
    width: 231px;
    height: 100px;

}

.image-size{
    width: 332px;
height: 350px;
flex-shrink: 0;
}

.custom-size{
        color: var(--global-08-dark, #343A40);
text-align: center;
/* height: 10px; */

/* Components/Buttons/Small */
font-family: Inter;
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: 21px; /* 150% */
    }

.custom-size1{
    width: 345px;
height: 65px;
flex-shrink: 0;
}

.width1{
    padding: 6px 16px;
    /* height: auto; */
    border-radius: 4px;
background: var(--components-forms-disabled-fill, #E9ECEF);
}

.width{
    /* width: 80px; */
    padding: 6px 30px;
    /* margin-left: 14px; */
    margin-right: 14px;
}

.custom-size2{
    width: 71px;
height: 72px;
flex-shrink: 0;
}

.Green{
    width: 28px;
height: 28px;
background: #155724;
}

.Grey{  width: 28px;
height: 28px;
background: #AAA;}
.Black{
    width: 28px;
height: 28px;
background: #1B1E21;
}
.Purple{  width: 28px;
height: 28px;
background: #231579;}
.Maroon{  width: 28px;
height: 28px;
background: #740F0F;}
.blue-border {
  border: 2px solid blue;
}
`;

export default FixeddivWrapper;