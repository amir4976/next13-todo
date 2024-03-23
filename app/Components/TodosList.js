'use client'
import React,{useEffect, useState} from 'react'
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function TodosList({token}) {
    const [Todo, setTodo] = useState([]);

    const getTodos = async ()=>{
      const res= await fetch('api/todos')
      const result = await res.json()
      setTodo(result)
    }

    useEffect(()=>{
      getTodos()
    },[])


    const deleteTodo= async(id)=>{
      const res = await fetch(`api/todos/${id}`,{
        method:"DELETE",
        headers:{
          "Content-Type":"application/json",
        }
      })
      console.log(res)
      getTodos()
    }

    const ChangeIsCompleted= async(data)=>{
      console.log(data)
          const res = await fetch(`api/todos/${data._id}`,{
            method:"PUT",
          })
          console.log(res)
    }



    return (
        <>
        
        <div id="todo"> 
          <ul id="tasksContainer">
               {Todo && Todo.map((data)=>(
                  <li key={data._id}>
                  <span className="mark">
                    <input type="checkbox" className="checkbox" defaultChecked= {data.isCompleted} onChange={()=>ChangeIsCompleted(data)} />
                  </span>
                  <div className="list">
                    <p>{data.title}</p>
                  </div>
                  <span className="delete" onClick={()=>deleteTodo(data._id)} >
                    <FontAwesomeIcon icon={faTrash} />
                  </span>
                </li>
              ))} 
          </ul>
        </div>
        
        </>
  )
}

export default TodosList
