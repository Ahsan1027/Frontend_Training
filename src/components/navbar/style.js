const Navbar = {
    imgAdjust: {
        width: '30px',
        height: '28px',
        flexShrink:'0',
        background: 'url(<path-to-image>), lightgray 50% / cover no-repeat',
    },

    EcommAdjust: {
        color: 'var(--global-08-dark, #343A40)',
        fontFamily: 'Inter',
        fontSize: '16px',
        fontStyle: 'normal',
        fontWeight: '700',
        lineHeight: '24px', /* 150% */
    },

    BellAdjust: {
        width: '26px',
        height: '16px',
        marginTop: '5px',

        flexShrink: '0',
    },

    Bell2Adjust: {
        width: '36px',
        height: '16px',
        marginTop: '5px',

        flexShrink: '0',
    },

    PopAdjust:{
        position: 'absolute',
        top: '100%',
        // left: '0',
        right:'6%',
        zIndex: '3',
        maxWidth: '250px',
        maxHeight: '240px',
        overflow: 'auto',
        backgroundColor: 'white',
        border: '1px solid #ccc',
        padding: '10px',
        // marginLeft:'1100px'
    },

    NameAdjust: {
        color: 'var(--global-01-primary, #007BFF)',
        textAlign: 'right',

        fontFamily: 'Inter',
        fontSize: '12px',
        fontStyle: 'normal',
        fontWeight: '500',
        lineHeight: '12px',
    },

    ContainerAdjust: {
        width: '100%',
        flexShrink: '0',
        background: 'var(--global-09-white, #FFF)',
        zIndex:'2',
        position:'fixed',

    },

    notification_list:{
        width: '200px',
        maxHeight: '200px',
        overflow: 'auto',
    }
};

export default Navbar;