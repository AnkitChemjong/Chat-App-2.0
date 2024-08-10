import jwt from 'jsonwebtoken';
import Token from '../services/service.js';

class Middleware{
    static verifyToken=(cookieName)=>{
        return async (req,res,next)=>{
            try{

                if(!cookieName) return next();
                req.user=null;
                const token=req.cookies[cookieName];
                if(!token) return next();
                const payload=Token.getPayload(token);
                if(!payload) return next();
                req.user=payload;
                next();
            }
            catch(error){
                throw new Error("Error getting the token and payload");
            }
        }
       
    }
}

export default Middleware;