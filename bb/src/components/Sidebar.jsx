import React from 'react';
import FloatingCard from './FloatingCard';
import { FaHome, FaProjectDiagram, FaBookmark, FaEnvelope, FaCog } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

const NavItem = ({ icon: Icon, label, to, active }) => (
    <Link to={to}>
        <div className={`flex items-center gap-3 p-3 rounded-lg transition-all border-2 border-transparent hover:border-black hover:bg-white hover:shadow-offset ${active ? 'bg-brand-orange text-white border-black shadow-offset' : 'text-gray-700'}`}>
            <Icon className="text-xl" />
            <span className="font-bold">{label}</span>
        </div>
    </Link>
);

const Sidebar = () => {
    const location = useLocation();

    return (
        <div className="w-64 flex-shrink-0 hidden md:block">
            <FloatingCard className="sticky top-24 min-h-[calc(100vh-8rem)]">
                <nav className="flex flex-col gap-2">
                    <NavItem icon={FaHome} label="Home" to="/home" active={location.pathname === '/home'} />
                    <NavItem icon={FaProjectDiagram} label="My Projects" to="/my-projects" active={location.pathname === '/my-projects'} />
                    <NavItem icon={FaBookmark} label="Saved" to="/saved" active={location.pathname === '/saved'} />
                    <NavItem icon={FaEnvelope} label="Messages" to="/messages" active={location.pathname === '/messages'} />
                    <div className="my-4 border-t-2 border-gray-100"></div>
                    <NavItem icon={FaCog} label="Settings" to="/settings" active={location.pathname === '/settings'} />
                </nav>
            </FloatingCard>
        </div>
    );
};

export default Sidebar;
