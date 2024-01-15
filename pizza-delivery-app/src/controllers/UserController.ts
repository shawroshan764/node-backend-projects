import { Request,Response } from "express";
import bcrypt from "bcrypt";
import User from "../schemas/UserSchema";
import { IUserInputDTO } from '../interfaces/UserInterface';


export const signup = async(req:Request,res:Response) => {
    try {
        let {name,email,password,mobile} = req.body;
        const isUserExists = await User.findOne({email});
        if(isUserExists) return res.status(400).json({message:"User already exists"});

        const saltRounds = 10;
        const hashPassword = await bcrypt.hashSync(password,saltRounds);
        const newUser = new User({
            name,email,password:hashPassword, mobile
        });

        await newUser.save();
        return res.status(200).json({ message: "User registered successfully!" });
    } catch (error) {
        console.log("Internal error", error);
    }
}