import type { Response } from "express";
import type { AuthRequest } from "../middleware/isAuth.js";
import { Chat } from "../models/chat.js";
import { Messages } from "../models/messages.js";
import axios from "axios";
import dotenv from "dotenv"

dotenv.config();

export const createNewChat = async(req : AuthRequest ,res : Response) =>{
    try { 
        const userId = req.user?._id;
        const {otherUserId} = req.body;

        if(!otherUserId) return res.status(404).json({message : "other user not found"});

        const existingChat = await Chat.findOne({users : {$all : [userId,otherUserId],$size:2}});

        if(existingChat) return res.status(200).json({message : "chat already exists", chatId : existingChat?._id})

        const newchat = await Chat.create({
            users : [userId,otherUserId],
        })

        res.status(201).json({
            message : "new chat created",
            chatId : newchat?._id
        })
    } catch (error) {
        console.log("error in creating chat",error);
    }
}


export const getAllChats = async(req : AuthRequest,res : Response) => {
    try {
        const userId = req.user?._id;

        if(!userId) return res.status(404).json({message : "user not found"});

        const chats  = await Chat.find({users : userId}).sort();

        // Get the token from the incoming request
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

        const chatWithUserData = await Promise.all(
            chats.map(async (chat) => {
                const otherUserId = chat.users.find((id) => id != userId);

                const unseenCount = await Messages.countDocuments({
                    chatId: chat._id,
                    sender: {$ne : userId},
                    seen : false,
                });

                try {
                    const {data} = await axios.get(
                        `${process.env.USER_SERVICE}/api/v1/user/${otherUserId}`,
                        {
                            headers: {
                                Authorization: token
                            }
                        }
                    );

                    return { 
                        user: data, 
                        chat: {
                            ...chat.toObject(),
                            latestMessage : chat.lastMessagge || null,
                            unseenCount,
                        }
                    }
                } catch (error) {
                    console.log("Error fetching user data:", error);
                    return {
                        chat: {
                            ...chat.toObject(),
                            latestMessage : chat.lastMessagge || null,
                            unseenCount,
                        }
                    }
                }
            })
        );

        res.json({
            chats: chatWithUserData
        });

    } catch (error) {
        console.log("Error in getAllChats:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

