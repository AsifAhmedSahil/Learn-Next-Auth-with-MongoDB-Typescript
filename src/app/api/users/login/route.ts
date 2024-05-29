import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel"
import {NextRequest,NextResponse} from "next/server"
import bcryptjs from 'bcryptjs'
import jwt from "jsonwebtoken"

connect()

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json()
        const {email,password}  = reqBody
        console.log(reqBody)

        const user = await User.findOne({email})

        if(!user){
            return NextResponse.json({
                message: "User does not exists!"
            },{status:400})
        }

        console.log("user pailam",user)

        const validPasword = await bcryptjs.compare(password,user.password)

        if(!validPasword){
            return NextResponse.json({
                message: "Check Your Credentials"
            },{status:400})
        }

        const tokenData = {
            id: user._id,
            username: user.username,
            email:user.email
        }

        // generate token
        const token =  jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn: '10d'})

        const response = NextResponse.json({
            message: "Logged In Successfully",
            success: true
        })

        response.cookies.set("token",token,{
            httpOnly:true
        })

        return response

        
    } catch (error:any) {
        return NextResponse.json({
            error:error.message
        },{status:500})
        
    }
}