import React from 'react';
import FloatingCard from './FloatingCard';
import { FaGithub, FaLinkedin, FaGlobe, FaUpload } from 'react-icons/fa';

const SocialLinksSection = ({ links, onEdit }) => {
    const socialLinks = links || {};

    return (
        <FloatingCard className="w-full h-auto">
            <h2 className="text-xl font-black text-gray-900 mb-6">Social Links</h2>

            <div className="space-y-3">
                <a href={socialLinks.github || '#'} target="_blank" rel="noopener noreferrer" className="block">
                    <button className="w-full bg-white border-2 border-black rounded-full py-3 px-6 font-bold text-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] transition-transform flex items-center gap-3">
                        <FaGithub size={20} /> GitHub Profile
                    </button>
                </a>

                <a href={socialLinks.linkedin || '#'} target="_blank" rel="noopener noreferrer" className="block">
                    <button className="w-full bg-white border-2 border-black rounded-full py-3 px-6 font-bold text-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] transition-transform flex items-center gap-3">
                        <FaLinkedin size={20} /> LinkedIn Profile
                    </button>
                </a>

                <a href={socialLinks.website || '#'} target="_blank" rel="noopener noreferrer" className="block">
                    <button className="w-full bg-white border-2 border-black rounded-full py-3 px-6 font-bold text-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] transition-transform flex items-center gap-3">
                        <FaGlobe size={20} /> Personal Website
                    </button>
                </a>

                <button
                    onClick={onEdit}
                    className="w-full bg-brand-orange border-2 border-black rounded-full py-3 px-6 font-bold text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] transition-transform flex items-center gap-3"
                >
                    <FaUpload size={18} /> Resume Upload
                </button>
            </div>
        </FloatingCard>
    );
};

export default SocialLinksSection;
