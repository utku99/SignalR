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


  const { connection } = useSelector(state => state.connection)
  const dispatch = useDispatch()



  useEffect(() => {


    axios.post("https://localhost:7177/api/Chatting/GetCompanyMessageSenders", {
      "roomID": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "companyID": 0,
      "companyOfficeID": 24,
      "userID": 0
    }).then(res => setUser(res.data.object)).catch(err => console.log(err))



    // connection?.on("updateTotals", (data) => {
    //   console.log(data, "total");
    // });

    return () => {
      connection.invoke("LeaveRoom")
    }
  }, [connection])




  return (
    <div style={{ backgroundColor: "white", width: "100vw", height: "100vh" }}>

      <div style={{ display: "flex", flexDirection: "row", gap: 10, marginBottom: 20 }}>
        {
          user?.map(item => (
            <div onClick={async() => {
            await  connection.invoke("LeaveRoom")
            await connection.invoke("JoinRoom", {
                RoomID: item.roomID, sender_id: 24, sender_type: 3, receiver_id: item.correspondentID, receiver_type: item.correspondentType
              })

              await  axios.post("https://localhost:7177/api/Chatting/GetMessages", {
                "roomID": item.roomID,
                "companyID": 0,
                "companyOfficeID": 24,
                "userID": 0
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
              <div style={{ borderWidth: 1, borderColor: "black", borderStyle: "solid", padding: 20, marginBottom: 20, width: 300, backgroundColor: item?.senderType == 3 ? "red" : "white" }}>
                {item?.message}
              </div>
            ))
          }
        </div>

        <div style={{ display: "flex", flexDirection: "row" }}>
          <input style={{ width: "100%" }} value={message} onChange={(e) => setMessage(e.target.value)} />
          <button onClick={async() => {
           await axios.post("https://localhost:7177/api/Chatting/SendMessage", {
              "roomID": "b35e6348-a754-4047-99fd-bfb360be3e1b",
              "senderId": 24,
              "senderType": 3,
              "message": message,
              "messagesType": 2,
              "receiverId": 157,
              "receiverType": 1,
              "serviceID": 16
            }).then(res => console.log(res, "res"))

          }}>gönder</button>
        </div>
      </div>

    </div>
  )
}

export default Page