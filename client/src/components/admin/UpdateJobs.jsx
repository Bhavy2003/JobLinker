import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import axios from 'axios';
import { JOB_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import Footer from '../shared/Footer';
import { ArrowLeft, Trash2 } from 'lucide-react';
import useGetJobById from '@/hooks/useGetJobById';

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Delete, Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from "react-i18next";
import "../../i18n.jsx";





import { setAllJobs } from '@/redux/jobSlice'

const UpdateJobs = () => {
     const {id:jobId } = useParams();
     
    useGetJobById(jobId);
    const dispatch = useDispatch()
    const { allAdminJobs, searchJobByText } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allAdminJobs);


    const navigate = useNavigate();
    const [input, setInput] = useState({
        title: '',
        description: '',
        requirements: '',
        salary: '',
        location: '',
        jobType: '', 
        position: '',
        companyId: '',
    });
    
    const [loading, setLoading] = useState(false);
    const [companies, setCompanies] = useState([]);
    // Fetch job details
    useEffect(() => {
        const fetchJobDetails = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`);
                const jobData = response.data.job;
    
                if (!jobData) {
                    toast.error("Job details not found!");
                    return;
                }
    
                // ✅ Ensure all fields are properly set, even if some values are missing
                setInput(prev => ({
                    ...prev,
                    title: jobData.title || '',
                    description: jobData.description || '',
                    requirements: jobData.requirements || '',
                    salary: jobData.salary || '',
                    location: jobData.location || '',
                    jobType: jobData.jobType || '',
                    position: jobData.position || 0,
                    companyId: jobData.company || '',
                    experienceLevel: jobData.experienceLevel || '',
                    // Example of handling a boolean field
                }));
            } catch (error) {
                toast.error("Failed to fetch job details. Please try again.");
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchJobDetails();
    }, [jobId]);
    

   
    


    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };


    const selectChangeHandler = (value) => {
        setInput({ ...input, companyId: value });
    };

    // Handle form submission for updating job
    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
    
        // Append job details to FormData
        formData.append("title", input.title);
        formData.append("description", input.description);
        formData.append("requirements", input.requirements);
        formData.append("salary", input.salary);
        formData.append("location", input.location);
        formData.append("jobType", input.jobType);
        formData.append("position", String(input.position)); // Ensure position is a string
        formData.append("companyId", input.companyId); // Corrected key for company ID
        formData.append("jobId", jobId);
    
        // Append file only if it's a valid File object
        if (input.file instanceof File) {
            formData.append("file", input.file);
        }
    
        try {
            setLoading(true);
            const res = await axios.put(`${JOB_API_END_POINT}/update/${jobId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            });
    
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred. Please try again.");
            console.error("Error updating job:", error);
        } finally {
            setLoading(false);
        }
    };
    const {t}=useTranslation();
    
    
 


    const handleDeleteJob = async (jobId) => {
        try {
            if (!jobId) {
                toast.error('Job ID is missing');
                return;
            }
            axios.defaults.withCredentials = true;
            const response = await axios.post(`${JOB_API_END_POINT}/delete`, { jobId });

            // Update Redux state
            dispatch(setAllJobs(response.data.remainingJobs));

            // Trigger re-filtering
            setFilterJobs(response.data.remainingJobs);

            toast.success(response.data.message);
            navigate('/admin/jobs');
        } catch (error) {
            console.error('Error deleting job:', error);
            toast.error(error.response?.data?.message || 'Error deleting the job');
        }
    };

const { user } = useSelector((store) => store.auth);

    return (
        <div className="bg-white min-h-screen">
            <Navbar />
            <motion.div
                className="flex items-center justify-center w-full my-5 pt-10"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                
                <form
                    onSubmit={submitHandler}
                    className="p-8 max-w-4xl w-full bg-white border border-blue-300 shadow-lg rounded-md"
                >
                    <Button
                            onClick={ () => navigate("/admin/jobs") }
                            variant="outline"
                            className="flex w-[7%] items-center gap-2 text-gray-500 font-semibold transition duration-200 hover:bg-blue-200 bg-blue-50 "
                        >
                            <ArrowLeft />
                        </Button>
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.7 }}
                    >
                        
                        {/* Input fields */}
                        {Object.entries(input).map(([key, value]) => (
                            key !== 'companyId' && (
                                <div key={key}>
                                    <Label>
                                        {key.charAt(0).toUpperCase() + key.slice(1)}{' '}
                                        <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        type={typeof value === 'number' ? 'number' : 'text'}
                                        name={key}
                                        value={value}
                                        onChange={changeEventHandler}
                                        className="my-1 border-blue-300 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                            )
                        ))}
                        <div className="mb-6">
                                                <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-4">
                                                    <div>
                                                        <Label className="font-semibold">{t("PostedBy")}</Label>
                                                        <p className="my-1 text-gray-700">{user?.fullname || 'N/A'}</p>
                                                    </div>
                                                    <div>
                                                        <Label className="font-semibold">{t("EmailAddress")}</Label>
                                                        <p className="my-1 text-gray-700">{user?.email || 'N/A'}</p>
                                                    </div>
                                                </div>
                                            </div>
                        {companies.length > 0 && (
                            <div>

                                
                                <Label className="font-semibold">
                                    {t("Company")} <span className="text-red-500">*</span>
                                </Label>
                                <Select
                                    onValueChange={selectChangeHandler}
                                    defaultValue={input.companyId || ''}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select a Company" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {companies.map((company) => (
                                                <SelectItem
                                                    key={company._id}
                                                    value={company._id}
                                                >
                                                    {company.name}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        )}
                    </motion.div>
                    {loading ? (
                        <Button className="w-full my-4 bg-blue-500 text-white">
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> {t("Pleasewait")}
                        </Button>
                    ) : (
                        <>
                            <Button
                                type="submit" onClick={()=>window.scrollTo(0,0)}
                                className="w-full my-4 bg-blue-500 hover:bg-blue-600 text-white transition duration-300"
                            >
                                {t("Update")}
                            </Button>
                            <Button
                                type="button"
                                onClick={() => {jobId && handleDeleteJob(jobId); window.scrollTo(0,0)}}
                                className="w-full my-4 bg-red-500 hover:bg-red-600 text-white transition duration-300"
                            >
                                {t("Delete")}
                            </Button>
                        </>
                    )}
                    {companies.length === 0 && (
                        <p className="text-xs text-red-600 font-bold text-center my-3">
                            {/* *Please register a company first, before updating jobs. */}
                            {t("Pls")}
                        </p>
                    )}
                </form>
            </motion.div>
            <Footer />
        </div>
    );
};

export default UpdateJobs;