/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

export default function verifyEmailPage() {
    const [token,setToken] = useState("")
    const [verify,setVerify] = useState(false)
    const [error,setError] = useState(false)

    // const router = useRouter()

    const verifyUserEmail = async () =>{
        try {
            await axios.post("api/users/verifyemail",token)
            setVerify(true)
            setError(false) 
        } catch (error:any) {
            console.log(error.response.data)
            setError(true)
            
        }
    }

    useEffect(() => {
        // const {query} = router
        // const urlToken = query.token
        const urlToken = window.location.search.split("=")[1]
        if (typeof urlToken === 'string') {
            setToken(urlToken);
        }
    },[])

    useEffect(()=>{
        if(token.length > 0){
            verifyUserEmail()
            
        }
    },[token])
  return (
    <div className='flex flex-col justify-center items-center min-h-screen py-2'>
        <h1 className='text-4xl'>Verify Email</h1>
        <h2 className='p-2 bg-orange-600 text-black'>{token ? `${token} `: "No Token"}</h2>

        {
            verify && (
                <div>
                    <h2>Verified</h2>
                    <Link href={"/login"}>Login</Link>
                </div>
            )
        }
        {
            error && (
                <div>
                    <h2>Error</h2>
                   
                </div>
            )
        }
      
    </div>
  )
}


