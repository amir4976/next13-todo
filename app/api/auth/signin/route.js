import { verifyPassword ,generateToken } from "@/utils/auth";
import { NextResponse } from "next/server";
import connectToDB from "@/configs/db";
import userModel from "@/models/User";
export async function POST (req) {
    connectToDB();
    // get identifier from client 
    const { identifier, password } = await req.json();
    // check if identifier and password is empty or not
    if(!identifier.trim() || !password.trim()){
        return NextResponse.json({ message: "Data is not valid !!" },{ status: 422 });
    }

    // check if user is exist or not
    const isUserExist = await userModel.findOne({
        $or: [{ username:identifier }, { email:identifier }],
    });
    // check if password is valid or not 
    const isValidPasword = await verifyPassword(password, isUserExist.password);
    

    if(!isUserExist || !isValidPasword){
        return NextResponse.json({ message: "User not found !!" },{ status: 404 });
    }



    // generate token
    const token = generateToken({ email: isUserExist.email });

    // and send it to client 
    return NextResponse.json({ message: "User Logged In Successfully :))" },{
        status:200,
        headers:{
            "Set-Cookie":`token=${token}; HttpOnly; Path=/; Max-Age=7d`
        }
    })
    }


    export function GET (){
        return NextResponse.json({ message: "bad request !!" },{ status: 400 });
    }
    export function PUT (){
        return NextResponse.json({ message: "bad request !!" },{ status: 400 });
    }
    export function DELETE (){
        return NextResponse.json({ message: "bad request !!" },{ status: 400 });
    }