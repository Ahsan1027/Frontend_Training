import styled from 'styled-components';
const ListingWrapper = styled.div`
background: var(--global-07-light, #F8F9FA);
width: 1450px;
.header-size{
    position: fixed;
    width: 95.75%;
    margin-top: 40px;
    z-index: 1;
    background-color: #F8F9FA;
}
.scrolling{
    overflow:auto;
}
.custom-size{
    margin-top: 110px;
}

.custom-size1{
    margin-top: 72px;
}
.colors{
    background: var(--global-09-white, #FFF);

}

.UpperDiv{
    /* margin-left: 0px; */
    margin-right: 500px;
    align-items: center;
    width: 865px;
    /* padding-bottom: 20px;
    padding-top: 20px; */
}

.Images{
    margin-left: 685px;
}

.custom-text{
    color: var(--global-01-primary, #007BFF);

/* Heading/H4 */
font-family: Inter;
font-size: 24px;
font-style: normal;
font-weight: 500;
line-height: 28.8px; /* 120% */
}

.custom-heading{
    margin-left:0px;
}

.back{
    background: var(--global-09-white, #FFF);
}
.change-size{
    margin-left: 590px;
    height: 30px;
    display: flex;
    align-items: center;
    background: var(--global-09-white, #FFF);
}

.orders-size{
    /* width: auto;
    height: 300px; */
}

.ContainerAdjust {
        width: 608px;
        height: 475px;
        flex-shrink: 0;
        border: 1px solid var(--components-bradcrumb-fill, #E9ECEF);
        background: var(--global-09-white, #FFF);
    }
`;

export default ListingWrapper;