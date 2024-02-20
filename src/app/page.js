"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { socketConnection } from '@/Bitsin'

const Page = () => {


  useEffect(() => {
    socketConnection()
  }, []);

  return (
    <div>
    <Link href="/mesajlar">Mesajlar</Link>
    </div>
  )
}

export default Page