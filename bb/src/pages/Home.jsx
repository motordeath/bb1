import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import ProjectCard from '../components/ProjectCard';
import CreateProjectModal from '../components/CreateProjectModal';
import CreateProjectPanel from '../components/CreateProjectPanel';
import ActiveProjectsCard from '../components/ActiveProjectsCard';
import SavedProjectsCard from '../components/SavedProjectsCard';
import FilterRibbon from '../components/FilterRibbon';
import TrendingSection from '../components/TrendingSection';
import ActivitySidebar from '../components/ActivitySidebar';
import RecommendationsSidebar from '../components/RecommendationsSidebar';
import ExploreCategories from '../components/ExploreCategories';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const Home = () => {
  const { token, currentUser } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  const [activeProjects, setActiveProjects] = useState([]);
  const [savedProjects, setSavedProjects] = useState([]);
  const [trendingProjects, setTrendingProjects] = useState([]);
  const [recommendedProjects, setRecommendedProjects] = useState([]);
  const [activities, setActivities] = useState([]);
  const [teammates, setTeammates] = useState([]);
  const [categories, setCategories] = useState([]);

  const fetchData = async () => {
    console.log("DEBUG: Fetching data...", { currentUser, token });
    if (!currentUser) {
      console.log("DEBUG: No current user, skipping user-specific fetches");
    }

    setLoading(true);
    try {
      const headers = { Authorization: `Bearer ${token}` };
      console.log("DEBUG: Headers:", headers);

      // Parallel fetching
      const [
        feedRes,
        activeRes,
        savedRes,
        trendingRes,
        recRes,
        activityRes,
        teammatesRes,
        catsRes
      ] = await Promise.all([
        axios.get(`http://localhost:5000/api/projects/feed?filter=${activeFilter}`),
        currentUser ? axios.get(`http://localhost:5000/api/projects/active/${currentUser.uid}`) : Promise.resolve({ data: [] }),
        currentUser ? axios.get(`http://localhost:5000/api/projects/saved/${currentUser.uid}`, { headers }) : Promise.resolve({ data: [] }),
        axios.get('http://localhost:5000/api/projects/trending'),
        currentUser ? axios.get(`http://localhost:5000/api/projects/recommended/${currentUser.uid}`) : Promise.resolve({ data: [] }),
        currentUser ? axios.get(`http://localhost:5000/api/activity/${currentUser.uid}`) : Promise.resolve({ data: [] }),
        currentUser ? axios.get(`http://localhost:5000/api/users/similar/${currentUser.uid}`) : Promise.resolve({ data: [] }),
        axios.get('http://localhost:5000/api/projects/categories')
      ]);

      console.log("DEBUG: Active Projects Response:", activeRes.data);
      console.log("DEBUG: Feed Response:", feedRes.data);

      setProjects(feedRes.data);
      setActiveProjects(activeRes.data);
      setSavedProjects(savedRes.data);
      setTrendingProjects(trendingRes.data);
      setRecommendedProjects(recRes.data);
      setActivities(activityRes.data);
      setTeammates(teammatesRes.data);
      setCategories(catsRes.data);

    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("DEBUG: Home useEffect triggered", { activeFilter, hasToken: !!token, hasUser: !!currentUser });
    fetchData();
  }, [activeFilter, token, currentUser]);

  const LeftSidebarContent = (
    <>
      <ActiveProjectsCard projects={activeProjects} />
      <SavedProjectsCard savedProjects={savedProjects} />
    </>
  );

  const RightSidebarContent = (
    <>
      <ActivitySidebar activities={activities} />
      <RecommendationsSidebar matches={recommendedProjects} teammates={teammates} />
    </>
  );

  return (
    <Layout leftSidebar={LeftSidebarContent} rightSidebar={RightSidebarContent}>
      <div className="mb-8">
        <h1 className="text-3xl font-black mb-2">Hey {currentUser?.displayName?.split(' ')[0] || 'Builder'}, ready to build? 🚀</h1>
        <p className="text-gray-600">Got a new idea? Assemble your dream team today.</p>
      </div>

      <CreateProjectPanel onClick={() => setShowModal(true)} />

      <FilterRibbon activeFilter={activeFilter} onFilterChange={setActiveFilter} />

      <div className="my-6"></div>

      <TrendingSection projects={trendingProjects} />

      <div className="space-y-6">
        {loading ? (
          <div className="text-center py-10">Loading feed...</div>
        ) : (
          projects.length === 0 ? (
            <div className="text-center py-10 text-gray-500">No projects found. Be the first to create one!</div>
          ) : (
            projects.map(project => (
              <ProjectCard key={project._id} project={project} />
            ))
          )
        )}
      </div>

      <ExploreCategories categories={categories} />

      {showModal && (
        <CreateProjectModal
          onClose={() => setShowModal(false)}
          onProjectCreated={fetchData}
        />
      )}
    </Layout>
  );
};

export default Home;
