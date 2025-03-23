import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import CompaNew from './CompaNew';
import Navbar from '../components/shared/Navbar';
import Footer from '../components/shared/Footer';
import { useTranslation } from "react-i18next";
import "../../src/i18n.jsx";

const CompanyList = () => {
    const { allJobs } = useSelector((store) => store.job);

    // Ensure allJobs is an array
    const jobsList = Array.isArray(allJobs) ? allJobs : [];
    const {t}=useTranslation();
    

    // Extract unique companies while handling missing values
    const uniqueCompanies = jobsList.reduce((acc, job) => {
        if (job?.company?.name) {
            const companyName = job.company.name.toLowerCase();
            if (!acc.some((item) => item.company.name.toLowerCase() === companyName)) {
                acc.push(job); // Add only if it's unique
            }
        }
        return acc;
    }, []);

   
    const [searchQuery, setSearchQuery] = useState('');

    // Filter companies based on the search query
    const filteredCompanies = uniqueCompanies.filter((job) =>
        job?.company?.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <div>
            <Navbar />
            <div className="max-w-7xl mx-auto my-20 px-4 ">
                <motion.h1
                    className="text-4xl font-extrabold text-center mb-10 text-transparent bg-clip-text bg-indigo-500 pt-3 pb-3"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    aria-label="All Companies"
                >
                    {t("AllCompanies")}
                </motion.h1>

                {/* Search Bar */}
                <div className="mb-8 my-3">
                    <input
                        type="text"
                        placeholder={t("CompReview")}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full sm:w-1/2 my-2 py-2 lg:w-1/3 p-4 py-3 mb-2 border-4 border-gray-300 rounded-md shadow-sm transition-all duration-300  focus:border-blue-400"
                    />
                </div>

                {/* Company Cards Grid */}
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {filteredCompanies.length === 0 ? (
                        <motion.span
                            className="text-center text-lg text-gray-500"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            {searchQuery ? 'No Companies Found' : 'No Companies Available'}
                        </motion.span>
                    ) : (
                        filteredCompanies.map((job) => (
                            <motion.div
                                key={job._id}
                                variants={cardVariants}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <CompaNew job={job} />
                            </motion.div>
                        ))
                    )}
                </motion.div>
            </div>
            <Footer />
        </div>
    );
};

export default CompanyList;
