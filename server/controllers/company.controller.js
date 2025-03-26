import { Company } from "../models/company.model.js";
import getDataUri from "../utils/datauri.js";
// import cloudinary from "../utils/cloudinary.js";
import {Job} from "../models/job.model.js";

import { v2 as cloudinary } from "cloudinary";
export const registerCompany = async (req, res) => {
    try {
        const { companyName, description, website, location, email,logo } = req.body;

        if (!companyName) {
            return res.status(400).json({ message: "Company name is required.", success: false });
        }

        // Ensure email is not undefined/null to avoid MongoDB unique constraint error
        const companyData = {
            name: companyName,
            description,
            website,
            location,
            email: email || undefined, // Fix: Only set email if provided
            userId: req.id,
            logo,
        };

        const company = await Company.create(companyData);

        return res.status(201).json({ message: "Company registered successfully.", company, success: true });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "An error occurred while registering the company.", success: false });
    }
};




export const getCompany = async(req, res) => {
        try {
            const userId = req.id; // logged in user id
            const companies = await Company.find({ userId });
            if (!companies) {
                return res.status(404).json({
                    message: "Companies not found.",
                    success: false
                })
            }
            return res.status(200).json({
                companies,
                success: true
            })
        } catch (error) {
            console.log(error);
        }
    }
    // get company by id

export const getCompanyById = async(req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false
            })
        }
        return res.status(200).json({
            company,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

// export const updateCompany = async (req, res) => {
//     try {
//         const { name, description, website, location , logo} = req.body;
//         const companyId = req.params.id;  // Extract company ID
//         const userId = req.id;  // Logged-in user ID (assuming it's stored in req.id)

//         if (!userId) {
//             return res.status(401).json({
//                 message: "User is not authenticated.",
//                 success: false
//             });
//         }

//         if (!companyId) {
//             return res.status(400).json({
//                 message: "Company ID is required.",
//                 success: false
//             });
//         }

//         // Find company and check ownership
//         const company = await Company.findOne({ _id: companyId, userId });

//         if (!company) {
//             return res.status(404).json({
//                 message: "Company not found or you are not authorized to update it.",
//                 success: false
//             });
//         }

//         // Prepare update data
//         let updateData = { name, description, website, location,logo };

//         // If file is uploaded, update logo
//         if (req.file) {
//             try {
//                 const file = req.file;
//                 const fileUri = getDataUri(file);
//                 const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
//                 updateData.logo = cloudResponse.secure_url;
//             } catch (uploadError) {
//                 return res.status(500).json({
//                     message: "Error uploading logo.",
//                     success: false
//                 });
//             }
//         }

//         // Update company
//         const updatedCompany = await Company.findByIdAndUpdate(companyId, updateData, { new: true });

//         return res.status(200).json({
//             message: "Company information updated successfully.",
//             success: true,
//             company: updatedCompany
//         });

//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({
//             message: "An error occurred while updating company information.",
//             success: false
//         });
//     }
// };




// Utility function to convert file buffer to Data URI






// export const updateCompany = async (req, res) => {
//     try {
//         const { name, description, website, location, logo } = req.body;
//         const companyId = req.params.id;
//         const userId = req.id;

//         console.log("Updating company with ID:", companyId, "by user:", userId);
//         console.log("Request body:", req.body);
//         console.log("Received files:", req.files);

//         if (!userId) {
//             return res.status(401).json({
//                 message: "User is not authenticated.",
//                 success: false,
//             });
//         }

//         if (!companyId) {
//             return res.status(400).json({
//                 message: "Company ID is required.",
//                 success: false,
//             });
//         }

//         // Validate companyId
//         if (!mongoose.Types.ObjectId.isValid(companyId)) {
//             return res.status(400).json({
//                 message: "Invalid company ID.",
//                 success: false,
//             });
//         }

//         const company = await Company.findOne({ _id: companyId, userId });
//         console.log("Found company:", company);

//         if (!company) {
//             return res.status(404).json({
//                 message: "Company not found or you are not authorized to update it.",
//                 success: false,
//             });
//         }

//         let updateData = { name, description, website, location };

//         if (logo) {
//             updateData.logo = logo;
//             console.log("Using logo URL from request body:", logo);
//         }

//         if (req.files && req.files.length > 0) {
//             try {
//                 const file = req.files[0];
//                 console.log("Processing file:", file.originalname, "MIME type:", file.mimetype, "Size:", file.size);

//                 // Verify file buffer
//                 if (!file.buffer || file.buffer.length === 0) {
//                     throw new Error("File buffer is empty or missing.");
//                 }

//                 // Upload the file directly to Cloudinary using the buffer
//                 const cloudResponse = await new Promise((resolve, reject) => {
//                     const uploadStream = cloudinary.v2.uploader.upload_stream(
//                         {
//                             folder: "company_logos",
//                             resource_type: "image",
//                             transformation: [
//                                 { width: 150, height: 150, crop: "fit" },
//                                 { quality: "auto" },
//                             ],
//                         },
//                         (error, result) => {
//                             if (error) {
//                                 reject(error);
//                             } else {
//                                 resolve(result);
//                             }
//                         }
//                     );
//                     uploadStream.end(file.buffer);
//                 });

//                 console.log("Cloudinary upload response:", cloudResponse);
//                 updateData.logo = cloudResponse.secure_url;

//                 // Delete the old logo from Cloudinary if it exists
//                 if (company.logo && typeof company.logo === "string") {
//                     const publicId = company.logo.split("/").pop().split(".")[0];
//                     console.log("Deleting old logo with publicId:", publicId);
//                     try {
//                         await cloudinary.v2.uploader.destroy(`company_logos/${publicId}`);
//                     } catch (destroyError) {
//                         console.error("Failed to delete old logo from Cloudinary:", destroyError);
//                     }
//                 }
//             } catch (uploadError) {
//                 console.error("Cloudinary upload error:", uploadError);
//                 return res.status(500).json({
//                     message: "Error uploading image to Cloudinary.",
//                     success: false,
//                     error: uploadError.message,
//                 });
//             }
//         }

//         const updatedCompany = await Company.findByIdAndUpdate(companyId, updateData, { new: true });
//         console.log("Updated company:", updatedCompany);

//         return res.status(200).json({
//             message: "Company information updated successfully.",
//             success: true,
//             company: updatedCompany,
//         });
//     } catch (error) {
//         console.error("Error updating company:", error);
//         return res.status(500).json({
//             message: "An error occurred while updating company information.",
//             success: false,
//             error: error.message,
//         });
//     }
// };

// export const updateCompany = async (req, res) => {
//     try {
//         const { name, description, website, location, logo } = req.body;
//         const companyId = req.params.id;
//         const userId = req.id;

//         console.log("Updating company with ID:", companyId, "by user:", userId);
//         console.log("Request body:", req.body);
//         console.log("Received file:", req.file);

//         if (!userId) {
//             return res.status(401).json({
//                 message: "User is not authenticated.",
//                 success: false,
//             });
//         }

//         if (!companyId) {
//             return res.status(400).json({
//                 message: "Company ID is required.",
//                 success: false,
//             });
//         }

//         if (!mongoose.Types.ObjectId.isValid(companyId)) {
//             return res.status(400).json({
//                 message: "Invalid company ID.",
//                 success: false,
//             });
//         }

//         const company = await Company.findOne({ _id: companyId, userId });
//         console.log("Found company:", company);

//         if (!company) {
//             return res.status(404).json({
//                 message: "Company not found or you are not authorized to update it.",
//                 success: false,
//             });
//         }

//         let updateData = { name, description, website, location };

//         if (logo) {
//             updateData.logo = logo;
//             console.log("Using logo URL from request body:", logo);
//         }

//         if (req.file) {
//             try {
//                 console.log("Processing file:", req.file.originalname, "MIME type:", req.file.mimetype, "Size:", req.file.size);

//                 if (!req.file.buffer || req.file.buffer.length === 0) {
//                     throw new Error("File buffer is empty or missing.");
//                 }

//                 const cloudResponse = await new Promise((resolve, reject) => {
//                     const uploadStream = cloudinary.uploader.upload_stream( // Use cloudinary.uploader (v2)
//                         {
//                             folder: "company_logos",
//                             resource_type: "image",
//                             transformation: [
//                                 { width: 150, height: 150, crop: "fit" },
//                                 { quality: "auto" },
//                             ],
//                         },
//                         (error, result) => {
//                             if (error) {
//                                 reject(error);
//                             } else {
//                                 resolve(result);
//                             }
//                         }
//                     );
//                     uploadStream.end(req.file.buffer);
//                 });

//                 console.log("Cloudinary upload response:", cloudResponse);
//                 if (!cloudResponse.secure_url) {
//                     throw new Error("Cloudinary upload failed: No secure_url returned.");
//                 }
//                 updateData.logo = cloudResponse.secure_url;

//                 if (company.logo && typeof company.logo === "string") {
//                     const publicId = company.logo.split("/").pop().split(".")[0];
//                     console.log("Deleting old logo with publicId:", publicId);
//                     try {
//                         await cloudinary.uploader.destroy(`company_logos/${publicId}`); // Use cloudinary.uploader (v2)
//                     } catch (destroyError) {
//                         console.error("Failed to delete old logo from Cloudinary:", destroyError);
//                     }
//                 }
//             } catch (uploadError) {
//                 console.error("Cloudinary upload error:", uploadError);
//                 return res.status(500).json({
//                     message: "Error uploading image to Cloudinary.",
//                     success: false,
//                     error: uploadError.message,
//                 });
//             }
//         }

//         const updatedCompany = await Company.findByIdAndUpdate(companyId, updateData, { new: true });
//         console.log("Updated company:", updatedCompany);

//         if (!updatedCompany) {
//             return res.status(500).json({
//                 message: "Failed to update company in the database.",
//                 success: false,
//             });
//         }

//         return res.status(200).json({
//             message: "Company information updated successfully.",
//             success: true,
//             company: updatedCompany,
//         });
//     } catch (error) {
//         console.error("Error updating company:", error);
//         return res.status(500).json({
//             message: "An error occurred while updating company information.",
//             success: false,
//             error: error.message,
//         });
//     }
// };
export const updateCompany = async (req, res) => {
    try {
      const { name, description, website, location } = req.body;
      const companyId = req.params.id;
      const userId = req.id;
  
      if (!userId) {
        return res.status(401).json({
          message: "User is not authenticated.",
          success: false,
        });
      }
  
      if (!companyId) {
        return res.status(400).json({
          message: "Company ID is required.",
          success: false,
        });
      }
  
      const company = await Company.findOne({ _id: companyId, userId });
      if (!company) {
        return res.status(404).json({
          message: "Company not found or you are not authorized to update it.",
          success: false,
        });
      }
  
      let updateData = { name, description, website, location };
  
      if (req.file) {
        try {
          const file = req.file;
          if (!file) {
            return res.status(400).json({
              message: "No file provided.",
              success: false,
            });
          }
          const fileUri = getDataUri(file);
          if (!fileUri) {
            return res.status(500).json({
              message: "Error processing file.",
              success: false,
            });
          }
          const publicId = `company_logos/${companyId}_${Date.now()}`;
          console.log("Uploading logo with public_id:", publicId);
          const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
            resource_type: "image",
            public_id: publicId,
            folder: "company_logos",
          });
          console.log("Cloudinary response:", cloudResponse);
          if (!cloudResponse?.secure_url) {
            return res.status(500).json({
              message: "Failed to upload logo to Cloudinary.",
              success: false,
            });
          }
          if (company.logo) {
            const oldPublicId = company.logo.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(`company_logos/${oldPublicId}`).catch(err => {
              console.error("Error deleting old logo from Cloudinary:", err);
            });
          }
          updateData.logo = cloudResponse.secure_url;
        } catch (uploadError) {
          console.error("Cloudinary upload error:", uploadError);
          return res.status(500).json({
            message: "Error uploading logo to Cloudinary.",
            success: false,
          });
        }
      }
  
      const updatedCompany = await Company.findByIdAndUpdate(companyId, updateData, { new: true });
      console.log("Updated company with new logo:", updatedCompany);
      if (!updatedCompany) {
        return res.status(500).json({
          message: "Failed to update company.",
          success: false,
        });
      }
  
      return res.status(200).json({
        message: "Company information updated successfully.",
        success: true,
        company: updatedCompany,
      });
    } catch (error) {
      console.error("Update company error:", error);
      return res.status(500).json({
        message: "An error occurred while updating company information.",
        success: false,
      });
    }
  };
import mongoose from "mongoose";

export const deleteCompany = async (req, res) => {
    try {
        const { companyId } = req.params;
        const userId = req.id;

        if (!userId) {
            return res.status(401).json({ message: "User is not authenticated.", success: false });
        }

        // ✅ Validate ObjectId
        const companyObjectId = mongoose.isValidObjectId(companyId) ? new mongoose.Types.ObjectId(companyId) : null;
        if (!companyObjectId) {
            return res.status(400).json({ message: "Invalid Company ID format.", success: false });
        }

        // 🔍 Check if the company exists
        const company = await Company.findById(companyObjectId);
        if (!company) {
            return res.status(404).json({ message: "Company not found.", success: false });
        }

        if (company.userId.toString() !== userId) {
            return res.status(403).json({ message: "You are not authorized to delete this company.", success: false });
        }

        // 🧐 Debug: Print all jobs in DB
        const allJobs = await Job.find({});
        // console.log("🔍 All jobs before deletion:", allJobs);

        // 🔍 Find jobs linked to this company (Fix: Use `company` field instead of `companyId`)
        const jobsBeforeDeletion = await Job.find({ 
            $or: [
                { company: companyObjectId },  
                { company: companyId.toString() }
            ]
        });
        // console.log(` Found ${jobsBeforeDeletion.length} jobs before deletion.`, jobsBeforeDeletion);

        if (jobsBeforeDeletion.length === 0) {
            // console.log(" No jobs found with the given companyId.");
        }

        // 🚀 Delete jobs (Fix: Use `company` field)
        const deletedJobs = await Job.deleteMany({ 
            $or: [
                { company: companyObjectId },  
                { company: companyId.toString() }
            ]
        });
        // console.log(` Deleted ${deletedJobs.deletedCount} jobs.`);

        // 🔥 Delete the company
        await Company.findByIdAndDelete(companyObjectId);

        return res.status(200).json({
            message: `Company and ${deletedJobs.deletedCount} related jobs deleted successfully.`,
            success: true
        });

    } catch (error) {
        console.error(" Delete error:", error);
        return res.status(500).json({ message: "An error occurred while deleting the company.", success: false });
    }
};










export const getCompaniesByUser = async (req, res) => {
    try {
        const userId = req.id; // Logged-in user's ID
        const companies = await Company.find({ userId });

        if (!companies.length) {
            return res.status(404).json({
                message: "No companies found for this user.",
                success: false
            });
        }

        return res.status(200).json({
            companies,
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "An error occurred while fetching companies.",
            success: false
        });
    }
};


