"use client"
import React from 'react'
import { useState,useEffect} from 'react';
import { useRouter } from 'next/navigation'


function SingInForm() {
  const router = useRouter()
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    fetch("/api/auth/me").then((res) => {
      if (res.status === 200) {
        router.replace("/todos");
      }
    });
  }, []);

  const signIn = async (event) => {
    event.preventDefault()
    const user = { identifier, password };
    console.log(user)
    const res = await fetch("/api/auth/signin",{
      method: "POST",
      headers:{
        "Content-Type": "application/json",
      },
      body:JSON.stringify(user)
    })
    console.log(res.status)
    if (res.status == 200) {
      setIdentifier("")
      setPassword("")
      alert("Logged In Successfully :))")
      router.replace("/")
    } else if (res.status === 404) {
      alert("User is not found")
    }
  }
  return (
  <>
   <form role="form" method="post">
        <div className="inputBox">
          <input
            type="text"
            value={identifier}
            onChange={(event) => setIdentifier(event.target.value)}
            autoComplete="off"
            required
          />
          <label>Username | Email</label>
        </div>
        <div className="inputBox">
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="off"
            required
          />
          <label>Password</label>
        </div>

        <input
          type="submit"
          className="register-btn"
          value="Sign In"
          onClick={signIn}
        />
      </form>
  </>
  )
}

export default SingInForm
