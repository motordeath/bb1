import React from 'react';
import FloatingCard from './FloatingCard';
import { FaFire, FaArrowUp } from 'react-icons/fa';

const TrendingSection = ({ projects }) => {
    return (
        <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
                <FaArrowUp className="text-brand-blue" />
                <h3 className="font-black text-lg">Trending This Week</h3>
            </div>

            {(!projects || projects.length === 0) ? (
                <FloatingCard className="p-4 bg-gray-50 text-center text-gray-500 text-sm">
                    No trending projects right now.
                </FloatingCard>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {projects.map(project => (
                        <FloatingCard key={project._id} className="p-4">
                            <div className="font-bold text-lg mb-1 truncate">{project.title}</div>
                            <div className="text-brand-orange text-xs font-bold mb-2">Trending</div>
                            <div className="text-gray-500 text-sm truncate">{project.tech_stack.join('/')}</div>
                        </FloatingCard>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TrendingSection;
