declare global {
    interface Window {
        engine:any;
    }
}
import * as BABYLON from "babylonjs"
import * as GUI from "babylonjs-gui"
import {readdirSync} from "fs"



class SceneHandler{
    private sceneList: string[] =[];
    scene:(BABYLON.Scene|undefined);
    engine:(BABYLON.Engine|undefined);
    canvas:(HTMLCanvasElement|undefined); 
        constructor(){
        this.sceneList = [];
        this.engine;
        this.canvas;
        this.scene;
 
        }
    //Get the name of all files that have a scene that can be rendered
        loadScenes =async()=>{
         this.sceneList = readdirSync("./app/scenes/").filter(d => d.endsWith(".js"))
        }
    //Set the canvas for everything to be rendered on
        setCanvas = async (canvas:HTMLCanvasElement )=>{
            this.canvas = canvas
            this.engine = new BABYLON.Engine(this.canvas, true);
        }
    //A deafault scene to fall back on if an attempt load a scene fails
    private defaultScene = ()=>{
            let scene = new BABYLON.Scene(this.engine!)
            let camera = new BABYLON.FreeCamera("Camera1",new BABYLON.Vector3(0,10,-10),scene)
            camera.attachControl(true)
            camera.setTarget(BABYLON.Vector3.Zero())
            let light = new BABYLON.PointLight("light", new BABYLON.Vector3(0,4,-5),scene) 
            
            let ground = BABYLON.Mesh.CreateGround("ground1",6,6,2,scene)
            
            let sphere = BABYLON.Mesh.CreateSphere("sphere",16,2,scene)
            sphere.position.y = 1
            
            return scene
            }
    // Setting the new scene to render
        setScene =async (sceneName:string)=>{
            this.loadScenes().then(()=>{
            let i = this.sceneList.indexOf(sceneName+".js")
            if (i === -1){
    console.error("Attempted to load none existing scene")
     this.scene = this.defaultScene()
            }
            else if(i>-1) {
            let pull = require(`./scenes/${this.sceneList[i]}`)
            this.scene = pull.app.scene(this.engine,this.canvas) 
            }
        })
        }
    // Start rendering of scene
        initialize() {
            this.canvas = document.getElementById('renderCanvas') as HTMLCanvasElement; 

                this.engine?.runRenderLoop(() =>{
                    this.scene!.render();
                });                
        }
    }
export let handler = new SceneHandler()
    window.addEventListener('DOMContentLoaded', function(){
        handler.setCanvas(document.getElementById('renderCanvas') as HTMLCanvasElement).then(()=>{
            //Rename test to what ever you want the starting scene to be      
            handler.setScene("game").then(()=>{
                    handler.initialize()
            })
             window.addEventListener('resize', function(){
                handler.engine ==null ?console.error("Cannot resize engine or null") :handler.engine.resize();
            });
        })
     })
   