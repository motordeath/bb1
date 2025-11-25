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

            <p className="text-gray-700 leading-relaxed text-base">
                {bio || "I'm a creative developer with 5+ years of experience in building scalable web applications. I love collaborating on open-source projects and learning new technologies. In my free time, I enjoy hiking and photography."}
            </p>
        </FloatingCard>
    );
};

export default AboutSection;
