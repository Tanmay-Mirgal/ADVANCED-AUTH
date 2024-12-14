
import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';
import { generateTokenAndCookie } from '../utils/generateTokenandCookie.js';
import { sendPasswordResetEmail, sendResetSuccessEmail, sendVerificationEmail, sendWelcomeEmail } from '../mailtrap/emails.js';
import crypto from 'crypto';

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
  const {email,password} = req.body;
 try {
  const user = await User.findOne({email});
  if(!user){
    return res.status(401).json({message: 'User not found'});
  } 
  const isPasswordValid = await bcryptjs.compare(password,user.password);
  if(!isPasswordValid){
    return res.status(401).json({message: 'Invalid password'});

  }
  generateTokenAndCookie(res,user._id);
  user.lastlogin = new Date();
  user.save();

  res.status(200).json({
    succes:true,
    message:"Logged in successfully",
    user : {
      ...user._doc,
      password:null,
    },
  });
 } catch (error) {
  res.status(500).json({message:error.message});
 }
}
export const logout = async (req,res)=>{
  res.clearCookie('token');
  res.status(200).json({message:'Logged out successfully'});
}
export const  forgotPassword = async(req,res)=>{
  const {email} = req.body;
  try {
    const user = await User.findOne({email});
    if(!user){
      return res.status(404).json({message: 'User not found'});
    }
    //generate reset token 
    const resetToken = crypto.randomBytes(20).toString('hex');
    const resetTokenExpiry = Date.now()+ 1*60*60*1000;
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetTokenExpiry;
    await user.save();
    await sendPasswordResetEmail(user.email,`${process.env.CLIENT_URL}/reset-password/${resetToken}`);

    res.status(200).json({message:'Reset password link sent successfully'});

  } catch (error) {
    console.error(error);
    res.status(500).json({message:error.message});
  }
}

export const resetPassword = async(req,res)=>{
  
  try {
    const {token}= req.params;
    const {password}= req.body;
    const user = await User.findOne({
      resetPasswordToken:token,
      resetPasswordExpires:{$gt:Date.now()}
    });
    if(!user){
      return res.status(400).json({message: 'Token expired or invalid'});
    }
    const hashedPassword = await bcryptjs.hash(password,10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    await sendResetSuccessEmail(user.email);

    res.status(200).json({message:'Password reset successfully'});
  } catch (error) {
    console.error(error);
    res.status(500).json({message:error.message});
  }
}

export const checkAuth = async (req, res) => {
  try {
		const user = await User.findById(req.userId).select("-password");
		if (!user) {
			return res.status(400).json({ success: false, message: "User not found" });
		}

		res.status(200).json({ success: true, user });
	} catch (error) {
		console.log("Error in checkAuth ", error);
		res.status(400).json({ success: false, message: error.message });
	}
}