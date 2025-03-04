import mongoose, { Document, Schema, model } from "mongoose";

// Define the Post interface extending Document for TypeScript safety
export interface PostDocument extends Document {
    title: string;
    content: string;
    author: mongoose.Schema.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

// Define the Post Schema with best practices
const postSchema = new Schema<PostDocument>(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
            trim: true,
            minlength: [5, "Title must be at least 5 characters long"],
            maxlength: [100, "Title cannot exceed 100 characters"],
        },
        content: {
            type: String,
            required: [true, "Content is required"],
            trim: true,
            minlength: [10, "Content must be at least 10 characters long"],
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Author is required"],
        },
    },
    {
        timestamps: true,
        versionKey: false, 
    }
);



// Create and export the Post model
export const PostModel = model<PostDocument>("Post", postSchema);
