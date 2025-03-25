// import DataUriParser from "datauri/parser.js"

// import path from "path";

// const getDataUri = (file) => {
//     const parser = new DataUriParser();
//     const extName = path.extname(file.originalname).toString();
//     return parser.format(extName, file.buffer);
// }

// export default getDataUri;

import DataUriParser from "datauri/parser.js";
import path from "path";

const getDataUri = (file) => {
    try {
        // Validate input
        if (!file || !file.originalname || !file.buffer) {
            throw new Error("Invalid file: File, originalname, or buffer is missing.");
        }

        // Validate buffer
        if (file.buffer.length === 0) {
            throw new Error("File buffer is empty.");
        }

        const parser = new DataUriParser();
        // Get the file extension without the leading dot (e.g., "png" instead of ".png")
        const extName = path.extname(file.originalname).toString().replace(/^\./, "");
        // Generate the Data URI
        const dataUri = parser.format(extName, file.buffer);

        // Ensure the result has a content property
        if (!dataUri.content) {
            throw new Error("Failed to generate Data URI: Content is missing.");
        }

        // Log the generated Data URI for debugging (first 100 characters)
        console.log("Generated Data URI (first 100 chars):", dataUri.content.substring(0, 100) + "...");

        // Return the Data URI string
        return dataUri.content;
    } catch (error) {
        console.error("Error generating Data URI:", error.message);
        throw new Error(`Failed to generate Data URI: ${error.message}`);
    }
};

export default getDataUri;