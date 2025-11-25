import React from 'react';
import FloatingCard from './FloatingCard';
import { FaBell, FaInfoCircle } from 'react-icons/fa';

const ActivitySidebar = ({ activities }) => {
    return (
        <FloatingCard className="p-4 bg-brand-yellow/20 border-brand-yellow">
            <div className="flex items-center gap-2 mb-4 text-gray-800 font-black text-lg">
                <FaBell className="text-brand-orange" />
                <h3>Activity</h3>
            </div>

            <div className="space-y-4">
                {(!activities || activities.length === 0) ? (
                    <div className="text-sm text-gray-500 text-center">No recent activity.</div>
                ) : (
                    activities.map(activity => (
                        <div key={activity._id} className="flex gap-3 items-start">
                            <div className="mt-1 text-brand-blue"><FaInfoCircle /></div>
                            <div className="text-sm">
                                {activity.message}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </FloatingCard>
    );
};

export default ActivitySidebar;
