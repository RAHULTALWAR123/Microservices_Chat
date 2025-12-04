import mongoose, { Document, Schema, Types } from "mongoose";
const schema = new Schema({
    chatId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Chat"
    },
    sender: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: false
    },
    image: {
        url: { type: String },
        publicId: { type: String }
    },
    messageType: {
        type: String,
        default: "text",
        enum: ["text", "image"]
    },
    seen: {
        type: Boolean,
        default: false
    },
    seenAt: {
        type: Date,
        default: null
    }
}, {
    timestamps: true
});
export const Messages = mongoose.model("Messages", schema);
//# sourceMappingURL=messages.js.map