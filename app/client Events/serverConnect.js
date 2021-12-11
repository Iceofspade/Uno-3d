"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_client_1 = __importDefault(require("socket.io-client"));
class ClientInteraction {
    constructor() {
        this.socket = null;
        this.initialize = () => {
            this.socket = socket_io_client_1.default("http://localhost:6000");
        };
        this.onEvent = (eventName, callBack) => {
            var _a;
            (_a = this.socket) === null || _a === void 0 ? void 0 : _a.on(eventName, callBack);
        };
    }
}
exports.default = new ClientInteraction();
