"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// class OptionMenu {
//     gameStateStack:GUI.StackPanel
//     optionsBox:GUI.StackPanel
//     optionsBoxContainer:GUI.Rectangle
//     constructor(){
//        //------------------- Options Menu containers ---------------------------
// this.optionsBoxContainer = new GUI.Rectangle("options Box Container")
// this.optionsBoxContainer.width = 0.3
// this.optionsBoxContainer.height = 0.8
// this.optionsBoxContainer.background = "#A44800"
// this.optionsBoxContainer.cornerRadius = 0.5
// this.optionsBoxContainer.isVisible = false
// menuBackground.addControl(this.optionsBoxContainer)
// this.optionsBox = new GUI.StackPanel("Options menu")
// this.optionsBox.width = 0.9
// this.optionsBox.height = 0.8
// this.optionsBox.isVertical = true
// this.optionsBox.fontFamily = "Rockwell"
// this.optionsBoxContainer.addControl(this.optionsBox)
// //------------------- Options Menu text input boxes ---------------------------
// let block = new GUI.Rectangle("Name input block")
// block.heightInPixels = 30
// block.widthInPixels = 250
// block.thickness = 0
// block.fontFamily = "Rockwell"
// this.optionsBox.addControl(block)
// let nameInputText = new GUI.TextBlock("Name input text","Name")
// nameInputText.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT
// block.addControl(nameInputText)
// let nameInput = new GUI.InputText("Name input",gameSettings.playerName)
// nameInput.heightInPixels = 25
// nameInput.widthInPixels = 200
// nameInput.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT
// nameInput.background = "white" 
// nameInput.focusedBackground = "grey"
// nameInput.color = "black"
// block.addControl(nameInput)
// //------------------- Options Menu sliders ---------------------------
// this.gameStateStack = new GUI.StackPanel("Options menu")
// this.gameStateStack.heightInPixels = 40
// this.gameStateStack.widthInPixels = 250
// this.gameStateStack.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM
// this.gameStateStack.isVertical = false
// this.optionsBoxContainer.addControl(this.gameStateStack)
// let musicVolume = this.sliderMaker("Music Volume",0,100)
// musicVolume.slider.value = gameSettings.musicVol*100
// musicVolume.SliderText.text = `${musicVolume.slider.value}`
// musicVolume.slider.onValueChangedObservable.add(()=>{
//     musicVolume.SliderText.text = `${musicVolume.slider.value}`
//     gameSettings.musicVol = musicVolume.slider.value/100
//     menuMusic.setVolume((musicVolume.slider.value/100)*0.6)
// })
// let fxVolume = this.sliderMaker("Sound effects Volume",0,100)
// fxVolume.slider.value = gameSettings.fxVol*100
// fxVolume.SliderText.text = `${fxVolume.slider.value}`
// fxVolume.slider.onValueChangedObservable.add(()=>{
//     fxVolume.SliderText.text = `${fxVolume.slider.value}`
//     gameSettings.fxVol = fxVolume.slider.value/100
//     menuMusic.setVolume((fxVolume.slider.value/100)*0.6)
// })
// let botCount = this.sliderMaker("Number of Bots ",1,3)
// botCount.slider.value = gameSettings.botCount
// botCount.SliderText.text = `${botCount.slider.value}`
// botCount.slider.onValueChangedObservable.add(()=>{
//     botCount.SliderText.text = `${botCount.slider.value}`
// })
// let startingHandSize = this.sliderMaker("Starting cards ",1,99)
// startingHandSize.slider.value = gameSettings.startingCardCount
// startingHandSize.SliderText.text = `${startingHandSize.slider.value}`
// startingHandSize.slider.onValueChangedObservable.add(()=>{
//     startingHandSize.SliderText.text = `${startingHandSize.slider.value}`
// })
// let fullscreenText = new GUI.TextBlock("to fullscreen text","Fullscreen")
// fullscreenText.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT
// this.optionsBox.addControl(fullscreenText)
// let tofullscreen = new GUI.RadioButton("to fullscreen")
// tofullscreen.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT
// tofullscreen.heightInPixels = 30
// tofullscreen.widthInPixels = 30
// this.optionsBox.addControl(tofullscreen)
// //------------------------------------------------------------------------------
// //------- Options menu buttons -------
// let defaultSetting = this.subButtonMaker("Default")
// defaultSetting.background = "grey"
// defaultSetting.onPointerDownObservable.add(()=>{
//     gameSettings.botCount = 3
//     gameSettings.startingCardCount = 7
//     gameSettings.musicVol = 0.5
//     gameSettings.fxVol = 0.5
//     botCount.slider.value = 3
//     startingHandSize.slider.value = 7
//     botCount.SliderText.text = `${3}`
//     startingHandSize.SliderText.text = `${7}`
//     musicVolume.SliderText.text = `${50}`
//     musicVolume.slider.value = 50
//     this.optionsBoxContainer.isVisible = false
//     fs.writeFile(path.join(__dirname,`../settings/gameSettings.json`) , JSON.stringify(gameSettings, null, 4), function (err) {
//         if (err) throw err;
//     })    
// })
// let saveButton = this.subButtonMaker("Save")
// saveButton.background = "green"
// saveButton.onPointerDownObservable.add(()=>{
//     let newSetting = {
//     botCount: botCount.slider.value,
//     startingCardCount: startingHandSize.slider.value,
//     musicVol: musicVolume.slider.value/100,
//     fxVol: fxVolume.slider.value/100,
//     playerName: nameInput.text
// }
//     this.optionsBoxContainer.isVisible = false
//     fs.writeFile(path.join(__dirname,`../settings/gameSettings.json`) , JSON.stringify(newSetting, null, 4), function (err) {
//         if (err) throw err;
//     })    
// })
// let cancelButton = this.subButtonMaker("Cancel")
// cancelButton.background = "red"
//  cancelButton.onPointerDownObservable.add(()=>{
//     botCount.slider.value = gameSettings.botCount;
//     startingHandSize.slider.value = gameSettings.startingCardCount;
//     botCount.SliderText.text = `${botCount.slider.value}`;
//     startingHandSize.SliderText.text = `${startingHandSize.slider.value}`;
//     this.optionsBoxContainer.isVisible = false;
// })
// //-----------------------------------------------
//     }
// subButtonMaker = (name:string):GUI.Button=>{
//         let button = new GUI.Button(name)
//         button.widthInPixels = 80
//         button.heightInPixels = 50
//         button.paddingLeftInPixels = 10
//         button.paddingBottomInPixels = 10
//         button.paddingTopInPixels = 10
//         button.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT
//         button.background = "green"
//         button.paddingBottomInPixels = 10
//         this.gameStateStack.addControl(button)
//         let buttonText = new GUI.TextBlock(name+" text",name)
//         buttonText.fontFamily = "Rockwell"
//         button.addControl(buttonText)
//         return button
//         }
// sliderMaker = (name:string,min:number,max:number) =>{
//         let sliderBox = new GUI.Rectangle(name+" box")
//         sliderBox.width = 0.9
//         sliderBox.heightInPixels = 80
//         sliderBox.paddingBottomInPixels = 15
//         sliderBox.paddingTopInPixels = 15
//         sliderBox.background = "#C20015"
//         sliderBox.fontFamily = "Rockwell"
//         this.optionsBox.addControl(sliderBox)
//         let sliderName = new GUI.TextBlock(name+" text",name)
//         sliderName.textVerticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP
//         sliderName.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT
//         sliderBox.addControl(sliderName)
//         let sliderText = new GUI.TextBlock(name+" text",`${1}`)
//         sliderText.textVerticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP
//         sliderText.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT
//         sliderBox.addControl(sliderText)
//         let slider = new GUI.Slider(name+" slider")
//         slider.background = "#CF9693"
//         slider.color = "#E82518"
//         slider.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM
//         slider.height = 0.4
//         slider.value = 1
//         slider.maximum = max
//         slider.minimum = min
//         slider.step = 1
//         sliderBox.addControl(slider)
//         sliderText.text = `${slider.value}`
//     return {slider,
//             SliderText: sliderText}
//     }  
//     mainButtonMaker = (name:string,control:GUI.Rectangle|GUI.StackPanel):GUI.Button=>{
//         let button = new GUI.Button(name)
//         button.widthInPixels = 150
//         button.heightInPixels = 60
//         button.background = "green"
//         button.paddingBottomInPixels = 10
//         control.addControl(button)
//         let buttonText = new GUI.TextBlock(name+" text",name)
//         buttonText.fontFamily = "Rockwell"
//         button.addControl(buttonText)
//         return button
//             }
// }
