

// export async function POST(request:NextRequest){
//     // extract data from token***
//     const userId = await getDataFromToken(request)
//     console.log("user id",userId)
//     const user = User.findOne({_id: userId})
//     console.log(user,"user paiso naki na?")
//     // check user exist or not
//     if(!user){
//         throw new Error("User Not Found!")

//     }

//     return NextResponse.json({
//         message: "User Found",
//         data:user
//     })


// }

import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server"

import { getDataFromToken } from "@/helpers/getDataFromToken";

connect()

export async function POST(request: NextRequest) {
    try {
        // extract data from token***
        const userId = await getDataFromToken(request);
        
        // Retrieve user from the database
        const user = await User.findOne({ _id: userId });
        console.log(user, "user paiso naki na?");
        
        // check if user exists or not
        if (!user) {
            throw new Error("User Not Found!");
        }

        return NextResponse.json({
            message: "User Found",
            data: user
        });
    } catch (error:any) {
        return NextResponse.json({
            message: error.message || "Error finding user",
            error: error
        }, { status: 500 });
    }
}
