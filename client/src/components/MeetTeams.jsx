import React from 'react';
import Navbar from './shared/Navbar';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import img1 from '../assets/img-1.png';
import Footer from './shared/Footer';

const MeetTeams = () => {
    const { t } = useTranslation();

    return (
        <>
            <Navbar />
            <motion.div
                className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gradient-to-r from-[#00040A] to-[#27324be0] p-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="md:w-1/2 flex justify-center mt-10">
                    <img
                        src={img1}
                        alt={t("title")}
                        className="rounded-[100px] shadow-lg w-full max-w-lg"
                    />
                </div>
                <div className="md:w-1/2 text-white mt-6 md:mt-0 md:pl-12">
                    <h1 className="text-4xl font-bold text-blue-300 mb-4">{t("title")}</h1>
                    <p className="text-lg text-gray-300 mb-4" dangerouslySetInnerHTML={{ __html: t("introduction") }}></p>
                    <p className="text-lg text-gray-300 mb-2 font-bold">{t("role")}</p>
                    <p className="text-lg text-gray-300 mb-6">{t("descriptionk")}</p>
                    <h2 className="text-2xl font-semibold text-blue-300 mb-2">{t("skills")}</h2>
                    <ul className="text-gray-300 mb-6">
                        {t("skill_list", { returnObjects: true }).map((skill, index) => (
                            <li key={index}>{skill}</li>
                        ))}
                    </ul>
                </div>
            </motion.div>
            <Footer />
        </>
    );
};

export default MeetTeams;
