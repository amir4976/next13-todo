import Header from "./Components/Header";
import TodosList from "./Components/TodosList";
import { verifyToken } from "@/utils/auth";
// import todoModel from '@/models/Todo'
// import userModel from '@/models/User'
// import connectToDB from "@/configs/db";
// import { get } from "mongoose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";



export default function Home() {
  const token = cookies().get("token")?.value;
  if(!token){
    return redirect("/signin");
  }else{
    const tokenPayload =  verifyToken(token);
    if(!tokenPayload){
      return redirect("/signin");
    }
  }

  return (
    <>
    <h1>Next-Todos</h1>
    <div className="alert">
      <p>⚠ Please add a task first!</p>
    </div>
    <div className="container">
     <Header/>
      <div className="pad">
        <TodosList token={token}/>
      </div>
    </div>
  </>
  );
}

