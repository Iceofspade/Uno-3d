import * as BABYLON from "babylonjs"
import * as GUI from "babylonjs-gui"
import * as loaders from "babylonjs-loaders"
import * as Logic from "../logic"
import gameSettings from "../gameSettings.json"

export let app ={ 
    name:"GameScene",
    scene: (engine:BABYLON.Engine,canvas:HTMLCanvasElement)=>{
    let scene = new  BABYLON.Scene(engine)
    let camera = new BABYLON.ArcRotateCamera("Camera1",1.5,0,10,BABYLON.Vector3.Zero(),scene)
    camera.attachControl(true)
camera.position = new BABYLON.Vector3(0.020214147902387798,9.45532463776953,18.095283776200585)
    let camera2 = new BABYLON.ArcRotateCamera("Camera2",Math.PI*0.5,0,30,BABYLON.Vector3.Zero(),scene)
    // camera2.attachControl(true)
    // let light = new BABYLON.PointLight("light", new BABYLON.Vector3(0,4,-5),scene) 

let queue = new Logic.Queue()
let AdvancedDynamicTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI")

//Table mesh
let ground = BABYLON.Mesh.CreateGround('ground1', 20, 20, 20, scene);
ground.position.y = -3
camera.parent = ground
//Table Texture
let tableImg = new BABYLON.StandardMaterial("",scene)
tableImg.diffuseTexture = new BABYLON.Texture("../assets/img/background2.png", scene)
tableImg.emissiveTexture = new BABYLON.Texture("../assets/img/background2.png", scene)
ground.material = tableImg

let gameLogic = new Logic.GameLogic(scene,queue,AdvancedDynamicTexture)
 
//Game order Visual
let player = new Logic.Units(gameSettings.playerName,AdvancedDynamicTexture)
let createBot = (place:number,name:string)=>{
    let AIs = new Logic.Units(`${name} ${place}`,AdvancedDynamicTexture,place,true)
        // AIs.setNode(scene)
    for (let i = 0; i < gameSettings.startingCardCount; i++) {
        AIs.hand.push(gameLogic.randomCardGenerator())
 }  
 AIs.updateCount()
 gameLogic.deckSorter(AIs)
 queue.addPlayer(AIs)
}
 
//Start by getting the number of players and givening them cards

//set's the number AI players
//Generate Player


for (let i = 0; i < gameSettings.startingCardCount; i++) {
    let newCard = gameLogic.randomCardGenerator()
    gameLogic.cardInteractionEffect(newCard)
    player.hand.push(newCard)
}
player.updateCount()

//For test only--------------------------------------------------------
// let newCard = Logic.cardMaker(scene,Logic.deck[(Logic.deck.length-1)])
// gameLogic.cardInteractionEffect(newCard)
// player.hand.push(newCard)
//---------------------------------------------------------------------

gameLogic.deckSorter(player)
queue.addPlayer(player)
let cam ={
    postion:camera.position,
    alpha:camera.alpha,
    radius:camera.radius,
    beta:camera.beta
}

let botCount = gameSettings.botCount

//Generate AI player
for (let i = 1; i <= botCount; i++) {
    createBot(i,"Unit")
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
gameLogic.turnSystem()

return scene
    }}