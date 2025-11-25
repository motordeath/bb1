import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children, leftSidebar, rightSidebar, fullWidth = false }) => {
    return (
        <div className="min-h-screen bg-gray-50 pt-20 pb-10">
            <Navbar />

            <div
                className={
                    fullWidth
                        ? "w-full px-4"
                        : "max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-12 gap-6"
                }
            >
                {!fullWidth && (
                    <>
                        {/* Left Sidebar */}
                        <div className="hidden md:block md:col-span-3">
                            <div className="sticky top-24 space-y-6">
                                {leftSidebar}
                            </div>
                        </div>

                        {/* Center Feed */}
                        <main className="md:col-span-6 min-w-0">
                            {children}
                        </main>

                        {/* Right Sidebar */}
                        <div className="hidden lg:block lg:col-span-3">
                            <div className="sticky top-24 space-y-6">
                                {rightSidebar}
                            </div>
                        </div>
                    </>
                )}

                {fullWidth && <main>{children}</main>}
            </div>
        </div>
    );
};

export default Layout;