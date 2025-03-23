import Review from "../models/review.model.js";

export const submitContactFormNew = async (req, res) => {
  try {
    const { name,review,rating,companyId,logo } = req.body;

    if (!name || !review || !rating || !companyId|| !logo) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const newMessage = new Review({name,review,rating,companyId,logo});
    await newMessage.save();

    res.status(201).json({ message: "Review submitted successfully! " });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Try again later!" });
  }
};
export const getReviews = async (req, res) => {
    try {
      // Fetch all reviews
      const reviews = await Review.find().populate('companyId', 'name'); // Populate company name
      res.status(200).json(reviews); // Send the reviews in response
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error. Try again later!" });
    }
  };