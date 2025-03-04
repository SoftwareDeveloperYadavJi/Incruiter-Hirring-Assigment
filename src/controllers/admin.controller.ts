import { Request, Response } from 'express';
import { UserModel } from '../models/user.models';
import jsonwebtoken from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { EmailSender } from '../utils/sendEmail';
import { userInput } from '../types/userInput';
import { generateRandomToken } from '../utils/generateToken';
import { generateRandomNumber } from '../utils/gererateOTP';


export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
         res.status(400).json({ message: 'Missing required fields' });
         return;
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
    }

    try {
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(401).json({ message: 'Incorrect password' });
            return;
        }

        const token = jsonwebtoken.sign({ id: user._id }, process.env.SECRET || 'secret', {
            expiresIn: '1h',
        });
        res.status(200).json({ message: 'Login successful', token });
        return;
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Error logging in' });
        return;
    }
};


export const register = async (req: Request, res: Response) => {
    const { name, email, password , passwordConfirm} = req.body;
    if (!name || !email || !password) {
        res.status(400).json({ message: 'Missing required fields' });
        return;
    }
    const userInputSchema = userInput.safeParse(req.body);
    if (!userInputSchema.success) {
        res.status(400).json({ message: userInputSchema.error.errors[0].message });
        return;
    }
    if (password !== passwordConfirm) {
        res.status(400).json({ message: 'Passwords do not match' });
        return;
    }
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
         res.status(400).json({ message: 'User already exists' });
         return;
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const otp = generateRandomNumber(6);
        const emailSender = new EmailSender();
        await emailSender.sendOTPEmail(email, name, otp);
        const user = await UserModel.create({
            name,
            email,
            password: hashedPassword,
            role: 'admin',
        });
        const token = jsonwebtoken.sign({ id: user._id }, process.env.SECRET || 'secret', {
            expiresIn: '1h',
        });
         res.status(201).json({ message: 'User created successfully', user, token });
        return;
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Error creating user' });
        return;
    }
};

export const sendTheEmailForResetPassword = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        if (!email) {
            res.status(400).json({ message: 'Missing required fields' });
            return;
        }
        const user = await UserModel.findOne({ email });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        const resetToken = generateRandomToken(12);
        user.passwordResetToken = resetToken;
        await user.save();

        const emailSender = new EmailSender();
        await emailSender.sendResePasswordLink(user.email, resetToken, user.name);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(501).json({ message: 'Internal server error' });
    }
};

export const resetPassword = async (req: Request, res: Response) => {
    try {
        const { resetToken } = req.query;
        const {password, passwordConfirm} = req.body;
        if (!resetToken) {
            res.status(400).json({ message: 'Missing required fields' });
            return;
        }
        if (!password || !passwordConfirm) {
            res.status(400).json({ message: 'Missing required fields' });
            return;
        }

        const user = await UserModel.findOne({ passwordResetToken: resetToken });
        if (!user) {
            res.status(404).json({ message: 'Invalid token' });
            return;
        }
        const newPassword = password;
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.passwordResetToken = null;
        await user.save();
        res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).json({ message: 'Error resetting password' });
    }
};

