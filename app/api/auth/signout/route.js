import { NextResponse } from "next/server";
export function GET (req){
    const token = req.cookies.get("token");
    if(token){
        return NextResponse.json({ message: "signout successfull :)" },{
            status:202,
            headers:{
                "Set-Cookie":`token=; HttpOnly; Path=/; Max-Age=0`
            }
        });
    }else{
        return NextResponse.json({ message: "you are not login !!" },{ status: 401 });
    }
}