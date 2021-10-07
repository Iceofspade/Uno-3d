import express from "express"
import socketServer from "socket.io"
import * as BABYLON from "babylonjs"
let app = express()
let server = app.listen(4000,()=>{
    console.log("Server is up")
});
app.use(express.static("../"))
 
// Server Socket Controles
let io = new socketServer.Server(server,{cors:{origin:"http://localhost:4000"}});
class User{
public id_:string
public pos_:BABYLON.Vector3
public socket_:socketServer.Socket
    constructor(socket:socketServer.Socket,id:string,pos:BABYLON.Vector3){
        this.id_ =id
        this.pos_ = pos
        this.socket_ = socket
    }
    setPos = (pos:BABYLON.Vector3) =>{
        this.pos_ = pos
        }
    getPos = ()=>{
        return this.pos_
    }
    updateAllPos = () => {
        this.socket_.broadcast.emit("Moved",{id:this.id_,pos:this.pos_})
    }
}
// This is only called when a client connects to the server, 
// and will only listen to what happens to connected sockets on this server
io.on("connection",(socketServer)=>{
    console.log("User connected!")
    // console.log(socketServer)

    socketServer.on("PlayerJoin",()=>{

    });
});   