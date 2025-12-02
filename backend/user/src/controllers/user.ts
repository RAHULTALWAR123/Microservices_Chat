
import type { Request, Response } from "express";
import { redisClient } from "../index.js";
import { publishToQueue } from "../config/rabbitmq.js";
import { User } from "../model/user.js";
import { generateToken } from "../config/generateToken.js";
import type { AuthRequest } from "../middleware/isAuth.js";

export const loginUser = async(req:Request,res:Response) => {
    try {
        const {email} = req.body;

        const rateLimitKey = `otp:ratelimit:${email}`;

        const ratelimit = await redisClient.get(rateLimitKey);
        if(ratelimit){
            res.status(429).json({
                message : "too many requests"
            })
            return;
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        const otpkey = `otp:${email}`;
        await redisClient.set(otpkey,otp,{
            EX:300
        })

        await redisClient.set(rateLimitKey,"true",{
            EX:60
        })

        const message = {
            to: email,
            subject: "Your otp code",
            body: `your otp code is ${otp}`
        }

        await publishToQueue("send-otp",message);
        res.status(200).json({
            message: "otp sent to your email"
        })

        
    } catch (error) {
        console.log("error in login",error);
    }
}

export const verifyUser = async(req : Request,res : Response) => {
    try {

    const {email,otp} = req.body;

    if(!email || !otp) return res.status(404).json("missing fields");

    const otpkey = `otp:${email}`;
    const storedOtp = await redisClient.get(otpkey);

    if(!storedOtp || storedOtp != otp){
        return res.status(400).json("invalid or expired otp");
    }

    await redisClient.del(otpkey);

    let user = await User.findOne({email});
    if(!user){
        const name = email.slice(0,8);
        user = await User.create({name,email});
    }

    const token = generateToken(user);

    res.status(200).json({
        message : "user verified",
        user,
        token
    })

    } catch (error) {
        console.log("error in verifying",error);
    }
    
}

export const profile = async(req : AuthRequest,res : Response) => {
    try {
        const user  = req.user;
        res.json(user);

    } catch (error) {
        console.log("error in profile",error);
    }
}

export const updateUser = async (req: AuthRequest, res: Response) => {
    try {
        const user  = await User.findById(req.user._id);
        
        if(!user){
            return res.status(404).json("user not found");
        }

        user.name = req.body.name;

        await user.save();
        const token = generateToken(user);

        res.status(200).json({
            message : "user updated",
            user,
            token
        })


    } catch (error) {
        console.log("error updating user", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find()

        res.status(200).json({ users });

    } catch (error) {
        console.log("error getting all users", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getAUser = async(req : Request,res : Response) => {
    try {
        const user  = await User.findById(req.params.id);
        res.status(200).json({ user })
        
    } catch (error) {
         console.log("error getting a user", error);
        res.status(500).json({ message: "Internal server error" });
    }
}