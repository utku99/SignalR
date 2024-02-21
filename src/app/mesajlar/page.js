"use client"
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'


const Page = () => {
  const [message, setMessage] = useState(null)
  const [roomID, setRoomID] = useState(null)
  const [senderID, setSenderID] = useState(null)
  const [senderType, setSenderType] = useState(null)
  const [ReceiverId, setReceiverId] = useState(null)
  const [receiverType, setReceiverType] = useState(null)

  const [user, setUser] = useState(null)
  const [messages, setMessages] = useState(null)


  const {connection} = useSelector(state => state.connection)
  const dispatch = useDispatch()



  useEffect(() => {
  

    axios.post("https://localhost:7177/api/Chatting/GetUserMessageSenders", {
      "roomID": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "companyID": 0,
      "companyOfficeID": 0,
      "userID": 157
    }).then(res => setUser(res.data.object)).catch(err => console.log(err))


  }, [])




  return (
    <div style={{ backgroundColor: "white", width: "100vw", height: "100vh" }}>

      <div style={{ display: "flex", flexDirection: "row", gap: 10, marginBottom: 20 }}>
        {
          user?.map(item => (
            <div onClick={() => {

              connection.invoke("LeaveRoom")
              connection.invoke("JoinRoom", {
              RoomID: item.roomID, sender_id: 157, sender_type: 1,receiver_id: item.correspondentID, receiver_type: item.correspondentType
              })

              axios.post("https://localhost:7177/api/Chatting/GetMessages", {
                "roomID": item.roomID,
                "companyID": item.correspondentType == 2 ? item.correspondentID : 0,
                "companyOfficeID": item.correspondentType == 3 ? item.correspondentID : 0,
                "userID": 157
              }).then(res => setMessages(res.data.object)).catch(err => console.log(err))
            }}
              style={{ borderWidth: 1, borderColor: "black", borderStyle: "solid", width: "fit-content", padding: 20, }}>
              {item?.correspondentName}
            </div>
          ))
        }
      </div>



      <div style={{ borderWidth: 1, borderColor: "black", borderStyle: "solid", width: 700, height: 500, padding: 20 }}>
        <div style={{ height: 450, overflowY: "auto", marginBottom: 30 }}>
          {
            messages?.map(item => (
              <div style={{ borderWidth: 1, borderColor: "black", borderStyle: "solid", padding: 20, marginBottom: 20, width: 300, backgroundColor: item?.senderType == 1 ? "red" : "white" }}>
                {item?.message}
              </div>
            ))
          }
        </div>

        <div style={{ display: "flex", flexDirection: "row" }}>
          <input style={{ width: "100%" }} value={message} onChange={(e) => setMessage(e.target.value)} />
          <button onClick={() => console.log(message)}>gönder</button>
        </div>
      </div>

    </div>
  )
}

export default Page