import React from 'react';
import FloatingCard from './FloatingCard';
import OutlineButton from './OutlineButton';
import { FaBullseye, FaUserPlus } from 'react-icons/fa';

const RecommendationsSidebar = ({ matches, teammates }) => {
    return (
        <div className="space-y-6">
            {/* Matching Skills */}
            <FloatingCard className="p-4">
                <div className="flex items-center gap-2 mb-2 text-gray-800 font-black text-lg">
                    <FaBullseye className="text-pink-500" />
                    <h3>Matching Your Skills</h3>
                </div>

                {(!matches || matches.length === 0) ? (
                    <div className="text-sm text-gray-500 text-center py-4">No matching projects found.</div>
                ) : (
                    <div className="space-y-3">
                        {matches.map(project => (
                            <div key={project._id} className="p-3 border-2 border-black rounded-lg bg-white">
                                <div className="font-bold mb-1 truncate">{project.title}</div>
                                <div className="text-xs text-gray-500 mb-2 truncate">{project.description}</div>
                                <div className="flex gap-1 flex-wrap">
                                    {project.tech_stack.slice(0, 3).map(tech => (
                                        <span key={tech} className="px-2 py-0.5 bg-gray-100 border border-black rounded text-[10px] font-bold">{tech}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </FloatingCard>

            {/* Potential Teammates */}
            <FloatingCard className="p-4">
                <div className="flex items-center gap-2 mb-4 text-gray-800 font-black text-lg">
                    <FaUserPlus className="text-brand-yellow" />
                    <h3>Potential Teammates</h3>
                </div>

                {(!teammates || teammates.length === 0) ? (
                    <div className="text-sm text-gray-500 text-center py-4">No recommendations yet.</div>
                ) : (
                    <div className="space-y-4 mb-4">
                        {teammates.map(user => (
                            <div key={user._id} className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-gray-200 border border-black overflow-hidden">
                                        <img src={user.photo_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user._id}`} alt="avatar" />
                                    </div>
                                    <div>
                                        <div className="font-bold text-sm">{user.display_name}</div>
                                        <div className="text-[10px] text-gray-500">{user.skills.slice(0, 2).join(', ')}</div>
                                    </div>
                                </div>
                                <OutlineButton variant="secondary" className="px-2 py-1 text-xs">Connect</OutlineButton>
                            </div>
                        ))}
                    </div>
                )}

                {teammates && teammates.length > 0 && (
                    <OutlineButton className="w-full text-sm py-1">Find More Builders</OutlineButton>
                )}
            </FloatingCard>
        </div>
    );
};

export default RecommendationsSidebar;
