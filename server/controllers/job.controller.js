import  {Job}  from "../models/job.model.js";



export const postJob = async(req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const userId = req.id;

        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "Something is missing.",
                success: false
            })
        };
        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,
            created_by: userId
        });
        return res.status(201).json({
            message: "New job created successfully.",
            job,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}

export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        };

        const jobs = await Job.find(query)
            .populate("company") 
            .sort({ createdAt: -1 });

        if (!jobs.length) {  
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            });
        }

        return res.status(200).json({
            jobs,
            success: true
        });

    } catch (error) {
        console.error("Error fetching jobs:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


    // student
export const getJobById = async(req, res) => {
        try {
            const jobId = req.params.id;
            const job = await Job.findById(jobId).populate({
                path: "applications"
            });
            if (!job) {
                return res.status(404).json({
                    message: "Jobs not found.",
                    success: false
                })
            };
            return res.status(200).json({ job, success: true });
        } catch (error) {
            console.log(error);
        }
    }
    // all job created by specific admin
export const getAdminJobs = async(req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({ created_by: adminId }).populate({
            path: 'company',
            createdAt: -1
        });
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const deleteJob = async(req, res) => {
    const { jobId } = req.body;

    if (!jobId) {
        return res.status(400).json({ message: 'Job ID is required' });
    }

    try {
        // Find and delete the job by its ID
        const deletingJob = await Job.findByIdAndDelete(jobId);

        if (!deletingJob) {
            return res.status(404).json({ message: 'Job not found' });
        }
        // const remainingJobs = await Job.find();
        const remainingJobs = await Job.find().populate("company");

        

        return res.status(200).json({
            message: 'Job deleted successfully',
            remainingJobs,
        });
    } catch (error) {
        console.error('Error deleting job:', error);
        return res.status(500).json({
            message: 'Error deleting the job',
            error: error.message
        });
    }
};



export const updateJob = async (req, res) => {
    try {
        const { title,
            description,
            requirements,
            salary,
            location,
            jobType,
            position,
            jobId,experienceLevel,applications,company} = req.body;
        // Extract company ID
        //  const jobId = req.params.id; 
        const userId = req.id;  // Logged-in user ID (assuming it's stored in req.id)

        if (!userId) {
            return res.status(401).json({
                message: "User is not authenticated.",
                success: false
            });
        }

        if (!jobId) {
            return res.status(400).json({
                message: "Job ID is required.",
                success: false
            });
        }
      
        // Find company and check ownership
        const job = await Job.findOne({ _id: jobId});
       
        
        if (!job) {
            return res.status(404).json({
                message: "Job not found or you are not authorized to update it.",
                success: false
            });
        }

        // Prepare update data
        let updateData = { title,
            description,
            requirements,
            salary,
            location,
            jobType,
            position,
            jobId,experienceLevel,applications,company};

        // If file is uploaded, update logo
        if (req.file) {
            try {
                const file = req.file;
                const fileUri = getDataUri(file);
                const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
                updateData.logo = cloudResponse.secure_url;
            } catch (uploadError) {
                return res.status(500).json({
                    message: "Error uploading logo.",
                    success: false
                });
            }
        }

        // Update company
        const updatedJob = await Job.findByIdAndUpdate(jobId, updateData, { new: true });
        

        return res.status(200).json({
            message: "Job information updated successfully.",
            success: true,
            job: updatedJob
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "An error occurred while updating job information.",
            success: false
        });
    }
};





