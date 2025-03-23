import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button'; 
import { BookmarkPlus, ArrowUpRight } from 'lucide-react'; 
import { Link } from 'react-router-dom';

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();

    return (
        <motion.div
            onClick={() => { navigate(`/description/${job._id}`); window.scrollTo(0, 0); }}
            className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-lg cursor-pointer transition-all duration-500"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.06, boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.15)" }}
            transition={{ duration: 0.4 }}
            style={{ width: '350px' }} // Increased card width
        >
            <div className="p-6 flex flex-col gap-4">
                {/* Header with Company Logo */ }
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <img
                            src={job?.company?.logo || 'https://placehold.co/50x50'}
                            alt={job?.company?.name || 'Company Logo'}
                            className="w-14 h-14 rounded-lg object-cover"
                        />
                        <div>
                            <h3 className="text-lg font-semibold text-white">
                                {job?.title || 'Job Title'}
                            </h3>
                            <p className="text-gray-400">{job?.company?.name || 'Company Name'}</p>
                        </div>
                    </div>
                    <Button variant="ghost" size="icon">
                        <BookmarkPlus className="h-5 w-5 text-gray-400" />
                    </Button>
                </div>

                {/* Job Details */ }
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3 text-gray-400">
                        <Badge variant="secondary">{job?.jobType || 'Job Type'}</Badge>
                        <span className="text-sm">{job?.location || 'Location'}</span>
                    </div>
                    <p className="text-gray-300 font-medium">
                        {job?.salary ? `${job.salary} LPA` : 'Not disclosed'}
                    </p>
                </div>

                {/* Footer with Positions and Details Button */ }
                <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">{job?.position} Positions</span>
                    <Link to={`/description/${job._id}`}>
                        <Button variant="ghost" size="sm" className='text-blue-500' onClick={() => window.scrollTo(0, 0)}>
                            Details
                            <ArrowUpRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default LatestJobCards;
