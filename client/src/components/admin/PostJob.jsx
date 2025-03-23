// import React, { useState } from 'react';
// import Navbar from '../shared/Navbar';
// import { Label } from '../ui/label';
// import { Input } from '../ui/input';
// import { Button } from '../ui/button';
// import { useSelector } from 'react-redux';
// import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
// import axios from 'axios';
// import { JOB_API_END_POINT } from '@/utils/constant';
// import { toast } from 'sonner';
// import { useNavigate } from 'react-router-dom';
// import { Loader2 } from 'lucide-react';
// import { motion } from 'framer-motion';
// import Footer from '../shared/Footer';
// import { useTranslation } from "react-i18next";
// import "../../i18n.jsx";

// const PostJob = () => {
//     const [input, setInput] = useState({
//         title: '',
//         description: '',
//         requirements: '',
//         salary: '',
//         location: '',
//         jobType: '',
//         experience: '',
//         position: 0,
//         companyId: '',
//     });
//     const {t}=useTranslation();
//     const [loading, setLoading] = useState(false);
//     const navigate = useNavigate();

//     const { companies } = useSelector((store) => store.company);

//     const changeEventHandler = (e) => {
//         setInput({ ...input, [e.target.name]: e.target.value });
//     };

//     const selectChangeHandler = (value) => {
//         const selectedCompany = companies.find((company) => company.name.toLowerCase() === value);
//         if (selectedCompany) {
//             setInput({ ...input, companyId: selectedCompany._id });
//         }
//     };

//     const submitHandler = async (e) => {
//         e.preventDefault();
//         try {
//             setLoading(true);
//             const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 withCredentials: true,
//             });
//             if (res.data.success) {
//                 toast.success(res.data.message);
//                 navigate('/admin/jobs');
//             }
//         } catch (error) {
//             toast.error(error.response?.data?.message || 'Something went wrong');
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (


//         <div className="bg-white min-h-screen ">
//             <Navbar />
//             <motion.div
//                 className="flex items-center justify-center w-full my-5 pt-10"

//                 initial={ { opacity: 0, y: -20 } }
//                 animate={ { opacity: 1, y: 0 } }
//                 transition={ { duration: 0.6 } }
//             >
//                 <form
//                     onSubmit={ submitHandler }
//                     className="p-8 max-w-4xl w-full bg-white border border-blue-300 shadow-lg rounded-md"
//                 >
//                     <motion.div
//                         className="grid grid-cols-1 md:grid-cols-2 gap-4"
//                         initial={ { opacity: 0 } }
//                         animate={ { opacity: 1 } }
//                         transition={ { duration: 0.7 } }
//                     >
//                         <div>
//                             <Label className="font-semibold">
//                                 {t("Title")} <span className="text-red-500">*</span>
//                             </Label>
//                             <Input
//                                 type="text"
//                                 name="title"
//                                 value={ input.title }
//                                 onChange={ changeEventHandler }
//                                 className="my-1 border-blue-300 focus:ring-blue-500 focus:border-blue-500"
//                             />
//                         </div>
//                         <div >
//                             <Label className="font-semibold">
//                                 {t("Description")} <span className="text-red-500">*</span>
//                             </Label>
//                             <Input
//                                 type="text"
//                                 name="description"
//                                 value={ input.description }
//                                 onChange={ changeEventHandler }
//                                 className="my-1 border-blue-300 focus:ring-blue-500 focus:border-blue-500"
//                             />
//                         </div>
//                         <div>
//                             <Label className="font-semibold">
//                                 {t("Requirements")} <span className="text-red-500">*</span>
//                             </Label>
//                             <Input
//                                 type="text"
//                                 name="requirements"
//                                 value={ input.requirements }
//                                 onChange={ changeEventHandler }
//                                 className="my-1 border-blue-300 focus:ring-blue-500 focus:border-blue-500"
//                             />
//                         </div>
//                         <div>
//                             <Label className="font-semibold">
//                                 {t("SalaryLPA")} <span className="text-red-500">*</span>
//                             </Label>
//                             <Input
//                                 type="number"
//                                 name="salary"
//                                 value={ input.salary }
//                                 onChange={ changeEventHandler }
//                                 className="my-1 border-blue-300 focus:ring-blue-500 focus:border-blue-500"
//                             />
//                         </div>
//                         <div>
//                             <Label className="font-semibold">
//                                 {t("Location")} <span className="text-red-500">*</span>
//                             </Label>
//                             <Input
//                                 type="text"
//                                 name="location"
//                                 value={ input.location }
//                                 onChange={ changeEventHandler }
//                                 className="my-1 border-blue-300 focus:ring-blue-500 focus:border-blue-500"
//                             />
//                         </div>
//                         <div>
//                             <Label className="font-semibold">
//                                 {t("JobType")} <span className="text-red-500">*</span>
//                             </Label>
//                             <Input
//                                 type="text"
//                                 name="jobType"
//                                 value={ input.jobType }
//                                 onChange={ changeEventHandler }
//                                 className="my-1 border-blue-300 focus:ring-blue-500 focus:border-blue-500"
//                             />
//                         </div>
//                         <div>
//                             <Label className="font-semibold">
//                                 {t("ExperienceLevel")} <span className="text-red-500">*</span>
//                             </Label>
//                             <Input
//                                 type="text"
//                                 name="experience"
//                                 value={ input.experience }
//                                 onChange={ changeEventHandler }
//                                 className="my-1 border-blue-300 focus:ring-blue-500 focus:border-blue-500"
//                             />
//                         </div>
//                         <div>
//                             <Label className="font-semibold">
//                                 {t("Positions")} <span className="text-red-500">*</span>
//                             </Label>
//                             <Input
//                                 type="number"
//                                 name="position"
//                                 value={ input.position }
//                                 onChange={ changeEventHandler }
//                                 className="my-1 border-blue-300 focus:ring-blue-500 focus:border-blue-500"
//                             />
//                         </div>
//                         { companies.length > 0 && (
//                             <div>
//                                 <Label className="font-semibold ">
//                                     {t("Company")} <span className="text-red-500">*</span>
//                                 </Label>
//                                 <Select onValueChange={ selectChangeHandler }>
//                                     <SelectTrigger className="w-full">
//                                         <SelectValue placeholder="Select a Company" />
//                                     </SelectTrigger>
//                                     <SelectContent>
//                                         <SelectGroup>
//                                             { companies.map((company) => (
//                                                 <SelectItem key={ company._id } value={ company.name.toLowerCase() }>
//                                                     { company.name }
//                                                 </SelectItem>
//                                             )) }
//                                         </SelectGroup>
//                                     </SelectContent>
//                                 </Select>
//                             </div>
//                         ) }
//                     </motion.div>
                   
//                     { loading ? (
//                         <Button className="w-full my-4 bg-blue-500 text-white">
//                             <Loader2 className="mr-2 h-4 w-4 animate-spin" /> {t("Pleasewait")}
//                         </Button>
//                     ) : ( 
//                     <>
//                     <Button
                        
//                         onClick={ () => {navigate("/admin/jobs");window.scrollTo(0,0)}}
//                         className="transition w-[45%] my-5 mx-4 duration-200 hover:bg-gray-600"
//                     >
//                         {t("Cancel")}
//                     </Button>
                        
//                         <Button
//                             type="submit"
//                             className="w-[45%] my-4 mx-4 bg-blue-500 hover:bg-blue-600 text-white transition duration-300"
//                         >
//                             {t("PostNewJob")}
//                         </Button>
//                         </>
//                     ) }
//                     { companies.length === 0 && (
//                         <p className="text-xs text-red-600 font-bold text-center my-3">
//                             {t("RegisterReg")}
//                         </p>
//                     ) }
//                 </form>
//             </motion.div>
//             <Footer />
//         </div>
//     );
// };

// export default PostJob;


// import React, { useState } from 'react';
// import Navbar from '../shared/Navbar';
// import { Label } from '../ui/label';
// import { Input } from '../ui/input';
// import { Button } from '../ui/button';
// import { useSelector } from 'react-redux';
// import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
// import axios from 'axios';
// import { JOB_API_END_POINT } from '@/utils/constant';
// import { toast } from 'sonner';
// import { useNavigate } from 'react-router-dom';
// import { Loader2 } from 'lucide-react';
// import { motion } from 'framer-motion';
// import Footer from '../shared/Footer';
// import { useTranslation } from "react-i18next";
// import "../../i18n.jsx";

// const PostJob = () => {
//     const [input, setInput] = useState({
//         title: '',
//         description: '',
//         requirements: '',
//         salary: '',
//         location: '',
//         jobType: '',
//         experience: '',
//         position: 0,
//         companyId: '',
//     });
//     const { t } = useTranslation();
//     const [loading, setLoading] = useState(false);
//     const navigate = useNavigate();

//     // Fetch user data from Redux store
//     const { user } = useSelector((store) => store.auth);
//     const { companies } = useSelector((store) => store.company);

//     const changeEventHandler = (e) => {
//         setInput({ ...input, [e.target.name]: e.target.value });
//     };

//     const selectChangeHandler = (value) => {
//         const selectedCompany = companies.find((company) => company.name.toLowerCase() === value);
//         if (selectedCompany) {
//             setInput({ ...input, companyId: selectedCompany._id });
//         }
//     };

//     const submitHandler = async (e) => {
//         e.preventDefault();
//         try {
//             setLoading(true);
//             const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 withCredentials: true,
//             });
//             if (res.data.success) {
//                 toast.success(res.data.message);
//                 navigate('/admin/jobs');
//             }
//         } catch (error) {
//             toast.error(error.response?.data?.message || 'Something went wrong');
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="bg-white min-h-screen">
//             <Navbar />
//             <motion.div
//                 className="flex items-center justify-center w-full my-5 pt-10"
//                 initial={{ opacity: 0, y: -20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6 }}
//             >
//                 <form
//                     onSubmit={submitHandler}
//                     className="p-8 max-w-4xl w-full bg-white border border-blue-300 shadow-lg rounded-md"
//                 >
//                     {/* Display User Full Name and Email */}
//                     <div className="mb-6">
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                             <div>
//                                 <Label className="font-semibold">{t("ProstedBy")}</Label>
//                                 <p className="my-1 text-gray-700">{user?.fullname || 'N/A'}</p>
//                             </div>
//                             <div>
//                                 <Label className="font-semibold">{t("EmailAddress")}</Label>
//                                 <p className="my-1 text-gray-700">{user?.email || 'N/A'}</p>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Existing Form Inputs */}
//                     <motion.div
//                         className="grid grid-cols-1 md:grid-cols-2 gap-4"
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         transition={{ duration: 0.7 }}
//                     >
//                         <div>
//                             <Label className="font-semibold">
//                                 {t("Title")} <span className="text-red-500">*</span>
//                             </Label>
//                             <Input
//                                 type="text"
//                                 name="title"
//                                 value={input.title}
//                                 onChange={changeEventHandler}
//                                 className="my-1 border-blue-300 focus:ring-blue-500 focus:border-blue-500"
//                             />
//                         </div>
//                         <div>
//                             <Label className="font-semibold">
//                                 {t("Description")} <span className="text-red-500">*</span>
//                             </Label>
//                             <Input
//                                 type="text"
//                                 name="description"
//                                 value={input.description}
//                                 onChange={changeEventHandler}
//                                 className="my-1 border-blue-300 focus:ring-blue-500 focus:border-blue-500"
//                             />
//                         </div>
//                         <div>
//                             <Label className="font-semibold">
//                                 {t("Requirements")} <span className="text-red-500">*</span>
//                             </Label>
//                             <Input
//                                 type="text"
//                                 name="requirements"
//                                 value={input.requirements}
//                                 onChange={changeEventHandler}
//                                 className="my-1 border-blue-300 focus:ring-blue-500 focus:border-blue-500"
//                             />
//                         </div>
//                         <div>
//                             <Label className="font-semibold">
//                                 {t("SalaryLPA")} <span className="text-red-500">*</span>
//                             </Label>
//                             <Input
//                                 type="number"
//                                 name="salary"
//                                 value={input.salary}
//                                 onChange={changeEventHandler}
//                                 className="my-1 border-blue-300 focus:ring-blue-500 focus:border-blue-500"
//                             />
//                         </div>
//                         <div>
//                             <Label className="font-semibold">
//                                 {t("Location")} <span className="text-red-500">*</span>
//                             </Label>
//                             <Input
//                                 type="text"
//                                 name="location"
//                                 value={input.location}
//                                 onChange={changeEventHandler}
//                                 className="my-1 border-blue-300 focus:ring-blue-500 focus:border-blue-500"
//                             />
//                         </div>
//                         <div>
//                             <Label className="font-semibold">
//                                 {t("JobType")} <span className="text-red-500">*</span>
//                             </Label>
//                             <Input
//                                 type="text"
//                                 name="jobType"
//                                 value={input.jobType}
//                                 onChange={changeEventHandler}
//                                 className="my-1 border-blue-300 focus:ring-blue-500 focus:border-blue-500"
//                             />
//                         </div>
//                         <div>
//                             <Label className="font-semibold">
//                                 {t("ExperienceLevel")} <span className="text-red-500">*</span>
//                             </Label>
//                             <Input
//                                 type="text"
//                                 name="experience"
//                                 value={input.experience}
//                                 onChange={changeEventHandler}
//                                 className="my-1 border-blue-300 focus:ring-blue-500 focus:border-blue-500"
//                             />
//                         </div>
//                         <div>
//                             <Label className="font-semibold">
//                                 {t("Positions")} <span className="text-red-500">*</span>
//                             </Label>
//                             <Input
//                                 type="number"
//                                 name="position"
//                                 value={input.position}
//                                 onChange={changeEventHandler}
//                                 className="my-1 border-blue-300 focus:ring-blue-500 focus:border-blue-500"
//                             />
//                         </div>
//                         {companies.length > 0 && (
//                             <div>
//                                 <Label className="font-semibold">
//                                     {t("Company")} <span className="text-red-500">*</span>
//                                 </Label>
//                                 <Select onValueChange={selectChangeHandler}>
//                                     <SelectTrigger className="w-full">
//                                         <SelectValue placeholder="Select a Company" />
//                                     </SelectTrigger>
//                                     <SelectContent>
//                                         <SelectGroup>
//                                             {companies.map((company) => (
//                                                 <SelectItem key={company._id} value={company.name.toLowerCase()}>
//                                                     {company.name}
//                                                 </SelectItem>
//                                             ))}
//                                         </SelectGroup>
//                                     </SelectContent>
//                                 </Select>
//                             </div>
//                         )}
//                     </motion.div>

//                     {loading ? (
//                         <Button className="w-full my-4 bg-blue-500 text-white">
//                             <Loader2 className="mr-2 h-4 w-4 animate-spin" /> {t("Pleasewait")}
//                         </Button>
//                     ) : (
//                         <>
//                             <Button
//                                 onClick={() => { navigate("/admin/jobs"); window.scrollTo(0, 0); }}
//                                 className="transition w-[45%] my-5 mx-4 duration-200 hover:bg-gray-600"
//                             >
//                                 {t("Cancel")}
//                             </Button>
//                             <Button
//                                 type="submit"
//                                 className="w-[45%] my-4 mx-4 bg-blue-500 hover:bg-blue-600 text-white transition duration-300"
//                             >
//                                 {t("PostNewJob")}
//                             </Button>
//                         </>
//                     )}
//                     {companies.length === 0 && (
//                         <p className="text-xs text-red-600 font-bold text-center my-3">
//                             {t("RegisterReg")}
//                         </p>
//                     )}
//                 </form>
//             </motion.div>
//             <Footer />
//         </div>
//     );
// };

// export default PostJob;

import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useSelector } from 'react-redux';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import axios from 'axios';
import { JOB_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import Footer from '../shared/Footer';
import { useTranslation } from "react-i18next";
import "../../i18n.jsx";

const PostJob = () => {
    const [input, setInput] = useState({
        title: '',
        description: '',
        requirements: '',
        salary: '',
        location: '',
        jobType: '',
        experience: '',
        position: 0,
        companyId: '',
    });
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { user } = useSelector((store) => store.auth);
    const { companies } = useSelector((store) => store.company);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find((company) => company.name.toLowerCase() === value);
        if (selectedCompany) {
            setInput({ ...input, companyId: selectedCompany._id });
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            // Include the user ID in the job data
            const jobData = {
                ...input,
                createdBy: user?._id, // Send the current user's ID to associate with the job
            };
            const res = await axios.post(`${JOB_API_END_POINT}/post`, jobData, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate('/admin/jobs');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

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
                    {/* Display User Full Name and Email */}
                    <div className="mb-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                    {/* Existing Form Inputs */}
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.7 }}
                    >
                        <div>
                            <Label className="font-semibold">
                                {t("Title")} <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                type="text"
                                name="title"
                                value={input.title}
                                onChange={changeEventHandler}
                                className="my-1 border-blue-300 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <Label className="font-semibold">
                                {t("Description")} <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                className="my-1 border-blue-300 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <Label className="font-semibold">
                                {t("Requirements")} <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                type="text"
                                name="requirements"
                                value={input.requirements}
                                onChange={changeEventHandler}
                                className="my-1 border-blue-300 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <Label className="font-semibold">
                                {t("SalaryLPA")} <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                type="number"
                                name="salary"
                                value={input.salary}
                                onChange={changeEventHandler}
                                className="my-1 border-blue-300 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <Label className="font-semibold">
                                {t("Location")} <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                                className="my-1 border-blue-300 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <Label className="font-semibold">
                                {t("JobType")} <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                type="text"
                                name="jobType"
                                value={input.jobType}
                                onChange={changeEventHandler}
                                className="my-1 border-blue-300 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <Label className="font-semibold">
                                {t("ExperienceLevel")} <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                type="text"
                                name="experience"
                                value={input.experience}
                                onChange={changeEventHandler}
                                className="my-1 border-blue-300 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <Label className="font-semibold">
                                {t("Positions")} <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                type="number"
                                name="position"
                                value={input.position}
                                onChange={changeEventHandler}
                                className="my-1 border-blue-300 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        {companies.length > 0 && (
                            <div>
                                <Label className="font-semibold">
                                    {t("Company")} <span className="text-red-500">*</span>
                                </Label>
                                <Select onValueChange={selectChangeHandler}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select a Company" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {companies.map((company) => (
                                                <SelectItem key={company._id} value={company.name.toLowerCase()}>
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
                                onClick={() => { navigate("/admin/jobs"); window.scrollTo(0, 0); }}
                                className="transition w-[45%] my-5 mx-4 duration-200 hover:bg-gray-600"
                            >
                                {t("Cancel")}
                            </Button>
                            <Button
                                type="submit"
                                className="w-[45%] my-4 mx-4 bg-blue-500 hover:bg-blue-600 text-white transition duration-300"
                            >
                                {t("PostNewJob")}
                            </Button>
                        </>
                    )}
                    {companies.length === 0 && (
                        <p className="text-xs text-red-600 font-bold text-center my-3">
                            {t("RegisterReg")}
                        </p>
                    )}
                </form>
            </motion.div>
            <Footer />
        </div>
    );
};

export default PostJob;