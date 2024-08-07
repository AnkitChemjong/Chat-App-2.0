import {Schema,model} from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const userSchema=new Schema({
    email:{
        type:String,
        required:[true, "email is required"],
        unique:true,
        validate:[validator.isEmail,"type should be email"]
    },
    password:{
        type:String,
        required:[true, "password is required"],
        unique:true,
    },
    firstName:{
        type:String,
        required:false,
    },
    lastName:{
        type:String,
        required:false,
    },
    image:{
        type:String,
        required:false,
    },
    color:{
        type:Number,
        required:false,
    },
    profileSetup:{
        type:Boolean,
        default:false,
    }
});

userSchema.pre('save',async function(next){
try{
    const user=this;
    if(!user.isModified('password')) return next();
    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(user.password,salt);
    this.password = hashedPassword;
    next();

}catch(e){
  throw new Error('error hashing the pass'+e);
}
});


const User=model('User',userSchema);
export default User;