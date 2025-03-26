import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    review: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    // logo: { type: String, 
    //     default:""
        
    // },
}, { timestamps: true });




export default  mongoose.model('Review', reviewSchema);
