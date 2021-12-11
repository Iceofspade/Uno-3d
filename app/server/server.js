"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = void 0;
const express_1 = __importDefault(require("express"));
const socket_io_1 = __importDefault(require("socket.io"));
let startServer = () => {
    let connectedCount = 0;
    let app = express_1.default();
    let server = app.listen(6000, () => {
        console.log("Server is up");
    });
    app.use(express_1.default.static("./app"));
    // Server Socket Controles
    let io = new socket_io_1.default.Server(server, { cors: { origin: "http://localhost:6000" } });
    // This is only called when a client connects to the server, 
    // and will only listen to what happens to connected sockets on this server
    io.on("connection", (socketServer) => {
        console.log("User connected!");
        socketServer.on("PlayerJoin", (nane) => {
            connectedCount++;
            socketServer.broadcast.emit("UpdateWaitingList", { nane, connectedCount });
            console.log("A user joined!!");
        });
    });
};
exports.startServer = startServer;
