import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import Footer from "./shared/Footer";
import { useTranslation } from "react-i18next";
import "../../src/i18n.jsx";

const Help = () => {
  const [openFAQ, setOpenFAQ] = useState(null);
  const { t } = useTranslation();

  const faqs = [
    { question: t("questions.q1"), answer: t("answers.a1") },
    { question: t("questions.q2"), answer: t("answers.a2") },
    { question: t("questions.q3"), answer: t("answers.a3") },
    { question: t("questions.q4"), answer: t("answers.a4") },
    { question: t("questions.q5"), answer: t("answers.a5") },
    { question: t("questions.q6"), answer: t("answers.a6") },
    { question: t("questions.q7"), answer: t("answers.a7") }
  ];

  return (
    <div>
      <Navbar />
      <div className="bg-gray-900 min-h-screen text-white px-6 py-12 md:px-20">
        <header className="text-center pt-7">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#6a11cb] to-[#2575fc]">
            {t("HelpCenter")}
          </h1>
        </header>

        <section className="mt-10 max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-200">{t("FAQ")}</h2>

          <div className="mt-4 space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-800 p-4 rounded-md shadow-md">
                <button
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  className="flex justify-between items-center w-full text-left text-lg font-medium text-white"
                >
                  {faq.question}
                  <span>{openFAQ === index ? "▲" : "▼"}</span>
                </button>
                {openFAQ === index && (
                  <p className="mt-2 text-gray-300">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Help;