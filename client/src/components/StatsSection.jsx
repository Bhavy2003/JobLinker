// import { FaNetworkWired, FaLayerGroup, FaBuilding } from "react-icons/fa";
// import React from "react";
// import { motion } from "framer-motion";

// const StatsSection = () => {
//   return (
//     <div className="bg-gradient-to-br from-[#00040A] to-[#001636] py-12 px-6">
//       <div className="max-w-6xl mx-auto">
//         <motion.div
//           className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white text-center"
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           {/* Card 1 - Blue Glow */}
//           <motion.div
//             className="bg-gray-900 shadow-lg rounded-2xl p-6 flex flex-col items-center transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-blue-500/50 hover:cursor-pointer"
//             whileHover={{ rotate: 1.5}}
//           >
//             <div className="bg-blue-500 p-4 rounded-full transition-all duration-300 hover:shadow-lg hover:bg-blue-600">
//               <FaNetworkWired className="text-white text-xl hover:rotate-6 transition-all duration-300" />
//             </div>
//             <h2 className="text-3xl font-bold mt-4">100+</h2>
//             <p className="text-gray-400 text-lg">Jobs For Location</p>
//           </motion.div>

//           {/* Card 2 - Orange Glow */}
//           <motion.div
//             className="bg-gray-900 shadow-lg rounded-2xl p-6 flex flex-col items-center transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-orange-500/50 hover:cursor-pointer"
//             whileHover={{ rotate: -1.5 }}
//           >
//             <div className="bg-orange-500 p-4 rounded-full transition-all duration-300 hover:shadow-lg hover:bg-orange-600">
//               <FaLayerGroup className="text-white text-xl hover:rotate-6 transition-all duration-300" />
//             </div>
//             <h2 className="text-3xl font-bold mt-4">15K+</h2>
//             <p className="text-gray-400 text-lg">Companies Jobs</p>
//           </motion.div>

//           {/* Card 3 - Blue Glow */}
//           <motion.div
//             className="bg-gray-900 shadow-lg rounded-2xl p-6 flex flex-col items-center transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-blue-500/50 hover:cursor-pointer"
//             whileHover={{ rotate: 1.5 }}
//           >
//             <div className="bg-blue-500 p-4 rounded-full transition-all duration-300 hover:shadow-lg hover:bg-blue-600">
//               <FaBuilding className="text-white text-xl hover:rotate-6 transition-all duration-300" />
//             </div>
//             <h2 className="text-3xl font-bold mt-4">6K+</h2>
//             <p className="text-gray-400 text-lg">Jobs Done</p>
//           </motion.div>

//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default StatsSection;


import { FaNetworkWired, FaLayerGroup, FaBuilding } from "react-icons/fa";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const StatsSection = () => {
  // State to hold the current count for each number
  const [jobsForLocation, setJobsForLocation] = useState(0);
  const [companiesJobs, setCompaniesJobs] = useState(0);
  const [jobsDone, setJobsDone] = useState(0);

  // Ref to track if the component is in view
  const ref = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  // Target values for the counters
  const targetJobsForLocation = 100; // 100+
  const targetCompaniesJobs = 15000; // 15K+
  const targetJobsDone = 6000; // 6K+

  // Duration of the animation (1 second)
  const duration = 1000; // in milliseconds
  const interval = 50; // Update every 50ms

  // Calculate the increment step for each counter
  const stepJobsForLocation = Math.ceil(targetJobsForLocation / (duration / interval));
  const stepCompaniesJobs = Math.ceil(targetCompaniesJobs / (duration / interval));
  const stepJobsDone = Math.ceil(targetJobsDone / (duration / interval));

  useEffect(() => {
    // Function to start the counter animation
    const startCounter = () => {
      if (hasAnimated) return; // Prevent re-animation if already animated

      setHasAnimated(true); // Mark as animated

      let currentJobsForLocation = 1;
      let currentCompaniesJobs = 1;
      let currentJobsDone = 1;

      const timer = setInterval(() => {
        // Update Jobs For Location
        if (currentJobsForLocation < targetJobsForLocation) {
          currentJobsForLocation += stepJobsForLocation;
          if (currentJobsForLocation > targetJobsForLocation) {
            currentJobsForLocation = targetJobsForLocation;
          }
          setJobsForLocation(currentJobsForLocation);
        }

        // Update Companies Jobs
        if (currentCompaniesJobs < targetCompaniesJobs) {
          currentCompaniesJobs += stepCompaniesJobs;
          if (currentCompaniesJobs > targetCompaniesJobs) {
            currentCompaniesJobs = targetCompaniesJobs;
          }
          setCompaniesJobs(currentCompaniesJobs);
        }

        // Update Jobs Done
        if (currentJobsDone < targetJobsDone) {
          currentJobsDone += stepJobsDone;
          if (currentJobsDone > targetJobsDone) {
            currentJobsDone = targetJobsDone;
          }
          setJobsDone(currentJobsDone);
        }

        // Clear the interval when all counters reach their targets
        if (
          currentJobsForLocation >= targetJobsForLocation &&
          currentCompaniesJobs >= targetCompaniesJobs &&
          currentJobsDone >= targetJobsDone
        ) {
          clearInterval(timer);
        }
      }, interval);
    };

    // Use Intersection Observer to detect when the component is in view
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          startCounter();
        }
      },
      { threshold: 0.5 } // Trigger when 50% of the component is in view
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    // Cleanup the observer on component unmount
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [hasAnimated]);

  // Format the numbers for display (e.g., 15000 -> 15K+)
  const formatNumber = (number) => {
    if (number >= 1000) {
      return `${Math.floor(number / 1000)}K+`;
    }
    return `${number}+`;
  };

  return (
    <div className="bg-gradient-to-br from-[#00040A] to-[#001636] py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Card 1 - Blue Glow */}
          <motion.div
            className="bg-gray-900 shadow-lg rounded-2xl p-6 flex flex-col items-center transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-blue-500/50 hover:cursor-pointer"
            whileHover={{ rotate: 1.5 }}
          >
            <div className="bg-blue-500 p-4 rounded-full transition-all duration-300 hover:shadow-lg hover:bg-blue-600">
              <FaNetworkWired className="text-white text-xl hover:rotate-6 transition-all duration-300" />
            </div>
            <h2 className="text-3xl font-bold mt-4">{formatNumber(jobsForLocation)}</h2>
            <p className="text-gray-400 text-lg">Jobs For Location</p>
          </motion.div>

          {/* Card 2 - Orange Glow */}
          <motion.div
            className="bg-gray-900 shadow-lg rounded-2xl p-6 flex flex-col items-center transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-orange-500/50 hover:cursor-pointer"
            whileHover={{ rotate: -1.5 }}
          >
            <div className="bg-orange-500 p-4 rounded-full transition-all duration-300 hover:shadow-lg hover:bg-orange-600">
              <FaLayerGroup className="text-white text-xl hover:rotate-6 transition-all duration-300" />
            </div>
            <h2 className="text-3xl font-bold mt-4">{formatNumber(companiesJobs)}</h2>
            <p className="text-gray-400 text-lg">Companies Jobs</p>
          </motion.div>

          {/* Card 3 - Blue Glow */}
          <motion.div
            className="bg-gray-900 shadow-lg rounded-2xl p-6 flex flex-col items-center transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-blue-500/50 hover:cursor-pointer"
            whileHover={{ rotate: 1.5 }}
          >
            <div className="bg-blue-500 p-4 rounded-full transition-all duration-300 hover:shadow-lg hover:bg-blue-600">
              <FaBuilding className="text-white text-xl hover:rotate-6 transition-all duration-300" />
            </div>
            <h2 className="text-3xl font-bold mt-4">{formatNumber(jobsDone)}</h2>
            <p className="text-gray-400 text-lg">Jobs Done</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default StatsSection;