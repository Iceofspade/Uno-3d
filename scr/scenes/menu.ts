import * as BABYLON from "babylonjs"
import * as GUI from "babylonjs-gui"
import sceenControl from "../renderer"  
import gameSettings from "../gameSettings.json"
import fs from "fs"
import {remote} from 'electron' 

export let app ={ 
    name:"MenuScene",
    scene: (engine:BABYLON.Engine,canvas:HTMLCanvasElement)=>{
    let scene = new  BABYLON.Scene(engine)
    let camera = new BABYLON.ArcRotateCamera("Camera1",1.5,0,10,BABYLON.Vector3.Zero(),scene)
    camera.attachControl(true)
    let menuUI = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI")

let menuBackground = new GUI.Rectangle("Background UI")
menuBackground.background = "grey"
menuUI.addControl(menuBackground)

let stack = new GUI.StackPanel("Button stack")
stack.widthInPixels = 180
stack.heightInPixels = 300
stack.isVertical = true
stack.isHighlighted = true
stack.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM
menuBackground.addControl(stack)


let optionsBoxContainer = new GUI.Rectangle("options Box Container")
optionsBoxContainer.width = 0.3
optionsBoxContainer.height = 0.8
optionsBoxContainer.background = "brown"
optionsBoxContainer.cornerRadius = 0.5
optionsBoxContainer.isVisible = false
menuBackground.addControl(optionsBoxContainer)

let optionsBox = new GUI.StackPanel("Options menu")
optionsBox.width = 0.9
optionsBox.height = 0.8
optionsBox.isVertical = true
optionsBoxContainer.addControl(optionsBox)


let block = new GUI.Rectangle("Name input block")
block.heightInPixels = 30
block.widthInPixels = 250
block.thickness = 0
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

let gameStateStack = new GUI.StackPanel("Options menu")
gameStateStack.heightInPixels = 40
gameStateStack.widthInPixels = 250
gameStateStack.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM
gameStateStack.isVertical = false
optionsBoxContainer.addControl(gameStateStack)

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
    buttonText
    button.addControl(buttonText)
    
    return button
    }
let mainButtonMaker = (name:string):GUI.Button=>{
let button = new GUI.Button(name)
button.widthInPixels = 150
button.heightInPixels = 60
button.background = "green"
button.paddingBottomInPixels = 10
stack.addControl(button)

let buttonText = new GUI.TextBlock(name+" text",name)
buttonText
button.addControl(buttonText)

return button
}
let sliderMaker = (name:string,min:number,max:number) =>{
    let sliderBox = new GUI.Rectangle(name+" box")
    sliderBox.width = 0.9
    sliderBox.heightInPixels = 80
    sliderBox.paddingBottomInPixels = 15
    sliderBox.paddingTopInPixels = 15
    optionsBox.addControl(sliderBox)

    let SliderText = new GUI.TextBlock(name+" text",name)
    SliderText.textVerticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP
    sliderBox.addControl(SliderText)


    let slider = new GUI.Slider(name+" slider")
    slider.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM
    slider.height = 0.4
    slider.value = 1
    slider.maximum = max
    slider.minimum = min
    slider.step = 1
    sliderBox.addControl(slider)
    SliderText.text = `${name}${slider.value}`
   
return {slider,
        SliderText}
}

let botCount = sliderMaker("Number of Bots: ",1,3)
botCount.slider.value = gameSettings.botCount
botCount.SliderText.text = `Number of Bots: ${botCount.slider.value}`
botCount.slider.onValueChangedObservable.add(()=>{
    botCount.SliderText.text = `number of Bots: ${botCount.slider.value}`
})

let startingHandSize = sliderMaker("Number of starting cards: ",1,99)
startingHandSize.slider.value = gameSettings.startingCardCount
startingHandSize.SliderText.text = `Number of starting cards: ${startingHandSize.slider.value}`
startingHandSize.slider.onValueChangedObservable.add(()=>{
    startingHandSize.SliderText.text = `Number of starting cards: ${startingHandSize.slider.value}`
})





//------- Save and quit buttonss -------

let defaultSetting = subButtonMaker("Default")
defaultSetting.background = "grey"
defaultSetting.onPointerDownObservable.add(()=>{
    gameSettings.botCount = 3
    gameSettings.startingCardCount = 7
    botCount.slider.value = 3
    startingHandSize.slider.value = 7
    botCount.SliderText.text = `Number of Bots: ${3}`
    startingHandSize.SliderText.text = `Number of starting cards: ${7}`
    optionsBoxContainer.isVisible = false
    fs.writeFile("./scr/gameSettings.json", JSON.stringify(gameSettings, null, 4), function (err) {
        if (err) throw err;
    })    
})

let saveButton = subButtonMaker("Save")
saveButton.background = "green"
saveButton.onPointerDownObservable.add(()=>{
    gameSettings.botCount = botCount.slider.value
    gameSettings.startingCardCount = startingHandSize.slider.value
    gameSettings.playerName = nameInput.text
    optionsBoxContainer.isVisible = false

    fs.writeFile("./scr/gameSettings.json", JSON.stringify(gameSettings, null, 4), function (err) {
        if (err) throw err;
    })    
})

let cancelButton = subButtonMaker("Cancel")
cancelButton.background = "red"
 cancelButton.onPointerDownObservable.add(()=>{
    botCount.slider.value = gameSettings.botCount
    startingHandSize.slider.value = gameSettings.startingCardCount
    botCount.SliderText.text = `Number of Bots: ${botCount.slider.value}`
    startingHandSize.SliderText.text = `Number of starting cards: ${startingHandSize.slider.value}`
    optionsBoxContainer.isVisible = false
})
//-----------------------------------------------

const START = mainButtonMaker("Start")
START.onPointerDownObservable.add(()=>{
    sceenControl.setScene("GameScene")
})
const OPTIONS = mainButtonMaker("Options")
OPTIONS.onPointerDownObservable.add(()=>{
    optionsBoxContainer.isVisible = true
})
const QUIT = mainButtonMaker("Quit")
QUIT.onPointerDownObservable.add(()=>{
    let window = remote.getCurrentWindow()
    window.close()
})
return scene
}}