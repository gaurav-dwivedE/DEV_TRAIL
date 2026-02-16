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
        _id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" },
    );

  res
  .cookie("token", token, {
    httpOnly: true,        // JS se access nahi hoga (secure)
    secure: process.env.NODE_ENV === "production", // HTTPS only in prod
    sameSite: "lax",    // CSRF protection
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  })
  .status(201)
  .json({
    success: true,
    user: userWithoutPass
  });

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
        _id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" },
    );

    res
  .cookie("token", token, {
    httpOnly: true,        // JS se access nahi hoga (secure)
    secure: process.env.NODE_ENV === "production", // HTTPS only in prod
    sameSite: "lax",    // CSRF protection
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  })
  .status(200)
  .json({
    success: true,
    user: userWithoutPass
  });
   } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const profile = async (req, res) => {
   try {
      const userId = req.params.userId; 
      const user = await userModel.findById(userId).select('-password');
      if(!user){
        return  res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ user });
    }
    catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }

}

const updateProfile = async (req, res) => {
    try {
        const userId = '697b5319d4c2bc5f718218d9';
        const { email, name } = req.body || {};

        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            { email, name },
            { new: true }
        ).select('-password');

        res.status(200).json({ user: updatedUser });
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
}

const getme = async (req, res) => {
  try {
    const userId = req.user._id
    console.log(userId);
    
    const user = await userModel.findById(userId).select("-password")
    if(!user){
      return res.status(404).json({
        message: "User not found"
      })
    }
    res.status(200).json({
      message: "user fetched",
      user
    })
  } catch (error) {
    console.log(error);
    
    res.status(500).json({
      error: error.message
    })
  }
}

const logout = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Logout failed",
    });
  }
};

export default { register, login, profile, updateProfile, getme, logout };
