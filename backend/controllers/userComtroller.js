import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"; //create authentication
import bcrypt from "bcrypt";
import validator from "validator";

//for login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User Doesn't exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }
    //if paswword is mattched then generate one token
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

//create token and send token using res to user
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

//register user
const registerUser = async (req, res) => {
  const { name, password, email, phoneNumber, address } = req.body;
  try {
    //checking user already exists
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }

    //validating email format and strong passsword
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    //password check
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong passord",
      });
    }

    //encrypt the passord to create account
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create new user
    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
      phoneNumber: phoneNumber,
      address: address,
    });

    //save user in database
    const user = await newUser.save();
    //taken user id and generate one token
    const token = createToken(user._id);
    res.json({ success: true, token }); //send the token as response
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const getUserDetails = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Extract token from Authorization header
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Authorization token is missing" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id).select("-password"); // Don't send password in response

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.json({ success: true, user });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching user details" });
  }
};

const updateUserProfile = async (req, res) => {
  const { fullName, email, phoneNumber, address, password } = req.body;
  const { userId } = req.user; // assuming userId is decoded from JWT

  try {
    const user = await userModel.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Update user information
    user.name = fullName || user.name;
    user.email = email || user.email;
    user.phoneNumber = phoneNumber || user.phoneNumber;
    user.address = address || user.address;

    // If password is provided, hash and update it
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();
    res.json({ success: true, message: "Profile updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error updating profile" });
  }
};
export { loginUser, registerUser, getUserDetails, updateUserProfile };
