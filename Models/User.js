import mongoose from "mongoose";
const databaseUser = mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
        },
        password:{
            type:String,
            required:true
            }
})
const User = mongoose.model("Users", databaseUser);
export default User;

