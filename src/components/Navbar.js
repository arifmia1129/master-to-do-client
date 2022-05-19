import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { NavLink } from 'react-router-dom';
import auth from '../firebase.init';
import Loading from './Loading';

const Navbar = () => {
    const [user, loading] = useAuthState(auth);
    if (loading) {
        return <Loading />
    }
    return (
        <div className='flex items-center justify-center'>
            {
                user && <NavLink to="/" className={({ isActive }) => isActive ? "btn btn-secondary text-white mx-5 my-5" : "mx-5 my-5"}>My-Task</NavLink>
            }
            {
                user ? <button
                    onClick={() => {
                        signOut(auth)
                    }}
                    className="btn btn-xs mr-3 my-5 uppercase text-white">Sign Out</button> : <NavLink to="/login" className={({ isActive }) => isActive ? "btn btn-secondary text-white mr-3 my-5" : "mr-3 my-5"}>Login</NavLink>
            }
            {
                user && <button className='btn btn-xs btn-disabled text-red-700'>{user?.displayName}</button>
            }
        </div>
    );
};

export default Navbar;