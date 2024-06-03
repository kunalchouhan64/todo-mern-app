import mongoose from "mongoose";


// Defining the Schema for the user
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        unique: true,
        required: [true, "Password must be required..."],
    }
}, { timestamps: true })

// we are exporting the userSchema from here, so that we can use it wherever we want. 
export const User = mongoose.model('User', userSchema)