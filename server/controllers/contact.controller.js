import Contact from "../models/contact.model.js";

export const submitContactForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const newMessage = new Contact({ name, email, message });
    await newMessage.save();

    res.status(201).json({ message: "Message submitted successfully! We will get back to you soon. " });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Try again later!" });
  }
};
