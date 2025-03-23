import axios from "axios";
import React, { useState, useEffect } from "react";
import Navbar from "./shared/Navbar"; 
import Footer from "./shared/Footer";
import { useTranslation } from "react-i18next";
import "../../src/i18n.jsx";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    contactnumber:" ",
  });
  const {t} = useTranslation();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [blink, setBlink] = useState(true);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);

    try {
      // const response = await axios.post("http://localhost:8000/api/v1/contact", formData);
      const response = await axios.post("https://joblinker-1.onrender.com/api/v1/contact", formData);
      setSuccess(response.data.message);
      setFormData({ name: "", email: "", message: "" , contactnumber: "" });

      
      setTimeout(() => setSuccess(null), 5000);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong!");

      
      setTimeout(() => setError(null), 5000);
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    if (success || error) {
      const interval = setInterval(() => {
        setBlink((prev) => !prev);
      }, 500); 

      setTimeout(() => {
        clearInterval(interval);
      }, 5000); 

      return () => clearInterval(interval);
    }
  }, [success, error]);

  return (
    <div className="bg-gray-900 min-h-screen mt-5">
      <Navbar />
      <div className="max-w-lg mx-auto p-6 bg-blue-200 shadow-lg rounded-lg pt-20 mt-18 mb-10">
        <h2 className="text-2xl font-bold text-center text-[#535bf2] mb-4">
          {t("ContactNew")}
        </h2>
        {success && (
          <p className={`text-green-600 text-center ${blink ? "opacity-1000" : "opacity-0"}`}>
            {success}
          </p>
        )}
        {error && (
          <p className={`text-red-600 text-center ${blink ? "opacity-1000" : "opacity-0"}`}>
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium text-gray-700">{t("FullName")}:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border-gray-300 rounded-md shadow-sm p-2 focus:ring-[#535bf2] focus:border-[#535bf2]"
            />
          </div>
          <div>
  <label className="block font-medium text-gray-700">{t("PhoneNumber")}:</label>
  <input
    type="tel"
    name="contactnumber"
    value={formData.contactnumber}
    onChange={handleChange}
    required
    pattern="^\d{10,11}$" // Allow only 10 or 11 digits
    title="Enter a valid phone number with 10 or 11 digits"
    className="w-full border-gray-300 rounded-md shadow-sm p-2 focus:ring-[#535bf2] focus:border-[#535bf2]"
  />
</div>


          <div>
            <label className="block font-medium text-gray-700">{t("EmailAddress")}:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              title="Enter a valid email id"
              className="w-full border-gray-300 rounded-md shadow-sm p-2 focus:ring-[#535bf2] focus:border-[#535bf2]"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700">{t("Message")}:</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full border-gray-300 rounded-md shadow-sm p-2 focus:ring-[#535bf2] focus:border-[#535bf2]"
              rows="4"
            ></textarea>
          </div>
          <div>
            <p className="text-sm text-red-600 text-center font-bold">
              {t("ContactInformation")}:{" "}
              <a href="mailto:bhavyjhaveri@gmail.com" className="text-gray-500 hover:underline">
                bhavyjhaveri@gmail.com
              </a>
            </p>
          </div>
          <button
            type="submit"
            disabled={loading}
            onClick={() => window.scrollTo(0, 0)}
            className="w-full bg-[#535bf2] text-white py-2 px-4 rounded-md hover:bg-[#4248c1] transition"
          >
            {(loading ? "Sending..." : t("Submit"))}

          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default ContactForm;