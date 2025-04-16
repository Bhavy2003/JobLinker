import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async(req, res) => {
    try {
        const { fullname, email, password, role, phoneNumber} = req.body;

        

        // Check if any required field is missing
        if (!fullname || !email || !password || !role || !phoneNumber ) {
            return res.status(400).json({
                message: "Required All Fileds",
                success: false,
            });
        }


        let profilePhotoUrl = null;
        const file = req.file;
        if (file) {
            const fileUri = getDataUri(file);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
            profilePhotoUrl = cloudResponse.secure_url;
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: 'User already exists with this email.',
                success: false,
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            fullname,
            email,

            password: hashedPassword,
            role,
           
            phoneNumber,
            profile: {
                profilePhoto: profilePhotoUrl,
            },
        });

        return res.status(201).json({
            message: "Account created successfully.",
            success: true,
            user: {
                fullname: newUser.fullname,
                email: newUser.email,
                phoneNumber: newUser.phoneNumber,
                role: newUser.role,
                profilePhoto: newUser.profile.profilePhoto,
            },
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server error",
            success: false,
            error: error.message,
            false: error
        });
    }
};



export const login = async(req, res) => {
    try {
        

        const { email, password, role } = req.body;

        if (!email || !password || !role) {
            
            return res.status(400).json({
                message: "Something is missing",
                success: false,
            });
        }

    
        let user = await User.findOne({ email }).populate('profile.savedJobs');  // <-- Populate savedJobs
        if (!user) {
            
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            });
        }

       
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
           
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            });
        }

        if (role !== user.role) {
          
            return res.status(400).json({
                message: "Account doesn't exist with current role.",
                success: false,
            });
        }

        const tokenData = { userId: user._id };
        const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

      

        return res
            .status(200)
            .cookie("token", token, {
                maxAge: 24 * 60 * 60 * 1000,
                // httpOnly: true,
                sameSite: 'none',
                secure: true,
            })
            .json({
                message: `Welcome back ${user.fullname}`,
                user,
                success: true,
                savedJobs: user.profile.savedJobs // <-- Return savedJobs in response
            });

    } catch (error) {
        console.error("Error in login route:", {
            message: error.message,
            stack: error.stack,
        });

        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
            success: false,
        });
    }
};


export const logout = async(req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully.",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}



export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        const userId = req.id;

        let user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({ message: "User not found.", success: false });
        }

        // Handle profile image upload
        if (req.files?.profilePhoto?.[0]) {
            const fileUri = getDataUri(req.files.profilePhoto[0]);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
            user.profile.profilePhoto = cloudResponse.secure_url;
        }

        // Handle resume upload
        if (req.files?.resume?.[0]) {
            const fileUri = getDataUri(req.files.resume[0]);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
                resource_type: "raw",
                format: "pdf",
                type: "upload",
                folder: "resumes",
                use_filename: true,
                unique_filename: false,
            });
            user.profile.resume = cloudResponse.secure_url;
            user.profile.resumeOriginalName = req.files.resume[0].originalname;
        }

        // Updating text fields
        if (fullname) user.fullname = fullname;
        if (email) user.email = email;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (bio) user.profile.bio = bio;
        if (skills) user.profile.skills = skills.split(",");

        await user.save();

        // Populate savedJobs before returning the user
        await user.populate('profile.savedJobs');

        return res.status(200).json({
            message: "Profile updated successfully.",
            user,
            success: true,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error.", success: false });
    }
};

export const savedJobs = async(req, res) => {
    try {
        const { jobId } = req.body;
        const userId = req.id;

        let user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            })
        }

        if (user.profile.savedJobs.includes(jobId)) {
            return res.status(400).json({
                message: "Job is already saved",
                success: false
            })
        }

        user.profile.savedJobs.push(jobId);
        await user.save()

        await user.populate('profile.savedJobs');
        return res.status(200).json({
            user,
            message: "Job saved successfully",
            success: true,
            savedJobs: user.profile.savedJobs
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "An error occurred",
            error: error.message,
            success: false
        });

    }
}
export const getSavedJobs = async (req, res) => {
    try {
        const userId = req.id;

        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false,
            });
        }

        // Populate savedJobs to return full job objects
        await user.populate('profile.savedJobs');

        return res.status(200).json({
            success: true,
            savedJobs: user.profile.savedJobs || [],
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "An error occurred while fetching saved jobs",
            error: error.message,
            success: false,
        });
    }
};
export const getUsers = async (req, res) => {
    try {
      // Fetch all reviews
      const users = await User.find().populate('fullname', 'email'); // Populate company name
      res.status(200).json(users); // Send the reviews in response
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error. Try again later!" });
    }
  };

  export const removeSavedJob = async (req, res) => {
    try {
        const { jobId } = req.body;
        const userId = req.id;

        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false,
            });
        }

        // Check if the job is in savedJobs
        if (!user.profile.savedJobs.includes(jobId)) {
            return res.status(400).json({
                message: "Job is not saved",
                success: false,
            });
        }

        // Remove the jobId from savedJobs
        user.profile.savedJobs = user.profile.savedJobs.filter(
            (id) => id.toString() !== jobId.toString()
        );
        await user.save();

        // Populate savedJobs to return full job objects
        await user.populate('profile.savedJobs');

        return res.status(200).json({
            message: "Job removed from saved jobs successfully",
            success: true,
            savedJobs: user.profile.savedJobs,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "An error occurred while removing the job",
            error: error.message,
            success: false,
        });
    }
};