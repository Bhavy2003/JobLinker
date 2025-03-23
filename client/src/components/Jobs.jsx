
import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import Footer from './shared/Footer';
import FilterCard from './FilterCard';
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import '../../src/i18n.jsx';

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector((store) => store.job);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [showFilters, setShowFilters] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const { t } = useTranslation();

    useEffect(() => {
        let jobsToFilter = allJobs || []; // Ensure allJobs is an array

       

        // Step 1: Parse the searchedQuery for salary range and other filters
        let salaryRanges = [];
        let otherQueryWords = [];

        

        if (searchedQuery) {
            const queryWords = searchedQuery.toLowerCase().split(' ');
            queryWords.forEach((word) => {
                if (word.startsWith('salary:')) {
                    const range = word.replace('salary:', '');
                    salaryRanges.push(range);
                } else {
                    otherQueryWords.push(word);
                }
            });
        }
       

        // Step 2: Filter by other query words (Location, Industry, Language)
        if (otherQueryWords.length > 0) {
            jobsToFilter = jobsToFilter.filter((job) => {
                return otherQueryWords.some((word) =>
                    [
                        job?.title,
                        job?.description,
                        job?.location,
                        job?.requirements?.join(' ') || '',
                    ].some((field) => field?.toLowerCase().includes(word))
                );
            });
        }

        // Step 3: Filter by salary range
        if (salaryRanges.length > 0) {
            jobsToFilter = jobsToFilter.filter((job) => {
                const salaryString = String(job?.salary || '');
                const salary = parseFloat(salaryString.replace(/[^0-9.]/g, '')); // Handle strings like "62 LPA"

              

                if (isNaN(salary)) {
                   
                    return false;
                }

                return salaryRanges.some((range) => {
                   
                    if (range.toLowerCase() === 'above 50') {
                        return salary > 50;
                    }
                    const [min, max] = range.split('-').map(Number);
                    if (isNaN(min) || isNaN(max)) {
                        
                        return false;
                    }
                    return salary >= min && salary <= max;
                });
            });
        }

        // Step 4: Apply additional filtering based on user search input
        if (searchTerm) {
            const lowerCaseSearch = searchTerm.toLowerCase();
            jobsToFilter = jobsToFilter.filter((job) =>
                [
                    job?.title,
                    job?.description,
                    job?.location,
                    job?.requirements?.join(' ') || '',
                ].some((field) => field?.toLowerCase().includes(lowerCaseSearch))
            );
        }

        
        setFilteredJobs(jobsToFilter);
    }, [allJobs, searchedQuery, searchTerm]);

    return (
        <div className="bg-gray-900 min-h-screen">
            <Navbar />
            <div className="max-w-7xl mx-auto pt-20 bg-gradient-to-br from-[#00040A] to-[#001636]">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Mobile Filter Button */}
                    <div className="lg:hidden w-full">
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md mb-4"
                        >
                            {showFilters ? 'Hide Filters' : 'Show Filters'}
                        </button>
                    </div>

                    {/* Filter Sidebar */}
                    <div
                        className={`lg:block ${
                            showFilters ? 'block' : 'hidden'
                        } lg:col-span-1`}
                    >
                        <FilterCard />
                    </div>

                    {/* Jobs Section */}
                    <div className="lg:col-span-3">
                        {/* Search Box */}
                        <div className="mb-6 mr-8 ml-8">
                            <input
                                type="text"
                                placeholder={t('Title')}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
                            />
                        </div>

                        {/* Job Listings */}
                        <motion.div
                            className="grid grid-cols-1 gap-8"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            {filteredJobs.length > 0 ? (
                                filteredJobs.map((job) => (
                                    <motion.div
                                        key={job?._id}
                                        layout
                                        initial={{ opacity: 0, y: 50 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            type: 'spring',
                                            stiffness: 200,
                                            damping: 20,
                                        }}
                                    >
                                        <Job job={job} />
                                    </motion.div>
                                ))
                            ) : (
                                <span className="text-blue-600 font-bold">
                                    No jobs found
                                </span>
                            )}
                        </motion.div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Jobs;