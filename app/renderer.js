"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const BABYLON = __importStar(require("babylonjs"));
const fs_1 = require("fs");
class SceneHandler {
    constructor() {
        this.sceneList = [];
        //Get the name of all files that have a scene that can be rendered
        this.loadScenes = () => __awaiter(this, void 0, void 0, function* () {
            this.sceneList = fs_1.readdirSync("./app/scenes/").filter(d => d.endsWith(".js"));
        });
        //Set the canvas for everything to be rendered on
        this.setCanvas = (canvas) => __awaiter(this, void 0, void 0, function* () {
            this.canvas = canvas;
            this.engine = new BABYLON.Engine(this.canvas, true);
        });
        //A deafault scene to fall back on if an attempt load a scene fails
        this.defaultScene = () => {
            let scene = new BABYLON.Scene(this.engine);
            let camera = new BABYLON.FreeCamera("Camera1", new BABYLON.Vector3(0, 10, -10), scene);
            camera.attachControl(true);
            camera.setTarget(BABYLON.Vector3.Zero());
            let light = new BABYLON.PointLight("light", new BABYLON.Vector3(0, 4, -5), scene);
            let ground = BABYLON.Mesh.CreateGround("ground1", 6, 6, 2, scene);
            let sphere = BABYLON.Mesh.CreateSphere("sphere", 16, 2, scene);
            sphere.position.y = 1;
            return scene;
        };
        // Setting the new scene to render
        this.setScene = (sceneName) => __awaiter(this, void 0, void 0, function* () {
            this.loadScenes().then(() => {
                let i = this.sceneList.indexOf(sceneName + ".js");
                if (i === -1) {
                    console.error("Attempted to load none existing scene");
                    this.scene = this.defaultScene();
                }
                else if (i > -1) {
                    let pull = require(`./scenes/${this.sceneList[i]}`);
                    this.scene = pull.app.scene(this.engine, this.canvas);
                }
            });
        });
        this.sceneList = [];
        this.engine;
        this.canvas;
        this.scene;
    }
    // Start rendering of scene
    initialize() {
        var _a;
        this.canvas = document.getElementById('renderCanvas');
        (_a = this.engine) === null || _a === void 0 ? void 0 : _a.runRenderLoop(() => {
            this.scene.render();
        });
    }
}
exports.handler = new SceneHandler();
window.addEventListener('DOMContentLoaded', function () {
    exports.handler.setCanvas(document.getElementById('renderCanvas')).then(() => {
        //Rename test to what ever you want the starting scene to be      
        exports.handler.setScene("game").then(() => {
            exports.handler.initialize();
        });
        window.addEventListener('resize', function () {
            exports.handler.engine == null ? console.error("Cannot resize engine or null") : exports.handler.engine.resize();
        });
    });
});
