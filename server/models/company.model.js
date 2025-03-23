import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    website: { type: String },
    location: { type: String },
    email: { type: String, unique: true, sparse: true }, // <-- Use `sparse: true`
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    job: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
    logo: { type: String },
});

// Fix: Make sure `sparse: true` is added
export const Company = mongoose.model("Company", companySchema);


