import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import ProfileHeaderCard from '../components/ProfileHeaderCard';
import SkillsSection from '../components/SkillsSection';
import AboutSection from '../components/AboutSection';
import MyProjectsSection from '../components/MyProjectsSection';
import JoinedProjectsSection from '../components/JoinedProjectsSection';
import SocialLinksSection from '../components/SocialLinksSection';
import EditProfileModal from '../components/EditProfileModal';
import AddSkillModal from '../components/AddSkillModal';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const Profile = () => {
    const { token, currentUser, logout } = useAuth();
    const [userProfile, setUserProfile] = useState(null);
    const [myProjects, setMyProjects] = useState([]);
    const [joinedProjects, setJoinedProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    const [showEditModal, setShowEditModal] = useState(false);
    const [showSkillModal, setShowSkillModal] = useState(false);

    const fetchData = async () => {
        if (!currentUser || !token) return;

        setLoading(true);
        try {
            const headers = { Authorization: `Bearer ${token}` };

            const [userRes, myProjRes, joinedProjRes] = await Promise.all([
                axios.get('http://localhost:5000/api/auth/me', { headers }),
                axios.get(`http://localhost:5000/api/projects/active/${currentUser.uid}`, { headers }),
                axios.get(`http://localhost:5000/api/projects/member/${currentUser.uid}`, { headers })
            ]);

            setUserProfile(userRes.data);
            setMyProjects(myProjRes.data);
            setJoinedProjects(joinedProjRes.data);

        } catch (error) {
            console.error("Error fetching profile data", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [currentUser, token]);

    const handleUpdateProfile = async (updatedData) => {
        try {
            const headers = { Authorization: `Bearer ${token}` };
            const res = await axios.put('http://localhost:5000/api/auth/me', updatedData, { headers });
            setUserProfile(res.data);
        } catch (error) {
            console.error("Error updating profile", error);
            throw error;
        }
    };

    const handleAddSkill = async (newSkill) => {
        if (!userProfile) return;
        const updatedSkills = [...(userProfile.skills || []), newSkill];
        await handleUpdateProfile({ skills: updatedSkills });
    };

    const handleRemoveSkill = async (skillToRemove) => {
        if (!userProfile) return;
        const updatedSkills = userProfile.skills.filter(s => s !== skillToRemove);
        await handleUpdateProfile({ skills: updatedSkills });
    };

    if (loading) return <Layout><div>Loading profile...</div></Layout>;
    if (!userProfile) return <Layout><div>Profile not found</div></Layout>;

    return (
        <Layout fullWidth>
            <div className="w-full px-6 py-8">
                <div
                    className="
                        grid 
                        grid-cols-1 
                        xl:grid-cols-[2fr_1fr] 
                        lg:grid-cols-[1.6fr_1fr] 
                        md:grid-cols-1 
                        gap-8 
                        max-w-screen-xl 
                        mx-auto
                    "
                >
                    {/* Left Column */}
                    <div className="flex flex-col gap-6 w-full">
                        <ProfileHeaderCard
                            user={userProfile}
                            onEdit={() => setShowEditModal(true)}
                            onLogout={logout}
                        />

                        <SkillsSection
                            skills={userProfile.skills || []}
                            onAddSkill={() => setShowSkillModal(true)}
                            onRemoveSkill={handleRemoveSkill}
                        />

                        <AboutSection
                            bio={userProfile.bio}
                            onEdit={() => setShowEditModal(true)}
                        />
                    </div>

                    {/* Right Column */}
                    <div className="flex flex-col gap-6 w-full">
                        {/* Your Projects - Scrollable Box */}
                        <div className="max-h-[400px] overflow-y-auto rounded-lg border border-gray-700 p-4 bg-white">
                            <MyProjectsSection projects={myProjects} />
                        </div>

                        {/* Projects You Joined - Scrollable Box */}
                        <div className="max-h-[400px] overflow-y-auto rounded-lg border border-gray-700 p-4 bg-white">
                            <JoinedProjectsSection projects={joinedProjects} />
                        </div>

                        {/* Social Links - Regular Box (no scroll) */}
                        <div className="rounded-lg border border-gray-700 p-4 bg-white">
                            <SocialLinksSection
                                links={userProfile.social_links || {}}
                                onEdit={() => setShowEditModal(true)}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {showEditModal && (
                <EditProfileModal
                    user={userProfile}
                    onClose={() => setShowEditModal(false)}
                    onSave={handleUpdateProfile}
                />
            )}

            {showSkillModal && (
                <AddSkillModal
                    onClose={() => setShowSkillModal(false)}
                    onAdd={handleAddSkill}
                />
            )}
        </Layout>
    );
};

export default Profile;
