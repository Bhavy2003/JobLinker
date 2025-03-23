import React, { useState } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Loader2, Camera } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser, setsavedJobs } from '@/redux/authSlice';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import '../../src/i18n.jsx';

const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector((store) => store.auth);
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const [input, setInput] = useState({
        fullname: user?.fullname || '',
        email: user?.email || '',
        phoneNumber: user?.phoneNumber || '',
        bio: user?.profile?.bio || '',
        skills: user?.profile?.skills?.join(', ') || '',
        file: null,
        profilePhoto: user?.profile?.profilePhoto || '',
    });

    const [fileError, setFileError] = useState('');
    const [phoneError, setPhoneError] = useState('');

    const changeEventHandler = (e) => {
        const { name, value } = e.target;

        if (name === 'phoneNumber') {
            if (!/^\d*$/.test(value)) {
                setPhoneError('Phone number must contain only digits.');
            } else if (value.length < 10 || value.length > 11) {
                setPhoneError('Phone number must be between 10 to 11 digits.');
            } else {
                setPhoneError('');
            }
        }

        setInput({ ...input, [name]: value });
    };

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];

        if (file) {
            const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
            if (!allowedTypes.includes(file.type)) {
                setFileError('Only images (.jpeg, .png, .webp) are allowed.');
                return;
            } else {
                setFileError('');
            }

            const reader = new FileReader();
            reader.onload = () => {
                setInput((prev) => ({ ...prev, profilePhoto: reader.result, profilePhotoFile: file }));
            };
            reader.readAsDataURL(file);
        }
    };

    const fetchSavedJobs = async () => {
        try {
            const response = await axios.get(`${USER_API_END_POINT}/savedjob`, {
                withCredentials: true,
            });
            // console.log('fetchSavedJobs response:', response.data); // Debug the response
            if (response.data.success) {
                dispatch(setsavedJobs(response.data.savedJobs || []));
            } else {
                console.warn('fetchSavedJobs returned no success:', response.data);
                dispatch(setsavedJobs([])); // Fallback to empty array if success is false
            }
        } catch (error) {
            console.error('Error fetching saved jobs:', error.response?.data?.message || error.message);
            dispatch(setsavedJobs([])); // Fallback to empty array on error
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        if (!user) {
            toast.error('User not found. Please log in again.');
            setOpen(false);
            return;
        }

        if (phoneError) {
            toast.error('Add proper phone number');
            return;
        }

        const formData = new FormData();
        formData.append('fullname', input.fullname);
        formData.append('phoneNumber', input.phoneNumber);
        formData.append('bio', input.bio);
        formData.append('skills', input.skills.split(',').map((skill) => skill.trim()));

        if (input.profilePhotoFile) {
            formData.append('profilePhoto', input.profilePhotoFile);
        }
        if (input.resumeFile) {
            formData.append('resume', input.resumeFile);
        }

        try {
            setLoading(true);
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true,
            });

            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);

                // Sync savedJobs after profile update
                await fetchSavedJobs();

                setOpen(false);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    if (!user) {
        return null;
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
        >
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>{t('UpdateProfile')}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={submitHandler} className="flex flex-col gap-3">
                        <div className="flex flex-col items-center gap-2">
                            <div className="relative w-24 h-24 rounded-full border">
                                {input.profilePhoto ? (
                                    <img
                                        src={input.profilePhoto}
                                        alt="Profile"
                                        className="w-full h-full rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center">
                                        <Camera className="w-8 h-8 text-gray-500" />
                                    </div>
                                )}
                                <label
                                    htmlFor="profile-upload"
                                    className="absolute bottom-0 right-0 bg-gray-700 text-white p-1 rounded-full cursor-pointer"
                                >
                                    <Camera className="w-4 h-4" />
                                </label>
                                <input
                                    id="profile-upload"
                                    type="file"
                                    accept="image/jpeg, image/png, image/webp"
                                    className="hidden"
                                    onChange={fileChangeHandler}
                                />
                            </div>
                            {fileError && <div className="text-red-500 text-sm">{fileError}</div>}
                        </div>

                        <div className="flex flex-col gap-1">
                            <Label htmlFor="name" className="font-semibold">{t('FullName')}</Label>
                            <Input id="name" name="fullname" type="text" value={input.fullname} onChange={changeEventHandler} />
                        </div>

                        <div className="flex flex-col gap-1">
                            <Label htmlFor="email" className="font-semibold">
                                {t('EmailAddress')} <span className="text-red-500 text-xs">{t('ViewOnly')}</span>
                            </Label>
                            <Input id="email" name="email" type="email" value={input.email} readOnly />
                        </div>

                        <div className="flex flex-col gap-1">
                            <Label htmlFor="number" className="font-semibold">{t('PhoneNumber')}</Label>
                            <Input id="number" name="phoneNumber" value={input.phoneNumber} onChange={changeEventHandler} />
                            {phoneError && <span className="text-red-500 text-sm">{phoneError}</span>}
                        </div>

                        <div className="flex flex-col gap-1">
                            <Label htmlFor="bio" className="font-semibold">{t('Bio')}</Label>
                            <Input id="bio" name="bio" value={input.bio} onChange={changeEventHandler} />
                        </div>

                        {user?.role === 'student' && (
                            <div className="flex flex-col gap-1">
                                <Label htmlFor="skills" className="font-semibold">{t('skills')}</Label>
                                <Input id="skills" name="skills" value={input.skills} onChange={changeEventHandler} />
                            </div>
                        )}

                        {user?.role === 'student' && (
                            <div className="flex flex-col gap-1">
                                <Label htmlFor="resume" className="font-semibold">{t('UploadResume')}</Label>
                                <Input
                                    id="resume"
                                    type="file"
                                    accept=".pdf"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            if (file.type !== 'application/pdf') {
                                                toast.error('Only PDF files are allowed for resumes.');
                                                return;
                                            }
                                            setInput((prev) => ({ ...prev, resumeFile: file }));
                                        }
                                    }}
                                />
                                {input.resumeFile && <span className="text-gray-400 text-sm">{input.resumeFile.name}</span>}
                            </div>
                        )}

                        {user?.profile?.resume && (
                            <a
                                href={user.profile.resume}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 text-sm mt-2 underline"
                            >
                                {t('ViewCurrentResume')}
                            </a>
                        )}

                        <DialogFooter>
                            <Button type="submit" disabled={loading} className="w-full">
                                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : t('Submit')}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </motion.div>
    );
};

export default UpdateProfileDialog;