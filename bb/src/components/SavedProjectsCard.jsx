import React from 'react';
import FloatingCard from './FloatingCard';
import OutlineButton from './OutlineButton';
import { FaBookmark } from 'react-icons/fa';

const SavedProjectsCard = ({ savedProjects }) => {
    return (
        <FloatingCard className="p-4">
            <div className="flex items-center gap-2 mb-4 text-gray-700 font-black text-lg">
                <FaBookmark className="text-red-500" />
                <h3>Saved For Later</h3>
            </div>

            <div className="space-y-3 mb-4">
                {(!savedProjects || savedProjects.length === 0) ? (
                    <div className="text-sm text-gray-500 text-center py-4">You haven't saved any projects.</div>
                ) : (
                    savedProjects.map(project => (
                        <div key={project._id} className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-md bg-brand-orange border-2 border-black flex-shrink-0"></div>
                            <div className="min-w-0">
                                <div className="font-bold text-sm truncate">{project.title}</div>
                                <div className="text-xs text-gray-500 truncate">{project.tech_stack.join(', ')}</div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {savedProjects && savedProjects.length > 0 && (
                <OutlineButton variant="secondary" className="w-full text-sm py-1">View All Saved</OutlineButton>
            )}
        </FloatingCard>
    );
};

export default SavedProjectsCard;
