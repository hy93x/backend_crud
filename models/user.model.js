//tells us how the mongodb should looklike
//mdb is not structural

import mongoose from  "mongoose";
import bcrypt from "bcrypt"


// how the user should input details for registration

const userSchema = new mongoose.Schema(
 {
    username: {
        type : String,
        required: true,
        unique: true,
        lowercase: true,
        minLenght: 1,
        maxLenght: 30,
        trim: true
    },

    password: {
        type: String,
        required: true,
        minLenght: 6,
        maxLenght: 50,
    },

    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    }
 },

 {
    timestamps: true
 }
);


// using bcrypt to harsh the password before it saves the user password for registration
userSchema.pre("save", async function(next){
    if(!this.isModified("password"))
         return next;
    this.password = await bcrypt.hash(this.password, 10);
    next;
});


// login (after registration)
// compare the user password with the one used for registration before allowing the user login
userSchema.methods.comparePassword = async function(password){
return await bcrypt.compare(password, this.password)
}





export const User = mongoose.model("User", userSchema)