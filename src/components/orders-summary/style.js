import styled from 'styled-components';
const SummaryWrapper = styled.div`

.margin-end{
    margin-left: auto;
}

.back{
    /* border: 1px solid var(--components-bradcrumb-fill, #E9ECEF); */
background: var(--global-09-white, #FFF);
}

.t-size{
    color: var(--components-image-fill, #868E96);

/* Components/Toasts/Time */
font-family: Inter;
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: 18px; /* 150% */
}
.payment-size{
    height: 120px;
}
.payment-size3{
    height: 150px;
    /* margin-right: 60px; */
    width: 345px;
}
.payment-size2{
    width: 146px;
    height: 50px;
    margin-top: 30px;

}
.payment-size1{
    /* width: 146px; */
    height: 200px;
    margin-top: 30px;

}
.Toggle-color{
    color: var(--components-image-fill, #868E96);

/* button */
font-family: Inter;
font-size: 13px;
font-style: normal;
font-weight: 700;
line-height: 16px; /* 123.077% */
letter-spacing: 0.26px;
border:none;
/* margin-left: 0px; */
background-color: #FFF;
}

.Toggle-color2{
    color: var(--components-image-fill, #868E96);
    height: 30px;
/* margin-left: 350px; */
/* margin-bottom: 100px; */
/* button */
font-family: Inter;
font-size: 13px;
font-style: normal;
font-weight: 700;
line-height: 16px; /* 123.077% */
letter-spacing: 0.26px;
border:none;
/* margin-left: 0px; */
background-color: #FFF;
}

.Toggle-color1{
    color: var(--global-08-dark, #343A40);

/* button */
font-family: Inter;
font-size: 13px;
font-style: normal;
font-weight: 700;
line-height: 16px; /* 123.077% */
letter-spacing: 0.26px;
background-color: #FFF;
}
.btn-adjust{
    border:none;
background-color: #FFF;
}
.plus-adjust{
    /* margin-left: 52px; */
    margin-top: 3px;
    color: var(--components-image-fill, #868E96);
    background-color: #FFF;
    width: 18px;

}
.btn-color{
    border-radius: 4.8px;
background: var(--components-image-border, #DEE2E6);
border: none;
}
`;

export default SummaryWrapper;