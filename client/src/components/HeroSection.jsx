import React, { useState } from 'react';
import { Button } from './ui/button';
import { Search, ArrowRight } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Input } from './ui/input';
import { toast } from 'sonner';
import { useTranslation } from "react-i18next";
import "../../src/i18n.jsx";
import Image from "../../src/assets/Home.png";

const HeroSection = () => {
    const [query, setQuery] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const searchJobHandler = (e) => {
        e.preventDefault(); 
        dispatch(setSearchedQuery(query));
        navigate('/browse');
        window.scrollTo(0, 0);
    };

    const handleNavigation = () => {
        toast.success('Please Login into Recruiter Account  ')
        navigate('/login');
    };

    // Ensure scroll happens after navigation
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [navigate]); // Runs only when navigate changes

    return (
        <div className="relative overflow-hidden pt-16 bg-gradient-to-br from-[#00040A] to-[#001636] min-h-screen text-white px-6 py-16">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMwMDAwMDAiIHN0b3Atb3BhY2l0eT0iMC4xIi8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjMDAwMDAwIiBzdG9wLW9wYWNpdHk9IjAiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cGF0aCBkPSJNMCAwaDIwMHYyMDBIMHoiIGZpbGw9InVybCgjZykiLz48L3N2Zz4=')] opacity-30 pointer-events-none"></div>

            <motion.h1
                className="text-3xl sm:text-4xl pt-3 lg:text-5xl font-bold mb-6 text-center tracking-tight user-select text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-700 pb-3 "
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
            >
                {t("welcome")}
            </motion.h1>
            
            <motion.p
                className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed text-center user-select"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                viewport={{ once: true }}
            >
                {/* Connect with top employers and discover opportunities that match your skills and aspirations. Your next career move starts here. */}
                {t("description")}
            </motion.p>
            <motion.div className="flex justify-center" initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                viewport={{ once: true }}>
                <img 
                    src={Image}
                    alt="Home"
                    className="w-full max-w-[400px] md:max-w-[500px] lg:max-w-[570px] xl:max-w-[630px] mb-6 opacity-80 h-auto object-cover rounded-lg shadow-lg"

                />
            </motion.div>

            <div className="flex justify-center gap-6 mb-10">
                <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-400 to-indigo-700 text-white hover:from-blue-200 hover:to-blue-600 px-8 py-4 rounded-full flex items-center text-lg cursor-pointer"
                    onClick={() => { navigate('/jobs'); window.scrollTo(0, 0); }}
                >
                    {t("FindJobs")}
                    <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                    onClick={handleNavigation}
                    size="lg"
                    variant="outline"
                    className="border border-gray-600 text-white hover:bg-gray-700 hover:text-white bg-transparent px-8 py-4 rounded-full text-lg cursor-pointer"
                >
                    {t("PostJob")}
                </Button>
            </div>

            <div>
                <motion.div
                    className="flex w-full sm:w-[70%] lg:w-[50%] shadow-md border border-gray-700 pl-3 pr-2 py-2 rounded-full items-center gap-4 mx-auto bg-[#001636] bg-opacity-90"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    
                >
                    <Input
                        type="text"
                        value={query}
                        placeholder={t("Title")}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full p-3 outline-none border-none bg-transparent text-white placeholder-gray-400 rounded-full focus:ring-2 focus:ring-blue-500"
                    />
                    <span >
                    <Button
                        onClick={searchJobHandler} 
                        className="rounded-full bg-gradient-to-r from-blue-400 to-indigo-700 text-white hover:from-blue-100 hover:to-blue-600 px-6 py-3 flex items-center"
                    >
                        
                        <Search className="h-5 w-5 mr-2" />
                        {t("Search")}
                        
                    </Button>
                    </span>
                </motion.div>
            </div>
        </div>
    );
};

export default HeroSection;
