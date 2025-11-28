import React, { useEffect, useState } from 'react';
import API_BASE_URL from '../config/api';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import FloatingCard from '../components/FloatingCard';
import OutlineButton from '../components/OutlineButton';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const ProjectDetails = () => {
    const { id } = useParams();
    const { token, currentUser } = useAuth();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/api/projects/${id}`);
                setProject(res.data);
            } catch (error) {
                console.error("Error fetching project", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProject();
    }, [id]);

    const handleJoin = async () => {
        try {
            await axios.post(`${API_BASE_URL}/api/join`, {
                project_id: id,
                message: "I'd like to join!"
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert("Join request sent!");
        } catch (error) {
            console.error("Error joining project", error);
            alert("Failed to send join request");
        }
    };

    if (loading) return <Layout><div>Loading...</div></Layout>;
    if (!project) return <Layout><div>Project not found</div></Layout>;

    return (
        <Layout>
            <FloatingCard className="mb-6">
                <div className="flex justify-between items-start mb-6">
                    <h1 className="text-4xl font-black">{project.title}</h1>
                    <OutlineButton onClick={handleJoin}>Join Team</OutlineButton>
                </div>

                <div className="flex gap-2 mb-6">
                    {project.tags.map(tag => (
                        <span key={tag} className="bg-gray-100 px-3 py-1 rounded-full border border-black text-sm font-bold">
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="p-4 bg-gray-50 rounded-lg border border-black">
                        <div className="text-sm text-gray-500 font-bold uppercase">Tech Stack</div>
                        <div className="font-medium mt-1">{project.tech_stack.join(', ')}</div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg border border-black">
                        <div className="text-sm text-gray-500 font-bold uppercase">Looking For</div>
                        <div className="font-medium mt-1">{project.required_roles.join(', ')}</div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg border border-black">
                        <div className="text-sm text-gray-500 font-bold uppercase">Team Size</div>
                        <div className="font-medium mt-1">{project.members.length} Members</div>
                    </div>
                </div>

                <div className="mb-8">
                    <h2 className="text-xl font-bold mb-3">About the Project</h2>
                    <p className="text-gray-700 leading-relaxed text-lg">{project.description}</p>
                </div>

                {project.problem && (
                    <div className="mb-8">
                        <h2 className="text-xl font-bold mb-3">The Problem</h2>
                        <p className="text-gray-700 leading-relaxed">{project.problem}</p>
                    </div>
                )}
            </FloatingCard>
        </Layout>
    );
};

export default ProjectDetails;
