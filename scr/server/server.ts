import express from "express"
import socketServer from "socket.io"

export let startServer = async () => {
    let connectedCount = 0
    let app = express()
    let server = app.listen(6000,()=>{
        console.log("Server is up")
    });
    app.use(express.static("./app")) 
     
    // Server Socket Controles
    let io = new socketServer.Server(server,{cors:{origin:"http://localhost:6000"}});
    let names:string[] = []
    // This is only called when a client connects to the server, 
    // and will only listen to what happens to connected sockets on this server
    io.on("connection",(socketServer)=>{
        console.log("User connected!")
        
        socketServer.on("PlayerJoin",(username:string)=>{
            connectedCount++
            socketServer.broadcast.emit("UpdateWaitingList",{username,connectedCount})
             console.log(username+" user joined!!")
        });
    });   
}