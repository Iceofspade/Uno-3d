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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const BABYLON = __importStar(require("babylonjs"));
const GUI = __importStar(require("babylonjs-gui"));
const Logic = __importStar(require("../logic"));
const gameSettings_json_1 = __importDefault(require("../gameSettings.json"));
const fs_1 = __importDefault(require("fs"));
exports.app = {
    name: "GameScene",
    scene: (engine, canvas) => {
        let scene = new BABYLON.Scene(engine);
        let camera = new BABYLON.ArcRotateCamera("Camera1", 1.5, 0, 10, BABYLON.Vector3.Zero(), scene);
        // camera.attachControl(false)
        camera.position = new BABYLON.Vector3(0.020214147902387798, 9.45532463776953, 18.095283776200585);
        // let camera2 = new BABYLON.ArcRotateCamera("Camera2",Math.PI*0.5,0,30,BABYLON.Vector3.Zero(),scene)
        // camera2.attachControl(true)
        // let light = new BABYLON.PointLight("light", new BABYLON.Vector3(0,4,-5),scene) 
        // let testMusic = new BABYLON.Sound("test music","../assets/audio/music/Northern Born - Yee Haw Ninety9Lives Release.mp3",scene,()=> {testMusic.play()},{
        //     loop:true,
        //     volume:0.1,
        //     // autoplay:true
        // })
        let currentTrack = 0;
        let loadAllMusic = (scene) => {
            let tracks = fs_1.default.readdirSync("./assets/audio/music/").filter(d => d.endsWith(".mp3"));
            let soundTrack = new BABYLON.SoundTrack(scene, {
                volume: 0.5,
            });
            tracks.map((track) => __awaiter(void 0, void 0, void 0, function* () {
                soundTrack.addSound(new BABYLON.Sound("test music", `../assets/audio/music/${track}`, scene, null, {
                    // loop:true,
                    volume: 0.5,
                    // autoplay:true
                }));
            }));
            return soundTrack;
        };
        // let musicControler = new Logic.musicControle(scene,0.5)
        //    let playList = loadAllMusic(scene)
        //    let db = new BABYLON.Analyser(scene)
        //    playList.connectToAnalyser(db)
        //  db.drawDebugCanvas() 
        // console.log( db.getByteFrequencyData())
        //    playList.soundCollection[currentTrack].autoplay = true
        //    playList.soundCollection.forEach(track =>{
        //     playList.soundCollection[currentTrack].autoplay = true
        //     track.onEndedObservable.add(()=>{
        //         currentTrack++
        //          if (currentTrack >= playList.soundCollection.length) {
        //               currentTrack = 0
        //          }         
        //          playList.soundCollection[currentTrack].play()
        //         })
        //     })
        let queue = new Logic.Queue();
        let AdvancedDynamicTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
        let gameLogic = new Logic.GameLogic(scene, queue, AdvancedDynamicTexture);
        //Table mesh
        let ground = BABYLON.Mesh.CreateGround('ground1', 20, 20, 20, scene);
        ground.position.y = -3;
        camera.parent = ground;
        //Table Texture
        let tableImg = new BABYLON.StandardMaterial("", scene);
        tableImg.diffuseTexture = new BABYLON.Texture("../assets/img/background2.png", scene);
        tableImg.emissiveTexture = new BABYLON.Texture("../assets/img/background2.png", scene);
        ground.material = tableImg;
        //Game order Visual
        let player = new Logic.Units(gameSettings_json_1.default.playerName, AdvancedDynamicTexture);
        let createBot = (place, name) => {
            let AIs = new Logic.Units(`${name} ${place}`, AdvancedDynamicTexture, place, true);
            // AIs.setNode(scene)
            for (let i = 0; i < gameSettings_json_1.default.startingCardCount; i++) {
                AIs.hand.push(gameLogic.randomCardGenerator());
            }
            AIs.updateCount();
            gameLogic.deckSorter(AIs);
            queue.addPlayer(AIs);
        };
        //Start by getting the number of players and givening them cards
        //set's the number AI players
        //Generate Player
        for (let i = 0; i < gameSettings_json_1.default.startingCardCount; i++) {
            let newCard = gameLogic.randomCardGenerator();
            gameLogic.cardInteractionEffect(newCard);
            player.hand.push(newCard);
        }
        player.updateCount();
        //For test only--------------------------------------------------------
        let newCard = Logic.cardMaker(scene, Logic.deck[(Logic.deck.length - 1)]);
        gameLogic.cardInteractionEffect(newCard);
        player.hand.push(newCard);
        //---------------------------------------------------------------------
        gameLogic.deckSorter(player);
        queue.addPlayer(player);
        let cam = {
            postion: camera.position,
            alpha: camera.alpha,
            radius: camera.radius,
            beta: camera.beta
        };
        let botCount = gameSettings_json_1.default.botCount;
        //Generate AI player
        let botNames = ["JamesBot", "Funkybot", "MonkeyBot"];
        for (let i = 1; i <= botCount; i++) {
            createBot(i, botNames[i - 1]);
        }
        // Camera switching test
        /*
        let s = 1
            scene.onKeyboardObservable.add((kbInfo) => {
                switch (kbInfo.type) {
                    case BABYLON.KeyboardEventTypes.KEYDOWN:
                        switch (kbInfo.event.key) {
                            case " ":
                            if(s%2 ===0 ){
                               scene.setActiveCameraByName("Camera2")
                               camera2.attachControl(true)
                               camera.detachControl()
                            }
                               else{
                                scene.setActiveCameraByName("Camera1")
                                camera2.detachControl()
                                camera.attachControl(true)
                               }
                               s+=1
                            break
                        }
                    break;
                }
                })
        */
        gameLogic.turnSystem();
        return scene;
    }
};
