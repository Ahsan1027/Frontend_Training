import React from 'react';
import Navbar from '../components/navbar';
import { useSelector } from 'react-redux';
const UserLayout = ({ children,value=null }) => {
    let { username } = useSelector((state) => state.login);
    const profileImageSrc = '/me.jpg';
    return (
        <>
            <Navbar userName={username} profileImageSrc={profileImageSrc} name='User' value={value}/>
            <div className="d-flex">
                {children}
            </div>
        </>
    );
};
export default UserLayout;