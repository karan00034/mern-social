import mongoose from "mongoose";
const userShema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        min: 2,
        max: 50,
    },
    lastName:{
        type:String,
        required:true,
        min: 2,
        max: 50,
    },
    email:{
        type:String
        ,required:true,
        max: 50,
    },
    password:{
        type:String,
        required:true
    },
    picturePath:{
        type:String,
        default:"",
    },
    friends:{
        type:Array,
        default:[],
    },
    location:String,
    occupation:String,
    viewedProfile: Number,
    impressions: Number,

},
{timestamps:true})

const User=mongoose.model("User",userShema);
export default User;