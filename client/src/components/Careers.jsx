import React, { useState } from "react";
import { useSelector } from "react-redux"; // Import Redux selector
import Navbar from "./shared/Navbar"; // Adjust the import path if needed
import Footer from "./shared/Footer";
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import "../../src/i18n.jsx";

const Careers = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useTranslation();
  // Get user role from Redux
  const user = useSelector((state) => state.auth.user);

  return (
    <div>
      <Navbar />
      <div className="bg-gray-900 min-h-screen text-white p-6 sm:p-10 sm:pt-10 md:p-20">
        {/* Navbar */}
        <nav className="flex justify-between items-center p-4 pt-10 shadow-md">
          <h1 className="text-xl font-bold">{t("Careers")}</h1>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-300 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            
            <Link to="/meetteams" onClick={() => window.scrollTo(0, 0)} className="hover:text-gray-300 pt-2 hover:font-bold">
                              {t("MeetTeams")}
                </Link>
                {/* <Link className="hover:text-gray-300 pt-2">
                {t("DD")}
                </Link> */}

           

            {/* Conditionally show Open Positions */}
            {user?.role !== "recruiter" && (
              <button className="bg-blue-700 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-900">
                
                <Link to="/browse" onClick={() => window.scrollTo(0, 0)} >{t("EE")}</Link>
              </button>
            )}
          </div>
        </nav>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden flex flex-col p-6 pt-10 space-y-4">
            <Link to="/meetteams" onClick={() => window.scrollTo(0, 0)} className="hover:text-gray-300 pt-2 hover:font-bold">
                              {t("MeetTeams")}
                </Link>
                {/* <Link className="hover:text-gray-300 pt-2">
                {t("DD")}
                </Link> */}

            {/* Conditionally show Open Positions */}
            {user?.role !== "recruiter" && (
              <button className="bg-blue-700 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-900">
                <Link to="/browse" onClick={() => window.scrollTo(0, 0)} >{t("EE")}</Link>
              </button>
            )}
          </div>
        )}

        {/* Hero Section */}
        <section className="relative flex flex-col md:flex-row items-center justify-center text-center md:text-left p-6 md:p-12">
          <div className="absolute inset-0 opacity-50"></div>

          <div className="z-10 max-w-3xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
              {t("AA")}
            </h2>
            <p className="mt-4 text-base sm:text-lg text-gray-300">
              
              {t("BB")}
            </p>

            
            {user?.role !== "recruiter" && (
              <button className="mt-6 bg-blue-700 text-white px-6 py-3 text-lg font-semibold rounded-md hover:bg-blue-900">
                <Link to="/jobs">{t("CC")}</Link>
                
              </button>
            )}
          </div>

          {/* Hero Image */}
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWbfp0B3SFly-8wlxkglb0zDY0KqA3i_Q0qQ&s"
            alt="Career"
            className="relative mt-6 md:mt-0 right-0 w-full md:w-1/2 rounded-lg shadow-lg opacity-50 md:opacity-50 h-[300px] md:h-[400px] object-cover"
          />
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Careers;
