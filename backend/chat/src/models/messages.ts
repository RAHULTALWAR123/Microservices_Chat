import mongoose, { Document, Schema, Types } from "mongoose";

export interface IMessage extends Document {
  chatId: Types.ObjectId;
  sender: string;
  text?: string;
  image?: {
    url: string;
    publicId: string;
  };
  messageType: "text" | "image";
  seen: boolean;
  seenAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const schema: Schema<IMessage> = new Schema(
  {
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
      url: { type: String},
      publicId: { type: String}
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
      default:null
    }
  },
  {
    timestamps: true
  }
);

export const Messages = mongoose.model<IMessage>("Messages", schema);
