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
    reactions: [
      {
          emoji: String,
          users: [{ type: String }], // List of user emails who reacted with this emoji
          timestamp: { type: Date, default: Date.now },
      },
  ],
}, {
  indexes: [
      { key: { sender: 1, receiver: 1 } },
      { key: { deletedBy: 1 } },
      { key: { timestamp: 1 } },
  ],
});

export default mongoose.model("Message", messageSchema);