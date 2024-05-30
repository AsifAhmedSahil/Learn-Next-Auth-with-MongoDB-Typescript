import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel"
import {NextRequest,NextResponse} from "next/server"

import { getDataFromToken } from "@/helpers/getDataFromToken";

connect()

export async function POST(request:NextRequest){
    // extract data from token***
    const userId = await getDataFromToken(request)
    const user = User.findOne({_id: userId}).select("-password")
    // check user exist or not
    if(!user){
        throw new Error("User Not Found!")

    }

    return NextResponse.json({
        message: "User Found",
        data:user
    })


}