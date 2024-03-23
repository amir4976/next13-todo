"use client"
import React,{useState,useEffect} from 'react'

 function Header () {
    const [isShowInput, setIsShowInput] = useState(false);
    const [title, setTitle] = useState("");
    const [user, setUser] = useState({firstname:"...",lastname:"..."});

        const getData = async () => {
          const res = await fetch("/api/auth/me")
          const result = await res.json();
          setUser(result.data)
        }
    useEffect(() => {
        getData()
    }, []);
    
    const addTodo = async()=>{
      const todo = {title,isCompleted:false};
      const res =await fetch('api/todos',{
        method:"POST",
        headers:{
          "Content-Type": "application/json",
        },
        body:JSON.stringify(todo)
      })
       
      if(res.status === 201||res.status === 200){
        alert("Todo Added Successfully :))");
        setTitle("");
        location.reload();
      }else{
        alert("error");
      }
    }


  return (
        <>
        <div
        className="form-container interAnimate"
        style={{ display: `${isShowInput ? "block" : "none"}` }}
      >
        <div className="add-form">
          <input
            id="input"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Type your To-Do works..."
          />
          <button type="submit" id="submit" onClick={addTodo}>
            ADD
          </button>
        </div>
      </div>
      <div className="head">
        <div className="date">
          <p>{user.firstname }</p>
          <p>{user.lastname }</p>
        </div>
        <div className="add" onClick={(event) => setIsShowInput(prev =>!prev)}>
          <svg
            width="2rem"
            height="2rem"
            viewBox="0 0 16 16"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
            />
            <path
              fillRule="evenodd"
              d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
            />
          </svg>
        </div>
        <div className="time">
          <a href="#">Logout</a>
        </div>
      </div>
        </>
  )
}

export default Header
