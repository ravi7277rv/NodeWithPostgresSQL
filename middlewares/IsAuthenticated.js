import client from "../db.js";
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';


dotenv.config();

export const tokenBlacklist = [];
export const IsAuthenticated = async ( req, res, next)  => {

    const token = req.headers.authorization;

    if(!token){
        return res.status(400).json({
            success:false,
            message:'You are Unauthorized',
        });
    }
    if(tokenBlacklist.includes(token)){
        return res.status(403).json({
            success:false,
            message:'Invalid Token! UnAuthorize'
        })
    }

    try {

        let decode = jwt.verify(token,process.env.SECRET_KEY);
        // console.log(decode.user.rows[0].id)
        let user = decode.user.rows[0]
        console.log(user)

        req.user = user;

        next();
        
    } catch (error) {
        if(error.message === 'jwt expired'){
            return res.status(500).json({
                success:false,
                message:'Your session has been expired, Please relogin yourself.'
            })
        }
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}



//Authorize Role function
export const AuthorizeRole =(...role) => {
    return ( req, res, next) =>{
        if(!role.includes(req.user.role)){
            return res.status(403).json({
                success:false,
                message:'You are Unthorize, You can not performe this action.'
            })
        }
        next();
    }
}



























































































