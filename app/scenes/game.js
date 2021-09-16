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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const BABYLON = __importStar(require("babylonjs"));
const GUI = __importStar(require("babylonjs-gui"));
const Logic = __importStar(require("../logic"));
const gameSettings_json_1 = __importDefault(require("../settings/gameSettings.json"));
exports.app = {
    name: "GameScene",
    scene: (engine, canvas) => {
        let scene = new BABYLON.Scene(engine);
        let camera = new BABYLON.ArcRotateCamera("Camera1", Math.PI * 0.5, 1, 20, BABYLON.Vector3.Zero(), scene);
        // camera.attachControl(false)
        // camera.position = new BABYLON.Vector3(0.020214147902387798,9.45532463776953,18.095283776200585)
        let camera2 = new BABYLON.ArcRotateCamera("Camera2", Math.PI * 0.5, 0, 30, BABYLON.Vector3.Zero(), scene);
        camera2.attachControl(true);
        // let light = new BABYLON.PointLight("light", new BABYLON.Vector3(0,4,-5),scene) 
        scene.debugLayer.show();
        let queue = new Logic.Queue();
        let AdvancedDynamicTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
        let gameLogic = new Logic.GameLogic(scene, queue, AdvancedDynamicTexture);
        // ---------------------------| Build scene |---------------------------
        //Table mesh
        let ground = BABYLON.Mesh.CreateGround('ground1', 20, 20, 20, scene);
        ground.position.y = -3;
        camera.parent = ground;
        //Table Texture
        let tableImg = new BABYLON.StandardMaterial("", scene);
        tableImg.diffuseTexture = new BABYLON.Texture("../assets/img/background2.png", scene);
        tableImg.emissiveTexture = new BABYLON.Texture("../assets/img/background2.png", scene);
        ground.material = tableImg;
        //---------------------------------------------------------------------
        //Game order Visual
        let player = new Logic.Units(gameSettings_json_1.default.playerName, AdvancedDynamicTexture);
        let createBot = (place, name) => {
            let AIs = new Logic.Units(`${name} ${place}`, AdvancedDynamicTexture, place, true);
            // AIs.setNode(scene) 
            AIs.createHand(gameLogic);
            queue.addPlayer(AIs);
        };
        //Generate Player hand of cards and player to queue
        player.createHand(gameLogic);
        queue.addPlayer(player);
        //For test only--------------------------------------------------------
        let newCard = gameLogic.cardMaker(Logic.deck[(Logic.deck.length - 1)]);
        gameLogic.cardInteractionEffect(newCard);
        player.hand.push(newCard);
        //---------------------------------------------------------------------
        //Generate AI player
        let botNames = ["JamesBot", "Funkybot", "MonkeyBot"];
        for (let i = 1; i <= gameSettings_json_1.default.botCount; i++) {
            createBot(i, botNames[i - 1]);
        }
        let playerPostions = {
            p1: Math.PI * 0.5,
            p2: Math.PI,
            p3: Math.PI * 1.5,
            p4: Math.PI * 2.0,
        };
        // Camera switching test
        let s = 1;
        scene.onKeyboardObservable.add((kbInfo) => {
            switch (kbInfo.type) {
                case BABYLON.KeyboardEventTypes.KEYDOWN:
                    switch (kbInfo.event.key) {
                        case " ":
                            if (s % 2 === 0) {
                                scene.setActiveCameraByName("Camera2");
                                camera2.attachControl(true);
                                camera.detachControl();
                            }
                            else {
                                scene.setActiveCameraByName("Camera1");
                                camera2.detachControl();
                                camera.attachControl(true);
                            }
                            s += 1;
                            break;
                        case "s":
                            camera.alpha += Math.PI * 0.5;
                            break;
                    }
                    break;
            }
        });
        gameLogic.turnSystem();
        return scene;
    }
};
