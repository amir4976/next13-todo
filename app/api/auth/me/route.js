import connectToDB from "@/configs/db";
import { verifyToken } from "@/utils/auth";
import { NextResponse } from "next/server";
import userModel from "@/models/User";
export async function GET (req){
    connectToDB();
    // get cookie from client
    const token = req.cookies.get("token")?.value;
    if(!token){
        return NextResponse.json({ message: "User not found !!" },{ status: 404 });
    }
    // verify user token
    const tokenPayload = await verifyToken(token);
    // get user from database
    const user = await userModel.findOne({
        email: tokenPayload.email,
    },"firstname lastname role");
    
    
    if(!tokenPayload || !user){
        return NextResponse.json({ message: "User not found !!" },{ status: 404 });
    }
  


    return NextResponse.json({ data: user },{ status: 200 });
}