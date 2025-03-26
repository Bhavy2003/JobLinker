import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import Navbar from "./shared/Navbar"; 
import Footer from "./shared/Footer";
import { useTranslation } from "react-i18next";
import "../../src/i18n.jsx";

const Review = () => {
  const [formData, setFormData] = useState({
    name: "",
    review: "",
    rating: 0, // Rating state
    companyId: "", // Company selection state
  });
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [blink, setBlink] = useState(true);
  const [companies, setCompanies] = useState([]); // State to hold the companies list
  const [selectedCompanyId, setSelectedCompanyId] = useState('');
  const [selectedCompanyLogo, setSelectedCompanyLogo] = useState([]); // State to hold selected company's logo
  
  const { allJobs } = useSelector((store) => store.job);
  const jobsList = Array.isArray(allJobs) ? allJobs : [];

  const uniqueCompanies = jobsList.reduce((acc, job) => {
      if (job?.company?.name) {
          const companyName = job.company.name.toLowerCase();
          if (!acc.some((item) => item.company.name.toLowerCase() === companyName)) {
              acc.push(job);
          }
      }
      return acc;
  }, []);

  // Fetch reviews when company is selected
  useEffect(() => {
    if (selectedCompanyId) {
      axios
        .get(`/api/v1/review/${selectedCompanyId}`)
        .then((response) => {
          const fetchedReviews = Array.isArray(response.data) ? response.data : [];
          setReviews(fetchedReviews);
        })
        .catch((error) => {
          console.error('Error fetching reviews:', error);
          setReviews([]); // Handle errors gracefully
        });

      // Fetch company logo
      
    }
  
  if (success || error) {
    const interval = setInterval(() => {
      setBlink((prev) => !prev);
    }, 500); // Toggle visibility every 500ms

    setTimeout(() => {
      clearInterval(interval);
    }, 5000); // Stop blinking after 5 seconds

    return () => clearInterval(interval);
  }
}, [success, error], [selectedCompanyId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRatingChange = (star) => {
    if (formData.rating === star) {
      setFormData({ ...formData, rating: 0 });
    } else {
      setFormData({ ...formData, rating: star });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);

    if (!selectedCompanyId) {
        setError("Please select a company before submitting.");
        setLoading(false);
        return;
    }

    const reviewData = {
        ...formData,
        logo: selectedCompanyLogo, // Ensure logo is included before submission
    };

    try {
        // const response = await axios.post("http://localhost:8000/api/v1/review", reviewData);
        const response = await axios.post("https://joblinker-1.onrender.com/api/v1/review", reviewData);
        setSuccess(response.data.message);

        // Reset form and logo after successful submission
        setFormData({ name: "", review: "", rating: 0, companyId: "", logo: "" });
        setSelectedCompanyId("");
        setSelectedCompanyLogo("");
        setTimeout(() => setSuccess(null), 5000);
    } catch (err) {
        setError(err.response?.data?.message || "Something went wrong!");
        setTimeout(() => setError(null), 5000);
    } finally {
        setLoading(false);
    }
};

const handleCompanySelect = (e) => {
  const companyId = e.target.value;
  setSelectedCompanyId(companyId);

  // Find the selected company and set the logo
  const selectedCompany = uniqueCompanies.find((job) => job.company._id === companyId);

  if (selectedCompany && selectedCompany.company.logo) {
    setSelectedCompanyLogo(selectedCompany.company.logo); // Set the logo correctly
  } else {
    setSelectedCompanyLogo(""); // Reset if no logo is found
  }

  setFormData((prevData) => ({
    ...prevData,
    companyId: companyId,
    logo: selectedCompany ? selectedCompany.company.logo : "", // Ensure logo is updated in form data
  }));
};
const {t} = useTranslation();



  return (
    <div className="bg-gray-900 min-h-screen mt-5">
      <Navbar />
      <div className="max-w-lg mx-auto p-6 bg-gray-700 shadow-lg rounded-lg pt-20 mt-18 mb-10">
        <h2 className="text-2xl font-bold text-center text-[#535bf2] mb-4">
          {t("ReviewNew")}
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
            <label className="block font-medium text-white">{t("FullName")}:<span className="text-red-500  ">*</span></label>
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
  <label className="block font-medium text-white">
    {t("OnlyReview")}: <span className="text-red-500">*</span>
  </label>
  <input
    name="review"
    value={formData.review}
    onChange={(e) => {
      if (e.target.value.length <= 100) {
        handleChange(e);
      }
    }}
    maxLength={100}
    required
    title="Enter a review (max 17 characters)"
    className="w-full border-gray-300 rounded-md shadow-sm p-2 focus:ring-[#535bf2] focus:border-[#535bf2]"
  />
  <p className="text-gray-400 text-sm mt-1">
    {100 - formData.review.length} {t("CharactersLeft")}
  </p>
</div>

          <div>
            <label className="block font-medium text-white">{t("SelectCompany")}:<span className="text-red-500">*</span></label>
            <select
              value={selectedCompanyId}
              onChange={handleCompanySelect}
              className="w-full border-gray-300 rounded-md shadow-sm p-2 focus:ring-[#535bf2] focus:border-[#535bf2]"
            >
              <option value="">Select a Company</option>
              {uniqueCompanies.map((job) => (
                <option key={job._id} value={job.company._id} className="text-black">
                  {job.company.name}
                </option>
              ))}
            </select>
          </div>

         {/* Display multiple company logos */}



          <div>
            <label className="block font-medium text-white">{t("SubmitReview")}: <span className="text-red-500">*</span></label>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`cursor-pointer text-xl transition-colors duration-300 ${formData.rating >= star ? "text-yellow-500" : "text-white"}`}
                  style={{
                    opacity: formData.rating >= star ? 1 : 0.6, // Stars are visible even when not selected
                  }}
                  onClick={() => handleRatingChange(star)}
                >
                  ★
                </span>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            onClick={() => window.scrollTo(0, 0)}
            className="w-full bg-[#535bf2] text-white py-2 px-4 rounded-md hover:bg-[#4248c1] transition"
          >
            {loading ? "Sending..." : t("Submit")}
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Review;






// import axios from "axios";
// import React, { useState, useEffect } from "react";
// import { useSelector } from 'react-redux';
// import Navbar from "./shared/Navbar"; 
// import Footer from "./shared/Footer";
// import { useTranslation } from "react-i18next";
// import "../../src/i18n.jsx";

// const Review = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     review: "",
//     rating: 0,
//     companyId: "",
//     logo: "", // Ensure logo is part of formData
//   });
//   const [reviews, setReviews] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(null);
//   const [error, setError] = useState(null);
//   const [blink, setBlink] = useState(true);
//   const [selectedCompanyId, setSelectedCompanyId] = useState('');
//   const [selectedCompanyLogo, setSelectedCompanyLogo] = useState(''); // State to hold selected company's logo
  
//   const { allJobs } = useSelector((store) => store.job);
//   const jobsList = Array.isArray(allJobs) ? allJobs : [];

//   const uniqueCompanies = jobsList.reduce((acc, job) => {
//     if (job?.company?.name) {
//       const companyName = job.company.name.toLowerCase();
//       if (!acc.some((item) => item.company.name.toLowerCase() === companyName)) {
//         acc.push(job);
//       }
//     }
//     return acc;
//   }, []);

//   // Fetch reviews and update logo when company is selected
//   useEffect(() => {
//     if (selectedCompanyId) {
//       // Fetch reviews for the selected company
//       axios
//         .get(`/api/v1/review/${selectedCompanyId}`)
//         .then((response) => {
//           const fetchedReviews = Array.isArray(response.data) ? response.data : [];
//           setReviews(fetchedReviews);
//         })
//         .catch((error) => {
//           console.error('Error fetching reviews:', error);
//           setReviews([]);
//         });

//       // Update the logo based on selectedCompanyId
//       const selectedCompany = uniqueCompanies.find((job) => job.company._id === selectedCompanyId);
//       if (selectedCompany && selectedCompany.company.logo) {
//         setSelectedCompanyLogo(selectedCompany.company.logo);
//         setFormData((prevData) => ({
//           ...prevData,
//           logo: selectedCompany.company.logo, // Update formData.logo
//         }));
//       } else {
//         setSelectedCompanyLogo("");
//         setFormData((prevData) => ({
//           ...prevData,
//           logo: "", // Reset logo in formData
//         }));
//       }
//     }
//   }, [selectedCompanyId, uniqueCompanies]); // Add uniqueCompanies as a dependency

//   // Handle blinking for success/error messages
//   useEffect(() => {
//     if (success || error) {
//       const interval = setInterval(() => {
//         setBlink((prev) => !prev);
//       }, 500);

//       setTimeout(() => {
//         clearInterval(interval);
//       }, 5000);

//       return () => clearInterval(interval);
//     }
//   }, [success, error]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleRatingChange = (star) => {
//     if (formData.rating === star) {
//       setFormData({ ...formData, rating: 0 });
//     } else {
//       setFormData({ ...formData, rating: star });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setSuccess(null);
//     setError(null);

//     if (!selectedCompanyId) {
//       setError("Please select a company before submitting.");
//       setLoading(false);
//       return;
//     }

//     const reviewData = {
//       ...formData,
//       companyId: selectedCompanyId, // Ensure companyId is included
//       logo: selectedCompanyLogo, // Ensure logo is included
//     };

//     try {
//       const response = await axios.post("https://joblinker-1.onrender.com/api/v1/review", reviewData);
//       setSuccess(response.data.message);

//       // Reset form and logo after successful submission
//       setFormData({ name: "", review: "", rating: 0, companyId: "", logo: "" });
//       setSelectedCompanyId("");
//       setSelectedCompanyLogo("");
//       setTimeout(() => setSuccess(null), 5000);
//     } catch (err) {
//       setError(err.response?.data?.message || "Something went wrong!");
//       setTimeout(() => setError(null), 5000);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCompanySelect = (e) => {
//     const companyId = e.target.value;
//     setSelectedCompanyId(companyId);

//     // Find the selected company and set the logo
//     const selectedCompany = uniqueCompanies.find((job) => job.company._id === companyId);
//     if (selectedCompany && selectedCompany.company.logo) {
//       setSelectedCompanyLogo(selectedCompany.company.logo);
//       setFormData((prevData) => ({
//         ...prevData,
//         companyId: companyId,
//         logo: selectedCompany.company.logo, // Update logo in formData
//       }));
//     } else {
//       setSelectedCompanyLogo("");
//       setFormData((prevData) => ({
//         ...prevData,
//         companyId: companyId,
//         logo: "", // Reset logo in formData
//       }));
//     }
//   };

//   const { t } = useTranslation();

//   return (
//     <div className="bg-gray-900 min-h-screen mt-5">
//       <Navbar />
//       <div className="max-w-lg mx-auto p-6 bg-gray-700 shadow-lg rounded-lg pt-20 mt-18 mb-10">
//         <h2 className="text-2xl font-bold text-center text-[#535bf2] mb-4">
//           {t("ReviewNew")}
//         </h2>
//         {success && (
//           <p className={`text-green-600 text-center ${blink ? "opacity-1000" : "opacity-0"}`}>
//             {success}
//           </p>
//         )}
//         {error && (
//           <p className={`text-red-600 text-center ${blink ? "opacity-1000" : "opacity-0"}`}>
//             {error}
//           </p>
//         )}
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block font-medium text-white">{t("FullName")}:<span className="text-red-500">*</span></label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//               className="w-full border-gray-300 rounded-md shadow-sm p-2 focus:ring-[#535bf2] focus:border-[#535bf2]"
//             />
//           </div>

//           <div>
//             <label className="block font-medium text-white">
//               {t("OnlyReview")}: <span className="text-red-500">*</span>
//             </label>
//             <input
//               name="review"
//               value={formData.review}
//               onChange={(e) => {
//                 if (e.target.value.length <= 100) {
//                   handleChange(e);
//                 }
//               }}
//               maxLength={100}
//               required
//               title="Enter a review (max 100 characters)"
//               className="w-full border-gray-300 rounded-md shadow-sm p-2 focus:ring-[#535bf2] focus:border-[#535bf2]"
//             />
//             <p className="text-gray-400 text-sm mt-1">
//               {100 - formData.review.length} {t("CharactersLeft")}
//             </p>
//           </div>

//           <div>
//             <label className="block font-medium text-white">{t("SelectCompany")}:<span className="text-red-500">*</span></label>
//             <select
//               value={selectedCompanyId}
//               onChange={handleCompanySelect}
//               className="w-full border-gray-300 rounded-md shadow-sm p-2 focus:ring-[#535bf2] focus:border-[#535bf2]"
//             >
//               <option value="">Select a Company</option>
//               {uniqueCompanies.map((job) => (
//                 <option key={job._id} value={job.company._id} className="text-black">
//                   {job.company.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Display the selected company logo */}
//           {selectedCompanyLogo && (
//             <div className="mt-4">
//               <label className="block font-medium text-white">Selected Company Logo:</label>
//               <img
//                 src={selectedCompanyLogo}
//                 alt="Company Logo"
//                 className="w-24 h-24 object-contain rounded-md border border-gray-300"
//                 onError={(e) => {
//                   e.target.src = "https://via.placeholder.com/150?text=No+Logo"; // Fallback image if logo fails to load
//                 }}
//               />
//             </div>
//           )}

//           <div>
//             <label className="block font-medium text-white">{t("SubmitReview")}: <span className="text-red-500">*</span></label>
//             <div className="flex space-x-1">
//               {[1, 2, 3, 4, 5].map((star) => (
//                 <span
//                   key={star}
//                   className={`cursor-pointer text-xl transition-colors duration-300 ${formData.rating >= star ? "text-yellow-500" : "text-white"}`}
//                   style={{
//                     opacity: formData.rating >= star ? 1 : 0.6,
//                   }}
//                   onClick={() => handleRatingChange(star)}
//                 >
//                   ★
//                 </span>
//               ))}
//             </div>
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             onClick={() => window.scrollTo(0, 0)}
//             className="w-full bg-[#535bf2] text-white py-2 px-4 rounded-md hover:bg-[#4248c1] transition"
//           >
//             {loading ? "Sending..." : t("Submit")}
//           </button>
//         </form>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default Review;