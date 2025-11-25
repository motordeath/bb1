import React from 'react';
import FloatingCard from './FloatingCard';
import OutlineButton from './OutlineButton';
import { FaUserFriends, FaCode } from 'react-icons/fa';

const ProjectCard = ({ project }) => {
    return (
        <FloatingCard className="mb-6">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-xl font-bold mb-1">{project.title}</h3>
                    <div className="flex gap-2 text-sm text-gray-600">
                        {project.tags.map(tag => (
                            <span key={tag} className="bg-gray-100 px-2 py-1 rounded-md border border-black">{tag}</span>
                        ))}
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gray-200 border border-black overflow-hidden">
                        {/* Avatar placeholder */}
                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${project.creator_uid}`} alt="avatar" />
                    </div>
                </div>
            </div>

            <p className="text-gray-700 mb-4 line-clamp-2">{project.description}</p>

            <div className="flex justify-between items-center">
                <div className="flex gap-4 text-sm font-bold">
                    <div className="flex items-center gap-1">
                        <FaUserFriends />
                        <span>{project.members.length} Members</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <FaCode />
                        <span>{project.required_roles.length} Roles</span>
                    </div>
                </div>
                <div className="flex gap-2">
                    <OutlineButton variant="secondary" className="px-4 py-1 text-sm">Details</OutlineButton>
                    <OutlineButton className="px-4 py-1 text-sm">Join</OutlineButton>
                </div>
            </div>
        </FloatingCard>
    );
};

export default ProjectCard;
