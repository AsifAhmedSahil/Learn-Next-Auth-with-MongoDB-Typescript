/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

export default function profilePage() {
  const router = useRouter()

  const [data,setData] = useState("")

  const getUserData = async() => {
    try {
      const res = await axios.post("api/users/me")
      console.log(res.data.data._id)
      setData(res.data.data._id)
    } catch (error:any) {
      console.log(error.message)
      
    }
  }

  const logout = async() =>{
    try {
      await axios.get("api/users/logout")
      toast.success("logout Successfully")
      router.push("/login")
      
    } catch (error:any) {
      console.log(error.message)
      toast.error(error.message)
      
    }
  }
  return (
    <div className='flex flex-col justify-center items-center min-h-screen py-2'>
      <h1 className='text-3xl'>Profile Page</h1>
      <hr />

      <h2>
        {
          data === "nothing" ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link>
        }
      </h2>


      <button className='bg-blue-500 hover:bg-blue-700 text-white rounded px-4 py-2 mt-4' onClick={logout}>
        logout
      </button>
      <button className='bg-green-500 hover:bg-green-700 text-white rounded px-4 py-2 mt-4' onClick={getUserData}>
        Get user data
      </button>
      
    </div>
  )
}


