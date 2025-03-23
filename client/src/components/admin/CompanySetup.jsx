import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../shared/Navbar';
import { Button } from '../ui/button';
import { ArrowLeft, Loader2, Trash2 } from 'lucide-react'; // Import Trash Icon
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import useGetCompanyById from '@/hooks/useGetCompanyById';
import Footer from '../shared/Footer';
import { useTranslation } from 'react-i18next';
import "../../i18n.jsx";

const CompanySetup = () => {
    const params = useParams();
    useGetCompanyById(params.id);
    const  {t}=useTranslation();
    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null,
    });
    const { singleCompany } = useSelector((store) => store.company);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("website", input.website);
        formData.append("location", input.location);
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            setLoading(true);
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/companies");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // 🛑 Delete Handler: Deletes the company
    const deleteHandler = async (e) => {
        try {
            const res = await axios.delete(`${COMPANY_API_END_POINT}/delete/${params.id}`, {
                withCredentials: true, // 🔥 Ensure cookies are sent!
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}` // If using token auth
                }
            });
    
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/companies");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Error deleting company");
        }
    };
    
    

    useEffect(() => {
        if (singleCompany) {
            setInput({
                name: singleCompany?.name || "",
                description: singleCompany?.description || "",
                website: singleCompany?.website || "",
                location: singleCompany?.location || "",
                file: singleCompany?.file || null,
            });
        }
    }, [singleCompany]);
    

    return (
        <motion.div
            className="bg-white min-h-screen"
            initial={ { opacity: 0, y: 20 } }
            animate={ { opacity: 1, y: 0 } }
            exit={ { opacity: 0, y: 20 } }
            transition={ { duration: 0.5 } }
        >
            <Navbar />
            <div className="max-w-xl mx-auto my-10 p-5 rounded-lg shadow-lg bg-gray-50">
                <form onSubmit={ submitHandler }>
                    <div className="flex items-center gap-5 p-4">
                        <Button
                            onClick={ () => navigate("/admin/companies") }
                            variant="outline"
                            className="flex items-center gap-2 text-gray-500 font-semibold transition duration-200 hover:bg-blue-100"
                        >
                            <ArrowLeft />
                        </Button>
                        <h1 className="font-bold text-xl text-blue-600">{t("CompanySetup")}</h1>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label className="text-gray-700 font-semibold">{t("CompanyName")}</Label>
                            <Input
                                type="text"
                                name="name"
                                value={ input.name }
                                onChange={ changeEventHandler }
                                className="border border-gray-300 rounded-md shadow-sm transition duration-200 focus:border-blue-400"
                            />
                        </div>
                        <div>
                            <Label className="text-gray-700 font-semibold">{t("Description")}</Label>
                            <Input
                                type="text"
                                name="description"
                                value={ input.description }
                                onChange={ changeEventHandler }
                                className="border border-gray-300 rounded-md shadow-sm transition duration-200 focus:border-blue-400"
                            />
                        </div>
                        <div>
                            <Label className="text-gray-700 font-semibold">{t("Website")}</Label>
                            <Input
                                type="text"
                                name="website"
                                value={ input.website }
                                onChange={ changeEventHandler }
                                className="border border-gray-300 rounded-md shadow-sm transition duration-200 focus:border-blue-400"
                            />
                        </div>
                        <div>
                            <Label className="text-gray-700 font-semibold">{t("Location")}</Label>
                            <Input
                                type="text"
                                name="location"
                                value={ input.location }
                                onChange={ changeEventHandler }
                                className="border border-gray-300 rounded-md shadow-sm transition duration-200 focus:border-blue-400"
                            />
                        </div>
                        <div>
                            <Label className="text-gray-700 font-semibold">{t("Logo")}</Label>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={ changeFileHandler }
                                className="border border-gray-300 rounded-md shadow-sm transition duration-200"
                            />
                        </div>
                    </div>
                    <div className="flex gap-4 my-4">
                        {
                            loading ? (
                                <Button className="w-full bg-blue-500 text-white" disabled>
                                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />{t("Pleasewait")}
                                </Button>
                            ) : (
                                <>
                                    <Button type="submit" className="w-full bg-blue-500 text-white hover:bg-blue-600 transition duration-200" onClick={()=>window.scrollTo(0,0)}>
                                        {t("Update")}
                                    </Button>
                                    <Button
                                        onClick={deleteHandler}
                                        type="button"
                                        className="w-full bg-red-500 text-white hover:bg-red-600 transition duration-200 flex items-center gap-2"
                                    >
                                        <Trash2 className="h-4 w-4" /> {t("Delete")}
                                    </Button>
                                </>
                            )
                        }
                    </div>
                </form>
            </div>
            <Footer />
        </motion.div>
    );
};

export default CompanySetup;
