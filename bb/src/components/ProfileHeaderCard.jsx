import React from 'react';
import FloatingCard from './FloatingCard';
import { FaPen, FaSignOutAlt } from 'react-icons/fa';

const ProfileHeaderCard = ({ user, onEdit, onLogout }) => {
    if (!user) return null;

    return (
        <FloatingCard className="relative p-8">
            <div className="flex flex-col md:flex-row items-start gap-8">
                {/* Profile Image */}
                <div className="flex-shrink-0">
                    <img
                        src={user.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=" + user.uid}
                        alt={user.name}
                        className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover bg-gray-50"
                    />
                </div>

                {/* User Info */}
                <div className="flex-grow pt-2">
                    <h1 className="text-3xl font-black text-gray-900 mb-1">{user.name || "Anonymous Builder"}</h1>
                    <p className="text-gray-500 font-medium mb-4">{user.email}</p>

                    <p className="text-gray-600 leading-relaxed max-w-xl">
                        {user.bio || "No bio yet. Click 'Edit Profile' to tell us about yourself!"}
                    </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-3 flex-shrink-0">
                    <button
                        onClick={onEdit}
                        className="bg-brand-orange text-white px-6 py-2.5 rounded-full font-bold shadow-md hover:opacity-90 transition-opacity flex items-center gap-2"
                    >
                        <FaPen size={14} />
                        Edit Profile
                    </button>

                    <button
                        onClick={onLogout}
                        className="text-gray-400 hover:text-red-500 font-medium text-sm flex items-center justify-end gap-2 transition-colors px-2"
                    >
                        <FaSignOutAlt size={14} />
                        Logout
                    </button>
                </div>
            </div>
        </FloatingCard>
    );
};

export default ProfileHeaderCard;
