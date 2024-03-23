import connectToDB from "@/configs/db";
import { NextResponse } from "next/server";
import TodoModel from '@/models/Todo'
export async function GET (req,{params}){
    connectToDB();
    try {
        const {id} = params;
        const todo = await TodoModel.findOne({_id:id});
        return NextResponse.json({todo}, {status:200});
    } catch (error) {
        return NextResponse.json({ message: "todo not found" },{ status: 404 });
    }
}


export async function PUT (req,{params}){
    connectToDB();
    try {
        const {id} = params;
        const findTodo = await TodoModel.findOne({_id:id});
        const todo = await TodoModel.findOneAndUpdate({_id:id},{
            isCompleted: findTodo.isCompleted? false : true,
        });
       
        return NextResponse.json({"message":"todo is updated succsess fully"}, {status:200});


    } catch (error) {
        if(error.kind === "ObjectId"){
         return NextResponse.json({ message:'todo not found' },{ status: 404 });
        }else{
            return NextResponse.json({ message: error },{ status: 500 });
        }

    }
}

export async function DELETE (req,{params}){
    connectToDB();
    const {id} = params;
    const todo =await TodoModel.findOneAndDelete({_id:id});
    if(!todo){
        return NextResponse.json({message:"todo not found!!!!"},{status:404})
    }
    console.log(todo)
    return NextResponse.json({message:"todo is deleted succsess fully"}, {status:200});

}