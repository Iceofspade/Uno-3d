"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const socket_io_1 = __importDefault(require("socket.io"));
let app = express_1.default();
let server = app.listen(4000, () => {
    console.log("Server is up");
});
app.use(express_1.default.static("../"));
// Server Socket Controles
let io = new socket_io_1.default.Server(server, { cors: { origin: "http://localhost:4000" } });
class User {
    constructor(socket, id, pos) {
        this.setPos = (pos) => {
            this.pos_ = pos;
        };
        this.getPos = () => {
            return this.pos_;
        };
        this.updateAllPos = () => {
            this.socket_.broadcast.emit("Moved", { id: this.id_, pos: this.pos_ });
        };
        this.id_ = id;
        this.pos_ = pos;
        this.socket_ = socket;
    }
}
// This is only called when a client connects to the server, 
// and will only listen to what happens to connected sockets on this server
io.on("connection", (socketServer) => {
    console.log("User connected!");
    // console.log(socketServer)
    socketServer.on("PlayerJoin", () => {
    });
});
