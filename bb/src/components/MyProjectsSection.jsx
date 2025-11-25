import React from 'react';
import FloatingCard from './FloatingCard';
import { FaUsers } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const MyProjectsSection = ({ projects }) => {
    const navigate = useNavigate();

    return (
        <FloatingCard className="w-full h-auto flex flex-col">
            <div className="mb-6">
                <h2 className="text-xl font-black text-gray-900">Your Projects</h2>
                <p className="text-gray-500 text-sm">Created Projects</p>
            </div>

            <div className="space-y-4 flex-grow">
                {projects && projects.length > 0 ? (
                    projects.map(project => (
                        <div key={project._id} className="border-2 border-black rounded-2xl p-4 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-3 transition-all hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px]">
                            <div className="flex flex-wrap justify-between items-start gap-3">
                                <h3 className="font-black text-lg text-gray-900 min-w-0 break-words flex-1">{project.title}</h3>
                                <button
                                    className="bg-brand-orange text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-sm hover:opacity-90 transition-opacity whitespace-nowrap flex-shrink-0"
                                    onClick={() => navigate(`/project/${project._id}`)}
                                >
                                    Manage Project
                                </button>
                            </div>

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
                        No projects created yet.
                    </div>
                )}
            </div>
        </FloatingCard>
    );
};

export default MyProjectsSection;
