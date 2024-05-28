const { default: mongoose } = require("mongoose");


const userSchema = new mongoose.Schema({
    username: {
        type:String,
        require:[true,"user name is required"],
        unique:true
    },
    email: {
        type:String,
        require:[true,"email is required"],
        unique:true
    },
    password: {
        type:String,
        require:[true,"password is required"]
        
    },
    isVerified: {
        type:Boolean,
        default: false
    },
    isAdmin: {
        type:Boolean,
        default: false
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,


})

export default  User = mongoose.models.users || mongoose.model("users",userSchema)