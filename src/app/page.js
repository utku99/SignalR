"use client"
import Link from 'next/link'
import React, { useState } from 'react'

const Page = () => {
  const[message,setMessage] = useState(null)
  const[selected,setSelected] = useState(null)

  console.log(message);


  return (
    <div>
    <Link href="/mesajlar">Mesajlar</Link>
    </div>
  )
}

export default Page