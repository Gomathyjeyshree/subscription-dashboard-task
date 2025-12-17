// controllers/authController.js
import User from "../models/user.model.mjs";
import bcrypt from "bcryptjs";
import { generateAccessToken, generateRefreshToken } from "../../utils/token.js";

export const register = async (req, res) => {
  const hashed = await bcrypt.hash(req.body.password, 10);
  const user = await User.create({ ...req.body, password: hashed });
  res.status(201).json({ message: "Registered successfully" });
};

export const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const payload = { id: user._id, role: user.role };
  res.json({
    accessToken: generateAccessToken(payload),
    refreshToken: generateRefreshToken(payload)
  });
};
