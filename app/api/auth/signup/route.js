import connectToDB from "@/configs/db";
import userModel from "@/models/User";
import { hashPassword,generateToken } from "@/utils/auth";
import { NextResponse } from "next/server";

export async function POST (req) {

   
        connectToDB();
        // get identifire from client
        const { firstname, lastname, username, email, password } = await req.json();
        
        const isUserExist = await userModel.findOne({
            $or: [{ username }, { email }],
        });

        if(isUserExist){
            return NextResponse.json({ message: "This username or email exist already !!" },{ status: 422 });;
        }


        
        const HashedPassword  =await hashPassword(password);
        const generatedToken = generateToken(email)
        const users = await userModel.find({});
        const createdUser = await userModel.create({
            firstname,
            lastname,
            username,
            email,
            password:HashedPassword,
            role:users.length > 0 ? "USER" : "ADMIN",
            token:generatedToken
        })
        
        return NextResponse.json({"message":"Registered Successfully :)"},{
                status:201,
                headers:{
                    "Set-Cookie":`token=${generatedToken}; HttpOnly; Path=/; Max-Age=7d`
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