import React from 'react';
import FloatingCard from './FloatingCard';
import { FaGlobe } from 'react-icons/fa';

const ExploreCategories = ({ categories }) => {
    return (
        <div className="mt-8">
            <div className="flex items-center gap-2 mb-4">
                <FaGlobe className="text-brand-dark" />
                <h3 className="font-black text-lg">Explore Categories</h3>
            </div>

            {(!categories || categories.length === 0) ? (
                <FloatingCard className="p-4 bg-gray-50 text-center text-gray-500 text-sm">
                    No categories found.
                </FloatingCard>
            ) : (
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                    {categories.map((cat, idx) => (
                        <FloatingCard key={idx} className="min-w-[200px] h-32 flex flex-col justify-end p-4 cursor-pointer hover:-translate-y-2 transition-transform bg-white text-black">
                            <div className="font-bold leading-tight text-lg">{cat}</div>
                        </FloatingCard>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ExploreCategories;
