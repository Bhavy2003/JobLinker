// import mongoose from "mongoose";

// const messageSchema = new mongoose.Schema({
//     sender: String,
//     receiver: String,
//     text: String,
//     file: {
//       name: String,
//       type: String,
//       url: String,
//     },
//     timestamp: { type: Date, default: Date.now },
//     deletedBy: [{ type: String, default: [] }],
//     isRead: { type: Boolean, default: false },
    
// });

// export default mongoose.model("Message", messageSchema);

// message.model.js
// message.model.js
import mongoose from "mongoose";

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
    status: { 
        type: String, 
        enum: ['sent', 'delivered', 'read'], 
        default: 'sent' 
    },
}, {
    indexes: [
        { key: { sender: 1, receiver: 1 } },
        { key: { deletedBy: 1 } },
        { key: { timestamp: 1 } }
    ]
});

export default mongoose.model("Message", messageSchema);