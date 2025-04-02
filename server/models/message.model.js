import mongoose from "mongoose";

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
    status: { type: String, default: "sent", enum: ["sent", "delivered", "read"] },
    reactions: [
      {
        user: String,
        emoji: String,
        timestamp: { type: Date, default: Date.now },
      },
    ],
    pinned: { type: Boolean, default: false }, // Ensure pinned field is defined
}, {
    indexes: [
      { key: { sender: 1, receiver: 1 } },
      { key: { timestamp: 1 } },
      { key: { status: 1 } },
      { key: { "reactions.user": 1 } },
    ],
    toJSON: { virtuals: true }, // Ensure virtuals are included in JSON serialization
    toObject: { virtuals: true }, // Ensure virtuals are included in toObject
});
// const messageSchema = new mongoose.Schema({
//     sender: String,
//     receiver: String,
//     text: String,
//     file: {
//         name: String,
//         type: String,
//         url: String,
//     },
//     timestamp: { type: Date, default: Date.now },
//     deletedBy: [{ type: String, default: [] }],
//     isRead: { type: Boolean, default: false },
//     status: { type: String, default: 'sent', enum: ['sent', 'delivered', 'read'] },
//     reactions: [
//         {
//             user: String, // The user who reacted
//             emoji: String, // The emoji used for the reaction (e.g., "👍")
//             timestamp: { type: Date, default: Date.now },
//         }
//     ], // Add status field
// }, {
//     indexes: [
//         { key: { sender: 1, receiver: 1 } },
//         { key: { timestamp: 1 } },
//         { key: { status: 1 } },
//         { key: { "reactions.user": 1 } },
//     ]
// });

 export default mongoose.model("Message", messageSchema);