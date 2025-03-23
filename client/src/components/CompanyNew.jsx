import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const CompaNew = ({ job }) => {
    const navigate = useNavigate();

    if (!job?.company) return null; // Prevent errors if company data is missing

    return (
        <motion.div
            
            className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden shadow-lg transition-all duration-500 cursor-pointer"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.06, boxShadow: "0px 8px 24px rgba(163, 144, 144, 0.1)" }}
            transition={{ duration: 0.4 }}
        >
            <div className="p-6">
                {/* Header with Company Logo */ }
                <div className="flex items-start justify-between">
                    <div className="flex items-center">
                        <img
                            src={job?.company?.logo || 'https://static.vecteezy.com/system/resources/previews/011/197/876/non_2x/tech-logo-design-vector.jpg'} 
                            alt={job?.company?.name || 'Company Logo'}
                            className="w-12 h-12 rounded-full"
                        />
                        <div className="ml-4">
                            <p className="text-gray-400">{job?.company?.name || 'Company Name'}</p>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default CompaNew;
