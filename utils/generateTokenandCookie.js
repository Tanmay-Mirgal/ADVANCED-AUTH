import jwt from 'jsonwebtoken';
export const generateTokenAndCookie = (res,userId)=>{
    const token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:'1d'
    });
    res.cookie('token',token,{
        httpOnly:true,
        secure:process.envNODE_ENV === 'production',
        samesite:'strict',
        maxAge:86400000,
    });
    return token;
}