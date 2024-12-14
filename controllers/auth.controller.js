import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import { generateVerificationToken } from '../utils/generatverificationToken.js';
import { generateTokenAndCookie } from '../utils/generateTokenandCookie.js';
import { sendVerificationEmail, sendWelcomeEmail } from '../mailtrap/emails.js';

export const signup = async (req, res) => {
    console.log(req.body);
    const {email,password,name} = req.body;
 try {
    if(!email || !password ||!name){
        throw new Error("All fields are required");
    }
    const userAlreadyExists = await User.findOne({email});
    if(userAlreadyExists){
        return res.status(400).json({message: "User already exists"});  
    }
     const hashedPassword = await bcryptjs.hash(password,10);
     const verificationToken =  Math.floor(1000*Math.random()*900).toString();
     const user = new User({
        email:email,
        password:hashedPassword,
        name:name,
        verificationToken,
        verificationTokenExpires:Date.now() + 2 * 60 * 60 * 1000,
     })
     await user.save();


     //jwt
     generateTokenAndCookie(res,user._id);
     await sendVerificationEmail(user.email,verificationToken);

     res.status(201).json({
        success:true,
        message:"User created successfully",
        user:{
         ...user._doc,
         password:null, 
        }
     });

 } catch (error) {
    res.status(400).json({message:error.message});
 }
}

export const verifyEmail = async (req, res) => {
  const {code} = req.body;
  try {
    const user = await User.findOne({
        verificationToken:code,
    verificationTokenExpires:{$gt:Date.now()}
    });
    if(!user){
        throw new Error("Invalid or expired token");
    }
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;
    await user.save();

    await sendWelcomeEmail(user.email,user.name);

    res.status(200).json({
        success:true,
        message:"Email verified successfully",
        user:{
            ...user._doc,
            password:null, 
         
        }
    });
  } catch (error) {
    
    res.status(400).json({message:error.message});
  }
}



export const login = async (req, res) => {
 res.send('Login');
}
export const logout = async (req,res)=>{
  res.send('Logout');
}