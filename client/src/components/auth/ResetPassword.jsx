import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

const ResetPassword = () => {
    const [input, setInput] = useState({
        email: '',
        newPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post(`${USER_API_END_POINT}/reset-password`, input, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate('/login');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong!');
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
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
            >
                <motion.div
                    className="w-full max-w-md p-8 bg-gray-900 border-gray-700 shadow-lg rounded-lg border border-gray-600"
                    initial={{ y: 50 }}
                    animate={{ y: 0 }}
                    transition={{ type: 'spring', stiffness: 100 }}
                >
                    <h1 className="font-bold text-3xl mb-6 text-white text-center">Reset Password</h1>
                    <form onSubmit={submitHandler}>
                        <div className="mb-4">
                            <Label htmlFor="email" className="block text-gray-200 text-lg">
                                Email Address <span className="text-red-400">*</span>
                            </Label>
                            <Input
                                id="email"
                                placeholder="jainam.m.711@gmail.com"
                                type="email"
                                className="mt-1 p-3 text-white border bg-transparent border-gray-500 rounded-md outline-none focus:border-blue-500 transition-all w-full"
                                value={input.email}
                                name="email"
                                onChange={changeEventHandler}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="newPassword" className="block text-gray-200 text-lg">
                                New Password <span className="text-red-400">*</span>
                            </Label>
                            <Input
                                id="newPassword"
                                placeholder="********"
                                type="password"
                                className="mt-1 p-3 text-white border bg-transparent border-gray-500 rounded-md outline-none focus:border-blue-500 transition-all w-full"
                                value={input.newPassword}
                                name="newPassword"
                                onChange={changeEventHandler}
                                required
                            />
                        </div>
                        {loading ? (
                            <Button className="w-full my-2 bg-blue-600 text-white" disabled>
                                Updating Password...
                            </Button>
                        ) : (
                            <Button
                                className="w-full bg-blue-600 text-white hover:bg-blue-700 transition-all"
                                type="submit"
                            >
                                Reset Password
                            </Button>
                        )}
                    </form>
                </motion.div>
            </motion.div>
        </>
    );
};

export default ResetPassword;