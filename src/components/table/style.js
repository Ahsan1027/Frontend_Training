// import styled from "styled-components";
// const TableWrapper = styled.div`
// width: 927px;
// height: 44px;
// flex-shrink: 0;
// background: var(--components-forms-disabled-fill, #E9ECEF);
// `;

// export default TableWrapper;

const ProductTable = {
    imgAdjust: {
        width: '38px',
        height: '38.7px',
        flexShrink: '0',
        background: 'url(<path-to-image>), lightgray 50% / cover no-repeat',
    },

    HeaderTitlesAdjust: {
        color: 'var(--text-01-body, #212529)',
        width: 'auto',
        fontFamily: 'Inter',
        fontSize: '14px',
        fontStyle: 'normal',
        fontWeight: '500',
        lineHeight: '19.2px', /* 120% */
    },

    CargoAdjust: {
        color: 'var(--components-forms-input-text, #495057)',
        width: '241px',
        height: '37px',
        flexShrink: '0',
        /* Body/Small */
        fontFamily: 'Inter',
        fontSize: '12.8px',
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: '19.2px', /* 150% */
    },

    RowAdjust: {
        width: '1040px',
        height: 'auto',
        flexShrink: '0',
        color: 'var(--components-forms-input-text, #fff)',
        //borderBottom: "1px solid transparent !important",
    },

    RowAdjust1: {
        width: '1340px',
        height: 'auto',
        flexShrink: '0',
        color: 'var(--components-forms-input-text, #fff)',
        //borderBottom: "1px solid transparent !important",
    },

    TrashContainer: {
        position: 'relative',
    },

    CustomGreen: {

        backgroundColor: 'green',
        color: 'white',
    },

    div_size: {
        marginTop: '80px'
    }

};

export default ProductTable;
