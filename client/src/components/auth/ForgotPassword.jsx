import React, { useState } from 'react';
import { Label } from '../ui/label';

import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import axios from 'axios';
import Navbar from '../shared/Navbar';
import { USER_API_END_POINT } from '@/utils/constant';
import { motion } from 'framer-motion';
import { useTranslation } from "react-i18next";
import "../../i18n.jsx";

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation();
    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post(`${USER_API_END_POINT}/forget-password`, { email }, {
                headers: { 'Content-Type': 'application/json' },
            });
            if (res.data.success) {
                toast.success('Password reset link sent to your email');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
        <Navbar />
        <motion.div
            className="flex justify-center items-center min-h-screen pt-16 bg-gradient-to-r from-[#00040A] to-[#001636]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <div className="w-full max-w-md p-8 bg-gray-900 border-gray-700 shadow-lg rounded-lg border border-gray-600">
                <h1 className="text-white text-3xl font-bold text-center mb-6">{t("ForgotPassword")}</h1>
               
                <form onSubmit={submitHandler}>
                    <Label htmlFor="email" className="text-gray-200">{t("Registeremail")}<span className='text-red-500 px-1 py-1'>*</span></Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="jainam.m.711@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-2 p-3 text-white border bg-transparent border-gray-500 rounded-md w-full"
                        required
                    />
                     <p className='text-gray-400 text-center mt-6 mb-6'>{t("Forgottext")}</p>
                    {loading ? (
                        <Button className="w-full my-4 bg-blue-600 text-white">
                            Sending...
                        </Button>
                    ) : (
                        <Button type="submit" className="w-full my-4 bg-blue-600 text-white">
                        {t("ResetLink")}
                        </Button>
                    )}
                </form>
                <p className="text-center text-gray-400">
                    {t("Rememberyourpassword")} <Link to="/login" className="text-blue-500">{t("Login")}</Link>
                </p>
            </div>
        </motion.div>
        </>
    );
};

export default ForgotPassword;
