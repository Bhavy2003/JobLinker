import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useTranslation } from "react-i18next";
import "../../src/i18n.jsx";

const ReviewCarousel = () => {
  const [reviews, setReviews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { t } = useTranslation();
  useEffect(() => {
    axios.get('https://joblinker-1.onrender.com/api/v1/reviews')
      .then(response => {
        if (response.status === 200 && Array.isArray(response.data)) {
          const sortedReviews = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          const filteredReviews = response.data.filter(review => review.companyId?.name);
setReviews(filteredReviews);
        } else {
          setReviews([]);
        }
      })
      .catch(() => setReviews([]));
  }, []);

  const reviewsPerPage = 4; // Default for large screens
  const handleNext = () => {
    if (currentIndex + reviewsPerPage < reviews.length) {
      setCurrentIndex(currentIndex + reviewsPerPage);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - reviewsPerPage);
    }
  };

  return (
    <div className=" bg-gradient-to-br from-[#00040A] to-[#001636] min-h-[400px] pt-3 mb-10">
        <motion.div  initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}>
      <div className="max-w-screen-xl mx-auto px-6">
      <motion.div  initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}>
        {/* <h2 className="text-3xl sm:text-3xl lg:text-4xl font-bold mt-2 mb-6 text-center tracking-tight user-select text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Employer Reviews</h2> */}
        <h2 className="text-3xl sm:text-3xl lg:text-4xl font-bold mb-6 text-center tracking-tight user-select text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 pt-3 pb-3">{t('Review')}</h2>
      </motion.div>
        <div className="flex justify-between items-center gap-3 pt-2">
        <button
  onClick={handlePrev}
  className="text-3xl text-white bg-gray-700 hover:bg-gray-400 disabled:bg-gray-500 disabled:opacity-25 rounded-full w-12 h-[25px] pb-[7px] flex items-center justify-center shadow-lg transition"
  disabled={currentIndex === 0}
>
  ←
</button>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full" 
                    >
            {reviews.length > 0 ? (
              reviews.slice(currentIndex, currentIndex + reviewsPerPage).map((review, index) => (
                <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-lg overflow-hidden break-words whitespace-normal" >
                  <h3 className="text-xl font-semibold text-white italic">{review.name}</h3>
                  <div className="flex items-center mt-4">
                    {review.companyId?.name && (
                      <div className="flex items-center">
                        {review.logo ? (
                          <img src={review.logo} alt={review.companyId.name} className="w-8 h-8 rounded-full mr-2" />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-gray-500 mr-2" />
                        )}
                        <span className="text-lg text-gray-100 text-italic italic ">{review.companyId.name}</span>
                      </div>
                    )}
                  </div>
                  <p className="text-gray-400 mt-2">{review.review}</p>
                  <div className="mt-4 flex items-center">
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span key={star} className={`text-xl ${review.rating >= star ? 'text-yellow-500' : 'text-gray-500'}`}>★</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-white col-span-full">No reviews available</p>
            )}
          </div>
  
          <button
  onClick={handleNext}
  className="text-3xl text-white bg-gray-700 hover:bg-gray-400 disabled:bg-gray-500 disabled:opacity-25 rounded-full w-12 h-[25px] pb-[7px] flex items-center justify-center shadow-lg transition"
  disabled={currentIndex + reviewsPerPage >= reviews.length}
>
  →
</button>
        </div>
      </div>
  </motion.div>
    </div>
  );
};

export default ReviewCarousel;