import express from "express";
import axios from "axios";
const router = express.Router();

// APILayer Resume Parser API key
const REACT_APP_RESUME_API_KEY= 'MMc8Svkk6fTsr4T5Hi7cXXdGIZoyllid';

// POST /api/v1/resume/analyze
router.post('/analyze', async (req, res) => {
    try {
        const { resumeUrl } = req.body;

        if (!resumeUrl) {
            return res.status(400).json({ success: false, message: 'Resume URL is required' });
        }

        // Encode the resume URL for the query parameter
        const encodedUrl = encodeURIComponent(resumeUrl);

        // Make request to APILayer Resume Parser API
        const apiResponse = await axios.get(
            `https://api.apilayer.com/resume_parser/url?url=${encodedUrl}`,
            {
                headers: {
                    'apikey': REACT_APP_RESUME_API_KEY,
                },
            }
        );

        // Process the API response to extract relevant data
        const parsedData = apiResponse.data;

        // Generate suggestions based on the parsed data
        const suggestions = generateSuggestions(parsedData);

        res.json({ success: true, suggestions });
    } catch (error) {
        console.error('Error analyzing resume:', error.message);
        res.status(500).json({ success: false, message: 'Error analyzing resume', error: error.message });
    }
});

// Function to generate suggestions based on parsed resume data
function generateSuggestions(parsedData) {
    const suggestions = [];

    // Example suggestions based on parsed data
    // Check if skills are present
    if (!parsedData.skills || parsedData.skills.length === 0) {
        suggestions.push('Add relevant skills to your resume to highlight your expertise.');
    } else {
        // Suggest adding trending skills if not present
        const trendingSkills = ['Python', 'JavaScript', 'AWS', 'Docker'];
        const missingSkills = trendingSkills.filter(skill => !parsedData.skills.includes(skill));
        if (missingSkills.length > 0) {
            suggestions.push(`Consider adding these trending skills: ${missingSkills.join(', ')}.`);
        }
    }

    // Check if experience is detailed
    if (!parsedData.experience || parsedData.experience.length === 0) {
        suggestions.push('Include your work experience with specific achievements and responsibilities.');
    } else {
        // Suggest adding measurable achievements
        const hasAchievements = parsedData.experience.some(exp => exp.description && exp.description.includes('increased') || exp.description.includes('improved'));
        if (!hasAchievements) {
            suggestions.push('Add measurable achievements in your experience (e.g., "Increased sales by 20%").');
        }
    }

    // Check if education is present
    if (!parsedData.education || parsedData.education.length === 0) {
        suggestions.push('Include your educational background, such as degrees and certifications.');
    }

    // Check for contact information
    if (!parsedData.email || !parsedData.phone) {
        suggestions.push('Ensure your resume includes contact information (email and phone number).');
    }

    // Fallback if no suggestions
    if (suggestions.length === 0) {
        suggestions.push('Your resume looks good! Consider tailoring it further for specific job roles.');
    }

    return suggestions;
}

export default router;