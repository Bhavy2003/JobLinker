import React from 'react';
import Navbar from './shared/Navbar';
import Footer from './shared/Footer';
import { useTranslation } from "react-i18next";
import "../../src/i18n.jsx";

// Sample blog articles data
const blogArticles = [
  {
    id: 1,
    title: "Top 10 Job Trends in 2025",
    date: "February 1, 2025",
    snippet:
      "Discover the emerging trends in the job market and learn how to prepare for the future. This article highlights the most in-demand skills and industries.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSn9VAGPq5Gw3_DIrPvNV4-jSv8pbwVY4twxQ&s/600x600", // Replace with your actual image URL or asset path
    link: "https://www.researchgate.net/publication/380525577_Job_Portal",
  },
  {
    id: 2,
    title: "How to Ace Your Job Interview",
    date: "February 5, 2025",
    snippet:
      "Preparing for a job interview can be daunting. Learn tips and tricks to create a lasting impression and land your dream job.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDSXP_ztwuYLfmmb3QM2VVdxhvuvfCXCNqmQ&s",
    link: "https://www.researchgate.net/publication/356441062_Journey_of_a_Thousand_Miles_Begins_with_a_Single_Step_Transparity_A_Web-based_Job_Portal",
  },
  {
    id: 3,
    title: "Career Growth Strategies",
    date: "February 10, 2025",
    snippet:
      "Effective strategies for continuous career development. Discover actionable tips for skill enhancement and networking.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYA7Gv58d9P3f740SDwqZighAg1QP9dTa6gw&s",
    link: "https://www.researchgate.net/publication/356441062_Journey_of_a_Thousand_Miles_Begins_with_a_Single_Step_Transparity_A_Web-based_Job_Portal",
  },
];

const BlogPage = () => {
  const {t}=useTranslation();
  return (
    <div className="bg-gray-900 min-h-screen text-gray-800">
      <Navbar />
      <div className="max-w-6xl bg-gray-900 mx-auto px-4 py-12">
        {/* Page Header */}
        <header className="mb-12 text-center">
          {/* <h1 className="text-4xl font-bold text-gradient-to-br from-[#6a11cb] to-[#2575fc] p-6">Job Portal Blog</h1> */
          }
          <h1 className="text-4xl font-bold bg-gradient-to-br from-[#6a11cb] to-[#2575fc] bg-clip-text text-transparent p-6">
          {t("JobBlogs")}
</h1>

          <p className="mt-2 text-lg text-white text-bold">
            {/* Latest insights and articles on job trends, career advice, and industry news. */}
            {t("BlogJobs")}
          </p>
        </header>

        {/* Blog Articles Grid */}
        <section className="grid gap-8 md:grid-cols-2 ">
          {blogArticles.map((article) => (
            <article
              key={article.id}
              className="bg-white  shadow-md overflow-hidden hover:shadow-xl max-h-auto transition-shadow duration-300 rounded-3xl"
            >
              <img
                src={article.image}
                alt={article.title}
                className="w-full max-h-[174px] ;"
              />
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  {article.title}
                </h2>
                <p className="text-sm text-gray-500 mb-4">{article.date}</p>
                <p className="text-gray-700 mb-4">{article.snippet}</p>
                <a
                  href={article.link} target="_blank"
                  className="inline-block text-blue-600 hover:underline font-medium"
                >
                  Read More &rarr;
                </a>
              </div>
            </article>
          ))}
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default BlogPage;
