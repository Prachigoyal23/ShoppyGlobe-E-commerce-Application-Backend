import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    email:{
        type: String,
        unique: true,
        required: [true, "Email field is required"],
        match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid email address"
    ]
    },
    password: {
    type: String,
    required: [true, "Password field is required"]
  },
    role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
})

export default mongoose.model('User', userSchema);