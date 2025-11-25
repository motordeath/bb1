import React from 'react';
import { cn } from './FloatingCard'; // Reusing cn utility

const OutlineButton = ({ children, className, variant = 'primary', ...props }) => {
    const baseStyles = "px-6 py-2 font-bold rounded-lg border-2 border-black shadow-offset transition-all hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-y-0 active:shadow-offset disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-brand-orange text-white",
        secondary: "bg-white text-brand-dark hover:bg-gray-50",
        danger: "bg-red-500 text-white",
    };

    return (
        <button
            className={cn(baseStyles, variants[variant], className)}
            {...props}
        >
            {children}
        </button>
    );
};

export default OutlineButton;
