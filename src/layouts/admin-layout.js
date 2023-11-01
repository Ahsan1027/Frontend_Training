import React from 'react';
import Navbar from '../components/navbar';
import Sidebars from '../components/sidebar';
const AdminLayout = ({ children }) => {
    const userName = 'Ahsan Khalid';
    const profileImageSrc = '/me.jpg';
    return (
        <>
            <Navbar userName={userName} profileImageSrc={profileImageSrc} />
            <div className="d-flex">
                <Sidebars />
                {children}
            </div>
        </>
    );
};
export default AdminLayout;