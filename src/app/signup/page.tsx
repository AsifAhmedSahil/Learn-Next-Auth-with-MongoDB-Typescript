/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function signupPage() {

  const router = useRouter()
  
  const[user,setUser] = useState({
    email :"",
    password: "",
    username: ""
  })

  const[buttonDisable,setButtonDisable] = useState(false)
  const[loading,setLoading] = useState(false)

  const onSignup = async () =>{
    try {
      setLoading(true)
      const response = await axios.post("/api/users/signup",user)
      console.log("sign up successfully" , response.data)
      toast.success("signup successfully")
      router.push("/login")

    } catch (error:any) {
      console.log("sign up failed!")
      toast.error(error.message)
      
    }
  }

  useEffect(() =>{
    if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0){
      setButtonDisable(false)
    }
    else{
      setButtonDisable(true);
    }
  },[user])

  return (
    <div className='flex flex-col justify-center items-center min-h-screen py-2'>
      <h1>{loading ? "processing" : "sign up"}</h1>
      <hr />
      <label htmlFor="username">Username</label>
      <input
      className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
      id='username'
      value={user.username}
      onChange={(e) => setUser({...user,username:e.target.value})}
      placeholder='username'
      type="text" />


      <label htmlFor="username">Email</label>
      <input
      className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
      id='username'
      value={user.email}
      onChange={(e) => setUser({...user,email:e.target.value})}
      placeholder='Email'
      type="text" />


      <label htmlFor="username">Password</label>
      <input
      className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
      id='username'
      value={user.password}
      onChange={(e) => setUser({...user,password:e.target.value})}
      placeholder='Password'
      type="text" />

      <button 
      className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
      onClick={onSignup}
      >
        {buttonDisable ? "Fill the form" : "Sign Up"}
      </button>
      <Link href={"/login"}>Visit login page</Link>
    </div>
  )
}


