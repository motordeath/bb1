import React from 'react';
import FloatingCard from './FloatingCard';
import { FaTimes, FaPlus } from 'react-icons/fa';

const SkillsSection = ({ skills, onAddSkill, onRemoveSkill }) => {
    return (
        <FloatingCard className="w-full h-auto">
            <h2 className="text-xl font-black text-gray-900 mb-6">Skills</h2>

            <div className="flex flex-wrap gap-3">
                {skills && skills.map((skill, index) => (
                    <span key={index} className="bg-black text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-sm">
                        {skill}
                        <button
                            onClick={() => onRemoveSkill(skill)}
                            className="text-gray-400 hover:text-white transition-colors"
                        >
                            <FaTimes size={12} />
                        </button>
                    </span>
                ))}

                <button
                    onClick={onAddSkill}
                    className="bg-brand-orange text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-md hover:opacity-90 transition-opacity"
                >
                    <FaPlus size={12} />
                    Add Skill
                </button>
            </div>
        </FloatingCard>
    );
};

export default SkillsSection;
