"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { HubConnectionBuilder } from "@microsoft/signalr";

const hubUrl = "http://localhost:3000"

const Page = () => {
  const[message,setMessage] = useState(null)
  const[selected,setSelected] = useState(null)


  useEffect(() => {
    const connection = new HubConnectionBuilder()
      .withUrl(hubUrl)
      .build();

    const startConnection = async () => {
      try {
        await connection.start();
        console.log("SignalR Connected!");
      } catch (err) {
        console.log("SignalR Connection Error: ", err);
      }
    };

    startConnection();

    return () => {
      connection.stop();
    };
  }, [hubUrl]);

  

  return (
    <div style={{backgroundColor:"white", width:"100vw",height:"100vh"}}>

    <div style={{display:"flex",flexDirection:"row",gap:10,marginBottom:20}}>
      {
        ["","",""].map(item=>(
          <div style={{borderWidth:1,borderColor:"black",borderStyle:"solid",width:"fit-content",padding:20,backgroundColor:selected?"gray":"white",}}>
          isim: Ozan Başkan  
          </div>
        ))
      }
    </div>
      


    <div style={{borderWidth:1,borderColor:"black",borderStyle:"solid",width:700,height:500,padding:20}}>
      <div style={{height:450,overflowY:"auto",marginBottom:30}}>
      {
        ["","",""].map(item=>(
          <div style={{borderWidth:1,borderColor:"black",borderStyle:"solid",padding:20,marginBottom:20}}>
         mesajlar
          </div>
        ))
      }
      </div>
    
      <div style={{display:"flex",flexDirection:"row"}}>
        <input style={{width:"100%"}} value={message} onChange={(e)=>setMessage(e.target.value)}/>  
        <button onClick={()=>console.log(message)}>gönder</button>
      </div>
    </div>

    </div>
  )
}

export default Page