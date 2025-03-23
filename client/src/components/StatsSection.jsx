import { FaNetworkWired, FaLayerGroup, FaBuilding } from "react-icons/fa";
import React from "react";
import { motion } from "framer-motion";

const StatsSection = () => {
  return (
    <div className="bg-gradient-to-br from-[#00040A] to-[#001636] py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Card 1 - Blue Glow */}
          <motion.div
            className="bg-gray-900 shadow-lg rounded-2xl p-6 flex flex-col items-center transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-blue-500/50 hover:cursor-pointer"
            whileHover={{ rotate: 1.5}}
          >
            <div className="bg-blue-500 p-4 rounded-full transition-all duration-300 hover:shadow-lg hover:bg-blue-600">
              <FaNetworkWired className="text-white text-xl hover:rotate-6 transition-all duration-300" />
            </div>
            <h2 className="text-3xl font-bold mt-4">100+</h2>
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
            <h2 className="text-3xl font-bold mt-4">15K+</h2>
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
            <h2 className="text-3xl font-bold mt-4">6K+</h2>
            <p className="text-gray-400 text-lg">Jobs Done</p>
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
};

export default StatsSection;
