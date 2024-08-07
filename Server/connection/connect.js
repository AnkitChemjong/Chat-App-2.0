import mongoose from "mongoose";

const connect=(url)=>{
    return mongoose.connect(url);
}
export default connect;