import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaCommentDots, FaUser, FaSearch, FaBell } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const location = useLocation();
    const { currentUser } = useAuth();

    const NavLink = ({ to, icon: Icon, label }) => {
        const isActive = location.pathname === to;
        return (
            <Link to={to} className={`flex flex-col items-center gap-1 px-4 py-2 border-b-4 transition-all ${isActive ? 'border-brand-orange text-black' : 'border-transparent text-gray-500 hover:text-black'}`}>
                <Icon className={`text-xl ${isActive ? 'text-brand-orange' : ''}`} />
                <span className={`text-xs font-bold ${isActive ? 'text-black' : ''}`}>{label}</span>
            </Link>
        );
    };

    return (
        <div className="fixed top-0 left-0 right-0 h-16 bg-white border-b-2 border-black z-40 flex items-center justify-center px-4 shadow-sm">
            <div className="max-w-7xl w-full flex items-center justify-between">
                {/* Logo */}
                <Link to="/home" className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-brand-orange border-2 border-black rounded-lg flex items-center justify-center text-white font-black text-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                        B
                    </div>
                    <span className="font-black text-xl hidden md:block">BuildBuddy</span>
                </Link>

                {/* Search */}
                <div className="hidden md:flex items-center flex-1 max-w-md mx-8 relative">
                    <FaSearch className="absolute left-3 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search projects, roles, tech stack..."
                        className="w-full pl-10 pr-4 py-2 bg-gray-100 border-2 border-transparent focus:border-black rounded-full outline-none transition-all"
                    />
                </div>

                {/* Nav Links */}
                <div className="flex items-center gap-2">
                    <NavLink to="/home" icon={FaHome} label="Home" />
                    <NavLink to="/messages" icon={FaCommentDots} label="Chats" />
                    <NavLink to="/profile" icon={FaUser} label="Profile" />
                </div>

                {/* User Actions */}
                <div className="flex items-center gap-4 ml-4 pl-4 border-l-2 border-gray-200">
                    <button className="text-gray-500 hover:text-black relative">
                        <FaBell className="text-xl" />
                        <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>
                    <div className="w-8 h-8 rounded-full bg-gray-200 border border-black overflow-hidden cursor-pointer">
                        <img src={currentUser?.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser?.uid}`} alt="avatar" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
