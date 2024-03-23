import connectToDB from "@/configs/db";
import { verifyToken } from "@/utils/auth";
import { NextResponse } from "next/server";
import userModel from '@/models/User'
import TodoModel from '@/models/Todo'
import { connect } from "mongoose";


export async function GET (req){ 
    
    connectToDB()
    const token = await req.cookies.get("token")?.value;
    const tokenPayload = verifyToken(token)
    
    if(!token || !tokenPayload){
        return NextResponse.json({ message: "you are not login !!" },{ status: 401 });
    }
    const user = await userModel.findOne({
        email:tokenPayload.email,
    })
    
    const todos = await TodoModel.find({ user: user._id });

    return NextResponse.json(todos,{ status: 200 });
 }



 export async function POST (req){
    connectToDB()
    try {
        const token = await req.cookies.get("token") && await req.cookies.get("token").value;
        const tokenPayload = verifyToken(token)
        if(!token || !tokenPayload){
            return NextResponse.json({ message: "you are not login !!" },{ status: 401 });
        }
        const user = await userModel.findOne({
            email:tokenPayload.email,
        })
        const {title,isCompleted} = await req.json()
        if(!title|| typeof(isCompleted) !== "boolean" ){
            return NextResponse.json({ message: "title is required !! and boolean isCompleted" },{ status: 400 });
        }
        const isTodoExist = await TodoModel.findOne({title});
        if(isTodoExist){
            return NextResponse.json({ message: "todo is exist" },{ status: 400 });
        }
        const createTodo = await TodoModel.create({
            title,
            isCompleted,
            user:user._id,
        })
        return NextResponse.json({ message: "Todo Created Successfully :))" },{ status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'there is a n error'},{ status: 500 });
    }
 }


