import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel"
import {NextRequest,NextResponse} from "next/server"


connect()

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json()
        const {token} = reqBody;
        console.log(token,"token from user info")
        
        const user = await User.findOne({verifyToken : token , verifyTokenExpiry: {$gt: Date.now()}})

        if(!user){
            return NextResponse.json({error:"Invalid Token"},{status: 400})
        }

        console.log("user",user)

        // iff user found then isVerified to be false and token and expiry token will be undefined
        user.isVerified = true
        user.verifyToken = undefined
        user.verifyTokenExpiry = undefined

        // save to the database
        await user.save()

        return NextResponse.json({
            message:"Email Verified Successfully",
            success: true 
        },{status: 200})

    } catch (error: any) {
        return NextResponse.json({error:error.message},{status: 500})
        
    }

}