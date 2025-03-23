

// import express from "express";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import connectDB from "./utils/db.js";
// import userRoute from "./routes/user.route.js";
// import companyRoute from "./routes/company.route.js";
// import jobRoute from "./routes/job.route.js";
// import applicationRoute from "./routes/application.route.js";
// import chatboatRoutes from "./routes/chatboatroutes.js";
// import contactRoutes from "./routes/contact.routes.js";
// import reviewRoutes from "./routes/review.routes.js";
// import http from "http";
// import { Server } from "socket.io";
// import fileRoutes from "./routes/fileRoutes.js";
// import multer from "multer";
// import path from "path";
// import { fileURLToPath } from "url";
// import fs from "fs";
// import cloudinary from "cloudinary";
// import fsPromises from "fs/promises";
// import pdfParse from "pdf-parse";
// import mammoth from "mammoth";
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import tesseract from "node-tesseract-ocr";
// import { fromPath } from "pdf2pic";

// dotenv.config();
// connectDB(); // Ensure DB is connected once

// const app = express();
// const server = http.createServer(app);
// const requiredEnvVars = ["GEMINI_API_KEY", "CLOUD_NAME", "API_KEY", "API_SECRET", "PORT"];
// for (const envVar of requiredEnvVars) {
//   if (!process.env[envVar]) {
//     throw new Error(`Missing required environment variable: ${envVar}`);
//   }
// }
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

// const corsOptions = {
//   origin: ["http://localhost:8000", "https://hire-hub-chandan.vercel.app"],
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true,
// };
// app.use(cors(corsOptions));

// const PORT = process.env.PORT || 8000;

// // app.get("/", (req, res) => {
// //   res.send("Server is running and database connected successfully!");
// // });

// // API Routes
// app.use("/api/v1/user", userRoute);
// app.use("/api/v1/company", companyRoute);
// app.use("/api/v1/job", jobRoute);
// app.use("/api/v1/application", applicationRoute);
// app.use("/api/v1/chatboat", chatboatRoutes);
// app.use("/api/v1", contactRoutes);
// app.use("/api/v1", reviewRoutes);
// app.use("/api", fileRoutes);


// app.get('/api/jobs/get/:jobId', async (req, res) => {
//   try {
//     const job = await Job.findById(req.params.jobId).populate('createdBy', 'fullname email');
//     if (!job) return res.status(404).json({ success: false, message: 'Job not found' });
//     res.json({ success: true, job });
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Server error' });
//   }
// });

// app.get('/api/users/get/:userId', async (req, res) => {
//   try {
//     const user = await User.findById(req.params.userId).select('fullname email');
//     if (!user) return res.status(404).json({ success: false, message: 'User not found' });
//     res.json({ success: true, user });
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Server error' });
//   }
// });
// app.post('/api/jobs/post', async (req, res) => {
//   const { title, description, requirements, salary, location, jobType, experience, position, companyId, createdBy } = req.body;
//   const job = new Job({
//     title,
//     description,
//     requirements,
//     salary,
//     location,
//     jobType,
//     experience,
//     position,
//     companyId,
//     createdBy, // This should be the user ID from the authenticated user
//   });
//   await job.save();
//   res.json({ success: true, message: 'Job posted successfully', job });
// });
// // Translation Schema & API
// const translationSchema = new mongoose.Schema({
//   SimilarJobs: String,
//   language: String,
//   PostedBy: String,
//   welcome: String,
//   Chat: String,
//   Chats: String,
//   Deletechat: String,
//   Sends: String,
//   Searchby: String,
//   Type: String,
//   description: String,
//   Home: String,
//   Jobs: String,
//   Browse: String,
//   Companies: String,
//   About: String,
//   ViewProfile: String,
//   Logout: String,
//   FindJobs: String,
//   PostJob: String,
//   Search: String,
//   Title: String,
//   Comp: String,
//   Latest: String,
//   Review: String,
//   GiveReviews: String,
//   Help: String,
//   Contact: String,
//   Careers: String,
//   Resources: String,
//   Blog: String,
//   AllCompanies: String,
//   QuickLinks: String,
//   AboutJoblinker: String,
//   Connect: String,
//   Login: String,
//   SignUp: String,
//   Rights: String,
//   Side: String,
//   Linker: String,
//   ASKME: String,
//   EmailAddress: String,
//   Password: String,
//   PasswordRequirement: String,
//   IAmA: String,
//   JobSeeker: String,
//   Recruiter: String,
//   DontHaveAccount: String,
//   ForgotPassword: String,
//   FullName: String,
//   PhoneNumber: String,
//   ProfilePicture: String,
//   ChooseFile: String,
//   NoFileChosen: String,
//   AlreadyHaveAccount: String,
//   TopJobs: String,
//   Rememberyourpassword: String,
//   Registeremail: String,
//   ResetLink: String,
//   Forgottext: String,
//   FilterJobs: String,
//   SearchResults: String,
//   Gateway: String,
//   MeetTeams: String,
//   ContactNew: String,
//   Message: String,
//   Submit: String,
//   ContactInformation: String,
//   ReviewNew: String,
//   OnlyReview: String,
//   SubmitReview: String,
//   YourReview: String,
//   CharactersLeft: String,
//   SelectCompany: String,
//   CompReview: String,
//   JobBlogs: String,
//   BlogJobs: String,
//   HelpCenter: String,
//   FAQ: String,
//   AA: String,
//   BB: String,
//   CC: String,
//   DD: String,
//   EE: String,
//   title: String,
//   introduction: String,
//   role: String,
//   descriptionk: String,
//   skills: String,
//   Bio: String,
//   UpdateProfile: String,
//   UploadResume: String,
//   ViewOnly: String,
//   ViewCurrentResume: String,
//   Resumek: String,
//   JobTitle: String,
//   Company: String,
//   AppliedDate: String,
//   Status: String,
//   AppliedJobs: String,
//   SavedJobs: String,
//   Titlek: String,
//   Location: String,
//   Salary: String,
//   Positions: String,
//   View: String,
//   Date: String,
//   Action: String,
//   Gobacktojobs: String,
//   ListUser: String,
//   Accepted: String,
//   Rejected: String,
//   CompanyName: String,
//   Role: String,
//   ListJo: String,
//   NewJob: String,
//   Edit: String,
//   Applications: String,
//   Filter: String,
//   ListRegister: String,
//   NewCompany: String,
//   Logo: String,
//   CompanySetup: String,
//   Update: String,
//   Delete: String,
//   Website: String,
//   Description: String,
//   Cancel: String,
//   Continue: String,
//   YourCompanyName: String,
//   CompComp: String,
//   Place: String,
//   Requirements: String,
//   JobType: String,
//   PostNewJob: String,
//   ExperienceLevel: String,
//   SalaryLPA: String,
//   RegisterReg: String,
//   Pls: String,


// });


// const Translation = mongoose.model("Translation", translationSchema);

// app.get("/translations", async (req, res) => {
//   const lang = req.query.lang || "en";
//   const translation = await Translation.findOne({ language: lang });
//   res.json(translation || {
//     welcome: "Find Your Dream Job With JobLinker", description: "Connect with top employers and discover opportunities that match your skills and aspirations. Your next career move starts here", Home: "Home", Jobs: "Jobs", Browse: "Browse", Companies: "Companies", About: "About", ViewProfile: "View Profile", Logout: "Logout", FindJobs: "Find Jobs", PostJob: "Post a Job", Search: "Search", Title: "Search by job title or skills", Comp: "10L+ top companies trust JobLinker for their hiring needs", Latest: "Latest & Top Job Openings", Review: "Company Reviews", Connect: "Connect With Us", Blog: "Blog", Help: "Help", Contact: "Contact", Careers: "Careers", Resources: "Resources", AllCompanies: "All Companies", QuickLinks: "Quick Links", AboutJoblinker: "About JobLinker", GiveReviews: "Give Reviews", Login: "Login", SignUp: "SignUp", Rights: "All rights reserved.", Side: "Connecting talented professionals with innovative companies worldwide.", Linker: "JobLinker", ASKME: "ASK ME", EmailAddress: "Email Address",
//     Password: "Password",
//     PostedBy: "Posted By",
//     PasswordRequirement: "Password must be at least 8 characters",
//     IAmA: "I am a",
//     Chat: "Chat",
//     Chats: "Chats",
//     Deletechat: "Delete Chat",
//     Sends: "Send",
//     Searchby: "Search by name or email",
//     Type: "Type a message",
//     JobSeeker: "Job Seeker",
//     Recruiter: "Recruiter",
//     DontHaveAccount: "Don't have an account?",
//     ForgotPassword: "Forgot Password?",
//     FullName: "Full Name",
//     PhoneNumber: "Phone Number",
//     ProfilePicture: "Profile Picture",
//     ChooseFile: "Choose File",
//     NoFileChosen: "No File Chosen",
//     AlreadyHaveAccount: "Already have an account?",
//     TopJobs: "Top High-Package Secured Jobs",
//     Rememberyourpassword: "Remember your password?",
//     Registeremail: "Enter your registered email",
//     ResetLink: "Send Reset Link",
//     FilterJobs: "Filter Jobs",
//     SearchResults: "Search Results",
//     Gateway: "Your Gateway to the Perfect Career",
//     MeetTeams: "Meet Teams",
//     Forgottext: "Enter your registered email address below to receive a password reset link.",
//     ContactNew: "For Contact give your information, We will contact you",
//     Message: "Message",
//     Submit: "Submit",
//     SimilarJobs: "Similar Jobs",
//     OnlyReview: "Review",
//     SubmitReview: "Rating",
//     SelectCompany: "Select Company",
//     CharactersLeft: "characters left",
//     ReviewNew: "Give reviews for a company",
//     ContactInformation: "TO CONTACT US EMAIL ON",
//     COmpReview: "Filter by Name",
//     JobBlogs: "Job Blogs",
//     BlogJobs: "Latest insights and articles on job trends, career advice, and industry news.",
//     HelpCenter: "HELP CENTER",
//     FAQ: "Frequently Asked Questions",
//     AA: "Like No Place You've Ever Worked",
//     BB: "Explore exciting career opportunities that match your skills and passion.",
//     CC: "Find Your Next Job",
//     DD: "Life at JobLinker",
//     EE: "Open Positions",
//     Bio: "Bio",
//     UpdateProfile: "Update Profile",
//     UploadResume: "Upload Resume (PDF)",
//     ViewOnly: "(View Only)",
//     ViewCurrentResume: "View Current Resume",
//     Resumek: "Resume",
//     JobTitle: "Job Title",
//     Company: "Company",
//     AppliedDate: "Applied Date",
//     Status: "Status",
//     AppliedJobs: "Applied Jobs",
//     SavedJobs: "Saved Jobs",
//     Titlek: "Title",
//     Location: "Location",
//     Salary: "Salary",
//     Positions: "No. of Positions",
//     View: "View",
//     Date: "Date",
//     Action: "Action",
//     Gobacktojobs: "Go back to jobs",
//     ListUser: "A list of your recent applied users",
//     Accepted: "Accepted",
//     Rejected: "Rejected",
//     CompanyName: "Company Name",
//     Role: "Role",
//     ListJo: "A list of your recently posted jobs",
//     NewJob: "New Job",
//     Edit: "Edit",
//     Applications: "Applications",
//     Filter: "Filter by Name, Role",
//     ListRegister: "A list of your recent registered companies",
//     NewCompany: "New Company",
//     Logo: "Logo",
//     CompanySetup: "Company Setup",
//     Update: "Update",
//     Delete: "Delete",
//     Website: "Website",
//     Description: "Description",
//     Cancel: "Cancel",
//     Continue: "Add Company",
//     YourCompanyName: "Your Company Name",
//     CompComp: "What would you like to give your company name? You can change this later.",
//     Place: "Google, Microsoft etc.",
//     Requirements: "Requirements",
//     JobType: "Job Type",
//     PostNewJob: "Post New Job",
//     ExperienceLevel: "Experience Level",
//     SalaryLPA: "Salary LPA",
//     RegisterReg: "*Please register a company first, before posting jobs.",
//     Pls: "*Please register a company first, before updating jobs.",


//   });
// });
// import resumeRoutes from './routes/resume.route.js'; // Adjust the path
// app.use('/api/v1/resume', resumeRoutes);




// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.API_KEY,
//   api_secret: process.env.API_SECRET,
// });
// // Error Handling Middleware
// const __filename = fileURLToPath(import.meta.url);
// const _dirname=path.resolve();
// const __dirname = path.dirname(__filename);
// const uploadsDir = path.join(__dirname, "uploads/");
// if (!fs.existsSync(uploadsDir)) {
//   fs.mkdirSync(uploadsDir, { recursive: true });

// } else {

// }

// // Configure multer for chat file uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, uploadsDir);
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + "-" + Math.random().toString(36).substring(2, 15);
//     const ext = path.extname(file.originalname);
//     cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
//   },
// });

// const fileFilter = (req, file, cb) => {
//   const allowedTypes = [
//     "image/jpeg",
//     "image/png",
//     "image/gif",
//     "application/pdf",
//     "application/msword", // .doc
//     "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
//     "application/vnd.ms-excel", // .xls
//     "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
//   ];
//   if (allowedTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error("Invalid file type. Only images, PDFs, and Word documents are allowed."));
//   }
// };

// const chatFileUpload = multer({
//   storage,
//   fileFilter,
//   limits: { fileSize: 10 * 1024 * 1024 },
// }).single("file");

// // Message Schema & Model
// // Clear cached model
// const messageSchema = new mongoose.Schema({
//   sender: String,
//   receiver: String,
//   text: String,
//   fileUrl: String, // Store only the file URL
//   timestamp: { type: Date, default: Date.now },
//   deletedBy: [{ type: String, default: [] }],
//   isRead: { type: Boolean, default: false },
// });
// const Message = mongoose.model("Message", messageSchema);

// // API Endpoints
// app.get("/api/unread-messages/:email", async (req, res) => {
//   const { email } = req.params;
//   try {
//     const unreadMessages = await Message.find({
//       receiver: email,
//       isRead: false,
//       deletedBy: { $ne: email },
//     }).sort("timestamp");
//     res.json(unreadMessages);
//   } catch (error) {
//     res.status(500).json({ error: "Server error" });
//   }
// });

// app.get("/messages/:user1/:user2", async (req, res) => {
//   const { user1, user2 } = req.params;
//   try {
//     const messages = await Message.find({
//       $or: [
//         { sender: user1, receiver: user2 },
//         { sender: user2, receiver: user1 },
//       ],
//       deletedBy: { $ne: user1 },
//     }).sort("timestamp");
//     res.json(messages);
//   } catch (error) {
//     res.status(500).json({ error: "Server error" });
//   }
// });

// app.post("/api/upload-chat-file", chatFileUpload, async (req, res) => {


//   if (!req.file) {
//     console.error("No file uploaded - multer failed to process the file");
//     return res.status(400).json({ message: "No file uploaded" });
//   }

//   try {


//     const fileUrl = `http://localhost:${PORT}/uploads/${req.file.filename}`;
   

//     const filePath = path.join(uploadsDir, req.file.filename);
//     if (fs.existsSync(filePath)) {
    
//     } else {
//       console.error(`File not found on disk at: ${filePath}`);
//     }

//     const response = {
//       filename: req.file.filename,
//       originalName: req.file.originalname,
//       type: req.file.mimetype,
//       url: fileUrl,
//     };
    
//     res.json(response);
//   } catch (error) {
//     console.error("Error in file upload endpoint:", error);
//     res.status(500).json({ message: "Failed to upload file", error: error.message });
//   }
// });
// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 100 * 1024 * 1024 }, // 100 MB limit
//   fileFilter: fileFilter,
// });

// // Initialize Gemini API
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// // Function to extract text from a file
// async function extractTextFromFile(filePath, mimetype) {
//   try {
//     if (mimetype === "application/pdf") {
//       // First, try to extract text using pdf-parse
    
//       const dataBuffer = await fsPromises.readFile(filePath);
//       const pdfData = await pdfParse(dataBuffer);
      

//       // If pdf-parse returns text, use it
//       if (pdfData.text && pdfData.text.trim().length > 0) {
//         return pdfData.text;
//       }

//       // If no text is extracted, assume the PDF is scanned and use OCR
   

//       // Convert PDF to images
//       const outputDir = path.join(path.dirname(filePath), "temp_images");
//       if (!fs.existsSync(outputDir)) {
//         fs.mkdirSync(outputDir, { recursive: true });
//       }

//       const options = {
//         density: 100,
//         format: "png",
//         outputDir: outputDir,
//         outputName: "page",
//       };

//       const convert = fromPath(filePath, options);
//       const images = await convert.bulk(-1, { responseType: "image" }); // Convert all pages to images
      

//       // Extract text from each image using Tesseract
//       let ocrText = "";
//       const tesseractConfig = {
//         lang: "eng",
//         oem: 1,
//         psm: 3,
//       };

//       for (let i = 0; i < images.length; i++) {
//         const imagePath = path.join(outputDir, `page-${i + 1}.png`);
//         try {
//           const text = await tesseract.recognize(imagePath, tesseractConfig);
//           ocrText += text + "\n";
//         } catch (ocrError) {
//           console.error(`Error during OCR for page ${i + 1}:`, ocrError.message);
//           ocrText += `\n[Error extracting text from page ${i + 1}]\n`;
//         }
//       }

//       // Clean up temporary images
//       try {
//         await fsPromises.rm(outputDir, { recursive: true, force: true });
        
//       } catch (cleanupError) {
//         console.error("Error cleaning up temporary images:", cleanupError.message);
//       }

      
//       return ocrText.trim();
//     } else if (
//       mimetype === "application/msword" ||
//       mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
//     ) {
      
//       const result = await mammoth.extractRawText({ path: filePath });
      
//       return result.value;
//     } else {
//       throw new Error("Unsupported file type for text extraction");
//     }
//   } catch (error) {
//     console.error("Error in extractTextFromFile:", error.message);
//     throw new Error(`Failed to extract text from file: ${error.message}`);
//   }
// }

// // Parse resume using Gemini API
// app.post("/api/parse-resume", upload.single("file"), async (req, res) => {
//   if (!req.file) {
//     console.error("No file uploaded in /api/parse-resume");
//     return res.status(400).json({ error: "No file uploaded" });
//   }

//   const filePath = req.file.path;
//   const fileName = req.file.originalname;
//   const mimetype = req.file.mimetype;

  

//   try {
//     // Check file size
//     const fileStats = fs.statSync(filePath);
//     const fileSizeMB = fileStats.size / (1024 * 1024);
    
//     if (fileSizeMB > 100) {
//       throw new Error("File size exceeds limit of 100 MB");
//     }

//     // Extract text from the file
//     const resumeText = await extractTextFromFile(filePath, mimetype);
    

//     // Clean the resume text
//     const cleanResumeText = resumeText
//       .replace(/[^\x20-\x7E\n]/g, "") // Remove non-printable ASCII characters
//       .replace(/\s+/g, " ") // Normalize whitespace
//       .trim();

//     // Prepare prompt for Gemini API
//     const prompt = `
//       Analyze the following resume text and output the result in JSON format with the following structure:
//       {
//         "skills": ["skill1", "skill2", ...],
//         "experience": [{"job_details": "Job Title - Company", "start_date": "YYYY-MM", "end_date": "YYYY-MM or Present"}],
//         "education": ["Degree - Institution", ...],
//         "suggestions": ["suggestion1", "suggestion2", ...]
//       }
//       Example:
//       {
//         "skills": ["JavaScript", "Python"],
//         "experience": [{"job_details": "Developer - ABC Corp", "start_date": "2020-01", "end_date": "2023-01"}],
//         "education": ["BSc Computer Science - XYZ University"],
//         "suggestions": ["Consider applying for Python developer roles"]
//       }
//       Return the result as a valid JSON string without any additional text, explanations, or markdown formatting (e.g., do not wrap the JSON in \`\`\`json markers or add comments).
//       Resume Text:
//       ${cleanResumeText}
//     `;

//     // Call Gemini API
    
//     const result = await model.generateContent(prompt);
//     const responseText = result.response.text();
   

//     // Process the response
//     let jsonString = responseText;
//     const jsonMatch = responseText.match(/{[\s\S]*}/);
//     if (jsonMatch) {
//       jsonString = jsonMatch[0];
//     } else {
//       throw new Error("Gemini API response does not contain valid JSON");
//     }

//     if (jsonString.startsWith("```json")) {
//       jsonString = jsonString.substring(7);
//     }
//     if (jsonString.endsWith("```")) {
//       jsonString = jsonString.slice(0, -3);
//     }
//     jsonString = jsonString.trim();
    

//     // Validate and parse the JSON
//     try {
//       const parsedData = JSON.parse(jsonString);
//       if (!parsedData.skills || !parsedData.experience || !parsedData.education || !parsedData.suggestions) {
//         throw new Error("Gemini API response does not match expected structure");
//       }

//       // Clean up the temporary file
//       await fsPromises.unlink(filePath);
      

//       res.json(parsedData);
//     } catch (parseError) {
//       console.error("JSON Parse Error:", parseError.message);
//       throw new Error(`Failed to parse Gemini API response as JSON: ${parseError.message}`);
//     }
//   } catch (error) {
//     console.error("Error parsing resume:", error.message);
//     try {
//       await fsPromises.unlink(filePath);
      
//     } catch (unlinkError) {
//       console.error("Error deleting temporary file:", unlinkError.message);
//     }
//     if (error.message.includes("File size")) {
//       res.status(413).json({ error: "File size exceeds the capacity limit. Please upload a file smaller than 100 MB." });
//     } else {
//       res.status(500).json({ error: error.message });
//     }
//   }
// });
// // Error Handling Middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ success: false, message: "Internal Server Error", error: err.message });
// });

// const io = new Server(server, {
//   cors: {
//     origin: ["http://localhost:5173", "https://hire-hub-chandan.vercel.app"],
//     methods: ["GET", "POST"],
//   },
// });

// app.use("/uploads", express.static("uploads"));

// // Connected users
// const connectedUsers = new Map();

// io.on("connection", (socket) => {


//   socket.on("register", (email) => {
//     connectedUsers.set(email, socket.id);
   
//   });

//   // socket.on("joinChat", ({ sender, receiver }) => {
//   //   const room = [sender, receiver].sort().join("_");
//   //   socket.join(room);

//   //   console.log("Joining chat with sender:", sender, "receiver:", receiver);
//   //   Message.find({
//   //     $or: [
//   //       { sender: sender, receiver: receiver },
//   //       { sender: receiver, receiver: sender },
//   //     ],
//   //     deletedBy: { $ne: sender },
//   //   })
//   //     .sort("timestamp")
//   //     .then(async (messages) => {
//   //       console.log(`Found ${messages.length} messages:`, messages);
//   //       await Message.updateMany(
//   //         { receiver: sender, sender: receiver, isRead: false },
//   //         { $set: { isRead: true } }
//   //       );
//   //       socket.emit("loadMessages", messages);
//   //     })
//   //     .catch((error) => console.error("Error fetching messages:", error));
//   // });
//   socket.on("joinChat", ({ sender, receiver }) => {
//     const room = [sender, receiver].sort().join("_");
//     socket.join(room);

//     // console.log("Joining chat with sender:", sender, "receiver:", receiver);
//     Message.find({
//         $or: [
//             { sender: sender, receiver: receiver },
//             { sender: receiver, receiver: sender },
//         ],
//         deletedBy: { $ne: sender }, // Exclude messages deleted by the sender
//     })
//         .sort("timestamp")
//         .then(async (messages) => {
//             // console.log(`Found ${messages.length} messages:`, messages);
//             await Message.updateMany(
//                 { receiver: sender, sender: receiver, isRead: false },
//                 { $set: { isRead: true } }
//             );
//             socket.emit("loadMessages", messages);
//         })
//         .catch((error) => console.error("Error fetching messages:", error));
// });
//   socket.on("sendMessage", async (msgData) => {
//     // console.log("Received sendMessage event:", msgData);

//     const fileUrl = msgData.file && msgData.file.url ? msgData.file.url : null;

//     if (!msgData.text && !fileUrl) {
//       console.error("Message has no text or fileUrl, discarding:", msgData);
//       return;
//     }

//     try {
//       // console.log("Message schema definition:", messageSchema.obj);
//       const newMessage = new Message({
//         sender: msgData.sender,
//         receiver: msgData.receiver,
//         text: msgData.text || "",
//         fileUrl: fileUrl,
//         isRead: false,
//         timestamp: new Date(msgData.timestamp),
//       });
//       // console.log("New message object before save:", newMessage.toObject());
//       await newMessage.save();
//       // console.log("Saved message to MongoDB:", newMessage);

//       const senderSocketId = connectedUsers.get(msgData.sender);
//       const receiverSocketId = connectedUsers.get(msgData.receiver);
//       // console.log("Sender socket ID:", senderSocketId, "Receiver socket ID:", receiverSocketId);

//       const messageToSend = {
//         _id: newMessage._id,
//         sender: msgData.sender,
//         receiver: msgData.receiver,
//         text: msgData.text || "",
//         file: msgData.file || null,
//         fileUrl: fileUrl,
//         timestamp: newMessage.timestamp,
//         isRead: false,
//       };

//       if (senderSocketId) {
//         io.to(senderSocketId).emit("message", { ...messageToSend, position: "right" });
//         // console.log("Emitted message to sender:", messageToSend);
//       } else {
//         console.warn("Sender not connected:", msgData.sender);
//       }
//       if (receiverSocketId) {
//         io.to(receiverSocketId).emit("message", { ...messageToSend, position: "left" });
//         io.to(receiverSocketId).emit("newMessageNotification", messageToSend);
//         // console.log("Emitted message to receiver:", messageToSend);
//       } else {
//         console.warn("Receiver not connected:", msgData.receiver);
//       }
//     } catch (error) {
//       console.error("Error saving message to MongoDB:", error);
//       console.error("Error stack:", error.stack);
//       const senderSocketId = connectedUsers.get(msgData.sender);
//       if (senderSocketId) {
//         io.to(senderSocketId).emit("messageError", { error: "Failed to send message" });
//       }
//     }
//   });

//   // socket.on("deleteChat", async ({ sender, receiver }) => {
//   //   const messages = await Message.find({
//   //     $or: [
//   //       { sender, receiver },
//   //       { sender: receiver, receiver: sender },
//   //     ],
//   //   });

//   //   for (const msg of messages) {
//   //     if (msg.fileUrl && !msg.fileUrl.includes("cloudinary")) {
//   //       const filename = msg.fileUrl.split("/").pop();
//   //       const filePath = path.join(uploadsDir, filename);
//   //       fs.unlink(filePath, (err) => {
//   //         if (err) console.error("Error deleting file:", err);
//   //       });
//   //     }
//   //   }

//   //   await Message.updateMany(
//   //     {
//   //       $or: [
//   //         { sender, receiver },
//   //         { sender: receiver, receiver: sender },
//   //       ],
//   //     },
//   //     { $addToSet: { deletedBy: sender } }
//   //   );

//   //   const senderSocketId = connectedUsers.get(sender);
//   //   if (senderSocketId) {
//   //     io.to(senderSocketId).emit("chatDeleted", { receiver });
//   //   }
//   // });
//   socket.on("deleteChat", async ({ sender, receiver }) => {
//     try {
//         // Mark messages as deleted for the sender
//         await Message.updateMany(
//             {
//                 $or: [
//                     { sender, receiver },
//                     { sender: receiver, receiver: sender },
//                 ],
//             },
//             { $addToSet: { deletedBy: sender } }
//         );

//         const senderSocketId = connectedUsers.get(sender);
//         if (senderSocketId) {
//             io.to(senderSocketId).emit("chatDeleted", { receiver });
//         }
//     } catch (error) {
//         console.error("Error deleting chat:", error);
//     }
// });
//   socket.on("disconnect", () => {
//     for (let [email, socketId] of connectedUsers.entries()) {
//       if (socketId === socket.id) {
//         connectedUsers.delete(email);
//         // console.log(`User ${email} disconnected`);
//         break;
//       }
//     }
//   });
// });

// app.use(express.static(path.join(_dirname, "/client/dist")));
// app.get("*", (_, res) => {
//   res.sendFile(path.resolve(_dirname, "client", "dist", "index.html"));
// })
// server.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}`);
// });

//import express from "express";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import connectDB from "./utils/db.js";
// import userRoute from "./routes/user.route.js";
// import companyRoute from "./routes/company.route.js";
// import jobRoute from "./routes/job.route.js";
// import applicationRoute from "./routes/application.route.js";
// import chatboatRoutes from "./routes/chatboatroutes.js";
// import contactRoutes from "./routes/contact.routes.js";
// import reviewRoutes from "./routes/review.routes.js";
// import http from "http";
// import { Server } from "socket.io";
// import fileRoutes from "./routes/fileRoutes.js";
// import multer from "multer";
// import path from "path";
// import { fileURLToPath } from "url";
// import fs from "fs";
// import cloudinary from "cloudinary";
// import fsPromises from "fs/promises";
// import pdfParse from "pdf-parse";
// import mammoth from "mammoth";
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import tesseract from "node-tesseract-ocr";
// import { fromPath } from "pdf2pic";

// dotenv.config();
// connectDB(); // Ensure DB is connected once

// const app = express();
// const server = http.createServer(app);
// const requiredEnvVars = ["GEMINI_API_KEY", "CLOUD_NAME", "API_KEY", "API_SECRET", "PORT"];
// for (const envVar of requiredEnvVars) {
//   if (!process.env[envVar]) {
//     throw new Error(`Missing required environment variable: ${envVar}`);
//   }
// }
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

// const corsOptions = {
//   origin: [ "https://joblinker-1.onrender.com"],
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true,
// };
// app.use(cors(corsOptions));

// const PORT = process.env.PORT || 8000;

// // API Routes
// app.use("/api/v1/user", userRoute);
// app.use("/api/v1/company", companyRoute);
// app.use("/api/v1/job", jobRoute);
// app.use("/api/v1/application", applicationRoute);
// app.use("/api/v1/chatboat", chatboatRoutes);
// app.use("/api/v1", contactRoutes);
// app.use("/api/v1", reviewRoutes);
// app.use("/api", fileRoutes);

// app.get('/api/jobs/get/:jobId', async (req, res) => {
//   try {
//     const job = await Job.findById(req.params.jobId).populate('createdBy', 'fullname email');
//     if (!job) return res.status(404).json({ success: false, message: 'Job not found' });
//     res.json({ success: true, job });
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Server error' });
//   }
// });

// app.get('/api/users/get/:userId', async (req, res) => {
//   try {
//     const user = await User.findById(req.params.userId).select('fullname email');
//     if (!user) return res.status(404).json({ success: false, message: 'User not found' });
//     res.json({ success: true, user });
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Server error' });
//   }
// });

// app.post('/api/jobs/post', async (req, res) => {
//   const { title, description, requirements, salary, location, jobType, experience, position, companyId, createdBy } = req.body;
//   const job = new Job({
//     title,
//     description,
//     requirements,
//     salary,
//     location,
//     jobType,
//     experience,
//     position,
//     companyId,
//     createdBy, // This should be the user ID from the authenticated user
//   });
//   await job.save();
//   res.json({ success: true, message: 'Job posted successfully', job });
// });

// // Translation Schema & API
// const translationSchema = new mongoose.Schema({
//   SimilarJobs: String,
//   language: String,
//   PostedBy: String,
//   welcome: String,
//   Chat: String,
//   Chats: String,
//   Deletechat: String,
//   Sends: String,
//   Searchby: String,
//   Type: String,
//   description: String,
//   Home: String,
//   Jobs: String,
//   Browse: String,
//   Companies: String,
//   About: String,
//   ViewProfile: String,
//   Logout: String,
//   FindJobs: String,
//   PostJob: String,
//   Search: String,
//   Title: String,
//   Comp: String,
//   Latest: String,
//   Review: String,
//   GiveReviews: String,
//   Help: String,
//   Contact: String,
//   Careers: String,
//   Resources: String,
//   Blog: String,
//   AllCompanies: String,
//   QuickLinks: String,
//   AboutJoblinker: String,
//   Connect: String,
//   Login: String,
//   SignUp: String,
//   Rights: String,
//   Side: String,
//   Linker: String,
//   ASKME: String,
//   EmailAddress: String,
//   Password: String,
//   PasswordRequirement: String,
//   IAmA: String,
//   JobSeeker: String,
//   Recruiter: String,
//   DontHaveAccount: String,
//   ForgotPassword: String,
//   FullName: String,
//   PhoneNumber: String,
//   ProfilePicture: String,
//   ChooseFile: String,
//   NoFileChosen: String,
//   AlreadyHaveAccount: String,
//   TopJobs: String,
//   Rememberyourpassword: String,
//   Registeremail: String,
//   ResetLink: String,
//   Forgottext: String,
//   FilterJobs: String,
//   SearchResults: String,
//   Gateway: String,
//   MeetTeams: String,
//   ContactNew: String,
//   Message: String,
//   Submit: String,
//   ContactInformation: String,
//   ReviewNew: String,
//   OnlyReview: String,
//   SubmitReview: String,
//   YourReview: String,
//   CharactersLeft: String,
//   SelectCompany: String,
//   CompReview: String,
//   JobBlogs: String,
//   BlogJobs: String,
//   HelpCenter: String,
//   FAQ: String,
//   AA: String,
//   BB: String,
//   CC: String,
//   DD: String,
//   EE: String,
//   title: String,
//   introduction: String,
//   role: String,
//   descriptionk: String,
//   skills: String,
//   Bio: String,
//   UpdateProfile: String,
//   UploadResume: String,
//   ViewOnly: String,
//   ViewCurrentResume: String,
//   Resumek: String,
//   JobTitle: String,
//   Company: String,
//   AppliedDate: String,
//   Status: String,
//   AppliedJobs: String,
//   SavedJobs: String,
//   Titlek: String,
//   Location: String,
//   Salary: String,
//   Positions: String,
//   View: String,
//   Date: String,
//   Action: String,
//   Gobacktojobs: String,
//   ListUser: String,
//   Accepted: String,
//   Rejected: String,
//   CompanyName: String,
//   Role: String,
//   ListJo: String,
//   NewJob: String,
//   Edit: String,
//   Applications: String,
//   Filter: String,
//   ListRegister: String,
//   NewCompany: String,
//   Logo: String,
//   CompanySetup: String,
//   Update: String,
//   Delete: String,
//   Website: String,
//   Description: String,
//   Cancel: String,
//   Continue: String,
//   YourCompanyName: String,
//   CompComp: String,
//   Place: String,
//   Requirements: String,
//   JobType: String,
//   PostNewJob: String,
//   ExperienceLevel: String,
//   SalaryLPA: String,
//   RegisterReg: String,
//   Pls: String,
// });

// const Translation = mongoose.model("Translation", translationSchema);

// app.get("/translations", async (req, res) => {
//   const lang = req.query.lang || "en";
//   const translation = await Translation.findOne({ language: lang });
//   res.json(translation || {
//     welcome: "Find Your Dream Job With JobLinker",
//     description: "Connect with top employers and discover opportunities that match your skills and aspirations. Your next career move starts here",
//     Home: "Home",
//     Jobs: "Jobs",
//     Browse: "Browse",
//     Companies: "Companies",
//     About: "About",
//     ViewProfile: "View Profile",
//     Logout: "Logout",
//     FindJobs: "Find Jobs",
//     PostJob: "Post a Job",
//     Search: "Search",
//     Title: "Search by job title or skills",
//     Comp: "10L+ top companies trust JobLinker for their hiring needs",
//     Latest: "Latest & Top Job Openings",
//     Review: "Company Reviews",
//     Connect: "Connect With Us",
//     Blog: "Blog",
//     Help: "Help",
//     Contact: "Contact",
//     Careers: "Careers",
//     Resources: "Resources",
//     AllCompanies: "All Companies",
//     QuickLinks: "Quick Links",
//     AboutJoblinker: "About JobLinker",
//     GiveReviews: "Give Reviews",
//     Login: "Login",
//     SignUp: "SignUp",
//     Rights: "All rights reserved.",
//     Side: "Connecting talented professionals with innovative companies worldwide.",
//     Linker: "JobLinker",
//     ASKME: "ASK ME",
//     EmailAddress: "Email Address",
//     Password: "Password",
//     PostedBy: "Posted By",
//     PasswordRequirement: "Password must be at least 8 characters",
//     IAmA: "I am a",
//     Chat: "Chat",
//     Chats: "Chats",
//     Deletechat: "Delete Chat",
//     Sends: "Send",
//     Searchby: "Search by name or email",
//     Type: "Type a message",
//     JobSeeker: "Job Seeker",
//     Recruiter: "Recruiter",
//     DontHaveAccount: "Don't have an account?",
//     ForgotPassword: "Forgot Password?",
//     FullName: "Full Name",
//     PhoneNumber: "Phone Number",
//     ProfilePicture: "Profile Picture",
//     ChooseFile: "Choose File",
//     NoFileChosen: "No File Chosen",
//     AlreadyHaveAccount: "Already have an account?",
//     TopJobs: "Top High-Package Secured Jobs",
//     Rememberyourpassword: "Remember your password?",
//     Registeremail: "Enter your registered email",
//     ResetLink: "Send Reset Link",
//     FilterJobs: "Filter Jobs",
//     SearchResults: "Search Results",
//     Gateway: "Your Gateway to the Perfect Career",
//     MeetTeams: "Meet Teams",
//     Forgottext: "Enter your registered email address below to receive a password reset link.",
//     ContactNew: "For Contact give your information, We will contact you",
//     Message: "Message",
//     Submit: "Submit",
//     SimilarJobs: "Similar Jobs",
//     OnlyReview: "Review",
//     SubmitReview: "Rating",
//     SelectCompany: "Select Company",
//     CharactersLeft: "characters left",
//     ReviewNew: "Give reviews for a company",
//     ContactInformation: "TO CONTACT US EMAIL ON",
//     COmpReview: "Filter by Name",
//     JobBlogs: "Job Blogs",
//     BlogJobs: "Latest insights and articles on job trends, career advice, and industry news.",
//     HelpCenter: "HELP CENTER",
//     FAQ: "Frequently Asked Questions",
//     AA: "Like No Place You've Ever Worked",
//     BB: "Explore exciting career opportunities that match your skills and passion.",
//     CC: "Find Your Next Job",
//     DD: "Life at JobLinker",
//     EE: "Open Positions",
//     Bio: "Bio",
//     UpdateProfile: "Update Profile",
//     UploadResume: "Upload Resume (PDF)",
//     ViewOnly: "(View Only)",
//     ViewCurrentResume: "View Current Resume",
//     Resumek: "Resume",
//     JobTitle: "Job Title",
//     Company: "Company",
//     AppliedDate: "Applied Date",
//     Status: "Status",
//     AppliedJobs: "Applied Jobs",
//     SavedJobs: "Saved Jobs",
//     Titlek: "Title",
//     Location: "Location",
//     Salary: "Salary",
//     Positions: "No. of Positions",
//     View: "View",
//     Date: "Date",
//     Action: "Action",
//     Gobacktojobs: "Go back to jobs",
//     ListUser: "A list of your recent applied users",
//     Accepted: "Accepted",
//     Rejected: "Rejected",
//     CompanyName: "Company Name",
//     Role: "Role",
//     ListJo: "A list of your recently posted jobs",
//     NewJob: "New Job",
//     Edit: "Edit",
//     Applications: "Applications",
//     Filter: "Filter by Name, Role",
//     ListRegister: "A list of your recent registered companies",
//     NewCompany: "New Company",
//     Logo: "Logo",
//     CompanySetup: "Company Setup",
//     Update: "Update",
//     Delete: "Delete",
//     Website: "Website",
//     Description: "Description",
//     Cancel: "Cancel",
//     Continue: "Add Company",
//     YourCompanyName: "Your Company Name",
//     CompComp: "What would you like to give your company name? You can change this later.",
//     Place: "Google, Microsoft etc.",
//     Requirements: "Requirements",
//     JobType: "Job Type",
//     PostNewJob: "Post New Job",
//     ExperienceLevel: "Experience Level",
//     SalaryLPA: "Salary LPA",
//     RegisterReg: "*Please register a company first, before posting jobs.",
//     Pls: "*Please register a company first, before updating jobs.",
//   });
// });

// import resumeRoutes from './routes/resume.route.js'; // Adjust the path
// app.use('/api/v1/resume', resumeRoutes);

// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.API_KEY,
//   api_secret: process.env.API_SECRET,
// });

// // File System Setup
// const __filename = fileURLToPath(import.meta.url);
// // const _dirname = path.dirname(__filename);
// const _dirname=path.resolve();
// const uploadsDir = path.join(_dirname, "uploads/");
// if (!fs.existsSync(uploadsDir)) {
//   fs.mkdirSync(uploadsDir, { recursive: true });
// }
// app.use("/assets", express.static("/src/assets"));

// // Configure multer for chat file uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, uploadsDir);
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + "-" + Math.random().toString(36).substring(2, 15);
//     const ext = path.extname(file.originalname);
//     cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
//   },
// });

// const fileFilter = (req, file, cb) => {
//   const allowedTypes = [
//     "image/jpeg",
//     "image/png",
//     "image/gif",
//     "application/pdf",
//     "application/msword", // .doc
//     "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
//     "application/vnd.ms-excel", // .xls
//     "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
//   ];
//   if (allowedTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error("Invalid file type. Only images, PDFs, Word, and Excel documents are allowed."));
//   }
// };

// const chatFileUpload = multer({
//   storage,
//   fileFilter,
//   limits: { fileSize: 10 * 1024 * 1024 },
// }).single("file");

// // Message Schema & Model
// const messageSchema = new mongoose.Schema({
//   sender: String,
//   receiver: String,
//   text: String,
//   fileUrl: String, // Store only the file URL
//   timestamp: { type: Date, default: Date.now },
//   deletedBy: [{ type: String, default: [] }],
//   isRead: { type: Boolean, default: false },
// });
// const Message = mongoose.model("Message", messageSchema);

// // API Endpoints
// app.get("/api/unread-messages/:email", async (req, res) => {
//   const { email } = req.params;
//   try {
//     const unreadMessages = await Message.find({
//       receiver: email,
//       isRead: false,
//       deletedBy: { $ne: email },
//     }).sort("timestamp");
//     res.json(unreadMessages);
//   } catch (error) {
//     res.status(500).json({ error: "Server error" });
//   }
// });

// app.get("/messages/:user1/:user2", async (req, res) => {
//   const { user1, user2 } = req.params;
//   try {
//     const messages = await Message.find({
//       $or: [
//         { sender: user1, receiver: user2 },
//         { sender: user2, receiver: user1 },
//       ],
//       deletedBy: { $ne: user1 },
//     }).sort("timestamp");
//     res.json(messages);
//   } catch (error) {
//     res.status(500).json({ error: "Server error" });
//   }
// });

// app.post("/api/upload-chat-file", chatFileUpload, async (req, res) => {
//   if (!req.file) {
//     console.error("No file uploaded - multer failed to process the file");
//     return res.status(400).json({ message: "No file uploaded" });
//   }

//   try {
//     // const fileUrl = `http://localhost:${PORT}/uploads/${req.file.filename}`;
//     const fileUrl = `https://joblinker-1.onrender.com/uploads/${req.file.filename}`;
//     const filePath = path.join(uploadsDir, req.file.filename);
//     if (fs.existsSync(filePath)) {
//       // File exists
//     } else {
//       console.error(`File not found on disk at: ${filePath}`);
//     }

//     const response = {
//       filename: req.file.filename,
//       originalName: req.file.originalname,
//       type: req.file.mimetype,
//       url: fileUrl,
//     };
//     res.json(response);
//   } catch (error) {
//     console.error("Error in file upload endpoint:", error);
//     res.status(500).json({ message: "Failed to upload file", error: error.message });
//   }
// });

// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 100 * 1024 * 1024 }, // 100 MB limit
//   fileFilter: fileFilter,
// });

// // Initialize Gemini API
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// // Function to extract text from a file
// async function extractTextFromFile(filePath, mimetype) {
//   try {
//     if (mimetype === "application/pdf") {
//       const dataBuffer = await fsPromises.readFile(filePath);
//       const pdfData = await pdfParse(dataBuffer);

//       if (pdfData.text && pdfData.text.trim().length > 0) {
//         return pdfData.text;
//       }

//       const outputDir = path.join(path.dirname(filePath), "temp_images");
//       if (!fs.existsSync(outputDir)) {
//         fs.mkdirSync(outputDir, { recursive: true });
//       }

//       const options = {
//         density: 100,
//         format: "png",
//         outputDir: outputDir,
//         outputName: "page",
//       };

//       const convert = fromPath(filePath, options);
//       const images = await convert.bulk(-1, { responseType: "image" });

//       let ocrText = "";
//       const tesseractConfig = {
//         lang: "eng",
//         oem: 1,
//         psm: 3,
//       };

//       for (let i = 0; i < images.length; i++) {
//         const imagePath = path.join(outputDir, `page-${i + 1}.png`);
//         try {
//           const text = await tesseract.recognize(imagePath, tesseractConfig);
//           ocrText += text + "\n";
//         } catch (ocrError) {
//           console.error(`Error during OCR for page ${i + 1}:`, ocrError.message);
//           ocrText += `\n[Error extracting text from page ${i + 1}]\n`;
//         }
//       }

//       try {
//         await fsPromises.rm(outputDir, { recursive: true, force: true });
//       } catch (cleanupError) {
//         console.error("Error cleaning up temporary images:", cleanupError.message);
//       }

//       return ocrText.trim();
//     } else if (
//       mimetype === "application/msword" ||
//       mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
//     ) {
//       const result = await mammoth.extractRawText({ path: filePath });
//       return result.value;
//     } else {
//       throw new Error("Unsupported file type for text extraction");
//     }
//   } catch (error) {
//     console.error("Error in extractTextFromFile:", error.message);
//     throw new Error(`Failed to extract text from file: ${error.message}`);
//   }
// }

// // Parse resume using Gemini API
// app.post("/api/parse-resume", upload.single("file"), async (req, res) => {
//   if (!req.file) {
//     console.error("No file uploaded in /api/parse-resume");
//     return res.status(400).json({ error: "No file uploaded" });
//   }

//   const filePath = req.file.path;
//   const fileName = req.file.originalname;
//   const mimetype = req.file.mimetype;

//   try {
//     const fileStats = fs.statSync(filePath);
//     const fileSizeMB = fileStats.size / (1024 * 1024);
//     if (fileSizeMB > 100) {
//       throw new Error("File size exceeds limit of 100 MB");
//     }

//     const resumeText = await extractTextFromFile(filePath, mimetype);
//     const cleanResumeText = resumeText
//       .replace(/[^\x20-\x7E\n]/g, "")
//       .replace(/\s+/g, " ")
//       .trim();

//     const prompt = `
//       Analyze the following resume text and output the result in JSON format with the following structure:
//       {
//         "skills": ["skill1", "skill2", ...],
//         "experience": [{"job_details": "Job Title - Company", "start_date": "YYYY-MM", "end_date": "YYYY-MM or Present"}],
//         "education": ["Degree - Institution", ...],
//         "suggestions": ["suggestion1", "suggestion2", ...]
//       }
//       Example:
//       {
//         "skills": ["JavaScript", "Python"],
//         "experience": [{"job_details": "Developer - ABC Corp", "start_date": "2020-01", "end_date": "2023-01"}],
//         "education": ["BSc Computer Science - XYZ University"],
//         "suggestions": ["Consider applying for Python developer roles"]
//       }
//       Return the result as a valid JSON string without any additional text, explanations, or markdown formatting (e.g., do not wrap the JSON in \`\`\`json markers or add comments).
//       Resume Text:
//       ${cleanResumeText}
//     `;

//     const result = await model.generateContent(prompt);
//     const responseText = result.response.text();

//     let jsonString = responseText;
//     const jsonMatch = responseText.match(/{[\s\S]*}/);
//     if (jsonMatch) {
//       jsonString = jsonMatch[0];
//     } else {
//       throw new Error("Gemini API response does not contain valid JSON");
//     }

//     if (jsonString.startsWith("```json")) {
//       jsonString = jsonString.substring(7);
//     }
//     if (jsonString.endsWith("```")) {
//       jsonString = jsonString.slice(0, -3);
//     }
//     jsonString = jsonString.trim();

//     try {
//       const parsedData = JSON.parse(jsonString);
//       if (!parsedData.skills || !parsedData.experience || !parsedData.education || !parsedData.suggestions) {
//         throw new Error("Gemini API response does not match expected structure");
//       }

//       await fsPromises.unlink(filePath);
//       res.json(parsedData);
//     } catch (parseError) {
//       console.error("JSON Parse Error:", parseError.message);
//       throw new Error(`Failed to parse Gemini API response as JSON: ${parseError.message}`);
//     }
//   } catch (error) {
//     console.error("Error parsing resume:", error.message);
//     try {
//       await fsPromises.unlink(filePath);
//     } catch (unlinkError) {
//       console.error("Error deleting temporary file:", unlinkError.message);
//     }
//     if (error.message.includes("File size")) {
//       res.status(413).json({ error: "File size exceeds the capacity limit. Please upload a file smaller than 100 MB." });
//     } else {
//       res.status(500).json({ error: error.message });
//     }
//   }
// });

// // Error Handling Middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ success: false, message: "Internal Server Error", error: err.message });
// });

// const io = new Server(server, {
//   cors: {
//     origin: ["https://joblinker-1.onrender.com"],
//     methods: ["GET", "POST"],
//   },
// });

// app.use("/uploads", express.static("uploads"));

// // Connected users
// const connectedUsers = new Map();

// io.on("connection", (socket) => {
//   socket.on("register", (email) => {
//     connectedUsers.set(email, socket.id);
//   });

//   socket.on("joinChat", ({ sender, receiver }) => {
//     const room = [sender, receiver].sort().join("_");
//     socket.join(room);

//     Message.find({
//       $or: [
//         { sender: sender, receiver: receiver },
//         { sender: receiver, receiver: sender },
//       ],
//       deletedBy: { $ne: sender },
//     })
//       .sort("timestamp")
//       .then(async (messages) => {
//         await Message.updateMany(
//           { receiver: sender, sender: receiver, isRead: false },
//           { $set: { isRead: true } }
//         );
//         socket.emit("loadMessages", messages);
//       })
//       .catch((error) => console.error("Error fetching messages:", error));
//   });

//   socket.on("sendMessage", async (msgData) => {
//     const fileUrl = msgData.file && msgData.file.url ? msgData.file.url : null;

//     if (!msgData.text && !fileUrl) {
//       console.error("Message has no text or fileUrl, discarding:", msgData);
//       return;
//     }

//     try {
//       const newMessage = new Message({
//         sender: msgData.sender,
//         receiver: msgData.receiver,
//         text: msgData.text || "",
//         fileUrl: fileUrl,
//         isRead: false,
//         timestamp: new Date(msgData.timestamp),
//       });
//       await newMessage.save();

//       const senderSocketId = connectedUsers.get(msgData.sender);
//       const receiverSocketId = connectedUsers.get(msgData.receiver);

//       const messageToSend = {
//         _id: newMessage._id,
//         sender: msgData.sender,
//         receiver: msgData.receiver,
//         text: msgData.text || "",
//         file: msgData.file || null,
//         fileUrl: fileUrl,
//         timestamp: newMessage.timestamp,
//         isRead: false,
//       };

//       if (senderSocketId) {
//         io.to(senderSocketId).emit("message", { ...messageToSend, position: "right" });
//       } else {
//         console.warn("Sender not connected:", msgData.sender);
//       }
//       if (receiverSocketId) {
//         io.to(receiverSocketId).emit("message", { ...messageToSend, position: "left" });
//         io.to(receiverSocketId).emit("newMessageNotification", messageToSend);
//       } else {
//         console.warn("Receiver not connected:", msgData.receiver);
//       }
//     } catch (error) {
//       console.error("Error saving message to MongoDB:", error);
//       console.error("Error stack:", error.stack);
//       const senderSocketId = connectedUsers.get(msgData.sender);
//       if (senderSocketId) {
//         io.to(senderSocketId).emit("messageError", { error: "Failed to send message" });
//       }
//     }
//   });

//   socket.on("deleteChat", async ({ sender, receiver }) => {
//     try {
//       await Message.updateMany(
//         {
//           $or: [
//             { sender, receiver },
//             { sender: receiver, receiver: sender },
//           ],
//         },
//         { $addToSet: { deletedBy: sender } }
//       );

//       const senderSocketId = connectedUsers.get(sender);
//       if (senderSocketId) {
//         io.to(senderSocketId).emit("chatDeleted", { receiver });
//       }
//     } catch (error) {
//       console.error("Error deleting chat:", error);
//     }
//   });

//   socket.on("disconnect", () => {
//     for (let [email, socketId] of connectedUsers.entries()) {
//       if (socketId === socket.id) {
//         connectedUsers.delete(email);
//         break;
//       }
//     }
//   });
// });

// // Serve static files and handle client-side routing
// app.use(express.static(path.join(_dirname, "client", "dist")));
// app.get("*", (_req, res) => {
//   res.sendFile(path.join(_dirname, "client", "dist", "index.html"));
// });
// // // app.get("/", (req, res) => {
// // //   res.send("Server is running and database connected successfully!");
// // // });

// server.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}`);
// });

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import chatboatRoutes from "./routes/chatboatroutes.js";
import contactRoutes from "./routes/contact.routes.js";
import reviewRoutes from "./routes/review.routes.js";
import http from "http";
import { Server } from "socket.io";
import fileRoutes from "./routes/fileRoutes.js";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import cloudinary from "cloudinary";
import fsPromises from "fs/promises";
import pdfParse from "pdf-parse";
import mammoth from "mammoth";
import { GoogleGenerativeAI } from "@google/generative-ai";
import tesseract from "node-tesseract-ocr";
import { fromPath } from "pdf2pic";

dotenv.config();
connectDB(); // Ensure DB is connected once

const app = express();
const server = http.createServer(app);
const requiredEnvVars = ["GEMINI_API_KEY", "CLOUD_NAME", "API_KEY", "API_SECRET", "PORT"];
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: [ "https://joblinker-1.onrender.com"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};
app.use(cors(corsOptions));

const PORT = process.env.PORT || 8000;

// API Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);
app.use("/api/v1/chatboat", chatboatRoutes);
app.use("/api/v1", contactRoutes);
app.use("/api/v1", reviewRoutes);
app.use("/api", fileRoutes);

app.get('/api/jobs/get/:jobId', async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId).populate('createdBy', 'fullname email');
    if (!job) return res.status(404).json({ success: false, message: 'Job not found' });
    res.json({ success: true, job });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.get('/api/users/get/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('fullname email');
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.post('/api/jobs/post', async (req, res) => {
  const { title, description, requirements, salary, location, jobType, experience, position, companyId, createdBy } = req.body;
  const job = new Job({
    title,
    description,
    requirements,
    salary,
    location,
    jobType,
    experience,
    position,
    companyId,
    createdBy, // This should be the user ID from the authenticated user
  });
  await job.save();
  res.json({ success: true, message: 'Job posted successfully', job });
});

// Translation Schema & API
const translationSchema = new mongoose.Schema({
  SimilarJobs: String,
  language: String,
  PostedBy: String,
  welcome: String,
  Chat: String,
  Chats: String,
  Deletechat: String,
  Sends: String,
  Searchby: String,
  Type: String,
  description: String,
  Home: String,
  Jobs: String,
  Browse: String,
  Companies: String,
  About: String,
  ViewProfile: String,
  Logout: String,
  FindJobs: String,
  PostJob: String,
  Search: String,
  Title: String,
  Comp: String,
  Latest: String,
  Review: String,
  GiveReviews: String,
  Help: String,
  Contact: String,
  Careers: String,
  Resources: String,
  Blog: String,
  AllCompanies: String,
  QuickLinks: String,
  AboutJoblinker: String,
  Connect: String,
  Login: String,
  SignUp: String,
  Rights: String,
  Side: String,
  Linker: String,
  ASKME: String,
  EmailAddress: String,
  Password: String,
  PasswordRequirement: String,
  IAmA: String,
  JobSeeker: String,
  Recruiter: String,
  DontHaveAccount: String,
  ForgotPassword: String,
  FullName: String,
  PhoneNumber: String,
  ProfilePicture: String,
  ChooseFile: String,
  NoFileChosen: String,
  AlreadyHaveAccount: String,
  TopJobs: String,
  Rememberyourpassword: String,
  Registeremail: String,
  ResetLink: String,
  Forgottext: String,
  FilterJobs: String,
  SearchResults: String,
  Gateway: String,
  MeetTeams: String,
  ContactNew: String,
  Message: String,
  Submit: String,
  ContactInformation: String,
  ReviewNew: String,
  OnlyReview: String,
  SubmitReview: String,
  YourReview: String,
  CharactersLeft: String,
  SelectCompany: String,
  CompReview: String,
  JobBlogs: String,
  BlogJobs: String,
  HelpCenter: String,
  FAQ: String,
  AA: String,
  BB: String,
  CC: String,
  DD: String,
  EE: String,
  title: String,
  introduction: String,
  role: String,
  descriptionk: String,
  skills: String,
  Bio: String,
  UpdateProfile: String,
  UploadResume: String,
  ViewOnly: String,
  ViewCurrentResume: String,
  Resumek: String,
  JobTitle: String,
  Company: String,
  AppliedDate: String,
  Status: String,
  AppliedJobs: String,
  SavedJobs: String,
  Titlek: String,
  Location: String,
  Salary: String,
  Positions: String,
  View: String,
  Date: String,
  Action: String,
  Gobacktojobs: String,
  ListUser: String,
  Accepted: String,
  Rejected: String,
  CompanyName: String,
  Role: String,
  ListJo: String,
  NewJob: String,
  Edit: String,
  Applications: String,
  Filter: String,
  ListRegister: String,
  NewCompany: String,
  Logo: String,
  CompanySetup: String,
  Update: String,
  Delete: String,
  Website: String,
  Description: String,
  Cancel: String,
  Continue: String,
  YourCompanyName: String,
  CompComp: String,
  Place: String,
  Requirements: String,
  JobType: String,
  PostNewJob: String,
  ExperienceLevel: String,
  SalaryLPA: String,
  RegisterReg: String,
  Pls: String,
});

const Translation = mongoose.model("Translation", translationSchema);

app.get("/translations", async (req, res) => {
  const lang = req.query.lang || "en";
  const translation = await Translation.findOne({ language: lang });
  res.json(translation || {
    welcome: "Find Your Dream Job With JobLinker",
    description: "Connect with top employers and discover opportunities that match your skills and aspirations. Your next career move starts here",
    Home: "Home",
    Jobs: "Jobs",
    Browse: "Browse",
    Companies: "Companies",
    About: "About",
    ViewProfile: "View Profile",
    Logout: "Logout",
    FindJobs: "Find Jobs",
    PostJob: "Post a Job",
    Search: "Search",
    Title: "Search by job title or skills",
    Comp: "10L+ top companies trust JobLinker for their hiring needs",
    Latest: "Latest & Top Job Openings",
    Review: "Company Reviews",
    Connect: "Connect With Us",
    Blog: "Blog",
    Help: "Help",
    Contact: "Contact",
    Careers: "Careers",
    Resources: "Resources",
    AllCompanies: "All Companies",
    QuickLinks: "Quick Links",
    AboutJoblinker: "About JobLinker",
    GiveReviews: "Give Reviews",
    Login: "Login",
    SignUp: "SignUp",
    Rights: "All rights reserved.",
    Side: "Connecting talented professionals with innovative companies worldwide.",
    Linker: "JobLinker",
    ASKME: "ASK ME",
    EmailAddress: "Email Address",
    Password: "Password",
    PostedBy: "Posted By",
    PasswordRequirement: "Password must be at least 8 characters",
    IAmA: "I am a",
    Chat: "Chat",
    Chats: "Chats",
    Deletechat: "Delete Chat",
    Sends: "Send",
    Searchby: "Search by name or email",
    Type: "Type a message",
    JobSeeker: "Job Seeker",
    Recruiter: "Recruiter",
    DontHaveAccount: "Don't have an account?",
    ForgotPassword: "Forgot Password?",
    FullName: "Full Name",
    PhoneNumber: "Phone Number",
    ProfilePicture: "Profile Picture",
    ChooseFile: "Choose File",
    NoFileChosen: "No File Chosen",
    AlreadyHaveAccount: "Already have an account?",
    TopJobs: "Top High-Package Secured Jobs",
    Rememberyourpassword: "Remember your password?",
    Registeremail: "Enter your registered email",
    ResetLink: "Send Reset Link",
    FilterJobs: "Filter Jobs",
    SearchResults: "Search Results",
    Gateway: "Your Gateway to the Perfect Career",
    MeetTeams: "Meet Teams",
    Forgottext: "Enter your registered email address below to receive a password reset link.",
    ContactNew: "For Contact give your information, We will contact you",
    Message: "Message",
    Submit: "Submit",
    SimilarJobs: "Similar Jobs",
    OnlyReview: "Review",
    SubmitReview: "Rating",
    SelectCompany: "Select Company",
    CharactersLeft: "characters left",
    ReviewNew: "Give reviews for a company",
    ContactInformation: "TO CONTACT US EMAIL ON",
    COmpReview: "Filter by Name",
    JobBlogs: "Job Blogs",
    BlogJobs: "Latest insights and articles on job trends, career advice, and industry news.",
    HelpCenter: "HELP CENTER",
    FAQ: "Frequently Asked Questions",
    AA: "Like No Place You've Ever Worked",
    BB: "Explore exciting career opportunities that match your skills and passion.",
    CC: "Find Your Next Job",
    DD: "Life at JobLinker",
    EE: "Open Positions",
    Bio: "Bio",
    UpdateProfile: "Update Profile",
    UploadResume: "Upload Resume (PDF)",
    ViewOnly: "(View Only)",
    ViewCurrentResume: "View Current Resume",
    Resumek: "Resume",
    JobTitle: "Job Title",
    Company: "Company",
    AppliedDate: "Applied Date",
    Status: "Status",
    AppliedJobs: "Applied Jobs",
    SavedJobs: "Saved Jobs",
    Titlek: "Title",
    Location: "Location",
    Salary: "Salary",
    Positions: "No. of Positions",
    View: "View",
    Date: "Date",
    Action: "Action",
    Gobacktojobs: "Go back to jobs",
    ListUser: "A list of your recent applied users",
    Accepted: "Accepted",
    Rejected: "Rejected",
    CompanyName: "Company Name",
    Role: "Role",
    ListJo: "A list of your recently posted jobs",
    NewJob: "New Job",
    Edit: "Edit",
    Applications: "Applications",
    Filter: "Filter by Name, Role",
    ListRegister: "A list of your recent registered companies",
    NewCompany: "New Company",
    Logo: "Logo",
    CompanySetup: "Company Setup",
    Update: "Update",
    Delete: "Delete",
    Website: "Website",
    Description: "Description",
    Cancel: "Cancel",
    Continue: "Add Company",
    YourCompanyName: "Your Company Name",
    CompComp: "What would you like to give your company name? You can change this later.",
    Place: "Google, Microsoft etc.",
    Requirements: "Requirements",
    JobType: "Job Type",
    PostNewJob: "Post New Job",
    ExperienceLevel: "Experience Level",
    SalaryLPA: "Salary LPA",
    RegisterReg: "*Please register a company first, before posting jobs.",
    Pls: "*Please register a company first, before updating jobs.",
  });
});

import resumeRoutes from './routes/resume.route.js'; // Adjust the path
app.use('/api/v1/resume', resumeRoutes);

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// File System Setup
// const __filename = fileURLToPath(import.meta.url);
// const _dirname = path.dirname(__filename);
// const _dirname=path.resolve();
// const uploadsDir = path.join(_dirname, "uploads/");
// if (!fs.existsSync(uploadsDir)) {
//   fs.mkdirSync(uploadsDir, { recursive: true });
// }

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, "uploads/");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}


// Configure multer for chat file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.random().toString(36).substring(2, 15);
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "application/pdf",
    "application/msword", // .doc
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
    "application/vnd.ms-excel", // .xls
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  ];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only images, PDFs, Word, and Excel documents are allowed."));
  }
};

const chatFileUpload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 },
}).single("file");

// Message Schema & Model
const messageSchema = new mongoose.Schema({
  sender: String,
  receiver: String,
  text: String,
  fileUrl: String, // Store only the file URL
  timestamp: { type: Date, default: Date.now },
  deletedBy: [{ type: String, default: [] }],
  isRead: { type: Boolean, default: false },
});
const Message = mongoose.model("Message", messageSchema);

// API Endpoints
app.get("/api/unread-messages/:email", async (req, res) => {
  const { email } = req.params;
  try {
    const unreadMessages = await Message.find({
      receiver: email,
      isRead: false,
      deletedBy: { $ne: email },
    }).sort("timestamp");
    res.json(unreadMessages);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/messages/:user1/:user2", async (req, res) => {
  const { user1, user2 } = req.params;
  try {
    const messages = await Message.find({
      $or: [
        { sender: user1, receiver: user2 },
        { sender: user2, receiver: user1 },
      ],
      deletedBy: { $ne: user1 },
    }).sort("timestamp");
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/api/upload-chat-file", chatFileUpload, async (req, res) => {
  if (!req.file) {
    console.error("No file uploaded - multer failed to process the file");
    return res.status(400).json({ message: "No file uploaded" });
  }

  try {
    // Upload file to Cloudinary
    const result = await cloudinary.v2.uploader.upload(req.file.path, {
      folder: "chat_files",
      resource_type: "auto",
    });

    // Delete the local file after uploading to Cloudinary
    await fsPromises.unlink(req.file.path);

    const fileUrl = result.secure_url;

    const response = {
      filename: req.file.filename,
      originalName: req.file.originalname,
      type: req.file.mimetype,
      url: fileUrl,
    };
    res.json(response);
  } catch (error) {
    console.error("Error in file upload endpoint:", error);
    res.status(500).json({ message: "Failed to upload file", error: error.message });
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100 MB limit
  fileFilter: fileFilter,
});

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Function to extract text from a file
async function extractTextFromFile(filePath, mimetype) {
  try {
    if (mimetype === "application/pdf") {
      const dataBuffer = await fsPromises.readFile(filePath);
      const pdfData = await pdfParse(dataBuffer);

      if (pdfData.text && pdfData.text.trim().length > 0) {
        return pdfData.text;
      }

      const outputDir = path.join(path.dirname(filePath), "temp_images");
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      const options = {
        density: 100,
        format: "png",
        outputDir: outputDir,
        outputName: "page",
      };

      const convert = fromPath(filePath, options);
      const images = await convert.bulk(-1, { responseType: "image" });

      let ocrText = "";
      const tesseractConfig = {
        lang: "eng",
        oem: 1,
        psm: 3,
      };

      for (let i = 0; i < images.length; i++) {
        const imagePath = path.join(outputDir, `page-${i + 1}.png`);
        try {
          const text = await tesseract.recognize(imagePath, tesseractConfig);
          ocrText += text + "\n";
        } catch (ocrError) {
          console.error(`Error during OCR for page ${i + 1}:`, ocrError.message);
          ocrText += `\n[Error extracting text from page ${i + 1}]\n`;
        }
      }

      try {
        await fsPromises.rm(outputDir, { recursive: true, force: true });
      } catch (cleanupError) {
        console.error("Error cleaning up temporary images:", cleanupError.message);
      }

      return ocrText.trim();
    } else if (
      mimetype === "application/msword" ||
      mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      const result = await mammoth.extractRawText({ path: filePath });
      return result.value;
    } else {
      throw new Error("Unsupported file type for text extraction");
    }
  } catch (error) {
    console.error("Error in extractTextFromFile:", error.message);
    throw new Error(`Failed to extract text from file: ${error.message}`);
  }
}

// Parse resume using Gemini API
app.post("/api/parse-resume", upload.single("file"), async (req, res) => {
  if (!req.file) {
    console.error("No file uploaded in /api/parse-resume");
    return res.status(400).json({ error: "No file uploaded" });
  }

  const filePath = req.file.path;
  const fileName = req.file.originalname;
  const mimetype = req.file.mimetype;

  try {
    const fileStats = fs.statSync(filePath);
    const fileSizeMB = fileStats.size / (1024 * 1024);
    if (fileSizeMB > 100) {
      throw new Error("File size exceeds limit of 100 MB");
    }

    const resumeText = await extractTextFromFile(filePath, mimetype);
    const cleanResumeText = resumeText
      .replace(/[^\x20-\x7E\n]/g, "")
      .replace(/\s+/g, " ")
      .trim();

    const prompt = `
      Analyze the following resume text and output the result in JSON format with the following structure:
      {
        "skills": ["skill1", "skill2", ...],
        "experience": [{"job_details": "Job Title - Company", "start_date": "YYYY-MM", "end_date": "YYYY-MM or Present"}],
        "education": ["Degree - Institution", ...],
        "suggestions": ["suggestion1", "suggestion2", ...]
      }
      Example:
      {
        "skills": ["JavaScript", "Python"],
        "experience": [{"job_details": "Developer - ABC Corp", "start_date": "2020-01", "end_date": "2023-01"}],
        "education": ["BSc Computer Science - XYZ University"],
        "suggestions": ["Consider applying for Python developer roles"]
      }
      Return the result as a valid JSON string without any additional text, explanations, or markdown formatting (e.g., do not wrap the JSON in \`\`\`json markers or add comments).
      Resume Text:
      ${cleanResumeText}
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    let jsonString = responseText;
    const jsonMatch = responseText.match(/{[\s\S]*}/);
    if (jsonMatch) {
      jsonString = jsonMatch[0];
    } else {
      throw new Error("Gemini API response does not contain valid JSON");
    }

    if (jsonString.startsWith("```json")) {
      jsonString = jsonString.substring(7);
    }
    if (jsonString.endsWith("```")) {
      jsonString = jsonString.slice(0, -3);
    }
    jsonString = jsonString.trim();

    try {
      const parsedData = JSON.parse(jsonString);
      if (!parsedData.skills || !parsedData.experience || !parsedData.education || !parsedData.suggestions) {
        throw new Error("Gemini API response does not match expected structure");
      }

      await fsPromises.unlink(filePath);
      res.json(parsedData);
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError.message);
      throw new Error(`Failed to parse Gemini API response as JSON: ${parseError.message}`);
    }
  } catch (error) {
    console.error("Error parsing resume:", error.message);
    try {
      await fsPromises.unlink(filePath);
    } catch (unlinkError) {
      console.error("Error deleting temporary file:", unlinkError.message);
    }
    if (error.message.includes("File size")) {
      res.status(413).json({ error: "File size exceeds the capacity limit. Please upload a file smaller than 100 MB." });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Internal Server Error", error: err.message });
});

const io = new Server(server, {
  cors: {
    origin: ["https://joblinker-1.onrender.com"],
    methods: ["GET", "POST"],
    credentials: true,
  },
  transports: ["websocket", "polling"], // Ensure WebSocket is prioritized
});

//app.use("/uploads", express.static("uploads"));

// Connected users
const connectedUsers = new Map();

io.on("connection", (socket) => {
  socket.on("register", (email) => {
    connectedUsers.set(email, socket.id);
  });

  socket.on("joinChat", ({ sender, receiver }) => {
    const room = [sender, receiver].sort().join("_");
    socket.join(room);
  
    console.log(`User ${sender} joined chat with ${receiver}, room: ${room}`);
  
    Message.find({
      $or: [
        { sender: sender, receiver: receiver },
        { sender: receiver, receiver: sender },
      ],
      deletedBy: { $ne: sender }, // Exclude messages deleted by the sender
    })
      .sort("timestamp")
      .then(async (messages) => {
        console.log(`Loaded ${messages.length} messages for ${sender} and ${receiver}`);
        await Message.updateMany(
          { receiver: sender, sender: receiver, isRead: false },
          { $set: { isRead: true } }
        );
        socket.emit("loadMessages", messages);
      })
      .catch((error) => console.error("Error fetching messages:", error));
  });

  socket.on("sendMessage", async (msgData) => {
    const fileUrl = msgData.file && msgData.file.url ? msgData.file.url : null;
  
    if (!msgData.text && !fileUrl) {
      console.error("Message has no text or fileUrl, discarding:", msgData);
      return;
    }
  
    try {
      const newMessage = new Message({
        sender: msgData.sender,
        receiver: msgData.receiver,
        text: msgData.text || "",
        fileUrl: fileUrl,
        isRead: false,
        timestamp: new Date(msgData.timestamp),
      });
      await newMessage.save();
  
      const room = [msgData.sender, msgData.receiver].sort().join("_");
      const messageToSend = {
        _id: newMessage._id,
        sender: msgData.sender,
        receiver: msgData.receiver,
        text: msgData.text || "",
        file: msgData.file || null,
        fileUrl: fileUrl,
        timestamp: newMessage.timestamp,
        isRead: false,
      };
  
      // Emit to the room (both sender and receiver)
      io.to(room).emit("message", messageToSend);
  
      // Notify the receiver of a new message
      const receiverSocketId = connectedUsers.get(msgData.receiver);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("newMessageNotification", messageToSend);
      } else {
        console.warn("Receiver not connected:", msgData.receiver);
      }
    } catch (error) {
      console.error("Error saving message to MongoDB:", error);
      const senderSocketId = connectedUsers.get(msgData.sender);
      if (senderSocketId) {
        io.to(senderSocketId).emit("messageError", { error: "Failed to send message" });
      }
    }
  });

  socket.on("deleteChat", async ({ sender, receiver }) => {
    try {
      // Mark messages as deleted for the sender
      await Message.updateMany(
        {
          $or: [
            { sender, receiver },
            { sender: receiver, receiver: sender },
          ],
        },
        { $addToSet: { deletedBy: sender } }
      );
  
      const senderSocketId = connectedUsers.get(sender);
      if (senderSocketId) {
        io.to(senderSocketId).emit("chatDeleted", { receiver });
      }
  
      // Optionally notify the receiver (if needed)
      const receiverSocketId = connectedUsers.get(receiver);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("chatUpdated", { sender });
      }
    } catch (error) {
      console.error("Error deleting chat:", error);
    }
  });

  socket.on("disconnect", () => {
    for (let [email, socketId] of connectedUsers.entries()) {
      if (socketId === socket.id) {
        connectedUsers.delete(email);
        break;
      }
    }
  });
});

// Serve static files and handle client-side routing
app.use(express.static(path.join(__dirname, "client", "dist")));
app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});
// // app.get("/", (req, res) => {
// //   res.send("Server is running and database connected successfully!");
// // });

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});