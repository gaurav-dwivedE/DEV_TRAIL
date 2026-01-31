import userModel from "../models/user.model.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        const {
            name,
            email,
            password
        } = req.body || {}

        let user = await userModel.findOne({
            email
        })

        if (user) {
            return res.status(409).json({
                message: "User is already exist"
            })
        }

        let hashedPassword = await bcrypt.hash(password, 10)
        user = await userModel.create({
            name,
            email,
            password: hashedPassword
        })

        const userWithoutPassword = user.toObject();
        delete userWithoutPassword.password;

        const token = jwt.sign({id:user._id,email:user.email},process.env.JWT_SECRET,{expiresIn:'24h'})

        res.status(201).json({
            user:userWithoutPassword,
            token
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

export const login = async (req,res) => {
    try {
        let {email,password} = req.body || {}
        
        let user = await userModel.findOne({email})

        
        if(!user){
            return res.status(409).json({
                message:"Invalid email or password"
            })
        }

        const isValidPassword = await bcrypt.compare(password,user.password)

        if(!isValidPassword){
            return res.status(401).json({
                message:"Invalid email or password"
            })
        }

        const token = jwt.sign({id:user._id,email:user.email},process.env.JWT_SECRET,{expiresIn:'24h'})
        res.status(200).json({
            message:"Login successfully",
            token
        })

    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

export const profile = async (req,res)=>{
    try {
        let id = req.params.userId
    let user = await userModel.findById(id).select("-password")

    if(!user){
        return res.status(404).json({
            message:"User not found"
        })
    }

    res.status(200).json({
        user
    })
    } catch (error) {
         res.status(500).json({
            error: error.message
        })
    }
}

export const updateProfile = async (req,res)=>{
    try {
        let id = '697dd15d805c865383d3687b'
        const {email, name} = req.body || {}
       // let id = req.user.id 
    let updatedUser = await userModel.findByIdAndUpdate(id, { email, name }, {new: true}).select("-password")

    res.status(200).json({
        user:updatedUser
    })
    } catch (error) {
         res.status(500).json({
            error: error.message
        })
    }
}
