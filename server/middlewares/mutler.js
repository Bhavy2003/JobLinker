// import multer from "multer";

// const storage = multer.memoryStorage();
// export const singleUpload = multer({ storage }).single("file");

// import multer from "multer";

// const storage = multer.memoryStorage();
// export const singleUpload = multer({ storage }).fields([
//     { name: "profilePhoto", maxCount: 1 },
//     { name: "resume", maxCount: 1 }
// ]);

import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { UPLOADS_DIR } from "./setupUploads.js"; // Ensure setupUploads.js exists in the same directory

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure disk storage for files to be saved on the server
const diskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOADS_DIR);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname);
        cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
    },
});

// Configure memory storage for quick processing without saving to disk
const memoryStorage = multer.memoryStorage();

// File filter to restrict file types
const fileFilter = (req, file, cb) => {
    const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Invalid file type. Only images, PDFs, and Word documents are allowed."));
    }
};

// Middleware for chat file uploads (stored in memory)
export const chatFileUpload = multer({
    storage: diskStorage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
}).single("file");

// Middleware for profile and resume uploads (stored on disk)
export const singleUpload = multer({ storage: memoryStorage }).fields([
    { name: "profilePhoto", maxCount: 1 },
    { name: "resume", maxCount: 1 }
]);
