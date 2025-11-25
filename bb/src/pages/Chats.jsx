import React from 'react';
import Layout from '../components/Layout';
import FloatingCard from '../components/FloatingCard';

const Chats = () => {
    return (
        <Layout>
            <FloatingCard className="h-[calc(100vh-8rem)] flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-black mb-2">Chats</h2>
                    <p className="text-gray-500">Messaging feature coming soon!</p>
                </div>
            </FloatingCard>
        </Layout>
    );
};

export default Chats;
