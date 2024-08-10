import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const secret=process.env.JWT_SECRET;

class Token{
    static createToken=(user)=>{
        if(!user) throw new Error('You must specify a user');
        const payload={id:user._id,email:user.email,profileSetup:user.profileSetup};
        const token=jwt.sign(payload,secret,{expiresIn:24*60*60*1000});
        return token;
    }
    
    static getPayload=(token)=>{
        if(!token) throw new Error('You must specify a token');
        const user=jwt.verify(token,secret);
        return user;
    }
}


export default Token;