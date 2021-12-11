import socket from "socket.io-client";

class ClientInteraction {
socket:ReturnType <typeof socket>|null = null
    constructor(){

    }
    initialize = () =>{
    this.socket = socket("http://localhost:6000");
    }
    onEvent =(eventName:string,callBack:{<T>(...args:T[]):void}) =>{
        this.socket?.on(eventName,callBack)
    }
}

export default new ClientInteraction();