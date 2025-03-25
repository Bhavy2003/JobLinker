// import React, { useEffect } from 'react';
// import { Button } from './ui/button';
// import { BookmarkPlus, ArrowUpRight } from 'lucide-react';
// import { Avatar, AvatarImage } from './ui/avatar';
// import { Badge } from './ui/badge';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { useDispatch, useSelector } from 'react-redux';
// import { setsavedJobs } from '@/redux/authSlice';
// import { toast } from 'sonner';
// import { USER_API_END_POINT } from '@/utils/constant';
// import { Card } from '@/components/ui/card';
// import axios from 'axios';

// const JobNew = ({ job }) => {
//     const { savedJobs } = useSelector(store => store.auth);
//     const navigate = useNavigate();
//     const dispatch = useDispatch();

//     const daysAgoFunction = (mongodbTime) => {
//         const createdAt = new Date(mongodbTime);
//         const currentTime = new Date();
//         const timeDifference = currentTime - createdAt;
//         return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
//     };
//dshdgshds

//     const handleSaveForLater = async (jobId) => {

//         try {
//             const response = await axios.post(`${USER_API_END_POINT}/savedjob`, { jobId }, {
//                 withCredentials: true
//             });
//             if (response) {
//                 dispatch(setsavedJobs(response.data.savedJobs));
//                 toast.success(response.data.message);
//             }
//         } catch (error) {

//             toast.error(error.response?.data?.message || 'Error saving job');
//         }
//     };

//     return (
//         <motion.div
//             className="flex items-stretch gap-4 p-4"
//             whileHover={ { scale: 1.05 } }
//             initial={ { opacity: 0, y: 20 } }
//             animate={ { opacity: 1, y: 0 } }
//             transition={ { type: 'spring', stiffness: 300, damping: 20, duration: 0.9 } }
//         >
//             <Card key={ job.id } className="bg-gray-900 border-gray-800 w-full p-6 rounded-lg shadow-md">
//                 <div className="flex items-start justify-between">
//                     <div className="flex items-center">
//                         <Avatar>
//                             <AvatarImage src={ job?.company?.logo } alt={ job?.company?.name } />
//                         </Avatar>
//                         <div className="ml-4">
                          
//                             <p className="text-gray-400">{ job?.company?.name }</p>
//                         </div>
//                     </div>
                    
//                 </div>

               
//             </Card>
//         </motion.div>
//     );
// };

// export default JobNew;
import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button'; // Ensure you have a Button component
import { BookmarkPlus, ArrowUpRight } from 'lucide-react'; // Update with appropriate icon library
import { Link } from 'react-router-dom';

const CompaNew= ({ job }) => {
    const navigate = useNavigate();

    return (
        <motion.div
            
            className="bg-gray-800 border border-gray-800 rounded-lg overflow-hidden shadow-lg transition-all duration-500 cursor-pointer"
            initial={ { opacity: 0, y: 30 } } // Initial state for motion
            animate={ { opacity: 1, y: 0 } } // Animate to final state
            whileHover={ { scale: 1.06, boxShadow: "0px 8px 24px rgba(199, 180, 180, 0.1)" } } // Hover effect
            transition={ { duration: 0.4 } }
        >
            <div className="p-6">
                {/* Header with Company Logo */ }
                <div className="flex items-start justify-between">
                    <div className="flex items-center">
                        <img
                            src={ job?.company?.logo || 'https://placehold.co/50x50' } 
                            alt={ job?.company?.name || 'Company Logo' }
                            className="w-12 h-12 rounded-full"
                        />
                        <div className="ml-4">
                            
                            <p className="text-white text-[22px]">{ job?.company?.name || 'Company Name' }</p>
                        </div>
                    </div>
                    
                </div>
                </div>

              
        </motion.div>
    );
};

export default CompaNew;
