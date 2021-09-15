"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.win = void 0;
const electron_1 = require("electron");
const path_1 = __importDefault(require("path"));
const url_1 = __importDefault(require("url"));
let createWindow = () => {
    // Create the browser window.
    exports.win = new electron_1.BrowserWindow({
        height: 768,
        width: 1366,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
        },
        icon: "assets/img/logo.ico",
        title: "UNO",
    });
    // win.setFullScreen(true)
    // win.removeMenu()
    // and load the index.html of the app.
    exports.win.loadURL(url_1.default.format({
        pathname: path_1.default.join(__dirname, "../app/index.html"),
        protocol: "file:",
        slashes: true,
    }));
    // Open the DevTools.
    exports.win.webContents.openDevTools();
    // Emitted when the window is closed.
    exports.win.on("closed", () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        exports.win = null;
    });
};
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
electron_1.app.on("ready", createWindow);
// Quit when all windows are closed.
electron_1.app.on("window-all-closed", () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== "darwin") {
        electron_1.app.quit();
    }
});
electron_1.app.on("activate", () => {
    // On OS X it"s common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (exports.win === null) {
        createWindow();
    }
});
