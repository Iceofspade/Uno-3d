import fs from "fs"
import * as BABYLON from "babylonjs"
import * as GUI from "babylonjs-gui"
import * as loaders from "babylonjs-loaders"
import * as Logic from "../logic"
import gameSettings from "../settings/gameSettings.json"

export let app ={  
    name:"GameScene",
    scene: (engine:BABYLON.Engine,canvas:HTMLCanvasElement)=>{
    let scene = new  BABYLON.Scene(engine)
    scene.debugLayer.show()

    let camera = new BABYLON.ArcRotateCamera("Camera1",Math.PI*0.5,1,20,BABYLON.Vector3.Zero(),scene)
    let camera2 = new BABYLON.ArcRotateCamera("Camera2",Math.PI*0.5,0,30,BABYLON.Vector3.Zero(),scene)
    camera2.attachControl(true)
    scene.debugLayer.show();
 
let queue = new Logic.Queue()
let AdvancedDynamicTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI")
let gameLogic = new Logic.GameLogic(scene,queue,AdvancedDynamicTexture)

// ---------------------------| Build scene |---------------------------
//Table mesh
let ground = BABYLON.Mesh.CreateGround('ground1', 20, 20, 20, scene);
ground.position.y = -3
camera.parent = ground
//Table Texture
let tableImg = new BABYLON.StandardMaterial("",scene)
tableImg.diffuseTexture = new BABYLON.Texture("../assets/img/background2.png", scene)
tableImg.emissiveTexture = new BABYLON.Texture("../assets/img/background2.png", scene)
ground.material = tableImg
//---------------------------------------------------------------------
 
//Game order Visual
// let player = new Logic.Units(gameSettings.playerName,AdvancedDynamicTexture)
// let createBot = (place:number,name:string)=>{
//     let AIs = new Logic.Units(`${name} ${place}`,AdvancedDynamicTexture,place,true)
// // AIs.setNode(scene) 
//  AIs.createHand(gameLogic)
//  queue.addPlayer(AIs)
// }
 

// //Generate Player hand of cards and player to queue
// player.createHand(gameLogic)
// queue.addPlayer(player)

// //For test only--------------------------------------------------------
// let newCard = gameLogic.cardMaker(Logic.deck[(Logic.deck.length-1)])
// gameLogic.cardInteractionEffect(newCard)
// player.hand.push(newCard)
// //---------------------------------------------------------------------

// //Generate AI player
// let botNames = ["JamesBot","Funkybot","MonkeyBot"]
// for (let i = 1; i <= gameSettings.botCount; i++) {
//     createBot(i,botNames[i-1])
//     }

    let playerPostions = {
        p1:Math.PI*0.5,
        p2:Math.PI,
        p3:Math.PI*1.5,
        p4:Math.PI*2.0,
    }
// Camera switching test

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
                    case "s":
                        camera.alpha += Math.PI*0.5
                    break
                }
            break;
        }
		})

// gameLogic.turnSystem()

return scene
    }}