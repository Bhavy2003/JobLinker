import React, { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { FaComments, FaCircle } from "react-icons/fa";
import { Send, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import "../../src/i18n.jsx";
import './ChatBot.css';

// Hardcoded responses for each category — no API needed
const CATEGORY_RESPONSES = {
    "Job Opportunities":
        "We have openings in tech, marketing, finance, and more! Browse the Jobs page to explore listings, or tell me your preferred role and I'll help you find the right fit.",
    "Application Process":
        "To apply, submit your resume and cover letter through our portal. Shortlisted candidates are contacted within 5–7 business days for an interview round.",
    "Interview Tips":
        "Research the company beforehand, practice common HR and technical questions, dress professionally, and prepare 2–3 thoughtful questions to ask your interviewer. Confidence is key!",
    "Company Culture":
        "We foster a collaborative, inclusive, and innovation-driven environment. Work-life balance is a priority, and our diverse teams are united by a shared mission to connect talent with opportunity.",
    "Resume Building":
        "Keep your resume to 1–2 pages, tailor it for each role, use strong action verbs, and quantify achievements where possible (e.g., 'Increased sales by 30%'). A clean, readable layout goes a long way.",
    "Networking Tips":
        "Attend industry events and webinars, connect with professionals on LinkedIn, send a short follow-up message after meeting someone, and always aim to offer value before asking for help.",
};

// 10 random fallback responses — job/career themed
const FALLBACK_RESPONSES = [
    "Hmm, I didn't quite catch that! Try asking about Job Opportunities, Resume Building, or Interview Tips — I'm here to help with your career journey!",
    "That's a bit outside my expertise! But I can help you explore job listings, ace your interviews, or polish your resume. What would you like to know?",
    "I'm not sure about that one! As a job-seeker assistant, I'm best at topics like Application Process, Company Culture, or Networking Tips. Give one a try!",
    "Great question, but it's beyond my scope right now! I specialize in helping candidates land their dream jobs — want tips on Resume Building or Interview prep?",
    "I didn't get that! But whether you're searching for jobs, preparing for interviews, or building your network, I've got you covered. What's your goal today?",
    "That one stumped me! Try asking about specific topics like Networking Tips or Company Culture — I'm here to make your job search easier!",
    "Not quite sure how to help with that! But if you're on a job hunt, I can guide you through Applications, Interviews, or finding the right Opportunities.",
    "I'm still learning! For now, I'm best at career-related queries — things like how to build a standout resume or how to prepare for your next big interview.",
    "That's outside my current knowledge! But your next dream job could be one click away — ask me about Job Opportunities or the Application Process to get started!",
    "Oops, couldn't find an answer for that! I'm focused on helping job seekers like you succeed — try asking about Interview Tips or Networking Strategies!",
];

const CATEGORIES = Object.keys(CATEGORY_RESPONSES);

const INITIAL_MESSAGES = [
    { sender: "bot", text: "Hi there! How can I help you today?" },
    { sender: "bot", text: "I can answer questions about job opportunities or other inquiries!" },
];

const ChatBoat = () => {
    const { t } = useTranslation();
    const [chatBoatOpen, setChatBoatOpen] = useState(false);
    const [messages, setMessages] = useState(INITIAL_MESSAGES);
    const [newMessage, setNewMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [categoriesVisible, setCategoriesVisible] = useState(true);

    const messagesEndRef = useRef(null);

    // Auto-scroll to latest message
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    // Reset chat state when chatbot is opened fresh
    const handleOpen = () => {
        setMessages(INITIAL_MESSAGES);
        setCategoriesVisible(true);
        setNewMessage("");
        setChatBoatOpen(true);
    };

    const simulateTypingEffect = (fullMessage) => {
        const words = fullMessage.split(" ");
        let currentMessage = "";
        let index = 0;

        // Add a placeholder "..." message first
        setMessages((prev) => [...prev, { sender: "bot", text: "..." }]);

        const typingInterval = setInterval(() => {
            if (index < words.length) {
                currentMessage += (index > 0 ? " " : "") + words[index];
                index++;

                setMessages((prev) =>
                    prev.map((msg, idx) =>
                        idx === prev.length - 1
                            ? { sender: "bot", text: currentMessage }
                            : msg
                    )
                );
            } else {
                clearInterval(typingInterval);
            }
        }, 120);
    };

    const handleSendMessage = (message) => {
        const trimmed = message.trim();
        if (!trimmed || loading) return;

        // Add user message
        setMessages((prev) => [...prev, { sender: "user", text: trimmed }]);
        setNewMessage("");

        // Hide category buttons after first interaction
        setCategoriesVisible(false);

        // Check if message exactly matches a category
        if (CATEGORY_RESPONSES[trimmed]) {
            simulateTypingEffect(CATEGORY_RESPONSES[trimmed]);
            return;
        }

        // For free-text, do a keyword match across all categories
        const matchedCategory = CATEGORIES.find((cat) =>
            trimmed.toLowerCase().includes(cat.toLowerCase())
        );

        if (matchedCategory) {
            simulateTypingEffect(CATEGORY_RESPONSES[matchedCategory]);
            return;
        }

        // Random fallback response for unrecognized input
        const randomFallback =
            FALLBACK_RESPONSES[Math.floor(Math.random() * FALLBACK_RESPONSES.length)];
        simulateTypingEffect(randomFallback);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSendMessage(newMessage);
        }
    };

    return (
        <div className="fixed bottom-4 right-4 z-50">
            {chatBoatOpen ? (
                <Card className="w-full max-w-md p-4 flex flex-col space-y-4 shadow-2xl bg-gradient-to-br from-[#00040A] to-[#001636] border border-blue-600 rounded-lg">

                    {/* Header */}
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <h2 className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                                Job Linker
                            </h2>
                            <FaCircle className="text-green-500 text-xs" />
                        </div>
                        <Button
                            variant="ghost"
                            onClick={() => setChatBoatOpen(false)}
                            className="text-blue-500 hover:text-white hover:bg-gray-600"
                        >
                            <X size={18} />
                        </Button>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto space-y-3 bg-gradient-to-br from-gray-800 to-gray-900 rounded-md p-3 max-h-64">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                            >
                                <div
                                    className={`p-2 rounded-lg max-w-[85%] text-sm leading-relaxed ${
                                        message.sender === "user"
                                            ? "bg-blue-500 text-white"
                                            : "bg-gray-700 text-white"
                                    }`}
                                >
                                    {message.text}
                                </div>
                            </div>
                        ))}

                        {/* Loading dots */}
                        {loading && (
                            <div className="flex justify-start ml-1">
                                <div className="loader"></div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Category Buttons — only visible at start, hidden after first click */}
                    {categoriesVisible && (
                        <div className="flex flex-wrap gap-2">
                            {CATEGORIES.map((category, idx) => (
                                <Button
                                    key={idx}
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium transition-all"
                                    onClick={() => handleSendMessage(category)}
                                >
                                    {category}
                                </Button>
                            ))}
                        </div>
                    )}

                    {/* Input Row */}
                    <div className="flex items-center space-x-2">
                        <Input
                            placeholder="Type a message..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="flex-1 border-blue-400 bg-transparent text-white placeholder:text-gray-400 focus:ring-2 focus:ring-blue-600 text-sm"
                        />
                        <Button
                            onClick={() => handleSendMessage(newMessage)}
                            className="bg-blue-500 hover:bg-blue-600 text-white"
                            disabled={loading || !newMessage.trim()}
                        >
                            <Send size={16} />
                        </Button>
                    </div>
                </Card>
            ) : (
                // Floating trigger button
                <Button
                    onClick={handleOpen}
                    className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-600 bounce"
                >
                    <FaComments className="text-xl" />
                    <span>{t("ASKME")}</span>
                </Button>
            )}
        </div>
    );
};

export default ChatBoat;