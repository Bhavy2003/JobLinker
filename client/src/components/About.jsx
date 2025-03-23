import React from "react";
import Navbar from "./shared/Navbar"; // Adjust the import path if needed
import Footer from "./shared/Footer";
import { useTranslation } from "react-i18next";
import "../../src/i18n.jsx"; // Adjust the import path if needed

const AboutUs = () => {
  const {t}=useTranslation();
  return (
    <>
      <div className="bg-gray-900 min-h-screen text-white bg-gradient-to-br from-[#00040A] to-[#001636]">
        <Navbar />
        <div className="font-sans text-gray-800 p-8 max-w-[960px] mx-auto pt-20">
          {/* Header Section */}
          <header className="text-center mb-4 bg-blue-800 text-white p-2 rounded-lg">
            <h1 className="m-0 text-[2rem] md:text-[2.5rem]">{t("AboutJoblinker")}</h1>
            <p className="mt-2 text-[1rem] md:text-[1.2rem]">
              {t("Gateway")}
            </p>
          </header>

          {/* Content Section */}
          <section className="bg-gray-50 p-8 rounded-lg shadow-md">
            {/* Who We Are */}
            <div className="mb-6">
              <h2 className="text-[#2575fc] mb-2 text-[1.5rem] md:text-[1.8rem]">
                Who We Are
              </h2>
              <p className="text-base leading-relaxed">
                JobLinker is a leading job portal application that connects talented job
                seekers with top companies across industries. We make the job search process
                simple, efficient, and transparent.
              </p>
            </div>

            {/* Our Mission */}
            <div className="mb-6">
              <h2 className="text-[#2575fc] mb-2 text-[1.5rem] md:text-[1.8rem]">
                Our Mission
              </h2>
              <p className="text-base leading-relaxed">
                Our mission is to empower individuals to achieve their career goals by bridging
                the gap between job seekers and employers. We are committed to creating
                opportunities for growth, development, and success.
              </p>
            </div>

            {/* Our Values */}
            <div className="mb-6">
              <h2 className="text-[#2575fc] mb-2 text-[1.5rem] md:text-[1.8rem]">
                Our Values
              </h2>
              <ul className="list-disc pl-6">
                <li className="mb-2 text-base">
                  Integrity: We value honesty and transparency in every interaction.
                </li>
                <li className="mb-2 text-base">
                  Innovation: We continuously seek innovative ways to improve the job search
                  experience.
                </li>
                <li className="mb-2 text-base">
                  Collaboration: We believe in the power of teamwork and partnerships.
                </li>
                <li className="mb-2 text-base">
                  Excellence: We are committed to delivering the highest quality service.
                </li>
              </ul>
            </div>
          </section>
          
        </div>
        <Footer />
      </div>
    </>
  );
};

export default AboutUs;
