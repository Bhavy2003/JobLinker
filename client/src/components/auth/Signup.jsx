import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from "react-i18next";
import "../../i18n.jsx";
import { t } from 'i18next';

const Signup = () => {
    const [input, setInput] = useState({
        fullname: '',
        email: '',
        phoneNumber: '',
        password: '',
        role: '',
    });
    const { t } = useTranslation();
    const [profilePicture, setProfilePicture] = useState(null); // State for profile picture
    const { loading, user } = useSelector((store) => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({ password: "" });
  
    const [isValidating, setIsValidating] = useState(false);
    const [validationResult, setValidationResult] = useState("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const validateEmail = async (email) => {
        setIsValidating(true);
        try {
            const response = await axios.get(
                `https://api.hunter.io/v2/email-verifier?email=${email}&api_key=473f4897677f93cd4279b7077ef7862d279704a9`
            );
    
            
    
            if (response.data.errors) {
                throw new Error(response.data.errors[0].details);
            }
    
            const result = response.data.data?.status;
            if (result === "valid") {
                setValidationResult("✅ Email is valid");
                setErrors({ ...errors, email: "" });
            } else {
                setValidationResult("❌ Email is not deliverable");
                setErrors({ ...errors, email: "This email may not be valid" });
            }
        } catch (error) {
            console.error("Email validation error:", error.response?.data || error.message);
            setValidationResult("⚠️ Unable to validate email");
        }
        setIsValidating(false);
    };
    

    const changeEventHandler = (e) => {
        const { name, value } = e.target;
        setInput((prev) => ({ ...prev, [name]: value }));
    
        setErrors((prev) => ({ ...prev, [name]: "" })); // Reset errors on change
    
        // Phone Number Validation
        if (name === "phoneNumber") {
            if (!/^\d*$/.test(value)) {
                setErrors((prev) => ({ ...prev, phoneNumber: "Only numbers are allowed." }));
            } else if (value.length < 10 || value.length > 11) {
                setErrors((prev) => ({ ...prev, phoneNumber: "Must be 10 to 11 digits long." }));
            }
        }
    
        // Email Validation
        if (name === "email") {
            if (!emailRegex.test(value)) {
                setErrors((prev) => ({ ...prev, email: "Invalid email format" }));
                setValidationResult(""); 
            } else {
                validateEmail(value); // Call API only if format is correct
            }
        }
    
        // Password Validation
        if (name === "password" && value.length < 8) {
            setErrors((prev) => ({ ...prev, password: "At least 8 characters required." }));
        }
    };
    


    const profilePictureHandler = (e) => {
        setProfilePicture(e.target.files[0]); // Save the selected file
    };


    const submitHandler = async (e) => {
        e.preventDefault();
    
        // Check for validation errors before submitting
        if (errors.email || errors.phoneNumber || errors.password || !input.fullname || !input.role || !emailRegex.test(input.email)) {
            toast.error("Enter valid Email address.");
            return;
        }
    
        try {
            dispatch(setLoading(true));
    
            // Creating form data
            const formData = new FormData();
            Object.keys(input).forEach((key) => formData.append(key, input[key]));
            // if (profilePicture) {
            //     formData.append('file', profilePicture);
            // }
            if (profilePicture) {
                formData.append('profilePhoto', profilePicture);
            }
    
            const res = await axios.post(`${USER_API_END_POINT}/signup`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            });
    
            if (res.data.success) {
                toast.success(res.data.message);
                navigate('/login');
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message);
        } finally {
            dispatch(setLoading(false));
        }
    };
    

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    return (
        <>
            <Navbar />
            <motion.div
                className="flex justify-center items-center min-h-screen pt-16 bg-gradient-to-r from-[#00040A] to-[#001636]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
            >
                <motion.div
                    className="w-full max-w-md p-8 bg-gray-900 border-gray-800 shadow-lg rounded-lg border border-gray-200 text-white"
                    initial={{ y: 50 }}
                    animate={{ y: 0 }}
                    transition={{ type: 'spring', stiffness: 100 }}
                >
                    <motion.h1
                        className="font-bold text-3xl mb-6 text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        {t("SignUp")}
                    </motion.h1>

                    <form onSubmit={submitHandler}>
                        {/* Full Name */}
                        <motion.div className="mb-4" initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
                            <Label htmlFor="fullname" className="block text-lg">
                                {t("FullName")} <span className="text-red-400">*</span>
                            </Label>
                            <Input
                                id="fullname"
                                placeholder="Jainam Mehta"
                                type="text"
                                name="fullname"
                                value={input.fullname}
                                onChange={changeEventHandler}
                                className="text-white bg-gray-800 border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
                            />
                        </motion.div>

                        {/* Email */}
                        <motion.div
            className="mb-4"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
        >
            <Label htmlFor="email" className="block text-lg">
                {t("EmailAddress")} <span className="text-red-400">*</span>
            </Label>

            <Input
                id="email"
                placeholder="jainam.m.711@gmail.com"
                type="email"
                name="email"
                value={input.email}
                onChange={changeEventHandler}
                autoComplete="email"
                aria-invalid={errors.email ? "true" : "false"}
                aria-describedby={errors.email ? "email-error" : undefined}
                className={`text-white bg-gray-800 border-gray-600 
                    focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md 
                    ${errors.email ? "border-red-500 focus:ring-red-500" : ""}`}
            />

            {errors.email && (
                <p id="email-error" className="text-red-400 text-sm mt-1">
                    {errors.email}
                </p>
            )}

            {isValidating && <p className="text-blue-400 text-sm mt-1">Validating email...</p>}

            {!errors.email && validationResult && (
                <p className="text-green-400 text-sm mt-1">{validationResult}</p>
            )}
        </motion.div>


                        {/* Phone Number */}
                        <motion.div className="mb-4" initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.6 }}>
                            <Label htmlFor="phoneNumber" className="block text-lg">
                                {t("PhoneNumber")} <span className="text-red-400">*</span>
                            </Label>
                            <Input
                                id="phoneNumber"
                                placeholder="1234567890"
                                type="tel"
                                name="phoneNumber"
                                value={input.phoneNumber}
                                onChange={changeEventHandler}
                                className={`text-white bg-gray-800 border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md ${errors.phoneNumber ? "border-red-500" : ""
                                    }`}
                            />
                            {errors.phoneNumber && <p className="text-red-400 text-sm mt-1">{errors.phoneNumber}</p>}
                        </motion.div>


                        {/* Password */}
                        <motion.div className="mb-4" initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.7 }}>
                            <Label htmlFor="password" className="block text-lg">
                                {t("Password")} <span className="text-red-400">*</span>
                            </Label>
                            <Input
                                id="password"
                                placeholder="********"
                                type="password"
                                name="password"
                                value={input.password}
                                onChange={changeEventHandler}
                                className={`text-white bg-gray-800 border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md ${errors.password ? "border-red-500" : ""}`}
                            />
                            {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
                        </motion.div>


                        {/* Profile Picture */}
                        {/* <motion.div className="mb-6" initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.8 }}>
                            <Label htmlFor="profilePicture" className="block text-lg">
                               {t("ProfilePicture")}
                            </Label>
                            <Input
                                id="profilePicture"
                                type="file"
                                accept="image/*"
                                onChange={profilePictureHandler}
                                className="text-white bg-gray-800 border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
                            />
                        </motion.div> */}

                        {/* Role */}
                        <motion.div className="mb-6" initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.9 }}>
                            <Label className="block mb-2 text-lg">
                                {t("IAmA")}: <span className="text-red-400">*</span>
                            </Label>
                            <RadioGroup className="flex gap-4" value={input.role} onValueChange={(value) => setInput({ ...input, role: value })}>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        name="role"
                                        value="student"
                                        id="student"
                                        className="cursor-pointer"
                                        checked={input.role === 'student'}
                                        onChange={changeEventHandler}
                                    />
                                    <Label htmlFor="student" className="cursor-pointer">
                                        {t("JobSeeker")}
                                    </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        name="role"
                                        value="recruiter"
                                        id="recruiter"
                                        className="cursor-pointer"
                                        checked={input.role === 'recruiter'}
                                        onChange={changeEventHandler}
                                    />
                                    <Label htmlFor="recruiter" className="cursor-pointer">
                                        {t("Recruiter")}
                                    </Label>
                                </div>
                            </RadioGroup>
                        </motion.div>

                        {/* Submit Button */}
                        {loading ? (
                            <Button className="w-full my-2 bg-blue-600 text-white">
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Please wait...
                            </Button>
                        ) : (
                            <Button className="w-full bg-blue-600 text-white hover:bg-blue-700 transition-all" type="submit">
                                {t("SignUp")}
                            </Button>
                        )}

                        <p className="mt-4 text-center">
                        {t("AlreadyHaveAccount")}
                            <Link to="/login" className="text-blue-500 mx-1">
                                {t("Login")}
                            </Link>
                        </p>
                    </form>
                </motion.div>
            </motion.div>
        </>
    );
};

export default Signup;


