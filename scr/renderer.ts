import * as BABYLON from "babylonjs"

window.addEventListener('DOMContentLoaded', function(){
    // get the canvas DOM element
    let canvas = document.getElementById('renderCanvas') as HTMLCanvasElement;
    // load the 3D engine
    let engine = new BABYLON.Engine(canvas, true);

    // createScene function that creates and return the scene
let createScene = ()=>{
let scene = new  BABYLON.Scene(engine)
let camera = new BABYLON.FreeCamera("Camera1",new BABYLON.Vector3(0,10,-10),scene)
camera.attachControl(true)
camera.setTarget(BABYLON.Vector3.Zero())
let light = new BABYLON.PointLight("light", new BABYLON.Vector3(0,4,-5),scene) 

let ground = BABYLON.Mesh.CreateGround("ground1",6,6,2,scene)

let sphere = BABYLON.Mesh.CreateSphere("sphere",16,2,scene)
sphere.position.y = 1

return scene
}
    // call the createScene function
    var scene = createScene();

    // run the render loop
    engine.runRenderLoop(function(){
        scene.render();
    });

    // the canvas/window resize event handler
    window.addEventListener('resize', function(){
        engine.resize();
    });
});