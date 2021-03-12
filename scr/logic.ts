import * as BABYLON  from "babylonjs"
import * as GUI from "babylonjs-gui"
import * as loaders from "babylonjs-loaders"
import fs from "fs"
import { Scene } from "babylonjs/index"
import path from 'path'
import sceenControl from "./renderer"  
import sceneHander from "./renderer"
import gameSettings from "./gameSettings.json"
import { Vector3 } from "babylonjs"
import {remote} from "electron"
 export interface Card{
    mesh:BABYLON.Mesh,
    cardInfo:{name:string,
    color:string|null,
    sign:number|string,
    ID:number}
}
export let deck:Card["cardInfo"][] = [
{name:"yellow_9",
        color:"yellow",
    sign:9,
    ID:1},
    {name:"yellow_8",
        color:"yellow",
    sign:8,
    ID:2},
    {name:"yellow_7",
        color:"yellow",
    sign:7,
    ID:3},
    {name:"yellow_6",
        color:"yellow",
    sign:6,
    ID:4},
    {name:"yellow_5",
        color:"yellow",
    sign:5,
    ID:5},
    {name:"yellow_4",
        color:"yellow",
    sign:4,
    ID:6},
    {name:"yellow_3",
        color:"yellow",
    sign:3,
    ID:7},
    {name:"yellow_2",
        color:"yellow",
    sign:2,
    ID:8},
    {name:"yellow_1",
        color:"yellow",
    sign:1,
    ID:9},
    {name:"yellow_0",
        color:"yellow",
    sign:0,
    ID:10},
    {name:"yellow_skip",
        color:"yellow",
    sign:"skip",
    ID:11},
    {name:"yellow_reverse",
        color:"yellow",
    sign:"reverse",
    ID:12},
    {name:"yellow_draw2",
        color:"yellow",
    sign:"draw2",
    ID:13},

{name:"red_9",
        color:"red",
    sign:9,
    ID:14},
    {name:"red_8",
        color:"red",
    sign:8,
    ID:15},
    {name:"red_7",
        color:"red",
    sign:7,
    ID:16},
    {name:"red_6",
        color:"red",
    sign:6,
    ID:17},
    {name:"red_5",
        color:"red",
    sign:5,
    ID:18},
    {name:"red_4",
        color:"red",
    sign:4,
    ID:19},
    {name:"red_3",
        color:"red",
    sign:3,
    ID:20},
    {name:"red_2",
        color:"red",
    sign:2,
    ID:21},
    {name:"red_1",
        color:"red",
    sign:1,
    ID:22},
    {name:"red_0",
        color:"red",
    sign:0,
    ID:23},
    {name:"red_skip",
        color:"red",
    sign:"skip",
    ID:24},
    {name:"red_reverse",
        color:"red",
    sign:"reverse",
    ID:25},
    {name:"red_draw2",
        color:"red",
    sign:"draw2",
    ID:26},

{name:"green_9",
    color:"green",
sign:9,
    ID:27},
    {name:"green_8",
        color:"green",
    sign:8,
    ID:28},
    {name:"green_7",
        color:"green",
    sign:7,
    ID:29},
    {name:"green_6",
        color:"green",
    sign:6,
    ID:30},
    {name:"green_5",
        color:"green",
    sign:5,
    ID:31},
    {name:"green_4",
        color:"green",
    sign:4,
    ID:32},
    {name:"green_3",
        color:"green",
    sign:3,
    ID:33},
    {name:"green_2",
        color:"green",
    sign:2,
    ID:34},
    {name:"green_1",
        color:"green",
    sign:1,
    ID:35},
    {name:"green_0",
        color:"green",
    sign:0,
    ID:36},
    {name:"green_skip",
        color:"green",
    sign:"skip",
    ID:37},
    {name:"green_reverse",
        color:"green",
    sign:"reverse",
    ID:38},
    {name:"green_draw2",
        color:"green",
    sign:"draw2",
    ID:39},
    
{name:"blue_9",
    color:"blue",
sign:9,
    ID:40},
    {name:"blue_8",
        color:"blue",
    sign:8,
    ID:41},
    {name:"blue_7",
        color:"blue",
    sign:7,
    ID:42},
    {name:"blue_6",
        color:"blue",
    sign:6,
    ID:43},
    {name:"blue_5",
        color:"blue",
    sign:5,
    ID:44},
    {name:"blue_4",
        color:"blue",
    sign:4,
    ID:45},
    {name:"blue_3",
        color:"blue",
    sign:3,
    ID:46},
    {name:"blue_2",
        color:"blue",
    sign:2,
    ID:47},
    {name:"blue_1",
        color:"blue",
    sign:1,
    ID:48},
    {name:"blue_0",
        color:"blue",
    sign:0,
    ID:49},
    {name:"blue_skip",
        color:"blue",
    sign:"skip",
    ID:50},
    {name:"blue_reverse",
        color:"blue",
    sign:"reverse",
    ID:51},
    {name:"blue_draw2",
        color:"blue",
    sign:"draw2",
    ID:52},

{name:"wild",
        color:null,
    sign:"wild",
    ID:53},
{name:"draw4",
    color:null,
sign:"draw4",
    ID:54}
]
class ColorControles {
    private mainContainer:GUI.Grid
    public redBox:GUI.Button
    public blueBox:GUI.Button
    public greenBox:GUI.Button
    public yellowBox:GUI.Button
    public pickedColor:string|null = null
    public colorTexture:BABYLON.StandardMaterial
    public sceneUI:GUI.AdvancedDynamicTexture
    constructor(SceneUI:GUI.AdvancedDynamicTexture,scene:BABYLON.Scene){
        this.sceneUI = SceneUI

        this.mainContainer = new GUI.Grid("color holders")
        this.mainContainer.addColumnDefinition(100,true)
        this.mainContainer.addColumnDefinition(100,true)
        this.mainContainer.addRowDefinition(100,true)
        this.mainContainer.addRowDefinition(100,true)
        this.mainContainer.isVisible = false
        this.mainContainer.widthInPixels = 200
        this.mainContainer.heightInPixels = 200
        this.mainContainer.isHighlighted = true
        SceneUI.addControl(this.mainContainer)

        this.redBox = new GUI.Button("red box")
        this.redBox.background = "red"
        this.mainContainer.addControl(this.redBox,0,0)

        this.blueBox = new GUI.Button("blue box")
        this.blueBox.background = "blue"
        this.mainContainer.addControl(this.blueBox,1,0)

        this.greenBox = new GUI.Button("green box")
        this.greenBox.background = "green"
        this.mainContainer.addControl(this.greenBox,0,1)

        this.yellowBox = new GUI.Button("yellow box")
        this.yellowBox.background = "yellow"
        this.mainContainer.addControl(this.yellowBox,1,1)

    let plane = BABYLON.Mesh.CreateGround("Color mesh",5,5,5,scene)
    plane.position.y = -2.95
    plane.isEnabled(false)
    this.colorTexture = new BABYLON.StandardMaterial("Color texture",scene)
    this.colorTexture.alpha = 0
    
    plane.material = this.colorTexture
 

    }
setIsVisable = (state:boolean)=>{
    this.mainContainer.isVisible = state
}
showPicked =  async (color:string)=>{
    switch (color) {
        case "red":
        this.pickedColor = "red"
        this.colorTexture.emissiveColor = new BABYLON.Color3(1,0,0)
        this.colorTexture.alpha = 1
            break;
        case "blue":
        this.pickedColor = "blue"
        this.colorTexture.emissiveColor = new BABYLON.Color3(0,0,1)
        this.colorTexture.alpha = 1
            break
        case "green":
        this.pickedColor = "green"
        this.colorTexture.emissiveColor = new BABYLON.Color3(0,1,0)
        this.colorTexture.alpha = 1
            break
        case "yellow":
        this.pickedColor = "yellow"
        this.colorTexture.emissiveColor = new BABYLON.Color3(1,1,0)
        this.colorTexture.alpha = 1
            break
        default:
        console.error("Invalid input for color pick")
        this.colorTexture.emissiveColor = new BABYLON.Color3(72/255, 72/255, 72/255)
        this.colorTexture.alpha = 0
            break;
    }

    }
restBoxes = ()=>{
    this.setIsVisable(false)
    setTimeout(() => {
    this.colorTexture.diffuseColor = new BABYLON.Color3(72/255, 72/255, 72/255)
    this.colorTexture.emissiveColor = new BABYLON.Color3(72/255, 72/255, 72/255)
    this.colorTexture.alpha = 0
    }, 3000);
    
    }
isColorPickable = (state:boolean)  =>{
    this.redBox.isPointerBlocker = state
    this.blueBox.isPointerBlocker = state
    this.greenBox.isPointerBlocker = state
    this.yellowBox.isPointerBlocker = state
}
randomColor = () => {
    let colors = ["yellow", "red", "green", "blue"]
    return colors[Math.floor(Math.random() * colors.length)]
};
}
export class GameLogic extends ColorControles{
    public queue:Queue
    public pile:Card
    private scene:BABYLON.Scene
    private drawBox:BABYLON.Mesh
    private wildColor:null|string = null
    private drawRate:number = 0
    private boxTexture:BABYLON.StandardMaterial
    private boxHightLigheter:BABYLON.HighlightLayer
    private arrowDirectionMesh:BABYLON.Mesh
    private basePileStartingPos:number
    private spinRate:number
    private cardPlayedSound:BABYLON.Sound
    private drawnCardSound:BABYLON.Sound 
    private unoTrigger:GUI.Button
    private unoButtonImage:GUI.Image
    private musicControles:musicControle
    constructor(scene:BABYLON.Scene,queue:Queue,sceneUI:GUI.AdvancedDynamicTexture){
        super(sceneUI,scene)
        this.queue = queue
        this.pile = this.randomCardGenerator(2)
        this.scene = scene
        this.basePileStartingPos = -2.9
        this.pile.mesh.position = new BABYLON.Vector3(0,-2.9,0)
        this.pile.mesh.rotation =  new BABYLON.Vector3(Math.PI*0.5,0,0)

//                         ----------| Sound |------------
this.musicControles = new musicControle(this.scene)
this.musicControles.soundTrack.soundCollection[this.musicControles.currentTrack]
this.cardPlayedSound = loadAudio(this.scene,"drawn_card.wav") 
this.drawnCardSound = loadAudio(this.scene,"played_card.wav")
//------------------------------------| Draw box data |------------------------------------

        let faceUV = new Array(3)
        for (var i = 0; i < 6; i++) {
            faceUV[i] = new BABYLON.Vector4(1/3, 0, (1+1)/3, 1/1);
        }
          faceUV[4] = new BABYLON.Vector4(0/3, 0, (0+1)/3, 1/1);
          faceUV[2] = new BABYLON.Vector4(2/3, 0, (2+1)/3, 1/1);
          faceUV[3] = new BABYLON.Vector4(2/3, 0, (2+1)/3, 1/1);

        this.boxHightLigheter = new BABYLON.HighlightLayer("Draw box highlight",this.scene)
        this.boxHightLigheter.innerGlow = false 
        this.boxHightLigheter.outerGlow = false 

        this.drawBox = BABYLON.MeshBuilder.CreateBox("draw box",{width:2,height:0.8,faceUV:faceUV})
        this.drawBox.position = new BABYLON.Vector3(2.5,-2.5,0)
        this.drawBox.rotation.y = Math.PI*0.5
        this.boxHightLigheter.addMesh(this.drawBox,new BABYLON.Color3(1,1,1))

        this.boxTexture = new BABYLON.StandardMaterial("Card Texture",scene)
        this.boxTexture.diffuseTexture = new BABYLON.Texture("../assets/img/deck texture.png", scene)
        this.boxTexture.emissiveTexture = new BABYLON.Texture("../assets/img/deck texture.png", scene)
        this.drawBox.material = this.boxTexture

        this.drawBox.actionManager = new BABYLON.ActionManager(this.scene);
        // On Hover Over
        this.drawBox.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger ,() =>{
            this.boxHightLigheter.outerGlow = false 
            }));
        // On Hover Out
        this.drawBox.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger ,() =>{
            this.boxHightLigheter.outerGlow = true
            }));
        // On Click
        this.drawBox.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickDownTrigger ,() =>{
            let draw = this.randomCardGenerator()
            this.queue.getCurrentPlayer().hand.unshift(draw)
            this.deckSorter(this.queue.getCurrentPlayer())
            if (this.queue.getCurrentPlayer().place === 0) {
                this.cardInteractionEffect(draw)
                this.queue.getCurrentPlayer().updateCount()}  
            }))
//------------------------------------------------------------------------------------------------------------

// ------------------------------------ Arrow spin Control ------------------------------------
    this.spinRate = 0.01;
    this.arrowDirectionMesh = BABYLON.Mesh.CreateGround("Order Direction", 15, 15, 15, scene)
    this.arrowDirectionMesh.position.y = -2.9
    this.arrowDirectionMesh.rotation.x -= -Math.PI*2
    this.scene.registerAfterRender(()=>{
        this.arrowDirectionMesh.rotation.y-=this.spinRate
    })

    let arrowTexture = new BABYLON.StandardMaterial("",scene)
    arrowTexture.diffuseTexture = new BABYLON.Texture("../assets/img/Directional arrows.png", scene)
    arrowTexture.emissiveTexture = new BABYLON.Texture("../assets/img/Directional arrows.png", scene)
    arrowTexture.diffuseTexture.hasAlpha = true;
    arrowTexture.transparencyMode = BABYLON.Material.MATERIAL_ALPHATESTANDBLEND;
    arrowTexture.useAlphaFromDiffuseTexture = true;
    arrowTexture.backFaceCulling = false
    this.arrowDirectionMesh.material = arrowTexture
//--------------------------------------------------------------------------------------------

//-------------------------------------------- Color picking events ------------------------------------------------
    this.redBox.onPointerDownObservable.add(()=>{
        this.showPicked("red")
        this.wildColor = this.pickedColor
        this.queue.movePlayerBack().then(()=>{this.turnSystem();this.setIsVisable(false)})
        });
    this.blueBox.onPointerDownObservable.add(()=>{
            this.showPicked("blue")
            this.wildColor = this.pickedColor
            this.queue.movePlayerBack().then(()=>{this.turnSystem();this.setIsVisable(false)})
        });
    this.greenBox.onPointerDownObservable.add(()=>{
            this.showPicked("green")
            this.wildColor = this.pickedColor
            this.queue.movePlayerBack().then(()=>{this.turnSystem();this.setIsVisable(false)})
        });
    this.yellowBox.onPointerDownObservable.add(()=>{
            this.showPicked("yellow")
            this.wildColor = this.pickedColor
            this.queue.movePlayerBack().then(()=>{ this.turnSystem();this.setIsVisable(false)})
        });
//---------------------------------------------------------------------------------------------------------------------
    this.unoTrigger = new GUI.Button("Uno trigger")
    this.unoTrigger.thickness = 0
    this.unoTrigger.widthInPixels = 150
    this.unoTrigger.heightInPixels = 125
    this.unoTrigger.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM
    this.unoTrigger.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT
    this.unoTrigger.topInPixels = -50
    this.unoTrigger.leftInPixels = -50
    this.unoTrigger.isEnabled = false
    this.unoTrigger.isVisible = false
    this.sceneUI.addControl(this.unoTrigger)

this.unoTrigger.onPointerDownObservable.add(()=>{
    this.onUnoCall(true)
    this.unoTrigger.isEnabled = false
    this.unoTrigger.isVisible = false
})

    this.unoButtonImage =  new GUI.Image("uno button","../assets/img/uno button.png")
    this.unoTrigger.addControl(this.unoButtonImage)
//--------------------------------------------------------------------------------------------

    };
    setUnoButton = (state:boolean) =>{
        this.unoButtonImage.isVisible = state
        this.unoTrigger.isEnabled = state
    };
    onUnoCall = (byPlayer?:boolean) =>{
        let callers = this.queue.printQueue().filter(unit =>{ 
            if(unit.isAI === true && unit !== this.queue.getCurrentPlayer()){
                return true
            }
            return false
    })
    let callUno = 0
    callers.forEach(() =>{
        let unoCallchance = Math.round(Math.random()*10)
        if (unoCallchance >= 8){
            callUno =+1
        }
    })
    if ( callUno >= 1 || byPlayer === true ) {
        this.queue.getCurrentPlayer().hand.push(this.randomCardGenerator())
        this.queue.getCurrentPlayer().hand.push(this.randomCardGenerator())
        this.deckSorter(this.queue.getCurrentPlayer())
        this.queue.getCurrentPlayer().playerNode
        this.queue.getCurrentPlayer().unoCalledBox.isVisible = false
    }
        
    }
    isPickable = (state:boolean) =>{
    this.drawBox.isPickable = state
    this.queue.printQueue()
    .filter(player => player.isAI == false)
    .forEach(player => player.hand.forEach(card => card.mesh.isPickable = state ))
    };
    cardInteractionEffect = (card:Card) => {
        let mesh = card.mesh
       
               mesh.actionManager = new BABYLON.ActionManager(this.scene);
               let cardHighlight = new BABYLON.HighlightLayer("hl1", this.scene);
               cardHighlight.addMesh(mesh, BABYLON.Color3.White());
               cardHighlight.innerGlow = false
               cardHighlight.outerGlow = false
        //Hover Out Effect
               mesh.actionManager.registerAction(new BABYLON.InterpolateValueAction(BABYLON.ActionManager.OnPointerOutTrigger, mesh, "position.y",-2,300));
               mesh.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger ,() =>{
                cardHighlight.outerGlow = false
               }));
        //Hover Over Effect
               mesh.actionManager.registerAction(new BABYLON.InterpolateValueAction(BABYLON.ActionManager.OnPointerOverTrigger, mesh, "position.y",-1 ,300));
               mesh.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger ,() =>{
                   cardHighlight.outerGlow = true
                   }))
        //On right click for details on the card
               mesh.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnRightPickTrigger ,() =>{
                       console.log("Picked card "+card.cardInfo.name,card)
                   }))
        //On duoble click 
               mesh.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnLeftPickTrigger, () =>{
                   // let rotationRandomiser = Math.floor(Math.random() * 4)*(Math.PI*0.25)
                   let playableCheck = playableChecker(card,this.pile,this.wildColor);
                   if(playableCheck.playable === true){
                        this.pilePusher(card)
                        this.specialCards(playableCheck.card.cardInfo)
                       console.log("Player played "+playableCheck.card.cardInfo.name)
                       switch (playableCheck.card.cardInfo.sign) {
                            case "wild":
                            case "draw4":
                                console.log("Waiting for a color to be picked")
                            break;

                            default:
                            this.queue.movePlayerBack().then(()=>{this.turnSystem();
                                this.restBoxes()
                                this.unoTrigger.isEnabled = false
                                this.unoTrigger.isVisible = false
                            })
                            break;
                       }
                   return
               }   
                       console.log("Can't be played")
                       }));    
            
            
    };               
    randomCardGenerator = (falloff:number = 0)=>{
        let cardPicker = Math.floor(Math.random()*((deck.length-1)-falloff)) 
        let set = cardMaker(this.scene,deck[cardPicker])
        if (this.drawnCardSound !== undefined) {
            this.drawnCardSound.play()
        }
        // console.log( this.drawnCardSound)
        return set
    };
    specialCards = (playedCard:Card["cardInfo"])=>{
        if (playedCard.sign === "wild") {
            let newColor = this.randomColor() 
            if(this.queue.getCurrentPlayer().isAI === true){
            this.setColor(newColor)
            this.showPicked(newColor)
            this.isColorPickable(false)
            this.wildColor = this.pickedColor
        }
            else{
                this.setIsVisable(true)
                this.isColorPickable(true)
            }
            console.log("A wild card has been played the color is now "+this.wildColor)
        }else if(playedCard.sign === "draw4"){
            this.drawRate+=4
            let newColor = this.randomColor() 
            if(this.queue.getCurrentPlayer().isAI === true){
            this.setColor(newColor)
            this.showPicked(newColor)
            this.isColorPickable(false)
            this.wildColor = this.pickedColor
            }
            else{
                this.setIsVisable(true)
                this.isColorPickable(true)
            }
            console.log("A draw4 has been played the color is "+this.wildColor)
        }else if(playedCard.sign === "draw2"){
            this.drawRate+=2
            console.log("A draw2 has been played")
        }else if(this.drawRate > 0){
            let drawArry = []
    for (let i = 0; i < this.drawRate; i++) {
        drawArry.push(this.randomCardGenerator())
    }if (this.queue.getCurrentPlayer().place === 0) {
        this.queue.getCurrentPlayer().hand.push(...drawArry)
        drawArry.map((card)=>{this.cardInteractionEffect(card)})
        this.deckSorter(this.queue.getCurrentPlayer())
        console.log(this.queue.getCurrentPlayer().name+" has drawn "+this.drawRate+" cards" )
        this.drawRate = 0
    }else{
        this.queue.getCurrentPlayer().hand.push(...drawArry)
        this.deckSorter(this.queue.getCurrentPlayer())
        console.log(this.queue.getCurrentPlayer().name+" has drawn "+this.drawRate+" cards" )
        this.drawRate = 0
    }
        }else if(playedCard.sign === "skip"){
            this.queue.movePlayerBack()
            console.log(this.queue.getCurrentPlayer().name+" has been skiped")
        }else if(playedCard.sign === "reverse"){
            this.spinRate=-this.spinRate
            this.arrowDirectionMesh.rotation.x -= Math.PI
            console.log( "The turn order has been revesed!")
            this.queue.reverseOrder()
        }else{
            this.wildColor = null
        }
    }; 
    pilePusher = async (playedCard:Card)=>{
        this.queue.getCurrentPlayer().hand.splice(this.queue.getCurrentPlayer().hand.indexOf(playedCard),1)
        let randomRotation = Math.random()*(2)+Math.PI
     
        playedCard.mesh.position = new BABYLON.Vector3(0,this.basePileStartingPos+=0.001,0)
        playedCard.mesh.rotation = new BABYLON.Vector3(Math.PI*0.5,0,randomRotation)
     
        let newpile = BABYLON.Mesh.MergeMeshes([playedCard.mesh,this.pile.mesh],true,true,undefined,true,true);
        newpile!.name = playedCard.cardInfo.name
    
        this.pile = { mesh:newpile as BABYLON.Mesh,
            cardInfo:playedCard.cardInfo
        }
        this.deckSorter(this.queue.getCurrentPlayer())
       if (this.cardPlayedSound !== undefined) {
           this.cardPlayedSound.play()
        }
    };
    /**
   * Sorts the cards and realign's them back to there space
   * @param {*} player The player who's hand that will be sorted
   */
    deckSorter = async (player:Units)=>{
        let playerHand = player.hand
        let placement = player.place
        let node = player.playerNode
        //Rearange order of cards to be alphabetical order
            playerHand.sort((a, b) => (a.cardInfo.name >= b.cardInfo.name) ? 1 : -1);
        //Instalise Starting postion
            let startPositon ={
                x:0,
                z:0,
             };
        //Instalise side to increment
            let increment = {
                side:0,
                depth:0
            }
        //What side should the cards face
        let facing:number;
         //Checks which player to sort 
              placement === 0 ? (startPositon.x = 0, startPositon.z = 8,facing = Math.PI, increment.side = 0.4,increment.depth = 0.001)
            : placement === 2 ? (startPositon.x = 0, startPositon.z = -8,facing = Math.PI*2, increment.side = 0.4 ,increment.depth = 0.001)
            : placement === 3 ? (startPositon.x = 8, startPositon.z = 0,facing = Math.PI*1.5, increment.side = 0.001,increment.depth = 0.4) 
            :                   (startPositon.x = -8,startPositon.z = 0,facing = Math.PI*0.5, increment.side = 0.001,increment.depth = 0.4)      
          node.position = new BABYLON.Vector3(startPositon.x,-2,startPositon.z)
        //sorts deck of cards
         playerHand.map(card =>{
            card.mesh.rotation = new BABYLON.Vector3(0.5,facing,0);
            card.mesh.position.x = startPositon.x
            card.mesh.position.y = -2
            card.mesh.position.z = startPositon.z
            startPositon.x += increment.side
            startPositon.z -= increment.depth
           
         });
    };   
    turnSystem = () =>{
  
    this.queue.printQueue().forEach(player => {
        player.updateCount()
        player.playerDisplayBox.background = "brown"
   if (player === this.queue.getCurrentPlayer()){
    player.playerDisplayBox.background = "green"
   }
    })
    
    if (this.queue.printQueue().filter(deck=> deck.hand.length === 0).length > 0) {
            this.gameOver()
            return
    }
    
    // this.queue.printQueue().forEach( unit => {
    //     if(unit !== this.queue.getCurrentPlayer()){
    //         if(unit.hand.length === 1){
    //             this.unoTrigger.isEnabled = true
    //             this.unoTrigger.isVisible = true
    //             this.onUnoCall() 
    //         }
    //     }
    // })
    let currentPlayer = this.queue.getCurrentPlayer()
    //If it's the AI's turn then the AI acts
    if (currentPlayer.place !== 0) {
        this.isPickable(false)

       let cardCheckerLoop = currentPlayer.hand.map(card => playableChecker(card,this.pile,this.wildColor)).filter(card => card.playable)
    
       if (cardCheckerLoop.length > 0) {
        setTimeout(() => {
            let playedCard = currentPlayer.hand[currentPlayer.hand.indexOf(cardCheckerLoop[0].card)]
            console.log("Unit played "+playedCard.cardInfo.name)
            this.pilePusher(playedCard)
            this.specialCards(playedCard.cardInfo)
            this.queue.movePlayerBack().then(()=>{
                this.turnSystem();
                this.restBoxes()
                /*this.unoTrigger.isEnabled = false
            this.unoTrigger.isVisible = false*/})
        }, 1000);
        }else if(cardCheckerLoop.length <= 0){
            setTimeout(() => {
                currentPlayer.hand.push(this.randomCardGenerator())
                this.deckSorter(currentPlayer)
                console.log(this.queue.getCurrentPlayer().name+" Drawing cards")
                this.turnSystem()  
            }, 1000);      
        }
    }
    //Else let the player act
    else if(this.queue.getCurrentPlayer().place === 0){
        this.isPickable(true)
        console.log("Waiting for input")
    }
    
    };
    gameOver = ()=>{
        let winner = this.queue.printQueue().filter( deck=> deck.hand.length === 0)
        let box = new GUI.Rectangle()
        box.width = 0.6
        box.height = 0.4
        this.sceneUI.addControl(box) 
        let backgroundTextutre = new GUI.Image("Background Texture","../assets/img/menu background.png")
        box.addControl(backgroundTextutre)
        let VitoryText = new GUI.TextBlock("Vitory Text",`${winner[0].name} has won!\nDo you want to play again?`)
        VitoryText.textVerticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP
        VitoryText.fontSizeInPixels = 50
        box.addControl(VitoryText)

        let playAgain = this.subButtonMaker("Play again",box)
        playAgain.background = 'green'
        playAgain.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT
        playAgain.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM
        playAgain.topInPixels = -20
        playAgain.leftInPixels = 20
        playAgain.onPointerDownObservable.add(()=>{
            this.queue.emptyQueue() 
        this.musicControles.soundTrack.soundCollection.forEach(sound => sound.dispose())
            sceneHander.setScene("MenuScene")
        })
        let quit = this.subButtonMaker("Quit",box)
        quit.background = 'Red'
        quit.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT
        quit.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM
        quit.topInPixels = -20
        quit.leftInPixels = -20
        quit.onPointerDownObservable.add(()=>{
            this.queue.emptyQueue() 
            this.musicControles.soundTrack.soundCollection.forEach(sound => sound.dispose())
            sceneHander.setScene("MenuScene")
            let window = remote.getCurrentWindow()
            window.close()
        })
         setTimeout(() => {
        // this.queue.emptyQueue() 
        // this.musicControles.soundTrack.soundCollection.forEach(sound => sound.dispose())
        //     sceneHander.setScene("MenuScene")
        }, 5000);
    };  
    setColor = (color:string) =>{
        this.wildColor = color
    };
    private subButtonMaker = (name:string,control:GUI.Rectangle):GUI.Button=>{
        let button = new GUI.Button(name)
        button.widthInPixels = 120
        button.heightInPixels = 50
        button.paddingLeftInPixels = 10
        button.paddingBottomInPixels = 10
        button.paddingTopInPixels = 10
        button.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT
        button.background = "green"
        button.paddingBottomInPixels = 10
        control.addControl(button)
        
        let buttonText = new GUI.TextBlock(name+" text",name)
        buttonText.fontFamily = "Rockwell"
        button.addControl(buttonText)
        
        return button
        }
}
export class 
musicControle{
   public volume:number
   public currentTrack:number 
   public soundTrack:BABYLON.SoundTrack
    constructor(scene:BABYLON.Scene,){
        this.volume =gameSettings.volumeLevel*0.6
        this.soundTrack = this.loadAllMusic(scene)
        this.currentTrack = Math.round(Math.random()*this.soundTrack.soundCollection.length-1)
        // let db = new BABYLON.Analyser(scene)
        // playList.connectToAnalyser(db)
        // db.drawDebugCanvas() 
        // console.log( db.getByteFrequencyData())
        this.soundTrack.soundCollection[this.currentTrack].autoplay = true

        this.soundTrack.soundCollection.forEach(track =>{
            this.soundTrack.soundCollection[this.currentTrack].autoplay = true
            track.onEndedObservable.add(()=>{
                this.currentTrack++
                if (this.currentTrack >= this.soundTrack.soundCollection.length) {
                    this.currentTrack = 0
                }         
                this.soundTrack.soundCollection[this.currentTrack].play()
            })
        })
    }
    loadAllMusic = (scene:BABYLON.Scene)=>{
        let tracks = fs.readdirSync(path.join(__dirname,"../assets/audio/music/")).filter(d => d.endsWith(".mp3"||".wav"))
        let soundTrack = new BABYLON.SoundTrack(scene,{
            volume:0.5,
        })
        tracks.map(async track => {
         soundTrack.addSound(new BABYLON.Sound("test music",path.join(__dirname,`../assets/audio/music/${track}`) ,scene,null,{
            // loop:true,
            volume:0.5,
            // autoplay:true
        }))

        })
        return soundTrack

    }
}
//In case orginal deck is currupted use this to back it up.
// fs.writeFile("./deck.json", JSON.stringify(deck, null, 4), function (err) {
//     if (err) throw err;
// }) 
export let playableChecker = (playerCard:Card,facedUpCard:Card,randColor:string|null = null) => {

    if (playerCard.cardInfo.sign === "wild") { //checks if a wild card was used      
    return {card:playerCard,
      playable:true}
  }
  else if (playerCard.cardInfo.sign === "draw4") {//checks if a draw 4 card was used     
       return {card:playerCard,
          playable:true}  
  }
  else if (playerCard.cardInfo.color === facedUpCard.cardInfo.color || playerCard.cardInfo.sign === facedUpCard.cardInfo.sign || playerCard.cardInfo.color === randColor) // checks if color or number match's 
  {    
   return {card:playerCard,
          playable:true}
  }
  else {
 
   return {card:playerCard,
      playable:false}
  }
}
export let cardMaker = (scene:BABYLON.Scene,card:Card["cardInfo"]) =>{
    let fornt = new BABYLON.Vector4(0.5,0, 1, 1)
    let back = new BABYLON.Vector4(0,0, 0.5, 1)
    let mesh = BABYLON.MeshBuilder.CreatePlane(card.name,{width:1,height:2, sideOrientation: BABYLON.Mesh.DOUBLESIDE, frontUVs: fornt, backUVs: back},scene)
    let Texture = new BABYLON.StandardMaterial("Card Texture",scene)
    Texture.diffuseTexture = new BABYLON.Texture("../assets/img/Uno cards/"+card.name+".png", scene)
    Texture.emissiveTexture = new BABYLON.Texture("../assets/img/Uno cards/"+card.name+".png", scene)
    mesh.material = Texture
    return {mesh,
            cardInfo:card}
} 
//not completed
export let playedCardAnimation = async (mesh:BABYLON.Mesh)=>{
    let playedCardAnim = new BABYLON.Animation("myAnimation", "position", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    var keys = []; 
     //At the animation key 0, the value of scaling is "1"
      keys.push({
        frame: 0,
        value: mesh.setAbsolutePosition(BABYLON.Vector3.Zero())
      });    
      //At the animation key 20, the value of scaling is "0.2"
      keys.push({
        frame: 300,
        value: new BABYLON.Vector3(0,-2.9+0.001,0)
      });
      playedCardAnim.setKeys(keys);
      mesh.animations = [];
      mesh.animations.push(playedCardAnim);
}
export class Units {
    readonly name:string
    public hand:Card[] = []
    public place:number
    public playerNode:BABYLON.TransformNode
    readonly isAI:boolean
    public cardCountText:GUI.TextBlock
    public unoCalledBox:GUI.Image
    public playerDisplayBox:GUI.Rectangle
    constructor(name:string,UI:GUI.AdvancedDynamicTexture,place?:number,isAI?:boolean){
        this.name = name
        this.hand = []
        this.place = place == undefined ? 0 : place
         this.isAI = isAI == undefined ? false : isAI
        this.playerNode = new BABYLON.TransformNode(`Player ${this.name} node`)
       this.playerDisplayBox = new GUI.Rectangle("red box")
        this.playerDisplayBox.background = "brown"
        this.playerDisplayBox.heightInPixels = 35
        this.playerDisplayBox.widthInPixels = 150
        this.playerDisplayBox.linkOffsetY = -100
        UI.addControl(this.playerDisplayBox)
        this.cardCountText = new GUI.TextBlock("card count",`${this.name}: ${this.hand.length}`)
        this.playerDisplayBox.addControl(this.cardCountText)
        this.playerDisplayBox.linkWithMesh(this.playerNode)
        
        this.unoCalledBox = new GUI.Image("Called box","../assets/img/uno draw.png")
        this.unoCalledBox.widthInPixels = 150
        this.unoCalledBox.heightInPixels = 100
        this.unoCalledBox.linkOffsetYInPixels = -150
        this.unoCalledBox.isVisible = false
        this.unoCalledBox.fontSize
        UI.addControl(this.unoCalledBox)
        this.unoCalledBox.linkWithMesh(this.playerNode)
    }
    updateCount = ()=>{
        this.cardCountText.text = `${this.name}: ${this.hand.length}`
    }
}
let loadAudio = (scene:BABYLON.Scene,file:string)=>{
    return new BABYLON.Sound("test music",path.join(__dirname,`../assets/audio/SFX effects/${file}`),scene,null,{volume: 10})
}

export class Queue {
    private players:Units[]
    constructor() {
        this.players = []
    }
   
    addPlayer(player:Units) {
        this.players.push(player)
    }
    removePlayer(player:Units){
        this.players.splice(this.players.indexOf(player),1)
    }
    emptyQueue() {this.players = []}

    async movePlayerBack() {
        if (this.isEmpty())
            return "Underflow";
        return this.players.push(this.players.shift()!);
    }
    async reverseOrder() {
return this.players.reverse()
    }
    getCurrentPlayer(num =  0):Units {       
        // if (this.isEmpty())
        // return "No elements in Queue";
        return this.players[num];
    }
    isEmpty() {
        return this.players.length == 0;
    }
    printQueue() {
        return this.players;
    }
}
  

