import React, { useState, useEffect } from 'react';
import FloatingCard from './FloatingCard';
import OutlineButton from './OutlineButton';
import { FaTimes } from 'react-icons/fa';

const EditProfileModal = ({ user, onClose, onSave }) => {
    const [form, setForm] = useState({
        name: '',
        bio: '',
        about: '',
        skills: [],
        social_links: {
            github: '',
            linkedin: '',
            website: '',
            resume: ''
        }
    });
    const [loading, setLoading] = useState(false);
    const [skillInput, setSkillInput] = useState('');

    useEffect(() => {
        if (user) {
            setForm({
                name: user.name || '',
                bio: user.bio || '',
                about: user.about || '',
                skills: user.skills || [],
                social_links: {
                    github: user.social_links?.github || '',
                    linkedin: user.social_links?.linkedin || '',
                    website: user.social_links?.website || '',
                    resume: user.social_links?.resume || ''
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

    const handleAddSkill = () => {
        if (skillInput.trim() && !form.skills.includes(skillInput.trim())) {
            setForm(prev => ({
                ...prev,
                skills: [...prev.skills, skillInput.trim()]
            }));
            setSkillInput('');
        }
    };

    const handleRemoveSkill = (skillToRemove) => {
        setForm(prev => ({
            ...prev,
            skills: prev.skills.filter(s => s !== skillToRemove)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (!form.name.trim()) {
            alert('Display name is required');
            return;
        }

        if (form.bio && form.bio.length > 150) {
            alert('Bio must be 150 characters or less');
            return;
        }

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
                        <label className="block font-bold mb-1">Display Name *</label>
                        <input
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block font-bold mb-1">Bio (short tagline)</label>
                        <input
                            name="bio"
                            value={form.bio}
                            onChange={handleChange}
                            maxLength={150}
                            className="w-full p-3 border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:outline-none"
                            placeholder="Software Engineer | Open Source Enthusiast"
                        />
                        <p className="text-sm text-gray-500 mt-1">{form.bio.length}/150 characters</p>
                    </div>

                    <div>
                        <label className="block font-bold mb-1">About Me</label>
                        <textarea
                            name="about"
                            value={form.about}
                            onChange={handleChange}
                            className="w-full p-3 border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:outline-none"
                            rows="6"
                            placeholder="Tell people more about yourself, your interests, and what you're building..."
                        />
                    </div>

                    <div>
                        <label className="block font-bold mb-1">Skills</label>
                        <div className="flex gap-2 mb-2">
                            <input
                                type="text"
                                value={skillInput}
                                onChange={(e) => setSkillInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                                className="flex-1 p-3 border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:outline-none"
                                placeholder="Add a skill (e.g., React, Python)"
                            />
                            <OutlineButton type="button" onClick={handleAddSkill}>Add</OutlineButton>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {form.skills.map((skill, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1 bg-orange-500 text-white rounded-full text-sm font-bold flex items-center gap-2"
                                >
                                    {skill}
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveSkill(skill)}
                                        className="hover:text-red-200"
                                    >
                                        ×
                                    </button>
                                </span>
                            ))}
                        </div>
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
                                    type="url"
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
                                    type="url"
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
                                    type="url"
                                    className="w-full p-3 border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:outline-none"
                                    placeholder="https://mysite.com"
                                />
                            </div>
                            <div>
                                <label className="block font-bold mb-1 text-sm text-gray-600">Resume URL</label>
                                <input
                                    name="social_resume"
                                    value={form.social_links.resume}
                                    onChange={handleChange}
                                    type="url"
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
