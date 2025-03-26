import React from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import Image from "../../src/assets/newjob.png";
import { useTranslation } from 'react-i18next';
import "../../src/i18n.jsx";

const TopJobs = () => {
    const { allJobs } = useSelector(state => state.job);  
    const { t } = useTranslation();

   
    const topJobs = allJobs
        ?.filter(job => job?.salary) 
        .sort((a, b) => b.salary - a.salary) 
        .slice(0,6); 

    return (
        <div className="bg-gradient-to-br from-[#00040A] to-[#001636] text-white py-12 px-6">
            {/* Title Section */}
            <motion.h2
                className="text-4xl font-bold text-center mb-10"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
            >
                <span className="text-4xl font-extrabold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-br from-blue-400 via-purple-500 to-blue-600">
                    {t("TopJobs")}
                </span> 💼
            </motion.h2>

            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center lg:items-start pt-8">
                {/* Left Side - Image */}
                <motion.div
                    className="lg:w-1/2 w-full flex justify-center lg:justify-start mb-8 pt-6 lg:mb-0"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                >
                    <img
                        src={Image}
                        alt="Top Jobs"
                        className="w-[90%] hover:shadow-blue-700/70 hover:cursor-pointer rounded-full lg:w-[80%] max-w-md rounded-lg shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl hover:brightness-110 p-4 bg-gradient-to-br from-[#00040A] to-[#001636] transition-all duration-300 hover:shadow-lg"
                    />
                </motion.div>

                {/* Right Side - Job Cards */}
                <motion.div
                    className="lg:w-1/2 w-full grid grid-cols-1 sm:grid-cols-2 -ml-6 gap-8"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 }}
                >
                    {topJobs?.length > 0 ? (
                        topJobs.map((job, index) => (
                            <motion.div
                                key={job?._id || index}
                                className="bg-gray-800 bg-opacity-80 backdrop-blur-md p-6 rounded-xl shadow-lg border border-gray-700 transition-all duration-300 hover:scale-105 hover:border-blue-500 hover:cursor-pointer"
                                whileHover={{ scale: 1.1, boxShadow: "0px 8px 24px rgba(205, 50, 50, 0.1)" }}
                                transition={{ duration: 0.3 }}
                            >
                                <h3 className="text-xl font-bold text-blue-400">{job?.title || "Unknown Title"}</h3>
                                <p className="text-lg text-gray-300 mt-2">{job?.salary?.toLocaleString() || "N/A"} LPA</p>
                                <p className="text-sm text-gray-400">Company: {job?.company?.name || "Unknown Company"}</p>
                            </motion.div>
                        ))
                    ) : (
                        <div className="col-span-2 text-center py-4 text-gray-500">
                            No jobs found
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default TopJobs;

