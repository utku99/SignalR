"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setConnection } from '@/redux/slice'
import * as signalR from "@microsoft/signalr"


const Page = () => {
  const {connection} = useSelector(state => state.connection)
  const dispatch = useDispatch()


  useEffect(()=>{
    const temp =  new signalR.HubConnectionBuilder()
    .withUrl("https://localhost:7177/chathub")
    .configureLogging(signalR.LogLevel.None)
    .build()
     dispatch(setConnection(temp))
  },[])

  useEffect(() => {

// connection.on("forceDisconnect", (message) => {
//     connection.stop();
// });

connection?.on("GetConnectionId", (message) => {
    console.log(message);
});

connection?.on("SendMessage", (message) => {
    console.log(message);
});

// connection.on("ForceLogout", (message) => {
//   connection.invoke("Logout")
// });


connection?.start().then((a) => {
    //   connection.invoke("WebRegister")
    console.log(a, "start success");
}).catch((error) => {
    console.log(error, "start error");
});

  }, [connection]);


  return (
    <div>
    <Link href="/mesajlar">Mesajlar</Link>
    </div>
  )
}

export default Page