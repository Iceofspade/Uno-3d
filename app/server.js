"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainButtonMaker = exports.sliderMaker = exports.subButtonMaker = void 0;
const babylonjs_gui_1 = __importDefault(require("babylonjs-gui"));
let subButtonMaker = (name, control) => {
    let button = new babylonjs_gui_1.default.Button("name");
    button.widthInPixels = 80;
    button.heightInPixels = 50;
    button.paddingLeftInPixels = 10;
    button.paddingBottomInPixels = 10;
    button.paddingTopInPixels = 10;
    button.horizontalAlignment = babylonjs_gui_1.default.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    button.background = "green";
    button.paddingBottomInPixels = 10;
    control.addControl(button);
    let buttonText = new babylonjs_gui_1.default.TextBlock("name text", "name");
    buttonText.fontFamily = "Rockwell";
    button.addControl(buttonText);
    return button;
};
exports.subButtonMaker = subButtonMaker;
let sliderMaker = (name, min, max) => {
    let sliderBox = new babylonjs_gui_1.default.Rectangle(name + " box");
    sliderBox.width = 0.9;
    sliderBox.heightInPixels = 80;
    sliderBox.paddingBottomInPixels = 15;
    sliderBox.paddingTopInPixels = 15;
    sliderBox.background = "#C20015";
    sliderBox.fontFamily = "Rockwell";
    // this.optionsBox.addControl(sliderBox)
    let sliderName = new babylonjs_gui_1.default.TextBlock(name + " text", name);
    sliderName.textVerticalAlignment = babylonjs_gui_1.default.Control.VERTICAL_ALIGNMENT_TOP;
    sliderName.textHorizontalAlignment = babylonjs_gui_1.default.Control.HORIZONTAL_ALIGNMENT_LEFT;
    sliderBox.addControl(sliderName);
    let sliderText = new babylonjs_gui_1.default.TextBlock(name + " text", `${1}`);
    sliderText.textVerticalAlignment = babylonjs_gui_1.default.Control.VERTICAL_ALIGNMENT_TOP;
    sliderText.textHorizontalAlignment = babylonjs_gui_1.default.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    sliderBox.addControl(sliderText);
    let slider = new babylonjs_gui_1.default.Slider(name + " slider");
    slider.background = "#CF9693";
    slider.color = "#E82518";
    slider.verticalAlignment = babylonjs_gui_1.default.Control.VERTICAL_ALIGNMENT_BOTTOM;
    slider.height = 0.4;
    slider.value = 1;
    slider.maximum = max;
    slider.minimum = min;
    slider.step = 1;
    sliderBox.addControl(slider);
    sliderText.text = `${slider.value}`;
    return { slider,
        SliderText: sliderText };
};
exports.sliderMaker = sliderMaker;
let mainButtonMaker = (name, control) => {
    let button = new babylonjs_gui_1.default.Button(name);
    button.widthInPixels = 150;
    button.heightInPixels = 60;
    button.background = "green";
    button.paddingBottomInPixels = 10;
    control.addControl(button);
    let buttonText = new babylonjs_gui_1.default.TextBlock(name + " text", name);
    buttonText.fontFamily = "Rockwell";
    button.addControl(buttonText);
    return button;
};
exports.mainButtonMaker = mainButtonMaker;
