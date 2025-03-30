

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
// import { updateCompany } from './controllers/company.controller.js';
// import { companyLogoUpload } from "./middlewares/mutler.js";
// dotenv.config();
// connectDB();

// const app = express();
// const server = http.createServer(app);
// const requiredEnvVars = ["GEMINI_API_KEY", "CLOUD_NAME", "API_KEY", "API_SECRET", "PORT"];
// for (const envVar of requiredEnvVars) {
//     if (!process.env[envVar]) {
//         throw new Error(`Missing required environment variable: ${envVar}`);
//     }
// }
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

// const corsOptions = {
//     origin: ["https://joblinker-1.onrender.com"],
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
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
//     try {
//         const job = await Job.findById(req.params.jobId).populate('createdBy', 'fullname email');
//         if (!job) return res.status(404).json({ success: false, message: 'Job not found' });
//         res.json({ success: true, job });
//     } catch (error) {
//         res.status(500).json({ success: false, message: 'Server error' });
//     }
// });

// app.get('/api/users/get/:userId', async (req, res) => {
//     try {
//         const user = await User.findById(req.params.userId).select('fullname email');
//         if (!user) return res.status(404).json({ success: false, message: 'User not found' });
//         res.json({ success: true, user });
//     } catch (error) {
//         res.status(500).json({ success: false, message: 'Server error' });
//     }
// });

// app.post('/api/jobs/post', async (req, res) => {
//     const { title, description, requirements, salary, location, jobType, experience, position, companyId, createdBy } = req.body;
//     const job = new Job({
//         title,
//         description,
//         requirements,
//         salary,
//         location,
//         jobType,
//         experience,
//         position,
//         companyId,
//         createdBy,
//     });
//     await job.save();
//     res.json({ success: true, message: 'Job posted successfully', job });
// });

// // Translation Schema & API
// const translationSchema = new mongoose.Schema({
//     SimilarJobs: String,
//     language: String,
//     PostedBy: String,
//     welcome: String,
//     Chat: String,
//     Chats: String,
//     Deletechat: String,
//     Sends: String,
//     Searchby: String,
//     Type: String,
//     description: String,
//     Home: String,
//     Jobs: String,
//     Browse: String,
//     Companies: String,
//     About: String,
//     ViewProfile: String,
//     Logout: String,
//     FindJobs: String,
//     PostJob: String,
//     Search: String,
//     Title: String,
//     Comp: String,
//     Latest: String,
//     Review: String,
//     GiveReviews: String,
//     Help: String,
//     Contact: String,
//     Careers: String,
//     Resources: String,
//     Blog: String,
//     AllCompanies: String,
//     QuickLinks: String,
//     AboutJoblinker: String,
//     Connect: String,
//     Login: String,
//     SignUp: String,
//     Rights: String,
//     Side: String,
//     Linker: String,
//     ASKME: String,
//     EmailAddress: String,
//     Password: String,
//     // cscs
//     PasswordRequirement: String,
//     IAmA: String,
//     JobSeeker: String,
//     Recruiter: String,
//     DontHaveAccount: String,
//     ForgotPassword: String,
//     FullName: String,
//     PhoneNumber: String,
//     ProfilePicture: String,
//     ChooseFile: String,
//     NoFileChosen: String,
//     AlreadyHaveAccount: String,
//     TopJobs: String,
//     Rememberyourpassword: String,
//     Registeremail: String,
//     ResetLink: String,
//     Forgottext: String,
//     FilterJobs: String,
//     SearchResults: String,
//     Gateway: String,
//     MeetTeams: String,
//     ContactNew: String,
//     Message: String,
//     Submit: String,
//     ContactInformation: String,
//     ReviewNew: String,
//     OnlyReview: String,
//     SubmitReview: String,
//     YourReview: String,
//     CharactersLeft: String,
//     SelectCompany: String,
//     CompReview: String,
//     JobBlogs: String,
//     BlogJobs: String,
//     HelpCenter: String,
//     FAQ: String,
//     AA: String,
//     BB: String,
//     CC: String,
//     DD: String,
//     EE: String,
//     title: String,
//     introduction: String,
//     role: String,
//     descriptionk: String,
//     skills: String,
//     Bio: String,
//     UpdateProfile: String,
//     UploadResume: String,
//     ViewOnly: String,
//     ViewCurrentResume: String,
//     Resumek: String,
//     JobTitle: String,
//     Company: String,
//     AppliedDate: String,
//     Status: String,
//     AppliedJobs: String,
//     SavedJobs: String,
//     Titlek: String,
//     Location: String,
//     Salary: String,
//     Positions: String,
//     View: String,
//     Date: String,
//     Action: String,
//     Gobacktojobs: String,
//     ListUser: String,
//     Accepted: String,
//     Rejected: String,
//     CompanyName: String,
//     Role: String,
//     ListJo: String,
//     NewJob: String,
//     Edit: String,
//     Applications: String,
//     Filter: String,
//     ListRegister: String,
//     NewCompany: String,
//     Logo: String,
//     CompanySetup: String,
//     Update: String,
//     Delete: String,
//     Website: String,
//     Description: String,
//     Cancel: String,
//     Continue: String,
//     YourCompanyName: String,
//     CompComp: String,
//     Place: String,
//     Requirements: String,
//     JobType: String,
//     PostNewJob: String,
//     ExperienceLevel: String,
//     SalaryLPA: String,
//     RegisterReg: String,
//     Pls: String,
// });

// const Translation = mongoose.model("Translation", translationSchema);

// app.get("/translations", async (req, res) => {
//     const lang = req.query.lang || "en";
//     const translation = await Translation.findOne({ language: lang });
//     res.json(translation || {
//         welcome: "Find Your Dream Job With JobLinker",
//         description: "Connect with top employers and discover opportunities that match your skills and aspirations. Your next career move starts here",
//         Home: "Home",
//         Jobs: "Jobs",
//         Browse: "Browse",
//         Companies: "Companies",
//         About: "About",
//         ViewProfile: "View Profile",
//         Logout: "Logout",
//         FindJobs: "Find Jobs",
//         PostJob: "Post a Job",
//         Search: "Search",
//         Title: "Search by job title or skills",
//         Comp: "10L+ top companies trust JobLinker for their hiring needs",
//         Latest: "Latest & Top Job Openings",
//         Review: "Company Reviews",
//         Connect: "Connect With Us",
//         Blog: "Blog",
//         Help: "Help",
//         Contact: "Contact",
//         Careers: "Careers",
//         Resources: "Resources",
//         AllCompanies: "All Companies",
//         QuickLinks: "Quick Links",
//         AboutJoblinker: "About JobLinker",
//         GiveReviews: "Give Reviews",
//         Login: "Login",
//         SignUp: "SignUp",
//         Rights: "All rights reserved.",
//         Side: "Connecting talented professionals with innovative companies worldwide.",
//         Linker: "JobLinker",
//         ASKME: "ASK ME",
//         EmailAddress: "Email Address",
//         Password: "Password",
//         PostedBy: "Posted By",
//         PasswordRequirement: "Password must be at least 8 characters",
//         IAmA: "I am a",
//         Chat: "Chat",
//         Chats: "Chats",
//         Deletechat: "Delete Chat",
//         Sends: "Send",
//         Searchby: "Search by name or email",
//         Type: "Type a message",
//         JobSeeker: "Job Seeker",
//         Recruiter: "Recruiter",
//         DontHaveAccount: "Don't have an account?",
//         ForgotPassword: "Forgot Password?",
//         FullName: "Full Name",
//         PhoneNumber: "Phone Number",
//         ProfilePicture: "Profile Picture",
//         ChooseFile: "Choose File",
//         NoFileChosen: "No File Chosen",
//         AlreadyHaveAccount: "Already have an account?",
//         TopJobs: "Top High-Package Secured Jobs",
//         Rememberyourpassword: "Remember your password?",
//         Registeremail: "Enter your registered email",
//         ResetLink: "Send Reset Link",
//         FilterJobs: "Filter Jobs",
//         SearchResults: "Search Results",
//         Gateway: "Your Gateway to the Perfect Career",
//         MeetTeams: "Meet Teams",
//         Forgottext: "Enter your registered email address below to receive a password reset link.",
//         ContactNew: "For Contact give your information, We will contact you",
//         Message: "Message",
//         Submit: "Submit",
//         SimilarJobs: "Similar Jobs",
//         OnlyReview: "Review",
//         SubmitReview: "Rating",
//         SelectCompany: "Select Company",
//         CharactersLeft: "characters left",
//         ReviewNew: "Give reviews for a company",
//         ContactInformation: "TO CONTACT US EMAIL ON",
//         COmpReview: "Filter by Name",
//         JobBlogs: "Job Blogs",
//         BlogJobs: "Latest insights and articles on job trends, career advice, and industry news.",
//         HelpCenter: "HELP CENTER",
//         FAQ: "Frequently Asked Questions",
//         AA: "Like No Place You've Ever Worked",
//         BB: "Explore exciting career opportunities that match your skills and passion.",
//         CC: "Find Your Next Job",
//         DD: "Life at JobLinker",
//         EE: "Open Positions",
//         Bio: "Bio",
//         UpdateProfile: "Update Profile",
//         UploadResume: "Upload Resume (PDF)",
//         ViewOnly: "(View Only)",
//         ViewCurrentResume: "View Current Resume",
//         Resumek: "Resume",
//         JobTitle: "Job Title",
//         Company: "Company",
//         AppliedDate: "Applied Date",
//         Status: "Status",
//         AppliedJobs: "Applied Jobs",
//         SavedJobs: "Saved Jobs",
//         Titlek: "Title",
//         Location: "Location",
//         Salary: "Salary",
//         Positions: "No. of Positions",
//         View: "View",
//         Date: "Date",
//         Action: "Action",
//         Gobacktojobs: "Go back to jobs",
//         ListUser: "A list of your recent applied users",
//         Accepted: "Accepted",
//         Rejected: "Rejected",
//         CompanyName: "Company Name",
//         Role: "Role",
//         ListJo: "A list of your recently posted jobs",
//         NewJob: "New Job",
//         Edit: "Edit",
//         Applications: "Applications",
//         Filter: "Filter by Name, Role",
//         ListRegister: "A list of your recent registered companies",
//         NewCompany: "New Company",
//         Logo: "Logo",
//         CompanySetup: "Company Setup",
//         Update: "Update",
//         Delete: "Delete",
//         Website: "Website",
//         Description: "Description",
//         Cancel: "Cancel",
//         Continue: "Add Company",
//         YourCompanyName: "Your Company Name",
//         CompComp: "What would you like to give your company name? You can change this later.",
//         Place: "Google, Microsoft etc.",
//         Requirements: "Requirements",
//         JobType: "Job Type",
//         PostNewJob: "Post New Job",
//         ExperienceLevel: "Experience Level",
//         SalaryLPA: "Salary LPA",
//         RegisterReg: "*Please register a company first, before posting jobs.",
//         Pls: "*Please register a company first, before updating jobs.",
//     });
// });

// import resumeRoutes from './routes/resume.route.js';
// app.use('/api/v1/resume', resumeRoutes);

// cloudinary.config({
//     cloud_name: process.env.CLOUD_NAME,
//     api_key: process.env.API_KEY,
//     api_secret: process.env.API_SECRET,
// });

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.resolve();
// const uploadsDir = path.join(__dirname, "uploads/");
// if (!fs.existsSync(uploadsDir)) {
//     fs.mkdirSync(uploadsDir, { recursive: true });
// }

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, uploadsDir);
//     },
//     filename: (req, file, cb) => {
//         const uniqueSuffix = Date.now() + "-" + Math.random().toString(36).substring(2, 15);
//         const ext = path.extname(file.originalname);
//         cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
//     },
// });

// const fileFilter = (req, file, cb) => {
//     const allowedTypes = [
//         "image/jpeg",
//         "image/png",
//         "image/gif",
//         "application/pdf",
//         "application/msword",
//         "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//         "application/vnd.ms-excel",
//         "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
//     ];
//     if (allowedTypes.includes(file.mimetype)) {
//         cb(null, true);
//     } else {
//         cb(new Error("Invalid file type. Only images, PDFs, Word, and Excel documents are allowed."));
//     }
// };

// // Multer configuration for company logo upload (using memoryStorage)
// const memoryStorage = multer.memoryStorage();
//  // Expect field name "logo"

// const chatFileUpload = multer({
//     storage,
//     fileFilter,
//     limits: { fileSize: 10 * 1024 * 1024 },
// }).single("file");

// const messageSchema = new mongoose.Schema({
//     sender: String,
//     receiver: String,
//     text: String,
//     fileUrl: String,
//     timestamp: { type: Date, default: Date.now },
//     deletedBy: [{ type: String, default: [] }],
//     isRead: { type: Boolean, default: false },
// }, {
//     indexes: [
//         { key: { sender: 1, receiver: 1 } },
//         { key: { deletedBy: 1 } },
//         { key: { timestamp: 1 } }
//     ]
// });
// const Message = mongoose.model("Message", messageSchema);

// app.get("/api/unread-messages/:email", async (req, res) => {
//     const { email } = req.params;
//     try {
//         const unreadMessages = await Message.find({
//             receiver: email,
//             isRead: false,
//             deletedBy: { $ne: email },
//         }).sort("timestamp");
//         res.json(unreadMessages);
//     } catch (error) {
//         res.status(500).json({ error: "Server error" });
//     }
// });

// app.get("/messages/:user1/:user2", async (req, res) => {
//     const { user1, user2 } = req.params;
//     try {
//         const messages = await Message.find({
//             $or: [
//                 { sender: user1, receiver: user2 },
//                 { sender: user2, receiver: user1 },
//             ],
//             deletedBy: { $ne: user1 },
//         }).sort("timestamp");
//         res.json(messages);
//     } catch (error) {
//         res.status(500).json({ error: "Server error" });
//     }
// });

// app.post("/api/upload-chat-file", chatFileUpload, async (req, res) => {
//     if (!req.file) {
//         console.error("No file uploaded - multer failed to process the file");
//         return res.status(400).json({ message: "No file uploaded" });
//     }

//     try {
//         const result = await cloudinary.v2.uploader.upload(req.file.path, {
//             folder: "chat_files",
//             resource_type: "auto",
//         });

//         await fsPromises.unlink(req.file.path);

//         const fileUrl = result.secure_url;

//         const response = {
//             filename: req.file.filename,
//             originalName: req.file.originalname,
//             type: req.file.mimetype,
//             url: fileUrl,
//         };
//         res.json(response);
//     } catch (error) {
//         console.error("Error in file upload endpoint:", error);
//         res.status(500).json({ message: "Failed to upload file", error: error.message });
//     }
// });

// const upload = multer({
//     storage: storage,
//     limits: { fileSize: 100 * 1024 * 1024 },
//     fileFilter: fileFilter,
// });

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// async function extractTextFromFile(filePath, mimetype) {
//     try {
//         if (mimetype === "application/pdf") {
//             const dataBuffer = await fsPromises.readFile(filePath);
//             const pdfData = await pdfParse(dataBuffer);

//             if (pdfData.text && pdfData.text.trim().length > 0) {
//                 return pdfData.text;
//             }

//             const outputDir = path.join(path.dirname(filePath), "temp_images");
//             if (!fs.existsSync(outputDir)) {
//                 fs.mkdirSync(outputDir, { recursive: true });
//             }

//             const options = {
//                 density: 100,
//                 format: "png",
//                 outputDir: outputDir,
//                 outputName: "page",
//             };

//             const convert = fromPath(filePath, options);
//             const images = await convert.bulk(-1, { responseType: "image" });

//             let ocrText = "";
//             const tesseractConfig = {
//                 lang: "eng",
//                 oem: 1,
//                 psm: 3,
//             };

//             for (let i = 0; i < images.length; i++) {
//                 const imagePath = path.join(outputDir, `page-${i + 1}.png`);
//                 try {
//                     const text = await tesseract.recognize(imagePath, tesseractConfig);
//                     ocrText += text + "\n";
//                 } catch (ocrError) {
//                     console.error(`Error during OCR for page ${i + 1}:`, ocrError.message);
//                     ocrText += `\n[Error extracting text from page ${i + 1}]\n`;
//                 }
//             }

//             try {
//                 await fsPromises.rm(outputDir, { recursive: true, force: true });
//             } catch (cleanupError) {
//                 console.error("Error cleaning up temporary images:", cleanupError.message);
//             }

//             return ocrText.trim();
//         } else if (
//             mimetype === "application/msword" ||
//             mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
//         ) {
//             const result = await mammoth.extractRawText({ path: filePath });
//             return result.value;
//         } else {
//             throw new Error("Unsupported file type for text extraction");
//         }
//     } catch (error) {
//         console.error("Error in extractTextFromFile:", error.message);
//         throw new Error(`Failed to extract text from file: ${error.message}`);
//     }
// }

// app.post("/api/parse-resume", upload.single("file"), async (req, res) => {
//     if (!req.file) {
//         console.error("No file uploaded in /api/parse-resume");
//         return res.status(400).json({ error: "No file uploaded" });
//     }

//     const filePath = req.file.path;
//     const fileName = req.file.originalname;
//     const mimetype = req.file.mimetype;

//     try {
//         const fileStats = fs.statSync(filePath);
//         const fileSizeMB = fileStats.size / (1024 * 1024);
//         if (fileSizeMB > 100) {
//             throw new Error("File size exceeds limit of 100 MB");
//         }

//         const resumeText = await extractTextFromFile(filePath, mimetype);
//         const cleanResumeText = resumeText
//             .replace(/[^\x20-\x7E\n]/g, "")
//             .replace(/\s+/g, " ")
//             .trim();

//         const prompt = `
//             Analyze the following resume text and output the result in JSON format with the following structure:
//             {
//                 "skills": ["skill1", "skill2", ...],
//                 "experience": [{"job_details": "Job Title - Company", "start_date": "YYYY-MM", "end_date": "YYYY-MM or Present"}],
//                 "education": ["Degree - Institution", ...],
//                 "suggestions": ["suggestion1", "suggestion2", ...]
//             }
//             Example:
//             {
//                 "skills": ["JavaScript", "Python"],
//                 "experience": [{"job_details": "Developer - ABC Corp", "start_date": "2020-01", "end_date": "2023-01"}],
//                 "education": ["BSc Computer Science - XYZ University"],
//                 "suggestions": ["Consider applying for Python developer roles"]
//             }
//             Return the result as a valid JSON string without any additional text, explanations, or markdown formatting (e.g., do not wrap the JSON in \`\`\`json markers or add comments).
//             Resume Text:
//             ${cleanResumeText}
//         `;

//         const result = await model.generateContent(prompt);
//         const responseText = result.response.text();

//         let jsonString = responseText;
//         const jsonMatch = responseText.match(/{[\s\S]*}/);
//         if (jsonMatch) {
//             jsonString = jsonMatch[0];
//         } else {
//             throw new Error("Gemini API response does not contain valid JSON");
//         }

//         if (jsonString.startsWith("```json")) {
//             jsonString = jsonString.substring(7);
//         }
//         if (jsonString.endsWith("```")) {
//             jsonString = jsonString.slice(0, -3);
//         }
//         jsonString = jsonString.trim();

//         try {
//             const parsedData = JSON.parse(jsonString);
//             if (!parsedData.skills || !parsedData.experience || !parsedData.education || !parsedData.suggestions) {
//                 throw new Error("Gemini API response does not match expected structure");
//             }

//             await fsPromises.unlink(filePath);
//             res.json(parsedData);
//         } catch (parseError) {
//             console.error("JSON Parse Error:", parseError.message);
//             throw new Error(`Failed to parse Gemini API response as JSON: ${parseError.message}`);
//         }
//     } catch (error) {
//         console.error("Error parsing resume:", error.message);
//         try {
//             await fsPromises.unlink(filePath);
//         } catch (unlinkError) {
//             console.error("Error deleting temporary file:", unlinkError.message);
//         }
//         if (error.message.includes("File size")) {
//             res.status(413).json({ error: "File size exceeds the capacity limit. Please upload a file smaller than 100 MB." });
//         } else {
//             res.status(500).json({ error: error.message });
//         }
//     }
// });



// app.put('/api/v1/company/update/:id', companyLogoUpload, async (req, res, next) => {
//     console.log("Received files in route:", req.files);
//     try {
//         await updateCompany(req, res);
//     } catch (error) {
//         if (error instanceof multer.MulterError) {
//             return res.status(400).json({
//                 message: error.message,
//                 success: false,
//             });
//         }
//         next(error);
//     }
// });

// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).json({ success: false, message: "Internal Server Error", error: err.message });
// });

// const io = new Server(server, {
//     cors: {
//         origin: ["https://joblinker-1.onrender.com"],
//         methods: ["GET", "POST"],
//         credentials: true,
//     },
//     transports: ["websocket", "polling"],
// });

// const connectedUsers = new Map();

// io.on("connection", (socket) => {
//     socket.on("register", (email) => {
//         connectedUsers.set(email, socket.id);
//         console.log(`User ${email} connected with socket ID: ${socket.id}`);
//     });

//     socket.on("joinChat", ({ sender, receiver }) => {
//         const room = [sender, receiver].sort().join("_");
//         socket.join(room);
    
//         console.log(`User ${sender} joined chat with ${receiver}, room: ${room}`);
    
//         Message.find({
//             $or: [
//                 { sender: sender, receiver: receiver },
//                 { sender: receiver, receiver: sender },
//             ],
//             deletedBy: { $ne: sender },
//         })
//             .sort("timestamp")
//             .then(async (messages) => {
//                 console.log(`Loaded ${messages.length} messages for ${sender} and ${receiver}`);
//                 await Message.updateMany(
//                     { receiver: sender, sender: receiver, isRead: false },
//                     { $set: { isRead: true } }
//                 );
//                 socket.emit("loadMessages", messages);
//             })
//             .catch((error) => console.error("Error fetching messages:", error));
//     });

//     socket.on("sendMessage", async (msgData) => {
//         const fileUrl = msgData.file && msgData.file.url ? msgData.file.url : null;
    
//         if (!msgData.text && !fileUrl) {
//             console.error("Message has no text or fileUrl, discarding:", msgData);
//             return;
//         }
    
//         try {
//             // Save the message to the database first
//             const newMessage = new Message({
//                 sender: msgData.sender,
//                 receiver: msgData.receiver,
//                 text: msgData.text || "",
//                 fileUrl: fileUrl,
//                 timestamp: new Date(msgData.timestamp),
//                 isRead: false,
//             });
//             const savedMessage = await newMessage.save();
    
//             // Include tempId from client for deduplication
//             const messageToEmit = {
//                 ...savedMessage.toObject(),
//                 tempId: msgData.tempId,
//             };
    
//             const room = [msgData.sender, msgData.receiver].sort().join("_");
    
//             // Emit the saved message to the room
//             io.to(room).emit("message", messageToEmit);
    
//             // Notify the receiver only if they are connected
//             const receiverSocketId = connectedUsers.get(msgData.receiver);
//             if (receiverSocketId && msgData.receiver !== msgData.sender) {
//                 io.to(receiverSocketId).emit("newMessageNotification", messageToEmit);
//             }
//         } catch (error) {
//             console.error("Error processing sendMessage:", error);
//             const senderSocketId = connectedUsers.get(msgData.sender);
//             if (senderSocketId) {
//                 io.to(senderSocketId).emit("messageError", { error: "Failed to send message" });
//             }
//         }
//     });

//     socket.on("deleteChat", async ({ sender, receiver }) => {
//         try {
//             await Message.updateMany(
//                 {
//                     $or: [
//                         { sender, receiver },
//                         { sender: receiver, receiver: sender },
//                     ],
//                     deletedBy: { $ne: sender },
//                 },
//                 { $addToSet: { deletedBy: sender } }
//             );

//             const senderSocketId = connectedUsers.get(sender);
//             if (senderSocketId) {
//                 io.to(senderSocketId).emit("chatDeleted", { receiver });
//             }

//             const receiverSocketId = connectedUsers.get(receiver);
//             if (receiverSocketId) {
//                 io.to(receiverSocketId).emit("chatUpdated", { sender });
//             }
//         } catch (error) {
//             console.error("Error deleting chat:", error);
//             const senderSocketId = connectedUsers.get(sender);
//             if (senderSocketId) {
//                 io.to(senderSocketId).emit("chatDeleteError", { error: "Failed to delete chat" });
//             }
//         }
//     });

//     socket.on("markAsRead", async ({ sender, receiver }) => {
//         try {
//             await Message.updateMany(
//                 { sender, receiver, isRead: false },
//                 { $set: { isRead: true } }
//             );
//         } catch (error) {
//             console.error("Error marking messages as read:", error);
//         }
//     });

//     socket.on("disconnect", () => {
//         for (let [email, socketId] of connectedUsers.entries()) {
//             if (socketId === socket.id) {
//                 connectedUsers.delete(email);
//                 console.log(`User ${email} disconnected`);
//                 break;
//             }
//         }
//     });
// });

// app.use(express.static(path.join(__dirname, "client", "dist")));
// app.get("*", (_req, res) => {
//     res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
// });

// server.listen(PORT, () => {
//     console.log(`Server running at http://localhost:${PORT}`);
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
import { updateCompany } from './controllers/company.controller.js';
import { companyLogoUpload } from "./middlewares/mutler.js";
dotenv.config();
connectDB();

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
    origin: ["https://joblinker-1.onrender.com"],
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
        createdBy,
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
    // cscs
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

import resumeRoutes from './routes/resume.route.js';
app.use('/api/v1/resume', resumeRoutes);

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.resolve();
const uploadsDir = path.join(__dirname, "uploads/");
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

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
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Invalid file type. Only images, PDFs, Word, and Excel documents are allowed."));
    }
};

// Multer configuration for company logo upload (using memoryStorage)
const memoryStorage = multer.memoryStorage();
 // Expect field name "logo"

const chatFileUpload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 },
}).single("file");

const messageSchema = new mongoose.Schema({
    sender: String,
    receiver: String,
    text: String,
    file: {
        name: String,
        type: String,
        url: String,
    },
    timestamp: { type: Date, default: Date.now },
    deletedBy: [{ type: String, default: [] }],
    isRead: { type: Boolean, default: false },
    status: { type: String , default: 'sent', enum: ['sent', 'delivered', 'read'] },
    reactions: [
        {
            user: String, // The user who reacted
            emoji: String, // The emoji used for the reaction (e.g., "👍")
            timestamp: { type: Date, default: Date.now },
        }
    ], // Add status field
}, {
    indexes: [
        { key: { sender: 1, receiver: 1 } },
        { key: { timestamp: 1 } },
        { key: { status: 1 } },
        { key: { "reactions.user": 1 } },
    ]
});
const Message = mongoose.model("Message", messageSchema);

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
        const result = await cloudinary.v2.uploader.upload(req.file.path, {
            folder: "chat_files",
            resource_type: "auto",
        });

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
    limits: { fileSize: 100 * 1024 * 1024 },
    fileFilter: fileFilter,
});

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

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



app.put('/api/v1/company/update/:id', companyLogoUpload, async (req, res, next) => {
    console.log("Received files in route:", req.files);
    try {
        await updateCompany(req, res);
    } catch (error) {
        if (error instanceof multer.MulterError) {
            return res.status(400).json({
                message: error.message,
                success: false,
            });
        }
        next(error);
    }
});

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
    transports: ["websocket", "polling"],
});

const connectedUsers = new Map();


app.delete("/api/messages/delete", async (req, res) => {
    const { messageIds } = req.body;

    if (!Array.isArray(messageIds) || messageIds.length === 0) {
        console.log("Invalid or empty message IDs:", messageIds);
        return res.status(400).json({ error: "Invalid or empty message IDs" });
    }

    try {
        console.log("Attempting to delete messages with IDs:", messageIds);
        const messages = await Message.find({ _id: { $in: messageIds } });
        if (messages.length === 0) {
            console.log("No messages found for IDs:", messageIds);
            return res.status(404).json({ error: "No messages found to delete" });
        }

        const result = await Message.deleteMany({ _id: { $in: messageIds } });
        console.log(`Deleted ${result.deletedCount} messages`);

        const rooms = new Set();
        messages.forEach((msg) => {
            const room = [msg.sender, msg.receiver].sort().join("_");
            rooms.add(room);
        });

        rooms.forEach((room) => {
            io.to(room).emit("messageDeleted", { messageIds });
        });

        res.json({ success: true, message: `${result.deletedCount} message(s) deleted permanently` });
    } catch (error) {
        console.error("Error deleting messages:", error);
        res.status(500).json({ error: "Server error" });
    }
});
app.post("/api/messages/delete-for-me", async (req, res) => {
    const { messageIds, userEmail } = req.body;

    if (!Array.isArray(messageIds) || messageIds.length === 0 || !userEmail) {
        return res.status(400).json({ error: "Invalid input: messageIds and userEmail are required" });
    }

    try {
        const result = await Message.updateMany(
            { _id: { $in: messageIds }, deletedBy: { $ne: userEmail } },
            { $addToSet: { deletedBy: userEmail } }
        );

        const userSocketId = connectedUsers.get(userEmail);
        if (userSocketId) {
            io.to(userSocketId).emit("messagesDeletedForMe", { messageIds });
        }

        res.json({ success: true, message: `${result.modifiedCount} message(s) deleted for you` });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

// io.on("connection", (socket) => {
//     socket.on("register", (email) => {
//         connectedUsers.set(email, socket.id);
//         console.log(`User ${email} connected with socket ID: ${socket.id}`);
//     });

//     socket.on("joinChat", ({ sender, receiver }) => {
//         const room = [sender, receiver].sort().join("_");
//         socket.join(room);
    
//         console.log(`User ${sender} joined chat with ${receiver}, room: ${room}`);
    
//         Message.find({
//             $or: [
//                 { sender: sender, receiver: receiver },
//                 { sender: receiver, receiver: sender },
//             ],
//             deletedBy: { $ne: sender },
//         })
//             .sort("timestamp")
//             .then(async (messages) => {
//                 console.log(`Loaded ${messages.length} messages for ${sender} and ${receiver}`);
//                 await Message.updateMany(
//                     { 
//                         receiver: sender, 
//                         sender: receiver, 
//                         status: 'sent' 
//                     },
//                     { $set: { status: 'delivered' } }
//                 );
//                 await Message.updateMany(
//                     { 
//                         receiver: sender, 
//                         sender: receiver, 
//                         status: { $in: ['sent', 'delivered'] }
//                     },
//                     { $set: { status: 'read', isRead: true } }
//                 );
//                 const updatedMessages = await Message.find({
//                     $or: [
//                         { sender: sender, receiver: receiver },
//                         { sender: receiver, receiver: sender },
//                     ],
//                     deletedBy: { $ne: sender },
//                 }).sort("timestamp");
//                 socket.emit("loadMessages", updatedMessages);
//             })
//             .catch((error) => console.error("Error fetching messages:", error));
//     });

//     socket.on("sendMessage", async (msgData) => {
//         const fileUrl = msgData.file && msgData.file.url ? msgData.file.url : null;
    
//         if (!msgData.text && !fileUrl) {
//             console.error("Message has no text or fileUrl, discarding:", msgData);
//             return;
//         }
    
//         try {
//             const newMessage = new Message({
//                 sender: msgData.sender,
//                 receiver: msgData.receiver,
//                 text: msgData.text || "",
//                 fileUrl: fileUrl,
//                 timestamp: new Date(msgData.timestamp),
//                 status: 'sent',
//                 isRead: false,
//             });
//             const savedMessage = await newMessage.save();
//             console.log(`Saved message with ID: ${savedMessage._id} for sender: ${msgData.sender}, receiver: ${msgData.receiver}`);
    
//             const messageToEmit = {
//                 ...savedMessage.toObject(),
//                 tempId: msgData.tempId,
//             };
    
//             const room = [msgData.sender, msgData.receiver].sort().join("_");
//             io.to(room).emit("message", messageToEmit);
    
//             const receiverSocketId = connectedUsers.get(msgData.receiver);
//             if (receiverSocketId && msgData.receiver !== msgData.sender) {
//                 await Message.findByIdAndUpdate(savedMessage._id, {
//                     $set: { status: 'delivered' }
//                 });
//                 const updatedMessage = await Message.findById(savedMessage._id);
//                 io.to(room).emit("messageStatusUpdated", updatedMessage);
//                 io.to(receiverSocketId).emit("newMessageNotification", updatedMessage);
//             }
//         } catch (error) {
//             console.error("Error processing sendMessage:", error);
//             const senderSocketId = connectedUsers.get(msgData.sender);
//             if (senderSocketId) {
//                 io.to(senderSocketId).emit("messageError", { error: "Failed to send message" });
//             }
//         }
//     });

//     socket.on("deleteChat", async ({ sender, receiver }) => {
//         try {
//             await Message.updateMany(
//                 {
//                     $or: [
//                         { sender, receiver },
//                         { sender: receiver, receiver: sender },
//                     ],
//                     deletedBy: { $ne: sender },
//                 },
//                 { $addToSet: { deletedBy: sender } }
//             );

//             const senderSocketId = connectedUsers.get(sender);
//             if (senderSocketId) {
//                 io.to(senderSocketId).emit("chatDeleted", { receiver });
//             }

//             const receiverSocketId = connectedUsers.get(receiver);
//             if (receiverSocketId) {
//                 io.to(receiverSocketId).emit("chatUpdated", { sender });
//             }
//         } catch (error) {
//             console.error("Error deleting chat:", error);
//             const senderSocketId = connectedUsers.get(sender);
//             if (senderSocketId) {
//                 io.to(senderSocketId).emit("chatDeleteError", { error: "Failed to delete chat" });
//             }
//         }
//     });

//     socket.on("markAsRead", async ({ sender, receiver }) => {
//         try {
//             await Message.updateMany(
//                 { sender, receiver, isRead: false },
//                 { $set: { isRead: true } }
//             );
//         } catch (error) {
//             console.error("Error marking messages as read:", error);
//         }
//     });

//     socket.on("disconnect", () => {
//         for (let [email, socketId] of connectedUsers.entries()) {
//             if (socketId === socket.id) {
//                 connectedUsers.delete(email);
//                 console.log(`User ${email} disconnected`);
//                 break;
//             }
//         }
//     });
// });

// ... (rest of the index.js file remains the same)

// ... (rest of the index.js file remains the same)
// index.js
// ... (previous imports remain the same)

io.on("connection", (socket) => {
    socket.on("register", (email) => {
        connectedUsers.set(email, socket.id);
        console.log(`User ${email} connected with socket ID: ${socket.id}`);
    });

    socket.on("joinChat", ({ sender, receiver }) => {
        const room = [sender, receiver].sort().join("_");
        socket.join(room);

        Message.find({
            $or: [
                { sender: sender, receiver: receiver },
                { sender: receiver, receiver: sender },
            ],
            deletedBy: { $ne: sender },
        })
            .sort("timestamp")
            .then(async (messages) => {
                await Message.updateMany(
                    { receiver: sender, sender: receiver, status: 'sent' },
                    { $set: { status: 'delivered' } }
                );
                await Message.updateMany(
                    { receiver: sender, sender: receiver, status: { $in: ['sent', 'delivered'] } },
                    { $set: { status: 'read', isRead: true } }
                );
                const updatedMessages = await Message.find({
                    $or: [
                        { sender: sender, receiver: receiver },
                        { sender: receiver, receiver: sender },
                    ],
                    deletedBy: { $ne: sender },
                }).sort("timestamp");

                socket.emit("loadMessages", updatedMessages);

                updatedMessages.forEach((msg) => {
                    if (msg.status !== 'sent') {
                        io.to(room).emit("messageStatusUpdated", msg);
                    }
                });
            })
            .catch((error) => console.error("Error fetching messages:", error));
    });

    socket.on("sendMessage", async (msgData) => {
        const fileUrl = msgData.file && msgData.file.url ? msgData.file.url : null;

        if (!msgData.text && !fileUrl) {
            return;
        }

        try {
            const newMessage = new Message({
                sender: msgData.sender,
                receiver: msgData.receiver,
                text: msgData.text || "",
                fileUrl: fileUrl,
                timestamp: new Date(msgData.timestamp),
                status: 'sent',
                isRead: false,
                reactions: [],
            });
            const savedMessage = await newMessage.save();

            const messageToEmit = {
                ...savedMessage.toObject(),
                tempId: msgData.tempId,
            };

            const room = [msgData.sender, msgData.receiver].sort().join("_");
            io.to(room).emit("message", messageToEmit);

            const receiverSocketId = connectedUsers.get(msgData.receiver);
            if (receiverSocketId && msgData.receiver !== msgData.sender) {
                await Message.findByIdAndUpdate(savedMessage._id, { $set: { status: 'delivered' } });
                const updatedMessage = await Message.findById(savedMessage._id);
                io.to(room).emit("messageStatusUpdated", updatedMessage);
                io.to(receiverSocketId).emit("newMessageNotification", updatedMessage);
            }
        } catch (error) {
            console.error("Error processing sendMessage:", error);
        }
    });

    socket.on("addReaction", async ({ messageId, user, emoji }) => {
        try {
            const message = await Message.findById(messageId);
            if (!message) return;

            const existingReactionIndex = message.reactions.findIndex(
                (r) => r.user === user && r.emoji === emoji
            );

            if (existingReactionIndex !== -1) {
                message.reactions.splice(existingReactionIndex, 1);
            } else {
                message.reactions.push({ user, emoji, timestamp: new Date() });
            }

            await message.save();
            const updatedMessage = await Message.findById(messageId);
            const room = [message.sender, message.receiver].sort().join("_");
            io.to(room).emit("messageStatusUpdated", updatedMessage);
        } catch (error) {
            console.error("Error adding reaction:", error);
        }
    });

    socket.on("deleteChat", async ({ sender, receiver }) => {
        try {
            await Message.updateMany(
                {
                    $or: [
                        { sender, receiver },
                        { sender: receiver, receiver: sender },
                    ],
                    deletedBy: { $ne: sender },
                },
                { $addToSet: { deletedBy: sender } }
            );

            const senderSocketId = connectedUsers.get(sender);
            if (senderSocketId) {
                io.to(senderSocketId).emit("chatDeleted", { receiver });
            }

            const receiverSocketId = connectedUsers.get(receiver);
            if (receiverSocketId) {
                io.to(receiverSocketId).emit("chatUpdated", { sender });
            }
        } catch (error) {
            console.error("Error deleting chat:", error);
        }
    });

    socket.on("markAsRead", async ({ sender, receiver }) => {
        try {
            const updatedMessages = await Message.updateMany(
                { sender, receiver, isRead: false },
                { $set: { isRead: true, status: 'read' } }
            );
            const messages = await Message.find({ sender, receiver, isRead: true });
            const room = [sender, receiver].sort().join("_");
            messages.forEach((msg) => {
                io.to(room).emit("messageStatusUpdated", msg);
            });
        } catch (error) {
            console.error("Error marking messages as read:", error);
        }
    });

    socket.on("disconnect", () => {
        for (let [email, socketId] of connectedUsers.entries()) {
            if (socketId === socket.id) {
                connectedUsers.delete(email);
                console.log(`User ${email} disconnected`);
                break;
            }
        }
    });
});

// ... (rest of the index.js file remains the same)
app.use(express.static(path.join(__dirname, "client", "dist")));
app.get("*", (_req, res) => {
    res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
















