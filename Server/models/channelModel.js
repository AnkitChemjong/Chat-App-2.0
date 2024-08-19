import {Schema,model} from 'mongoose';

const channelSchema=new Schema({
    name:{
        type: String,
        required: true
    },
    members:[{type:Schema.Types.ObjectId,ref:"Users", required:true}],
    admin:{
        type:Schema.Types.ObjectId,
        ref:"Users",
        required: true
    },
    messages:[
        {
            type:Schema.Types.ObjectId,
            ref:"Users",
            required: false
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now()
    },
    updatedAt:{
        type:Date,
        default:Date.now()
    }
})

channelSchema.pre("save",function(next){
  this.updatedAt=Date.now();
  next();
})
channelSchema.pre("findOneAndUpdate",function(next){
    this.set({updatedAt:Date.now()});
    next();
  })


const Channel=model("Channel",channelSchema);
export default Channel;