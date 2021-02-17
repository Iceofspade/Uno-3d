import * as BABYLON from "babylonjs"
import * as GUI from "babylonjs-gui"
import * as Logic from "../logic"
export let app ={ 
    name:"testScene",
    scene: (engine:BABYLON.Engine,canvas:HTMLCanvasElement)=>{
    let scene = new  BABYLON.Scene(engine)
    let camera = new BABYLON.ArcRotateCamera("Camera1",Math.PI*0.5,0,30,BABYLON.Vector3.Zero(),scene)
    camera.attachControl(true)
    let light = new BABYLON.PointLight("light", new BABYLON.Vector3(0,4,-5),scene) 

    let queue = new Logic.Queue()

//Table mesh
let ground = BABYLON.Mesh.CreateGround('ground1', 20, 20, 20, scene);
ground.position.y = -3
camera.parent = ground
//Table Texture
let tableImg = new BABYLON.StandardMaterial("",scene)
tableImg.diffuseTexture = new BABYLON.Texture("../assets/img/background.png", scene)
tableImg.emissiveTexture = new BABYLON.Texture("../assets/img/background.png", scene)
ground.material = tableImg

//Game order Visual


let player = new Logic.Units("Pete")
let gameLogic = new Logic.GameLogic(scene,queue)
gameLogic.drawBoxCollision(()=>{console.log(camera.position)})
// Logic.cardMaker(scene,Logic.deck[0])
 
//Start by getting the number of players and givening them cards

//set's the number AI players
//Generate Player

for (let i = 1; i < 7; i++) {
    let newCard = gameLogic.randomCardGenerator()
    gameLogic.cardInteractionEffect(newCard)
    player.hand.push(newCard)
 }
    Logic.deckSorter(player.hand)
    queue.addPlayer(player)
    
let botCount = 3
//Generate AI player
for (let i = 1; i <= botCount; i++) {
let AIs = new Logic.Units("Unit "+i,i,true)
 for (let i = 0; i < 7; i++) {
    AIs.hand.push(gameLogic.randomCardGenerator())
 }  
 gameLogic.deckSorter(AIs.hand,i)
 queue.addPlayer(AIs)
    }


gameLogic.turnSystem()
    return scene
    }}