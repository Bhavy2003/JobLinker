import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Image from "../assets/zomato.svg";
import Image2 from "../assets/hdfc-bank.svg";
import Image3 from "../assets/adani.svg";
import Image4 from "../assets/paytm.svg";
import Image5 from "../assets/tata.svg";
import Image6 from "../assets/nvidia.svg";
import Image7 from "../assets/swiggy.svg";
import "../../src/i18n.jsx";
const companyLogos = [
    { src: Image, alt: "Zomato" },
    { src: Image2, alt: "HDFC Bank" },
    { src: Image3, alt: "Adani" },
    { src: Image4, alt: "Paytm" },
    { src: Image5, alt: "Tata" },
    { src: Image6, alt: "Nvidia" },
    { src: Image7, alt: "Swiggy" },
  ];
  

const TrustedBySection = () => {
    const { t } = useTranslation();
    return (
        <div className="w-full bg-gradient-to-br from-[#00040A] to-[#001636] py-10">
            <motion.div
                className="max-w-5xl mx-auto text-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
            >
                {/* Company Logos in a Responsive Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6 items-center justify-center px-5">
                    {companyLogos.map((company, index) => (
                        <motion.img
                            key={index}
                            src={company.src}
                            alt={company.alt}
                            className="h-12 md:h-16 object-contain mx-auto"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                        />
                    ))}

                </div>

                {/* Trust Statement */}
                <motion.p
                    className="text-white text-lg md:text-xl mt-6"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    {t("Comp")}
                </motion.p>
            </motion.div>
        </div>
    );
};

export default TrustedBySection;