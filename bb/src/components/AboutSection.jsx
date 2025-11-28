import React from 'react';
import FloatingCard from './FloatingCard';
import { FaPen } from 'react-icons/fa';

const AboutSection = ({ bio, onEdit }) => {
    return (
        <FloatingCard className="w-full h-auto relative">
            <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-black text-gray-900">About Me</h2>
                <button
                    onClick={onEdit}
                    className="bg-brand-orange text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-md hover:opacity-90 transition-opacity flex items-center gap-2"
                >
                    <FaPen size={12} />
                    Edit
                </button>
            </div>

            <p className="text-gray-700 leading-relaxed text-base whitespace-pre-wrap">
                {bio || "Tell people more about yourself, your interests, and what you're building..."}
            </p>
        </FloatingCard>
    );
};

export default AboutSection;
