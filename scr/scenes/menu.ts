import * as BABYLON from "babylonjs"
import * as GUI from "babylonjs-gui"
import sceenControl from "../renderer"  
import gameSettings from "../settings/gameSettings.json"
import fs from "fs"
import path from 'path'
import * as electron  from 'electron' 
import {MusicControler} from "../audioControler"

export let app ={ 
    name:"MenuScene",
    scene: (engine:BABYLON.Engine,canvas:HTMLCanvasElement)=>{
    let scene = new  BABYLON.Scene(engine)
    let camera = new BABYLON.ArcRotateCamera("Camera1",1.5,0,10,BABYLON.Vector3.Zero(),scene)
    camera.attachControl(true)

    let subButtonMaker = (name:string):GUI.Button=>{
        let button = new GUI.Button(name)
        button.widthInPixels = 80
        button.heightInPixels = 50
        button.paddingLeftInPixels = 10
        button.paddingBottomInPixels = 10
        button.paddingTopInPixels = 10
        button.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT
        button.background = "green"
        button.paddingBottomInPixels = 10
        gameStateStack.addControl(button)
        
        let buttonText = new GUI.TextBlock(name+" text",name)
        buttonText.fontFamily = "Rockwell"
        button.addControl(buttonText)
        
        return button
        }
    let mainButtonMaker = (name:string):GUI.Button=>{
    let button = new GUI.Button(name)
    button.widthInPixels = 150
    button.heightInPixels = 60
    button.background = "green"
    button.paddingBottomInPixels = 10
    menuPanel.addControl(button)
    
    let buttonText = new GUI.TextBlock(name+" text",name)
    buttonText.fontFamily = "Rockwell"
    
    button.addControl(buttonText)
    
    return button
        }
    let sliderMaker = (name:string,min:number,max:number) =>{
        let sliderBox = new GUI.Rectangle(name+" box")
        sliderBox.width = 0.9
        sliderBox.heightInPixels = 80
        sliderBox.paddingBottomInPixels = 15
        sliderBox.paddingTopInPixels = 15
        sliderBox.background = "#C20015"
        sliderBox.fontFamily = "Rockwell"
        optionsBox.addControl(sliderBox)
        
        let sliderName = new GUI.TextBlock(name+" text",name)
        sliderName.textVerticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP
        sliderName.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT
        sliderBox.addControl(sliderName)
    
        let sliderText = new GUI.TextBlock(name+" text",`${1}`)
        sliderText.textVerticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP
        sliderText.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT
        sliderBox.addControl(sliderText)
    
    
        let slider = new GUI.Slider(name+" slider")
        slider.background = "#CF9693"
        slider.color = "#E82518"
        slider.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM
        slider.height = 0.4
        slider.value = 1
        slider.maximum = max
        slider.minimum = min
        slider.step = 1
        sliderBox.addControl(slider)
        sliderText.text = `${slider.value}`
       
    return {slider,
            SliderText: sliderText}
    }  

let menuMusic = new BABYLON.Sound("Menue music",`../assets/audio/music/Evence - Falling Ninety9Lives release.mp3`,scene,null,{autoplay:true,volume: gameSettings.musicVol*0.6, loop:true})

let menuUI = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI")

let menuBackground = new GUI.Rectangle("Background UI")
menuBackground.background = "grey"
menuUI.addControl(menuBackground)
let backgroundTextutre = new GUI.Image("Background Texture","../assets/img/menu background.png")
menuBackground.addControl(backgroundTextutre)

let title = new GUI.TextBlock("Game title","UNO")
title.fontSize = 180
title.textVerticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP
title.fontFamily = "algerian"
menuBackground.addControl(title)

let date = new Date()
 
if(date.getDate() === 10 && date.getMonth()+1 === 3){
let subTitle = new GUI.TextBlock("Game title","Happy Birthday Monkey!")
subTitle.fontSize = 100
subTitle.textVerticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP
subTitle.topInPixels = 200
subTitle.fontFamily = "algerian"
menuBackground.addControl(subTitle)
}

//Holds buttons on menue
let menuPanel = new GUI.StackPanel("Button stack")
menuPanel.widthInPixels = 180
menuPanel.heightInPixels = 300
menuPanel.isVertical = true
menuPanel.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM
menuBackground.addControl(menuPanel)

//------------------- Options Menu containers ---------------------------
let optionsBoxContainer = new GUI.Rectangle("options Box Container")
optionsBoxContainer.width = 0.3
optionsBoxContainer.height = 0.8
optionsBoxContainer.background = "#A44800"
optionsBoxContainer.cornerRadius = 0.5
optionsBoxContainer.isVisible = false
menuBackground.addControl(optionsBoxContainer)

let optionsBox = new GUI.StackPanel("Options menu")
optionsBox.width = 0.9
optionsBox.height = 0.8
optionsBox.isVertical = true
optionsBox.fontFamily = "Rockwell"
optionsBoxContainer.addControl(optionsBox)

//------------------- Options Menu text input boxes ---------------------------
let block = new GUI.Rectangle("Name input block")
block.heightInPixels = 30
block.widthInPixels = 250
block.thickness = 0
block.fontFamily = "Rockwell"
optionsBox.addControl(block)

let nameInputText = new GUI.TextBlock("Name input text","Name")
nameInputText.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT
block.addControl(nameInputText)

let nameInput = new GUI.InputText("Name input",gameSettings.playerName)
nameInput.heightInPixels = 25
nameInput.widthInPixels = 200
nameInput.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT
nameInput.background = "white" 
nameInput.focusedBackground = "grey"
nameInput.color = "black"
block.addControl(nameInput)

//------------------- Options Menu sliders ---------------------------
let gameStateStack = new GUI.StackPanel("Options menu")
gameStateStack.heightInPixels = 40
gameStateStack.widthInPixels = 250
gameStateStack.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM
gameStateStack.isVertical = false
optionsBoxContainer.addControl(gameStateStack)

let musicVolume = sliderMaker("Music Volume",0,100)
musicVolume.slider.value = gameSettings.musicVol*100
musicVolume.SliderText.text = `${musicVolume.slider.value}`
musicVolume.slider.onValueChangedObservable.add(()=>{

    musicVolume.SliderText.text = `${musicVolume.slider.value}`
    gameSettings.musicVol = musicVolume.slider.value/100
    menuMusic.setVolume((musicVolume.slider.value/100)*0.6)
})
let fxVolume = sliderMaker("Sound effects Volume",0,100)
fxVolume.slider.value = gameSettings.fxVol*100
fxVolume.SliderText.text = `${fxVolume.slider.value}`
fxVolume.slider.onValueChangedObservable.add(()=>{
    fxVolume.SliderText.text = `${fxVolume.slider.value}`
    gameSettings.fxVol = fxVolume.slider.value/100
    menuMusic.setVolume((fxVolume.slider.value/100)*0.6)
})
let botCount = sliderMaker("Number of Bots ",1,3)
botCount.slider.value = gameSettings.botCount
botCount.SliderText.text = `${botCount.slider.value}`
botCount.slider.onValueChangedObservable.add(()=>{
    botCount.SliderText.text = `${botCount.slider.value}`
})

let startingHandSize = sliderMaker("Starting cards ",1,99)
startingHandSize.slider.value = gameSettings.startingCardCount
startingHandSize.SliderText.text = `${startingHandSize.slider.value}`
startingHandSize.slider.onValueChangedObservable.add(()=>{
    startingHandSize.SliderText.text = `${startingHandSize.slider.value}`
})

let fullscreenText = new GUI.TextBlock("to fullscreen text","Fullscreen")
fullscreenText.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT
optionsBox.addControl(fullscreenText)

let tofullscreen = new GUI.RadioButton("to fullscreen")
tofullscreen.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT
tofullscreen.heightInPixels = 30
tofullscreen.widthInPixels = 30
optionsBox.addControl(tofullscreen)
//------------------------------------------------------------------------------


//------- Options menu buttons -------

let defaultSetting = subButtonMaker("Default")
defaultSetting.background = "grey"
defaultSetting.onPointerDownObservable.add(()=>{
    gameSettings.botCount = 3
    gameSettings.startingCardCount = 7
    gameSettings.musicVol = 0.5
    gameSettings.fxVol = 0.5
    botCount.slider.value = 3
    startingHandSize.slider.value = 7
    botCount.SliderText.text = `${3}`
    startingHandSize.SliderText.text = `${7}`
    musicVolume.SliderText.text = `${50}`
    musicVolume.slider.value = 50

    optionsBoxContainer.isVisible = false
    fs.writeFile(path.join(__dirname,`../settings/gameSettings.json`) , JSON.stringify(gameSettings, null, 4), function (err) {
        if (err) throw err;
    })    
})

let saveButton = subButtonMaker("Save")
saveButton.background = "green"
saveButton.onPointerDownObservable.add(()=>{
    let newSetting = {
    botCount: botCount.slider.value,
    startingCardCount: startingHandSize.slider.value,
    musicVol: musicVolume.slider.value/100,
    fxVol: fxVolume.slider.value/100,
    playerName: nameInput.text

}
    optionsBoxContainer.isVisible = false

    fs.writeFile(path.join(__dirname,`../settings/gameSettings.json`) , JSON.stringify(newSetting, null, 4), function (err) {
        if (err) throw err;
    })    
})

let cancelButton = subButtonMaker("Cancel")
cancelButton.background = "red"
 cancelButton.onPointerDownObservable.add(()=>{
     
    botCount.slider.value = gameSettings.botCount;
    startingHandSize.slider.value = gameSettings.startingCardCount;
    botCount.SliderText.text = `${botCount.slider.value}`;
    startingHandSize.SliderText.text = `${startingHandSize.slider.value}`;
    optionsBoxContainer.isVisible = false;
})

//-----------------------------------------------

const START = mainButtonMaker("Start")
START.onPointerDownObservable.add(()=>{
    sceenControl.setScene("GameScene")
    menuMusic.dispose()
})

const JOIN = mainButtonMaker("Join game")
JOIN.onPointerDownObservable.add(()=>{
    // sceenControl.setScene("GameScene")
    // menuMusic.dispose()
    console.log("This does nothing yet...")
})

const OPTIONS = mainButtonMaker("Options")
OPTIONS.onPointerDownObservable.add(()=>{
    optionsBoxContainer.isVisible = true
})

const QUIT = mainButtonMaker("Quit")
QUIT.onPointerDownObservable.add(()=>{
    let window = electron.remote.getCurrentWindow()
    window.close()
})

return scene
}}
