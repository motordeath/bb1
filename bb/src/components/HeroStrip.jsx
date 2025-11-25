import React from 'react';
import FloatingCard from './FloatingCard';
import OutlineButton from './OutlineButton';
import { FaPlus } from 'react-icons/fa';

const HeroStrip = ({ onCreateClick }) => {
    return (
        <FloatingCard className="mb-8 bg-brand-yellow">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black mb-2">Discover Your Next Team</h1>
                    <p className="font-medium">Join ambitious projects or start your own.</p>
                </div>
                <OutlineButton onClick={onCreateClick} className="bg-white text-black flex items-center gap-2">
                    <FaPlus /> Create Project
                </OutlineButton>
            </div>
        </FloatingCard>
    );
};

export default HeroStrip;
