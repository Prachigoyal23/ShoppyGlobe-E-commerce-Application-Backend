import User from "../models/User.js"; // import the User model from MongoDB
import bcrypt from "bcryptjs"; // use to hash password
import jwt from "jsonwebtoken"; // use to create and verify tokens
import dotenv from "dotenv";

dotenv.config();

// Inline strong password validator
function isStrongPassword(password) {
  // At least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password);
}


// Get All Registered Users (Only Admin can access them)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password"); // exclude password from response
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

//Register User New User 
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if(!name || name.trim() === ""){
      return res.status(400).json({message: "name feild is missing"})
    }
    if (!email || email.trim() === "") {
      return res.status(400).json({ message: "Email field is required" });
    }
    // Email format validation
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    if (!password) {
      return res.status(400).json({ message: "Password field is required" });
    }
    if (!isStrongPassword(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters and include uppercase, lowercase, number, and special character"
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ 
        name, 
        email, 
        password: hashedPassword, 
        role //  this will take 'admin' if provided
    });
    await newUser.save();

    res.status(201).json({ message: `${name} as ${role} registered successfully` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Login User

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body; // get login info from request
    const user = await User.findOne({ email }); // check user exist or not

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password); // compare password
    console.log(isMatch); // should be true or false
    if (!isMatch)
      res.status(400).json({ message: "Invalid email or password" });

    // create JWT token with user ID and find role(admin or user)
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    console.log("token", token);

    res.status(200).json({ message:'Here your token use for Login', token }); // send token to frontend
  } catch (error) {
    console.error("🔥 Login Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};



// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODcxNDJmMDMwNmJmNWQ3YThkYzNkYTkiL
// CJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NTIyNTMzMDcsImV4cCI6MTc1MjI1NjkwN30.gJ2l7b4VLrC6IcBHHBmzY
// cUD5Eok6eW9YPpMRzIjBIA