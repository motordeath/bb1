import React from 'react';
import FloatingCard from './FloatingCard';
import { FaBolt, FaCheckCircle, FaSpinner } from 'react-icons/fa';

const ActiveProjectsCard = ({ projects }) => {
    return (
        <FloatingCard className="p-4">
            <div className="flex items-center gap-2 mb-4 text-brand-orange font-black text-lg">
                <FaBolt />
                <h3>Your Active Projects</h3>
            </div>

            {(!projects || projects.length === 0) ? (
                <div className="text-sm text-gray-500 text-center py-4">No active projects yet. Start a new project!</div>
            ) : (
                <div className="space-y-3">
                    {projects.map(project => (
                        <div key={project._id} className="p-3 bg-white border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 transition-transform cursor-pointer">
                            <div className="flex justify-between items-start mb-1">
                                <h4 className="font-bold text-sm truncate">{project.title}</h4>
                                {project.status === 'completed' ? <FaCheckCircle className="text-green-500" /> : <FaSpinner className="text-brand-blue animate-spin-slow" />}
                            </div>
                            <div className="flex justify-between items-center text-xs text-gray-500">
                                <span>{project.status === 'recruiting' ? 'Recruiting' : 'Building'}</span>
                                <span className="flex items-center gap-1">
                                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                    {project.members.length} Members
                                </span>
                            </div>
                            {/* Progress bar placeholder */}
                            <div className="w-full h-2 bg-gray-200 rounded-full mt-2 overflow-hidden border border-black">
                                <div className="h-full bg-brand-orange w-1/3"></div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </FloatingCard>
    );
};

export default ActiveProjectsCard;
