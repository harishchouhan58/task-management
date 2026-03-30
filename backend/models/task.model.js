import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "in-progress", "completed"],
        default: "pending", 
        required: true
    },
    publishdate: {
        type: Date,
        default: Date.now,
        required: true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
},{timestamps:true})

export const Task = mongoose.model("Task", taskSchema)