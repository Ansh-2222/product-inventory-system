import bcrypt from "bcrypt";

import {
  createUser,
  findUserByEmail
} from "../models/userModel.js";

import { generateToken } from "../utils/jwt.js";
import { sendOTPEmail } from "../utils/emailService.js";
import {
  saveTempUser,
  getTempUser,
  deleteTempUser
} from "../utils/tempStore.js";


// STEP 1: SEND OTP (NO DB SAVE)
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const passwordHash = await bcrypt.hash(password, 10);

    // store temp user
    saveTempUser(email, {
      name,
      email,
      passwordHash,
      otp
    });

    await sendOTPEmail(email, otp);

    res.json({
      message: "OTP sent to email"
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const tempUser = getTempUser(email);

    if (!tempUser) {
      return res.status(400).json({
        message: "OTP expired or not found"
      });
    }

    if (tempUser.otp !== otp) {
      return res.status(400).json({
        message: "Invalid OTP"
      });
    }

    //  SAVE ONLY AFTER VERIFICATION
    const user = await createUser(
      tempUser.name,
      tempUser.email,
      tempUser.passwordHash,
      true,   //  email verified
      false   // future phone verification
    );

    // delete temp data
    deleteTempUser(email);

    const token = generateToken(user);

    res.json({
      message: "User registered successfully",
      token
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// LOGIN USER
export const login = async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(400).json({
        message: "User not found"
      });
    }

    const validPassword = await bcrypt.compare(
      password,
      user.password_hash
    );

    if (!validPassword) {
      return res.status(400).json({
        message: "Invalid password"
      });
    }

    if (!user.email_verified) {
      return res.status(403).json({
        message: "Please verify your email first"
      });
    }

    const token = generateToken(user);

    res.json({ token });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

};