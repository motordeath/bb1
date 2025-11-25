import React, { useState, useEffect } from 'react';
import FloatingCard from './FloatingCard';
import OutlineButton from './OutlineButton';
import { FaTimes } from 'react-icons/fa';

const EditProfileModal = ({ user, onClose, onSave }) => {
    const [form, setForm] = useState({
        name: '',
        bio: '',
        social_links: {
            github: '',
            linkedin: '',
            website: '',
            resume_url: ''
        }
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setForm({
                name: user.name || '',
                bio: user.bio || '',
                social_links: {
                    github: user.social_links?.github || '',
                    linkedin: user.social_links?.linkedin || '',
                    website: user.social_links?.website || '',
                    resume_url: user.social_links?.resume_url || ''
                }
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('social_')) {
            const socialKey = name.replace('social_', '');
            setForm(prev => ({
                ...prev,
                social_links: {
                    ...prev.social_links,
                    [socialKey]: value
                }
            }));
        } else {
            setForm(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await onSave(form);
            onClose();
        } catch (error) {
            console.error("Failed to save profile", error);
            alert("Failed to save profile");
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

                <h2 className="text-2xl font-black mb-6">Edit Profile</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block font-bold mb-1">Display Name</label>
                        <input
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            className="w-full p-3 border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block font-bold mb-1">Bio</label>
                        <textarea
                            name="bio"
                            value={form.bio}
                            onChange={handleChange}
                            className="w-full p-3 border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:outline-none"
                            rows="4"
                            placeholder="Tell us about yourself..."
                        />
                    </div>

                    <div>
                        <h3 className="font-bold text-lg mb-3 border-b-2 border-gray-200 pb-1">Social Links</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block font-bold mb-1 text-sm text-gray-600">GitHub URL</label>
                                <input
                                    name="social_github"
                                    value={form.social_links.github}
                                    onChange={handleChange}
                                    className="w-full p-3 border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:outline-none"
                                    placeholder="https://github.com/..."
                                />
                            </div>
                            <div>
                                <label className="block font-bold mb-1 text-sm text-gray-600">LinkedIn URL</label>
                                <input
                                    name="social_linkedin"
                                    value={form.social_links.linkedin}
                                    onChange={handleChange}
                                    className="w-full p-3 border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:outline-none"
                                    placeholder="https://linkedin.com/in/..."
                                />
                            </div>
                            <div>
                                <label className="block font-bold mb-1 text-sm text-gray-600">Personal Website</label>
                                <input
                                    name="social_website"
                                    value={form.social_links.website}
                                    onChange={handleChange}
                                    className="w-full p-3 border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:outline-none"
                                    placeholder="https://mysite.com"
                                />
                            </div>
                            <div>
                                <label className="block font-bold mb-1 text-sm text-gray-600">Resume URL</label>
                                <input
                                    name="social_resume_url"
                                    value={form.social_links.resume_url}
                                    onChange={handleChange}
                                    className="w-full p-3 border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:outline-none"
                                    placeholder="https://drive.google.com/..."
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 mt-6">
                        <OutlineButton type="button" variant="secondary" onClick={onClose}>Cancel</OutlineButton>
                        <OutlineButton type="submit" disabled={loading}>
                            {loading ? 'Saving...' : 'Save Changes'}
                        </OutlineButton>
                    </div>
                </form>
            </FloatingCard>
        </div>
    );
};

export default EditProfileModal;
