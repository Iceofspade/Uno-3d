import GUI from "babylonjs-gui"
import fs from "fs"
import path from 'path'

import gameSettings from "./settings/gameSettings.json"

export let subButtonMaker = <T extends GUI.Container> (name:string,control:GUI.Rectangle):GUI.Button=>{
    let button = new GUI.Button("name")
    button.widthInPixels = 80
    button.heightInPixels = 50
    button.paddingLeftInPixels = 10
    button.paddingBottomInPixels = 10
    button.paddingTopInPixels = 10
    button.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT
    button.background = "green"
    button.paddingBottomInPixels = 10
    control.addControl(button)
    
    let buttonText = new GUI.TextBlock("name text","name")
    buttonText.fontFamily = "Rockwell"
    button.addControl(buttonText)
    
    return button
}
export let sliderMaker = (name:string,min:number,max:number) =>{
    let sliderBox = new GUI.Rectangle(name+" box")
    sliderBox.width = 0.9
    sliderBox.heightInPixels = 80
    sliderBox.paddingBottomInPixels = 15
    sliderBox.paddingTopInPixels = 15
    sliderBox.background = "#C20015"
    sliderBox.fontFamily = "Rockwell"
    // this.optionsBox.addControl(sliderBox)
    
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
export let mainButtonMaker = <T extends GUI.Container>(name:string,control:T):GUI.Button=>{
    let button = new GUI.Button(name)
    button.widthInPixels = 150
    button.heightInPixels = 60
    button.background = "green"
    button.paddingBottomInPixels = 10
    control.addControl(button)
    
    let buttonText = new GUI.TextBlock(name+" text",name)
    buttonText.fontFamily = "Rockwell"
    
    button.addControl(buttonText)
    
    return button
        }

