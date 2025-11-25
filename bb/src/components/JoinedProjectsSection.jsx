import React from 'react';
import FloatingCard from './FloatingCard';
import { FaUsers } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const JoinedProjectsSection = ({ projects }) => {
    const navigate = useNavigate();

    return (
        <FloatingCard className="w-full h-auto">
            <h2 className="text-xl font-black text-gray-900 mb-6">Projects You Joined</h2>

            <div className="space-y-4">
                {projects && projects.length > 0 ? (
                    projects.map(project => (
                        <div key={project._id}
                            className="border-2 border-black rounded-2xl p-4 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] cursor-pointer hover:translate-y-[-2px] transition-transform"
                            onClick={() => navigate(`/project/${project._id}`)}
                        >
                            <h3 className="font-black text-lg mb-2 truncate text-gray-900">{project.title}</h3>

                            <div className="flex items-center gap-4 text-sm">
                                <span className={`px-3 py-1 rounded-full font-bold text-xs ${project.status === 'recruiting' ? 'bg-green-100 text-green-800' :
                                    project.status === 'building' ? 'bg-orange-100 text-orange-800' :
                                        'bg-blue-100 text-blue-800'
                                    }`}>
                                    Status: {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                                </span>
                                <span className="flex items-center gap-1 text-gray-600 font-bold">
                                    <FaUsers className="text-gray-400" /> {project.members.length} Members
                                </span>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-gray-500 text-center py-8 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                        You haven't joined any projects yet.
                    </div>
                )}
            </div>
        </FloatingCard>
    );
};

export default JoinedProjectsSection;
