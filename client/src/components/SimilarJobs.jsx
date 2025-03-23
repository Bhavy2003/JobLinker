import React from "react";
import LatestJobCards from "./LatestJobCards";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import "../../src/i18n.jsx";

const SimilarJobs = ({ currentJobId, currentJobCategory }) => {
    const { allJobs } = useSelector((store) => store.job);
    const { t } = useTranslation();

   
    const jobsList = Array.isArray(allJobs) ? allJobs : [];

    // Filter jobs to exclude the current job and find similar ones
    const similarJobs = jobsList
        .filter(job => job._id !== currentJobId && job.category === currentJobCategory)
        .sort(() => Math.random() - 0.5) // Shuffle jobs for randomness
        .slice(0, 3); // Pick only 3 jobs

    // If no similar jobs are found, show a message
    if (similarJobs.length === 0) {
        return (
            <div className="max-w-7xl mx-auto my-16 px-6 text-center">
                <motion.h1
                    className="text-3xl md:text-4xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-br from-blue-400 via-purple-500 to-blue-600"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {t("SimilarJobs")}
                </motion.h1>
                <motion.span
                    className="text-lg text-gray-500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    No Similar Jobs Available
                </motion.span>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto my-16 px-6">
            <motion.h1
                className="text-3xl md:text-4xl font-extrabold pt-3 text-center mb-8 text-transparent bg-clip-text bg-gradient-to-br from-blue-400 via-purple-500 to-blue-600"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
            >
                {t("SimilarJobs")}
            </motion.h1>

            {/* Responsive grid layout with spacing */}
            <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                {similarJobs.map((job) => (
                    <motion.div
                        key={job._id}
                        className="rounded-lg shadow-md hover:shadow-lg transition duration-300 p-5"
                        whileHover={{ scale: 1.03 }}
                    >
                        <LatestJobCards job={job} />
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default SimilarJobs;