import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

export const requireSignIn = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).send({
        success: false,
        message: "Authentication failed. Token must be provided.",
      });
    }
    const token = authHeader.split(" ")[1];
    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("requireSignIn error:", error);
    return res.status(401).send({
      success: false,
      message: "Authentication failed. Invalid or expired token.",
    });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized access. User not authenticated.",
      });
    }
    const user = await userModel.findById(req.user._id);
    if (!user || user.role !== 1) {
      return res.status(403).send({
        success: false,
        message: "Unauthorized access. Admin rights required.",
      });
    }
    next();
  } catch (error) {
    console.error("isAdmin error:", error);
    return res.status(500).send({
      success: false,
      message: "Internal server error.",
    });
  }
};
