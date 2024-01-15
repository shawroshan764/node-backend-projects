import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../schemas/UserSchema";
import jwt from "jsonwebtoken";

export const signup = async (req: Request, res: Response) => {
    try {
        let { name, email, password, mobile } = req.body;
        const isUserExists = await User.findOne({ email });

        if (isUserExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const saltRounds = 10;
        const hashPassword = await bcrypt.hash(password, saltRounds);
        const newUser = new User({
            name, email, password: hashPassword, mobile
        });

        await newUser.save();
        return res.status(200).json({ message: "User registered successfully!" });
    } catch (error) {
        console.error("Internal error", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password.' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Invalid email or password.' });
        }
        const secretKey = process.env.JWT_SECRET_KEY || 'default-secret-key';
        const token = jwt.sign({ _id: user._id, email: user.email }, secretKey, {
            expiresIn: '1d',
        });

        res.setHeader('Authorization', `Bearer ${token}`);
        res.setHeader('Access-Control-Expose-Headers', 'Authorization');

        return res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error in user login:', error);
        return res.status(500).json({ error: 'An unexpected error occurred during login.' });
    }
};
