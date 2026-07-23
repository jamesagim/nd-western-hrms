import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

// ==========================
// Register User
// ==========================
export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const adminExists = await Admin.findOne({
      email,
    });

    if (adminExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const admin = await Admin.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json({
      message:
        "User created successfully",

      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================
// Login
// ==========================
export const login = async (req, res) => {
  try {
    const { email, password } =
      req.body;

    const admin =
      await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({
        message:
          "Invalid email or password",
      });
    }

    const match =
      await bcrypt.compare(
        password,
        admin.password
      );

    if (!match) {
      return res.status(401).json({
        message:
          "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        id: admin._id,
        role: admin.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.json({
      token,

      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================
// Get Logged-in Admin
// ==========================
export const getProfile = async (
  req,
  res
) => {
  try {
    const admin =
      await Admin.findById(
        req.user._id
      ).select("-password");

    if (!admin) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json(admin);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================
// Update Logged-in Admin
// ==========================
export const updateProfile =
  async (req, res) => {
    try {
      const { name, email } =
        req.body;

      const admin =
        await Admin.findByIdAndUpdate(
          req.user._id,
          {
            name,
            email,
          },
          {
            new: true,
          }
        ).select("-password");

      res.json(admin);
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: error.message,
      });
    }
  };

// ==========================
// Change Password
// ==========================
export const changePassword =
  async (req, res) => {
    try {
      const {
        currentPassword,
        newPassword,
      } = req.body;

      const admin =
        await Admin.findById(
          req.user._id
        );

      const match =
        await bcrypt.compare(
          currentPassword,
          admin.password
        );

      if (!match) {
        return res.status(400).json({
          message:
            "Current password is incorrect",
        });
      }

      const hashedPassword =
        await bcrypt.hash(
          newPassword,
          10
        );

      admin.password =
        hashedPassword;

      await admin.save();

      res.json({
        message:
          "Password changed successfully",
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: error.message,
      });
    }
  };

// ==========================
// Get All Users
// ==========================
export const getUsers = async (
  req,
  res
) => {
  try {
    const users =
      await Admin.find().select(
        "-password"
      );

    res.json(users);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================
// Delete User
// ==========================
export const deleteUser =
  async (req, res) => {
    try {
      const user =
        await Admin.findByIdAndDelete(
          req.params.id
        );

      if (!user) {
        return res.status(404).json({
          message:
            "User not found",
        });
      }

      res.json({
        message:
          "User deleted successfully",
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: error.message,
      });
    }
  };

// ==========================
// Update User
// ==========================
export const updateUser =
  async (req, res) => {
    try {
      const {
        name,
        email,
        role,
      } = req.body;

      const user =
        await Admin.findByIdAndUpdate(
          req.params.id,
          {
            name,
            email,
            role,
          },
          {
            new: true,
          }
        ).select("-password");

      if (!user) {
        return res.status(404).json({
          message:
            "User not found",
        });
      }

      res.json(user);
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: error.message,
      });
    }
  };