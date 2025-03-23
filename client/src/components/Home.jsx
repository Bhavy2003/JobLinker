import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from './shared/Navbar';
import HeroSection from './HeroSection';
import CategoryCarousel from './CategoryCarousel';
import LatestJobs from './LatestJobs';
import Footer from './shared/Footer';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ChatBoat from './ChatBoat';
import TrustedBySection from './TrustedBySection';
import ReviewCarousel from './ReviewCarousel';
import StatsSection from './StatsSection';
import TopJobs from './TopJobs';
import LanguageSelector from '@/LanguageSelector';

const Home = () => {
  useGetAllJobs();
  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === 'recruiter') {
      navigate("/admin/companies");
    }
  }, [user, navigate]);

  return (
    <motion.div
      className="bg-white"
      initial={ { opacity: 0 } }
      animate={ { opacity: 1 } }
      transition={ { duration: 0.5 } }
    >
      {/* Fixed navbar */ }
      <Navbar />

      {/* Main content with padding to avoid overlap */ }
      <div className="pt-16  bg-gradient-to-br from-[#00040A] to-[#001636]">
        <HeroSection />
        <TrustedBySection />
        <StatsSection/>
        <CategoryCarousel />
        <LatestJobs />
        <ReviewCarousel/>
        <TopJobs/>
        <Footer />
      </div>
      <LanguageSelector/>
      <ChatBoat />
    </motion.div>
  );
};

export default Home;
