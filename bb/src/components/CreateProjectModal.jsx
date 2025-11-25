import React, { useState } from 'react';
import FloatingCard from './FloatingCard';
import OutlineButton from './OutlineButton';
import { FaTimes } from 'react-icons/fa';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const CreateProjectModal = ({ onClose, onProjectCreated }) => {
    const { token } = useAuth();
    const [form, setForm] = useState({
        title: '',
        description: '',
        problem: '',
        tech_stack: '',
        required_roles: '',
        is_remote: true
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const payload = {
                ...form,
                tech_stack: form.tech_stack.split(',').map(s => s.trim()).filter(Boolean),
                required_roles: form.required_roles.split(',').map(s => s.trim()).filter(Boolean)
            };

            await axios.post('http://localhost:5000/api/projects/create', payload, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (onProjectCreated) {
                onProjectCreated();
            }
            onClose();
        } catch (error) {
            console.error("Failed to create project", error);
            alert("Failed to create project: " + (error.response?.data?.error || error.message));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <FloatingCard className="w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-black">
                    <FaTimes size={24} />
                </button>

                <h2 className="text-2xl font-black mb-6">Launch a Project</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block font-bold mb-1">Project Title</label>
                        <input
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            className="w-full p-3 border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label className="block font-bold mb-1">Short Description</label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            className="w-full p-3 border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:outline-none"
                            rows="2"
                            required
                        />
                    </div>

                    <div>
                        <label className="block font-bold mb-1">Problem Statement</label>
                        <textarea
                            name="problem"
                            value={form.problem}
                            onChange={handleChange}
                            className="w-full p-3 border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:outline-none"
                            rows="3"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block font-bold mb-1">Tech Stack (comma separated)</label>
                            <input
                                name="tech_stack"
                                value={form.tech_stack}
                                onChange={handleChange}
                                placeholder="React, Python, MongoDB"
                                className="w-full p-3 border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="block font-bold mb-1">Required Roles (comma separated)</label>
                            <input
                                name="required_roles"
                                value={form.required_roles}
                                onChange={handleChange}
                                placeholder="Frontend, Backend, Designer"
                                className="w-full p-3 border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:outline-none"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="is_remote"
                            checked={form.is_remote}
                            onChange={handleChange}
                            className="w-5 h-5 accent-brand-orange border-2 border-black"
                        />
                        <label className="font-bold">Remote Project</label>
                    </div>

                    <div className="flex justify-end gap-3 mt-6">
                        <OutlineButton type="button" variant="secondary" onClick={onClose}>Cancel</OutlineButton>
                        <OutlineButton type="submit" disabled={loading}>
                            {loading ? 'Publishing...' : 'Publish Project'}
                        </OutlineButton>
                    </div>
                </form>
            </FloatingCard>
        </div>
    );
};

export default CreateProjectModal;
