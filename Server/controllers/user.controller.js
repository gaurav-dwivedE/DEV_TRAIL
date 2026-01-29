import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body || {};
    const hashedPass = await bcrypt.hash(password, 10);

    let user = await userModel.findOne({ email });

    if (user) {
      return res.status(409).json({
        message: "user is already registered",
      });
    }

    user = await userModel
      .create({ name, email, password: hashedPass })
      
    const userWithoutPass  = user.toObject();
    delete userWithoutPass.password;

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" },
    );

    res.status(201).json({ token, user: userWithoutPass, token });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body || {};

    const user = await userModel.findOne({email}).lean();
    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }
    const { password: _, ...userWithoutPass } = user;

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" },
    );

    res.status(200).json({
        token,
      user: userWithoutPass,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export default { register, login };
