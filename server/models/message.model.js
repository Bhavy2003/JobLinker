import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    sender: String,
    receiver: String,
    text: String,
    reactions: [
      {
          emoji: String,
          user: String, // Email of the user who reacted
          timestamp: { type: Date, default: Date.now },
      },
  ],
    file: {
      name: String,
      type: String,
      url: String,
    },
    timestamp: { type: Date, default: Date.now },
    deletedBy: [{ type: String, default: [] }],
    isRead: { type: Boolean, default: false },
  });

export default mongoose.model("Message", messageSchema);