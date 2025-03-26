import Review from "../models/review.model.js";

export const submitContactFormNew = async (req, res) => {
  try {
    const { name,review,rating,companyId,logo} = req.body;

    if (!name || !review || !rating || !companyId ||!logo) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const newMessage = new Review({name,review,rating,companyId});
    await newMessage.save();

    res.status(201).json({ message: "Review submitted successfully! " });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Try again later!" });
  }
};
// export const getReviews = async (req, res) => {
//     try {
//       // Fetch all reviews
//       const reviews = await Review.find().populate('companyId', 'name'); // Populate company name
//       res.status(200).json(reviews); // Send the reviews in response
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: "Server error. Try again later!" });
//     }
//   };

export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate("companyId", "name logo");

    const transformedReviews = reviews.map(review => {
      const logoUrl = review.companyId?.logo || "";
      // Append a version parameter to force Cloudinary to serve the latest image
      const versionedLogoUrl = logoUrl ? `${logoUrl}?v=${Date.now()}` : "";
      return {
        ...review.toObject(),
        logo: versionedLogoUrl,
      };
    });

    res.set("Cache-Control", "no-store");
    res.status(200).json(transformedReviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ message: "Server error. Try again later!" });
  }
};