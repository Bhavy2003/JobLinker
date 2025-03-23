import mongoose from "mongoose";

const connectDB = async() => {
    try {
        await mongoose.connect('mongodb+srv://bhavyj:eSx9DCDO9iZT9o7Z@cluster1.oxojj.mongodb.net/');
        
    } catch (error) {
        console.log(error);
        
    }
}
export default connectDB;