"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setConnection } from '@/redux/slice'
import * as signalR from "@microsoft/signalr"


const Page = () => {
  const { connection } = useSelector(state => state.connection)
  const dispatch = useDispatch()




  useEffect(() => {
    const temp = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:7177/chathub")
      // .configureLogging(signalR.LogLevel.None)
      .withAutomaticReconnect()
      .build()
    dispatch(setConnection(temp))
  }, [])

  useEffect(() => {
    if(connection){
(async()=>{
  try {
   await connection?.start()

    connection?.invoke("LoginMessageHub", { UserID: 24, TypeID: 3 })

    connection?.on("forceDisconnect", (message) => {
      connection.stop();
    });

    connection?.on("GetConnectionId", (message) => {
      console.log(message);
    });

    connection?.on("MessageReceived", (message) => {
      console.log(message, "MessageReceived");
    });
    
  } catch (error) {
    console.log(error, "start error");
    
  }
})
  }
  }, [connection]);



  return (
    <div>
      <Link href="/mesajlar">Mesajlar</Link>
    </div>
  )
}

export default Page