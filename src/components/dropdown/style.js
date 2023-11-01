import styled from 'styled-components';
const DropDownWrapper = styled.div`
/* position: fixed; */
.dropdown-toggle::after{
    margin-left: 1.9em;
    display: inline-block;
    margin-top: 5px;
    vertical-align: 0.255em;
    border-top: 0.3em solid;
    border-right: 0.3em solid transparent;
    border-bottom: 0;
    border-left: 0.3em solid transparent
}

.color{
    background: var(--global-09-white, #FFF);
}`;


export default DropDownWrapper;