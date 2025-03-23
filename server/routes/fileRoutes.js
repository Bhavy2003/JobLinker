import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve uploaded files
router.get("/uploads/:filename", (req, res) => {
    const { filename } = req.params;
    const filePath = path.join(__dirname, "../uploads", filename);
    res.sendFile(filePath, (err) => {
        if (err) {
            console.error("Error serving file:", err);
            res.status(404).json({ message: "File not found" });
        }
    });
});

export default router;