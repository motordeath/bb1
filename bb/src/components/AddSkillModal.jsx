import React, { useState } from 'react';
import FloatingCard from './FloatingCard';
import OutlineButton from './OutlineButton';
import { FaTimes } from 'react-icons/fa';

const AddSkillModal = ({ onClose, onAdd }) => {
    const [skill, setSkill] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (skill.trim()) {
            onAdd(skill.trim());
            setSkill('');
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <FloatingCard className="w-full max-w-md relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-black">
                    <FaTimes size={24} />
                </button>

                <h2 className="text-2xl font-black mb-6">Add Skill</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block font-bold mb-1">Skill Name</label>
                        <input
                            value={skill}
                            onChange={(e) => setSkill(e.target.value)}
                            className="w-full p-3 border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:outline-none"
                            placeholder="e.g. React, Python, Design"
                            autoFocus
                        />
                    </div>

                    <div className="flex justify-end gap-3 mt-6">
                        <OutlineButton type="button" variant="secondary" onClick={onClose}>Cancel</OutlineButton>
                        <OutlineButton type="submit">Add</OutlineButton>
                    </div>
                </form>
            </FloatingCard>
        </div>
    );
};

export default AddSkillModal;
