import React from 'react';
import { FaFire, FaClock, FaBriefcase, FaGlobe } from 'react-icons/fa';

const FilterRibbon = ({ activeFilter, onFilterChange }) => {
    const filters = [
        { id: 'recommended', label: 'Recommended', icon: FaFire, color: 'bg-brand-orange text-white' },
        { id: 'newest', label: 'Newest', icon: FaClock },
        { id: 'recruiting', label: 'Recruiting Now', icon: FaBriefcase },
        { id: 'remote', label: 'Remote-First', icon: FaGlobe },
    ];

    return (
        <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
            {filters.map(filter => {
                const isActive = activeFilter === filter.id;
                const Icon = filter.icon;
                return (
                    <button
                        key={filter.id}
                        onClick={() => onFilterChange(filter.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 border-black font-bold text-sm whitespace-nowrap transition-all hover:-translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${isActive ? (filter.color || 'bg-black text-white') : 'bg-white text-black'}`}
                    >
                        {isActive && <Icon />}
                        {filter.label}
                    </button>
                );
            })}
        </div>
    );
};

export default FilterRibbon;
