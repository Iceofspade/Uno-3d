import IO from "socket.io-client"
 let client = IO("http://localhost/4000")
 client.connect()
export default client
