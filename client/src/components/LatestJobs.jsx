import React from 'react';
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { useTranslation } from "react-i18next";
import "../../src/i18n.jsx";

const LatestJobs = () => {
    const { allJobs } = useSelector((store) => store.job);
    const { t } = useTranslation();
    // Ensure allJobs is an array
    const jobsList = Array.isArray(allJobs) ? allJobs : [];

    // If no jobs are available, show a message
    if (jobsList.length === 0) {
        return (
            <div className="max-w-7xl mx-auto my-20 px-4 text-center">
                <motion.h1
                    className="text-4xl font-extrabold mb-10 text-transparent bg-clip-text bg-gradient-to-br from-blue-400 via-purple-500 to-blue-600"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {t("Latest")}
                </motion.h1>
                <motion.span
                    className="text-lg text-gray-500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    No Jobs Available
                </motion.span>
            </div>
        );
    }

    // Duplicate jobs for seamless looping
    const loopJobs = [...jobsList, ...jobsList, ...jobsList];

    return (
        <div className="max-w-7xl mx-auto my-20 px-4">
            <motion.h1
                className="text-4xl font-extrabold pt-3 text-center mb-10 text-transparent bg-clip-text bg-gradient-to-br from-blue-400 via-purple-500 to-blue-600"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}>

                {t("Latest")}
            </motion.h1>

            {/* Auto-scrolling job cards container */}
            <div className="relative overflow-hidden">
                <motion.div
                    className="flex gap-10"
                    animate={{ x: ["0%", "-1000%"] }}
                    transition={{
                        ease: "linear",
                        duration: 100, // Adjust speed
                        repeat: Infinity,
                    }}
                    style={{ display: "flex", willChange: "transform" }}
                >
                    {loopJobs.concat(loopJobs).map((job, index) => (
                        <div
                            key={index}
                            className="flex gap-8 my-10 flex-shrink-0"
                            style={{ minWidth: "10%" }} // Ensures smooth movement
                        >
                            <LatestJobCards job={job} />
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default LatestJobs;