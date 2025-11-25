import React from 'react';
import FloatingCard from './FloatingCard';
import OutlineButton from './OutlineButton';
import { FaPlus, FaCode, FaUserFriends, FaPen } from 'react-icons/fa';

const CreateProjectPanel = ({ onClick }) => {
    return (
        <FloatingCard className="mb-6 p-4">
            <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-brand-orange border-2 border-black flex items-center justify-center text-white text-xl font-bold">
                    <FaPlus />
                </div>
                <div className="flex-1">
                    <input
                        type="text"
                        placeholder="Start a new project..."
                        className="w-full p-3 bg-gray-100 border-2 border-transparent hover:border-gray-300 focus:border-black rounded-full outline-none transition-all font-medium"
                        onClick={onClick}
                        readOnly
                    />
                </div>
            </div>
            <div className="flex justify-between items-center px-4">
                <button onClick={onClick} className="flex items-center gap-2 text-gray-500 hover:text-brand-blue font-bold text-sm transition-colors">
                    <FaCode className="text-lg" /> Tech Stack
                </button>
                <button onClick={onClick} className="flex items-center gap-2 text-gray-500 hover:text-brand-orange font-bold text-sm transition-colors">
                    <FaUserFriends className="text-lg" /> Roles
                </button>
                <button onClick={onClick} className="flex items-center gap-2 text-gray-500 hover:text-brand-yellow font-bold text-sm transition-colors">
                    <FaPen className="text-lg" /> Description
                </button>
            </div>
        </FloatingCard>
    );
};

export default CreateProjectPanel;
