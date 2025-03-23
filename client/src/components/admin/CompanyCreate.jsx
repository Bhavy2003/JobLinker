import React, { useState } from 'react';
import { motion } from 'framer-motion'; // Import motion
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { setSingleCompany } from '@/redux/companySlice';
import Footer from '../shared/Footer';
import { useTranslation } from 'react-i18next';
import "../../i18n.jsx";

const CompanyCreate = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState('');
    const dispatch = useDispatch();

    const registerNewCompany = async () => {
        if ( !companyName) {
            toast.error("Please add Company Name");
            console.error("All fields are required");
            return;
        }
        try {
            const res = await axios.post(
                `${COMPANY_API_END_POINT}/register`,
                {companyName},
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                }
            );
    
            if (res?.data?.success) {
                // Check if the company already exists in the store
                if (res?.data?.company?._id) {
                    // Dispatch new company to Redux if it's a valid company creation
                    dispatch(setSingleCompany(res.data.company));
                }
    
                toast.success(res.data.message);
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to create company. Try again.");
        }
    };
    const {t}=useTranslation();
    
    

    return (
        <motion.div
            className="bg-white min-h-screen"
            initial={ { opacity: 0, y: 20 } }
            animate={ { opacity: 1, y: 0 } }
            exit={ { opacity: 0, y: 20 } }
            transition={ { duration: 0.5 } }
        >
            <Navbar />
            <div className="max-w-4xl mx-auto my-10 p-5">
                <div className="my-10">
                    <h1 className="font-bold text-2xl text-blue-600">{t("YourCompanyName")}</h1>
                    <p className="text-gray-500 pt-5">{t("CompComp")}</p>
                </div>

                <Label className="text-gray-700">{t("CompanyName")}</Label>
                <Input
                    type="text"
                    className="my-2 border border-gray-300 rounded-md shadow-sm transition duration-200 focus:border-blue-400"
                    placeholder={t("Place")}
                    value={ companyName }
                    onChange={ (e) => setCompanyName(e.target.value) }
                />
                <div className="flex items-center gap-2 my-10">
                    <Button
                        
                        onClick={ () => navigate("/admin/companies") }
                        className="transition duration-200 hover:bg-gray-600"
                    >
                        {t("Cancel")}
                    </Button>
                    <Button
                        onClick={ registerNewCompany }
                        className="bg-blue-500 text-white hover:bg-blue-400 transition duration-200"
                    >
                        {t("Continue")}
                    </Button>
                </div>
            </div>
            <Footer />
        </motion.div>
    );
};

export default CompanyCreate;
