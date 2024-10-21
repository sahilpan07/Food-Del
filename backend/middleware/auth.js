import jwt from "jsonwebtoken"


//WHEN USER SEND DATA THE USER USER TOKEN TO AUTHENTICATETHEM
//SO TO DECODE THE TOKEN WE USE MIDDLEWRE

//middlewaere basically take token and convert it to user id
const authMiddleware = async (req,res,next)=>{
    const {token} = req.headers;
    if (!token) {
        return res.json({success:false,message:"Not Authorized Login Again"})
    }
    try {
        const token_decode = jwt.verify(token,process.env.JWT_SECRET);
        req.body.userId = token_decode.id;
        req.body.userEmail = token_decode.email;
        next();
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

export default authMiddleware;
