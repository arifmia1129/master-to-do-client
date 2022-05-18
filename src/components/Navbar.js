import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className='flex items-center justify-center'>
            <NavLink to="/" className={({ isActive }) => isActive ? "btn btn-primary text-white mx-5 my-5" : " mx-5 my-5"}>My-Task</NavLink>
            <NavLink to="/login" className={({ isActive }) => isActive ? "btn btn-primary text-white mx-5 my-5" : " mx-5 my-5"}>Login</NavLink>
        </div>
    );
};

export default Navbar;