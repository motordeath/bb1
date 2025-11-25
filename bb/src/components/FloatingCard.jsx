import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

const FloatingCard = ({ children, className, ...props }) => {
    return (
        <div className={`bg-white rounded-[20px] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 ${className}`}
            {...props}
        >
            {children}
        </div>
    );
};

export default FloatingCard;
