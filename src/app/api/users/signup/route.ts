import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel"
import {NextRequest,NextResponse} from "next/server"
import bcryptjs from 'bcryptjs'
import { sendEmail } from "@/helpers/mailer";

connect()

export async function POST(request:NextRequest){
    try {
         const reqBody = request.json()
         const {username,email,password} = reqBody

         console.log(reqBody)

         const user = await User.findOne({email})

        //  check user exist or not
         if(user){
            return NextResponse.json({error:"user already exist"},{status:400})
         }

        //  hash password
        const salt = await bcryptjs.genSalt(10)
        const hashPassword = await bcryptjs.hash(password,salt) 

        // create new user for save database
        const newUser = new User({
            username,
            email,
            password:hashPassword
        })

        // save the user to the database

        const saveUser = await newUser.save()
        console.log(saveUser)

        // send verification email

        await sendEmail({email,emailType:"VERIFY",userId:saveUser._id})

        return NextResponse.json({
            message:"User register successfully",
            success: true,
            saveUser
        })




    } catch (error :any) {
        return NextResponse.json({
            error:error.message
        },{status:500})
        
    }
}
