import styled from 'styled-components';
import { Offcanvas } from 'react-bootstrap';
const EditWrapper = styled(Offcanvas)`
/* width: 500px; */
&.offcanvas{
    width: ${(props) => props.width ? props.width : '400px'};
}


.ContainerSize{
    display: flex;
    width: 350px;
    height: 200px;
    padding: 8px; /* Adjust the padding here */
    box-sizing: border-box; /* Include padding in the width and height calculations */
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    border-radius: 4px;
    border: 1px solid var(--components-forms-input-border, #CED4DA);
    background: var(--global-09-white, #FFF);
    overflow: hidden;
}

.PlaceAdjust{
    color: var(--components-image-fill, #868E96);

        /* Body/Small */
        font-family: Inter;
        font-size: 12.8px;
        font-style: normal;
        font-weight: 400;
        line-height: 19.2px; /* 150% */
        display: flex;
    /* padding: 4px 8px 25px 8px; */
        justify-content: center;
        align-items: center;
        align-self: stretch;
        border-radius: 4px;
        border: 1px solid var(--components-forms-input-border, #CED4DA);
        background: var(--global-09-white, #FFF);

        max-width: 450px; /* Set a maximum width to limit the width of the container */
        margin-left: 240px;
        
        padding: 18px;
}

.ProductName{
        display: flex;
        /* padding-bottom: 0px; */
        flex-direction: column;
        /* border: 1px solid var(--components-forms-input-border, #CED4DA); */
        /* align-items: center; */
        /* align-self: stretch; */
        /* justify-content: flex-end;  */
        /* text-align: left;  */

        max-width: 500px; /* Set a maximum width to limit the width of the container */
        margin-left: 240px;
        
        padding: 8px;
    }

    .browserAdjust{
    display: flex;
    width: 170px;
    height: 169px;
    padding: 70px 8px;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    border: 1px solid var(--components-forms-input-border, #CED4DA);  
     border-radius: 4px;
    border: 1px solid var(--components-forms-input-border, #CED4DA);
    background: var(--global-09-white, #FFF);
    margin-left:10px;
    margin-bottom: 290px;

    }

    .imgAdjust{
        width: 696px;
height: 768px;
flex-shrink: 0;
    }

    .para{
        color: var(--body-color, #5A5F7D);
text-align: center;

/* Components/Toasts/Time */
font-family: Inter;
font-size: 12px;
font-style: normal;
font-weight: 400;
line-height: 18px; /* 150% */
    }




     .browse{
         display: inline-flex;
flex-direction: column;
font-size: 10px;
justify-content: center;
align-items: flex-end;

padding: 6px;
    }
    
    .widths{
        width: 170px;
        height: 130px;


    }

    .custom-size{
        color: var(--global-08-dark, #343A40);
text-align: center;

/* Components/Buttons/Small */
font-family: Inter;
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: 21px; /* 150% */
    }

.custom-green {
    background-color: green;
    color: white;
}

.custom-grey {
    background-color: grey;
    color: white;
}

.custom-black {
    background-color: black;
    color: white;
}

.custom-purple {
    background-color: purple;
    color: white;
}

.custom-maroon {
    background-color: maroon;
    color: white;
}

.custom-button{
margin-left:390px;
}

.custom-button2{
    display: inline-flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 80px;
margin-left:450px;
}
.custom-button3{
    display: inline-flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 130px;
/* margin-left:450px; */
}

.custom-button1{
    display: inline-flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 80px;
margin-left:500px;
}

.border-bottoms{
    width: auto;
height: 1px;
flex-shrink: 0;
border: 1px solid var(--mid-light-grey, #979797);

}
.border-bottoms_1{
    width: auto;
height: 1px;
flex-shrink: 0;
border: 1px solid var(--components-image-border, #DEE2E6);
}

.Address-height{
    height: 100px; 
}
.change-size{
    /* margin-left: 320px; */
    height: 30px;
    display: flex;
    align-items: center;
    /* justify-content: end; */
    background: var(--global-09-white, #FFF);
}

.payment-size3{
    height: 150px;
    /* margin-right: 60px; */
    width: 275px;
}

.blue-border {
  border: 2px solid blue;
}

`;

export default EditWrapper;
