import * as BABYLON  from "babylonjs"
import * as GUI from "babylonjs-gui"
import fs from "fs"
enum playerState {PLAYING,WAITING}
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
export class GameLogic{
    public queue:Queue
    public pile:Card
    private scene:BABYLON.Scene
    private drawBox:BABYLON.Mesh
    private wildColor:null|string = null
    private drawRate:number = 0
    constructor(scene:BABYLON.Scene,queue:Queue){
        this.queue = queue
        this.pile = this.randomCardGenerator(2)
        this.pile.mesh.position = new BABYLON.Vector3(0,-2.9,0)
        this.pile.mesh.rotation =  new BABYLON.Vector3(Math.PI*0.5,0,0)
        this.scene = scene
        this.drawBox = BABYLON.MeshBuilder.CreateBox("draw box",{width:2,height:0.8})
    }
    cardHovereffect = (card:Card) => {
        let mesh = card.mesh
       
               mesh.actionManager = new BABYLON.ActionManager(this.scene);
               var cardHighlight = new BABYLON.HighlightLayer("hl1", this.scene);
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
                       console.log("Picked card ",card)
                   }))
        //On duoble click 
               mesh.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnLeftPickTrigger, () =>{
                   // let rotationRandomiser = Math.floor(Math.random() * 4)*(Math.PI*0.25)
                   let playableCheck = playableChecker(card,this.pile,wildColor);
                   if(playableCheck.playable === true){
                    //    pilePusher(card)
                    //    specialCards(playableCheck.card.cardInfo.sign)
                       console.log("Player played "+playableCheck.card.cardInfo.name)
                    //    colorShower().then(()=>{
                        this.queue.movePlayerBack().then(()=>{/*turnSystem()*/})
                    //    })
                   return
               }   
                       console.log("Can't be played")
                       }));    
            
            
                    };
    drawBoxCollision = ()=>{
    //Randomly draws a card and add it to a players hand when clicked----------------------------------------------------------------------------------------
this.drawBox.position = new BABYLON.Vector3(7.5,-2.5,-4)
this.drawBox.actionManager = new BABYLON.ActionManager(this.scene);
let boxColor =  new BABYLON.StandardMaterial("all",this.scene)
boxColor.diffuseColor = new BABYLON.Color3(54/255,54/255,222/255)
boxColor.emissiveColor = new BABYLON.Color3(54/255,54/255,222/255)
this.drawBox.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger ,() =>{
     boxColor.diffuseColor = new BABYLON.Color3(54/255,54/255,222/255)
     boxColor.emissiveColor = new BABYLON.Color3(54/255,54/255,222/255)
    }));
this.drawBox.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger ,() =>{
    boxColor.diffuseColor = new BABYLON.Color3(222/255,54/255,54/255)
    boxColor.emissiveColor = new BABYLON.Color3(222/255,54/255,54/255)
    }));
this.drawBox.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickDownTrigger ,() =>{
    let draw = this.randomCardGenerator()
    this.queue.getCurrentPlayer().hand.unshift(draw)
    deckSorter(this.queue.getCurrentPlayer().hand,this.queue.getCurrentPlayer().place)
    if (this.queue.getCurrentPlayer().place === 0) {this.cardHovereffect(draw)}  
    }))
this.drawBox.material = boxColor;
    }                
    randomCardGenerator = (falloff:number = 0)=>{
        let cardPicker = Math.floor(Math.random()*((deck.length-1)-falloff)) 
        let set = cardMaker(this.scene,deck[cardPicker])
        return set
    }
    specialCards =(playedCard:Card["cardInfo"])=>{
        if (playedCard.sign === "wild") {
            this.wildColor = wildCard()
            // colorShower()
            console.log("A wild has been played the color is "+wildColor)
        }else if(playedCard.sign === "draw4"){
            this.drawRate+=4
            this.wildColor = wildCard()
            // colorShower()
            console.log("A draw4 has been played the color is "+wildColor)
        }else if(playedCard.sign === "draw2"){
            this.drawRate+=2
            console.log("A draw2 has been played")
        }else if(this.drawRate > 0){
            let drawArry = []
    for (let i = 0; i < this.drawRate; i++) {
        drawArry.push(this.randomCardGenerator())
    }if (this.queue.getCurrentPlayer().place === 0) {
        this.queue.getCurrentPlayer().hand.push(...drawArry)
        drawArry.map((card)=>{this.cardHovereffect(card)})
        deckSorter(this.queue.getCurrentPlayer().hand)
        console.log(this.queue.getCurrentPlayer().name+" has drawn "+this.drawRate+" cards" )
        this.drawRate = 0
    }else{
        this.queue.getCurrentPlayer().hand.push(...drawArry)
        deckSorter(this.queue.getCurrentPlayer().hand,this.queue.getCurrentPlayer().place)
        console.log(this.queue.getCurrentPlayer().name+" has drawn "+this.drawRate+" cards" )
        this.drawRate = 0
    }
        }else if(playedCard.sign === "skip"){
            this.queue.movePlayerBack()
            console.log(this.queue.getCurrentPlayer().name+" has been skiped")
        }else if(playedCard.sign === "reverse"){
            // spinRate=-spinRate
            // turnDirection.rotation.x -= Math.PI
            console.log( "The turn order has been revesed!")
            this.queue.reverseOrder()
        }else{
            wildColor = null
        }
    } 
    pilePusher = async (playedCard:Card)=>{
        this.queue.getCurrentPlayer().hand.splice(this.queue.getCurrentPlayer().hand.indexOf(playedCard),1)
    let randomRotation = Math.random()*(2)+Math.PI
     
        playedCard.mesh.position = new BABYLON.Vector3(0,this.pile.mesh.position.y+=0.001,0)
        playedCard.mesh.rotation =  new BABYLON.Vector3(Math.PI*0.5,0,0)
     
        let newpile = BABYLON.Mesh.MergeMeshes([playedCard.mesh,this.pile.mesh],true,true,undefined,true,true);
        newpile!.name = playedCard.cardInfo.name
    
        this.pile = { mesh:newpile as BABYLON.Mesh,
            cardInfo:playedCard.cardInfo
        }
        deckSorter(this.queue.getCurrentPlayer().hand,this.queue.getCurrentPlayer().place)
    
    };
    deckSorter = async (deck:Card[],placement:number = 0)=>{
        //Rearange order of cards to be alphabetical order
            deck.sort((a, b) => (a.cardInfo.name >= b.cardInfo.name) ? 1 : -1);
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
            : placement === 2 ? (startPositon.x = 0, startPositon.z = -8,facing = Math.PI*2, increment.side = 0.4 ,increment.depth =0.001)
            : placement === 3 ? (startPositon.x = 8, startPositon.z = 0,facing = Math.PI*1.5, increment.side = 0.001,increment.depth =0.4) 
            :                   (startPositon.x = -8,startPositon.z = 0,facing = Math.PI*0.5, increment.side = 0.001,increment.depth =0.4)      
            //sorts deck of cards
         deck.map(card =>{
            card.mesh.rotation = new BABYLON.Vector3(0.5,facing,0);
            card.mesh.position.x = startPositon.x
            card.mesh.position.y = -2
            card.mesh.position.z = startPositon.z
            startPositon.x += increment.side
            startPositon.z -= increment.depth
           
         });
    }   
    turnSystem = () =>{
        // colorShower()
    
    if (this.queue.printQueue().filter(deck=> deck.hand.length === 0).length > 0) {
            // gameOver()
            return
    }
    
    let currentPlayer = this.queue.getCurrentPlayer()
    //If it's the AI's turn then the AI acts
    if (currentPlayer.place !== 0) {
        // disableHand(false)
        // drawBox.isPickable = false
       let cardCheckerLoop = currentPlayer.hand.map(card => playableChecker(card,this.pile,wildColor)).filter(card => card.playable)
    
       if (cardCheckerLoop.length > 0) {
        setTimeout(() => {
            let playedCard = currentPlayer.hand[currentPlayer.hand.indexOf(cardCheckerLoop[0].card)]
            console.log("Unit played "+playedCard.cardInfo.name)
            this.pilePusher(playedCard)
            // specialCards(playedCard.cardInfo.sign)
            this.queue.movePlayerBack().then(()=>this.turnSystem())
        }, 1000);
        }else if(cardCheckerLoop.length === 0){
            setTimeout(() => {
                currentPlayer.hand.push(this.randomCardGenerator())
                deckSorter(currentPlayer.hand,currentPlayer.place)
                console.log(this.queue.getCurrentPlayer().name+" Drawing cards")
                this.turnSystem()  
            }, 1000);      
        }
    }
    //Else let the player act
    else if(this.queue.getCurrentPlayer().place === 0){
        // disableHand(true)
        // drawBox.isPickable = true
        console.log("Waiting for input")
    }
    
     }
}
//In case orginal deck is curropted use this to back it up.
// fs.writeFile("./deck.json", JSON.stringify(deck, null, 4), function (err) {
//     if (err) throw err;
// }) 
export let wildCard = () => {
    let colors = ["yellow", "red", "green", "blue"]
    return colors[Math.floor(Math.random() * colors.length)]
}
/**
 * Checks if the card that was played is usable 
 * @param {*} playerCard The card that is being played
 * @param {*} facedUpCard The current card that is on the pile
 * @param {*} randColor Adds a matchable color when a wild or a draw 4 has been played
 */
export let playableChecker = (playerCard:Card,facedUpCard:Card,randColor = null) => {


    
   
    if (playerCard.cardInfo.sign === "wild") { //checks if a wild card was used    
       //randColor = wildCard()//change color to a random one.     
    //    console.log("wild")      
    return {card:playerCard,
      playable:true}
  }
  else if (playerCard.cardInfo.sign === "draw4") {//checks if a draw 4 card was used   
   //    randColor = wildCard()//change color to a random one.
//    console.log("d4")      
  
       return {card:playerCard,
          playable:true}  
  }
  else if (playerCard.cardInfo.color === facedUpCard.cardInfo.color || playerCard.cardInfo.sign === facedUpCard.cardInfo.sign || playerCard.cardInfo.color === randColor) // checks if color or number match's 
  {    
    //   console.log(playerCard.cardInfo.color)      
    //   console.log(playerCard.cardInfo.sign)      
   return {card:playerCard,
          playable:true}
  }
  else {
 
   return {card:playerCard,
      playable:false}
  }
  }
  /**
   * Sorts the cards and realign's them back to there space
   * @param {*} deck The set of cards the current player has
   * @param {*} offsetDir changes how much the card should offset it self
   */
export let deckSorter = async (deck:Card[],placement:number = 0)=>{
//Rearange order of cards to be alphabetical order
    deck.sort((a, b) => (a.cardInfo.name >= b.cardInfo.name) ? 1 : -1);
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
    : placement === 2 ? (startPositon.x = 0, startPositon.z = -8,facing = Math.PI*2, increment.side = 0.4 ,increment.depth =0.001)
    : placement === 3 ? (startPositon.x = 8, startPositon.z = 0,facing = Math.PI*1.5, increment.side = 0.001,increment.depth =0.4) 
    :                   (startPositon.x = -8,startPositon.z = 0,facing = Math.PI*0.5, increment.side = 0.001,increment.depth =0.4)      
    //sorts deck of cards
 deck.map(card =>{
    card.mesh.rotation = new BABYLON.Vector3(0.5,facing,0);
    card.mesh.position.x = startPositon.x
    card.mesh.position.y = -2
    card.mesh.position.z = startPositon.z
    startPositon.x += increment.side
    startPositon.z -= increment.depth
   
 });
} 
export let cardMaker = (scene:BABYLON.Scene,card:Card["cardInfo"]) =>{
    let fornt = new BABYLON.Vector4(0.5,0, 1, 1)
    let back = new BABYLON.Vector4(0,0, 0.5, 1)
    let mesh = BABYLON.MeshBuilder.CreatePlane(card.name,{width:1,height:2, sideOrientation: BABYLON.Mesh.DOUBLESIDE, frontUVs: fornt, backUVs: back},scene)
    let Texture = new BABYLON.StandardMaterial("Card Texture",scene)
    Texture.diffuseTexture = new BABYLON.Texture("./assets/img/Uno cards/"+card.name+".png", scene)
    Texture.emissiveTexture = new BABYLON.Texture("./assets/img/Uno cards/"+card.name+".png", scene)
    mesh.material = Texture
    return {mesh,
            cardInfo:card}
}
export class Units {
    readonly name:string
    public hand:Card[] =[]
    public place:number
    public state:playerState
    constructor(name:string,place?:number,state?:playerState){
        this.name = name
        this.hand = []
        this.place = place == undefined ? 0 : place
        this.state = state == undefined ? playerState.WAITING : state
    }
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
export let wildColor = null;

export let gameOver = (queue:Queue,advancedTexture:GUI.AdvancedDynamicTexture)=>{
    let winner = queue.printQueue().filter( deck=> deck.hand.length === 0)
    let VitoryText = new GUI.TextBlock("Vitory Text",`${winner[0].name} has won!`)
    VitoryText.textVerticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP
    VitoryText.fontSizeInPixels = 70
    advancedTexture.addControl(VitoryText)
}

