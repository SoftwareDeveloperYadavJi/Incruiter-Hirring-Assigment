import nodemailer from 'nodemailer';
export class EmailSender {
    private transporter: nodemailer.Transporter;

    constructor() {
        // Updated configuration for Gmail
        this.transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com', // Specific Gmail SMTP server
            port: 465, // SSL port for Gmail
            secure: true, // Use SSL
            auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD, // This should be an App Password for Gmail
            },
            tls: {
                rejectUnauthorized: false, // Helps avoid certificate issues
            },
        });
    }

    async sendOTPEmail(to: string, userName: string, otp: string) {
        try {
            console.log(`Sending OTP email to: ${to}`);
            const html = `
            <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>OTP Verification</title>
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px;">
        <div style="max-width: 600px; background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); text-align: center; margin: auto;">
            <h2 style="color: #333;">OTP Verification</h2>
            <p style="color: #555;">Hello <strong>${userName}</strong>,</p>
            <p style="color: #555;">Your One-Time Password (OTP) for verification is:</p>
            <p style="font-size: 24px; font-weight: bold; color: #007bff; background: #f0f8ff; display: inline-block; padding: 10px 20px; border-radius: 5px;">${otp}</p>
            <p style="color: #777;">Please enter this OTP to complete your verification. This code is valid for <strong>10 minutes</strong>.</p>
            <p style="color: #777;">If you did not request this, please ignore this email.</p>
            <p style="color: #999; font-size: 12px;">&copy; 2025 Your Company. All rights reserved.</p>
        </div>
    </body>
    </html>`;

           

            const mailOptions = {
                from:
                    process.env.MAIL_FROM ||
                    '2203051050875@paruluniversity.ac.in',
                to: to,
                subject:
                    'Welcome to Parul University Campus Cuisine - Verify Your Account',
                html: html,
            };

            const result = await this.transporter.sendMail(mailOptions);
            console.log('Email sent successfully');
            return result;
        } catch (error) {
            console.error('Failed to send email:', error);
            throw error;
        }
    }


    async sendResePasswordLink(to: string, resetToken: string, name: string) {
        try {
            console.log(`Sending password reset email to: ${to}`);
            const BASEURL = process.env.BASE_URL;
            const html = `<!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Password Reset Request</title>
        </head>
        <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px;">
            <div style="max-width: 600px; background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); text-align: center; margin: auto;">
                <h2 style="color: #333;">Password Reset Request</h2>
                <p style="color: #555;">Hello, ${name}</p>
                <p style="color: #555;">You recently requested to reset your password. Click the button below to reset it:</p>
                <a href="${BASEURL}/reset-password?resetToken=${resetToken}"
                style="display: inline-block; padding: 12px 20px; margin: 20px 0; font-size: 16px; color: #fff; background: #007bff; text-decoration: none; border-radius: 5px;">
                Reset Password
                </a>
                <p style="color: #777;">If you did not request this, please ignore this email.</p>
                <p style="color: #999; font-size: 12px;">This link will expire in 1 hour for security reasons.</p>
                <p style="color: #999; font-size: 12px;">&copy; 2025 Your Company. All rights reserved.</p>
            </div>
        </body>
        </html>
        `
            const mailOptions = {
                from:
                    process.env.MAIL_FROM || '',
                to: to,
                subject:
                    'Password Reset Request',
                html: html,
            };

            const result = await this.transporter.sendMail(mailOptions);
            console.log('Email sent successfully');
            return result;

        } catch (error) {
            console.error('Failed to send email:', error);
            throw error;
        }
    }
}

