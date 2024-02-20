import * as signalR from "@microsoft/signalr"

var connection = null

export const socketConnection = () =>{
     connection = new signalR.HubConnectionBuilder()
    .withUrl(`http:`)
    .configureLogging(signalR.LogLevel.None)
    .build();

connection.on("forceDisconnect", (message) => {
    connection.stop();
});

connection.on("ConnectionResult", (message) => {
  console.log(message);
});

connection.on("SendMessage", (message) => {
    console.log(message);
});

connection.on("ForceLogout", (message) => {
  connection.invoke("Logout")
});


connection.start().then((a) => {
    connection.invoke("WebRegister")
   console.log(a,"start success");
}).catch((error) => {
    console.log(error,"start error");
});
}

export const JoinRoom = () =>{
    connection?.invoke("LeaveRoom")
    connection?.invoke("JoinRoom", { sender_id: sender_id, receiver_id: receiver_id })
}

export function LeaveRoom() {
    connection?.invoke("LeaveRoom")
}