"use client"
import { JoinRoom, LeaveRoom } from '@/Bitsin'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'


const Page = () => {
  const[message,setMessage] = useState(null)


  
useEffect(()=>{
// mesajlar çekildi
// detaylar çekildi

JoinRoom()

},[])


// sayfadan çıkınca 
// LeaveRoom()




  return (
    <div style={{backgroundColor:"white", width:"100vw",height:"100vh"}}>

    <div style={{display:"flex",flexDirection:"row",gap:10,marginBottom:20}}>
      {
        ["","",""].map(item=>(
          <div style={{borderWidth:1,borderColor:"black",borderStyle:"solid",width:"fit-content",padding:20,}}>
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



export function socketConnection() {
    connection = new signalR.HubConnectionBuilder()
        .withUrl(``)
        .configureLogging(signalR.LogLevel.None)
        .build();

    connection.on("forceDisconnect", (message) => {
        connection.stop();
    });

    connection.on("ConnectionResult", (message) => {
        store.dispatch({
            type: "SET_CONNECTION_ID",
            payload: message
        })
    });

    connection.on("SendMessage", (message) => {
        store.dispatch({
            type: "ADD_MESSAGE",
            payload: message
        })
        bottomFunc();
    });

    connection.on("ForceLogout", (message) => {
        toastError(_fm("signed_in_with_your_account_from_another_location"))
        logout()
    });

    connection.on("updateTotals", (data) => {
        setTotalUsers(data)
    });

    connection.on("UpdateBadges", (data) => {
        setBadges(data)
    });

    connection.start().then((a) => {
        connection.invoke("WebRegister")
        setSocketInitialized(true)
        setNetworkError(false)
    }).catch((error) => {
        setNetworkError(true)
        setSocketInitialized(true)
    });
}