import * as BABYLON from "babylonjs"
import * as GUI from "babylonjs-gui"
import * as Logic from "../logic"
export let app ={ 
    name:"testScene",
    scene: (engine:BABYLON.Engine,canvas:HTMLCanvasElement)=>{
    let scene = new  BABYLON.Scene(engine)
    let camera = new BABYLON.ArcRotateCamera("Camera1",0,0,100,BABYLON.Vector3.Zero(),scene)
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

    // let player = new Logic.Units("Pete")
    let gameLogic = new Logic.GameLogic(scene,queue)
// Logic.cardMaker(scene,Logic.deck[0])
//Card pile 


    return scene
    }}