// import React, { useState } from 'react';
// import Navbar from './shared/Navbar';
// import { Avatar, AvatarImage } from './ui/avatar';
// import { Button } from './ui/button';
// import { Contact, Mail, Pen } from 'lucide-react';
// import { Badge } from './ui/badge';
// import { Label } from './ui/label';
// import AppliedJobTable from './AppliedJobTable';
// import UpdateProfileDialog from './UpdateProfileDialog';
// import { useSelector } from 'react-redux';
// import useGetAppliedJobs from '@/hooks/useGetAppliedJobs';
// import { motion } from 'framer-motion';
// import SavedJobsTable from './SavedJobsTable';
// import Footer from './shared/Footer';
// import { useTranslation } from "react-i18next";
// import "../../src/i18n.jsx";

// const isResume = true;

// const Profile = () => {
//     useGetAppliedJobs();
//     const [open, setOpen] = useState(false);
//     const { user } = useSelector((store) => store.auth);
    
//     const {t}=useTranslation();
//     return (
//         <>

//             <motion.div
//                 initial={ { opacity: 0 } }
//                 animate={ { opacity: 1 } }
//                 transition={ { duration: 0.5 } }
//                 className="pb-4 bg-gradient-to-br from-[#00040A] to-[#001636] text-gray-300"
//             >
//                 <Navbar />
//                 {/* Main container with padding adjustment for navbar */ }
//                 <div className="pt-20 max-w-4xl mx-auto px-6">
//                     {/* Profile Information */ }
//                     <div className="bg-gray-800 border border-gray-700 rounded-2xl shadow-md p-6 my-6">
//                         <div className="flex justify-between items-center">
//                             <div className="flex items-center gap-4">
//                             <Avatar className="h-24 w-24">
//                                 <AvatarImage
//                                     src={user?.profile?.profilePhoto || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq8T0hZUoX8kuRi3EZpZbUDtZ_WqqN9Ll15Q&s'}
//                                     alt="profile"
//                                 />
//                             </Avatar>

//                                 <div>
//                                     <h1 className="font-medium text-xl text-white">{ user?.fullname }</h1>
//                                     <p className="text-gray-400">{ user?.profile?.bio }</p>
//                                 </div>
//                             </div>
//                             <Button
//                                 onClick={ () => setOpen(true) }
//                                 className="bg-blue-600 hover:bg-blue-700 text-white"
//                             >
//                                 <Pen className="w-4 h-4" />
//                             </Button>
//                         </div>
//                         <div className="my-5 space-y-2">
//                             <div className="flex items-center gap-3">
//                                 <Mail className="text-blue-500" />
//                                 <span>{ user?.email }</span>
//                             </div>
//                             <div className="flex items-center gap-3">
//                                 <Contact className="text-blue-500" />
//                                 <span>{ user?.phoneNumber }</span>
//                             </div>
//                         </div>
//                         { user?.role === "student" && (
//                         <div className="my-5">
//                             <h1 className="text-white mb-2">{t("skills")}</h1>
//                             <div className="flex items-center gap-2 flex-wrap">
//                                 { user?.profile?.skills.length !== 0 ? (
//                                     user?.profile?.skills.map((item, index) => (
//                                         <Badge key={ index } className="bg-blue-600 text-white">
//                                             { item }
//                                         </Badge>
//                                     ))
//                                 ) : (
//                                     <span>NA</span>
//                                 ) }
//                             </div>
//                         </div>
//                         )}
//                         { user?.role === "student" && (
//     <div className="my-5">
//         <Label className="text-md font-bold text-white">{t("Resumek")}</Label>
//         <br />
//         { isResume ? (
//             <a
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 href={ user?.profile?.resume }
//                 className="text-blue-500 hover:underline"
//             >
//                 { user?.profile?.resumeOriginalName }
//             </a>
//         ) : (
//             <span>NA</span>
//         ) }
//     </div>
// )}

//                     </div>
//                     {/* Applied Jobs Section */ }
//                     { user?.role === "student" && (
//                     <div className="bg-gray-800 rounded-2xl shadow-md p-6 my-6">
//                         <h1 className="font-bold text-lg text-white mb-4">{t("AppliedJobs")}</h1>
//                         <AppliedJobTable />
//                     </div>
//                     )}
//                     {/* Saved Jobs Section */ }
//                     { user?.role === "student" && (
//                     <div className="bg-gray-800 rounded-2xl shadow-md p-6 my-6">
//                         <h1 className="font-bold text-lg text-white mb-4">{t("SavedJobs")}</h1>
//                         <SavedJobsTable />
//                     </div>
//                     )}
//                 </div>

//                 {/* Update Profile Dialog */ }
//                 <UpdateProfileDialog open={ open } setOpen={ setOpen } />
//             </motion.div>
//             <Footer />
//         </>
//     );
// };

// export default Profile;


import React, { useState, useEffect } from 'react';
import Navbar from './shared/Navbar';
import { Avatar, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Contact, Mail, Pen } from 'lucide-react';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import AppliedJobTable from './AppliedJobTable';
import UpdateProfileDialog from './UpdateProfileDialog';
import { useSelector } from 'react-redux';
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs';
import { motion } from 'framer-motion';
import SavedJobsTable from './SavedJobsTable';
import Footer from './shared/Footer';
import { useTranslation } from "react-i18next";
import "../../src/i18n.jsx";
const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [parsedResume, setParsedResume] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { user } = useSelector((store) => store.auth);
    const [fileName, setFileName] = useState("No file chosen");
    const {t}=useTranslation();
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name);
        } else {
            setFileName("No file chosen");
        }
        handleResumeUpload(event); // Call the parent function
    };
    // Handle resume upload and parsing
    const handleResumeUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        // Client-side file size validation
        const fileSizeMB = file.size / (1024 * 1024);
        if (fileSizeMB > 100) {
            setError('File size exceeds 100 MB. Please upload a smaller file.');
            return;
        }

        setLoading(true);
        setSelectedFile(file);
        setError(null);

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('http://localhost:8000/api/parse-resume', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to parse resume');
            }

            const data = await response.json();
            setParsedResume(data);
            // console.log('Parsed Resume Data:', data);
        } catch (error) {
            console.error('Error parsing resume:', error.message);
            setError(error.message);
            setParsedResume(null);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="pb-4 bg-gradient-to-br from-[#00040A] to-[#001636] text-gray-300"
            >
                <Navbar />
                <div className="pt-20 max-w-4xl mx-auto px-6">
                    <div className="bg-gray-800 border border-gray-700 rounded-2xl shadow-md p-6 my-6">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <Avatar className="h-24 w-24">
                                    <AvatarImage
                                        src={user?.profile?.profilePhoto || 'https://encrypted-tbn0.gstatic.com/images?q=tbn9GcSq8T0hZUoX8kuRi3EZpZbUDtZ_WqqN9Ll15Q&s'}
                                        alt="profile"
                                    />
                                </Avatar>
                                <div>
                                    <h1 className="font-medium text-xl text-white">{user?.fullname}</h1>
                                    <p className="text-gray-400">{user?.profile?.bio}</p>
                                </div>
                            </div>
                            <Button
                                onClick={() => setOpen(true)}
                                className="bg-blue-600 hover:bg-blue-700 text-white"
                            >
                                <Pen className="w-4 h-4" />
                            </Button>
                        </div>
                        <div className="my-5 space-y-2">
                            <div className="flex items-center gap-3">
                                <Mail className="text-blue-500" />
                                <span>{user?.email}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Contact className="text-blue-500" />
                                <span>{user?.phoneNumber}</span>
                            </div>
                        </div>
                        {user?.role === "student" && (
                            <div className="my-5">
                                <h1 className="text-white mb-2">Skills</h1>
                                <div className="flex items-center gap-2 flex-wrap">
                                    {user?.profile?.skills.length !== 0 ? (
                                        user?.profile?.skills.map((item, index) => (
                                            <Badge key={index} className="bg-blue-600 text-white">
                                                {item}
                                            </Badge>
                                        ))
                                    ) : (
                                        <span>NA</span>
                                    )}
                                </div>
                            </div>
                        )}
                        {user?.role === "student" && (
                            <div className="my-5">
                                <div>
                                <Label className="text-md font-bold text-white">Resume</Label>
                                <br />
                                {user?.profile?.resume ? (
                                    <a
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        href={user?.profile?.resume}
                                        className="text-blue-500 hover:underline"
                                    >
                                        {user?.profile?.resumeOriginalName}
                                    </a>
                                ) : (
                                    <span>NA</span>
                                )}
                                
                            </div>
                            <br />
                                <Label className="text-md font-bold text-white">For AI-powered resume suggestions, please upload your Resume</Label>
                                <br />
                                <br />
                               <div>
                                <div className="relative">
            <input
                type="file"
                id="resumeUpload"
                accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/jpeg,image/png,image/gif,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                onChange={handleFileChange}
                className="hidden"
                disabled={loading}
            />
            <label
                htmlFor="resumeUpload"
                className={`cursor-pointer px-2 py-1 rounded-lg bg-white opacity-80 font-semibold text-black hover:bg-gray-400 hover:font-semibold transition ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
            >
                Choose File
               
            </label>
            <span className=" ml-2 text-gray-400">{fileName}</span>
            
        </div>
</div>
<br/>
                                {loading && <p className="text-yellow-500 mt-2 ">Parsing resume...</p>}
                                {error && <p className="text-red-500 mt-2 underline">Error: {error}</p>}
                                {parsedResume ? (
                                    <div className="">
                                        <h3 className="text-white font-bold underline">Parsed Resume Data:</h3>
                                       <div className="text-gray-300">
                                        <p><strong>Skills:</strong> {parsedResume.skills?.join(', ') || 'N/A'}</p>
                                        <p>
                                            <strong>Experience:</strong>{' '}
                                            {parsedResume.experience?.length > 0
                                                ? parsedResume.experience.map(exp => `${exp.job_details} (${exp.start_date} - ${exp.end_date || 'Present'})`).join('; ')
                                                : 'N/A'}
                                        </p>
                                        
                                        <p><strong>Education:</strong> {parsedResume.education?.join(', ') || 'N/A'}</p>
                                        <h3 className="text-white mt-4 font-bold underline">Suggestions:</h3>
                                        
                                        {parsedResume.suggestions && parsedResume.suggestions.length > 0 ? (
                                            <ul className="list-disc list-inside text-gray-300">
                                                {parsedResume.suggestions.map((suggestion, index) => (
                                                    <li key={index}>{suggestion}</li>
                                                ))}
                                            </ul>
                                        ) 
                                        : (
                                            <p className="text-gray-300">No suggestions available.</p>
                                        )}
                                        </div>
                                    </div>
                                ) : null}
                            </div>
                        )}
                    </div>
                    {user?.role === "student" && (
                        <div className="bg-gray-800 rounded-2xl shadow-md p-6 my-6">
                            <h1 className="font-bold text-lg text-white mb-4">{t("AppliedJobs")}</h1>
                            <AppliedJobTable />
                        </div>
                    )}
                    {user?.role === "student" && (
                        <div className="bg-gray-800 rounded-2xl shadow-md p-6 my-6">
                            <h1 className="font-bold text-lg text-white mb-4">{t("SavedJobs")}</h1>
                            <SavedJobsTable />
                        </div>
                    )}
                </div>
                <UpdateProfileDialog open={open} setOpen={setOpen} />
            </motion.div>
            <Footer />
        </>
    );
};

export default Profile;