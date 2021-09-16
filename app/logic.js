"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Queue = exports.Units = exports.playedCardAnimation = exports.GameLogic = exports.deck = void 0;
const BABYLON = __importStar(require("babylonjs"));
const GUI = __importStar(require("babylonjs-gui"));
const renderer_1 = __importDefault(require("./renderer"));
const electron_1 = require("electron");
const gameSettings_json_1 = __importDefault(require("./settings/gameSettings.json"));
const audioControler_1 = require("./audioControler");
exports.deck = [
    { name: "yellow_9",
        color: "yellow",
        sign: 9,
        ID: 1 },
    { name: "yellow_8",
        color: "yellow",
        sign: 8,
        ID: 2 },
    { name: "yellow_7",
        color: "yellow",
        sign: 7,
        ID: 3 },
    { name: "yellow_6",
        color: "yellow",
        sign: 6,
        ID: 4 },
    { name: "yellow_5",
        color: "yellow",
        sign: 5,
        ID: 5 },
    { name: "yellow_4",
        color: "yellow",
        sign: 4,
        ID: 6 },
    { name: "yellow_3",
        color: "yellow",
        sign: 3,
        ID: 7 },
    { name: "yellow_2",
        color: "yellow",
        sign: 2,
        ID: 8 },
    { name: "yellow_1",
        color: "yellow",
        sign: 1,
        ID: 9 },
    { name: "yellow_0",
        color: "yellow",
        sign: 0,
        ID: 10 },
    { name: "yellow_skip",
        color: "yellow",
        sign: "skip",
        ID: 11 },
    { name: "yellow_reverse",
        color: "yellow",
        sign: "reverse",
        ID: 12 },
    { name: "yellow_draw2",
        color: "yellow",
        sign: "draw2",
        ID: 13 },
    { name: "red_9",
        color: "red",
        sign: 9,
        ID: 14 },
    { name: "red_8",
        color: "red",
        sign: 8,
        ID: 15 },
    { name: "red_7",
        color: "red",
        sign: 7,
        ID: 16 },
    { name: "red_6",
        color: "red",
        sign: 6,
        ID: 17 },
    { name: "red_5",
        color: "red",
        sign: 5,
        ID: 18 },
    { name: "red_4",
        color: "red",
        sign: 4,
        ID: 19 },
    { name: "red_3",
        color: "red",
        sign: 3,
        ID: 20 },
    { name: "red_2",
        color: "red",
        sign: 2,
        ID: 21 },
    { name: "red_1",
        color: "red",
        sign: 1,
        ID: 22 },
    { name: "red_0",
        color: "red",
        sign: 0,
        ID: 23 },
    { name: "red_skip",
        color: "red",
        sign: "skip",
        ID: 24 },
    { name: "red_reverse",
        color: "red",
        sign: "reverse",
        ID: 25 },
    { name: "red_draw2",
        color: "red",
        sign: "draw2",
        ID: 26 },
    { name: "green_9",
        color: "green",
        sign: 9,
        ID: 27 },
    { name: "green_8",
        color: "green",
        sign: 8,
        ID: 28 },
    { name: "green_7",
        color: "green",
        sign: 7,
        ID: 29 },
    { name: "green_6",
        color: "green",
        sign: 6,
        ID: 30 },
    { name: "green_5",
        color: "green",
        sign: 5,
        ID: 31 },
    { name: "green_4",
        color: "green",
        sign: 4,
        ID: 32 },
    { name: "green_3",
        color: "green",
        sign: 3,
        ID: 33 },
    { name: "green_2",
        color: "green",
        sign: 2,
        ID: 34 },
    { name: "green_1",
        color: "green",
        sign: 1,
        ID: 35 },
    { name: "green_0",
        color: "green",
        sign: 0,
        ID: 36 },
    { name: "green_skip",
        color: "green",
        sign: "skip",
        ID: 37 },
    { name: "green_reverse",
        color: "green",
        sign: "reverse",
        ID: 38 },
    { name: "green_draw2",
        color: "green",
        sign: "draw2",
        ID: 39 },
    { name: "blue_9",
        color: "blue",
        sign: 9,
        ID: 40 },
    { name: "blue_8",
        color: "blue",
        sign: 8,
        ID: 41 },
    { name: "blue_7",
        color: "blue",
        sign: 7,
        ID: 42 },
    { name: "blue_6",
        color: "blue",
        sign: 6,
        ID: 43 },
    { name: "blue_5",
        color: "blue",
        sign: 5,
        ID: 44 },
    { name: "blue_4",
        color: "blue",
        sign: 4,
        ID: 45 },
    { name: "blue_3",
        color: "blue",
        sign: 3,
        ID: 46 },
    { name: "blue_2",
        color: "blue",
        sign: 2,
        ID: 47 },
    { name: "blue_1",
        color: "blue",
        sign: 1,
        ID: 48 },
    { name: "blue_0",
        color: "blue",
        sign: 0,
        ID: 49 },
    { name: "blue_skip",
        color: "blue",
        sign: "skip",
        ID: 50 },
    { name: "blue_reverse",
        color: "blue",
        sign: "reverse",
        ID: 51 },
    { name: "blue_draw2",
        color: "blue",
        sign: "draw2",
        ID: 52 },
    { name: "wild",
        color: null,
        sign: "wild",
        ID: 53 },
    { name: "draw4",
        color: null,
        sign: "draw4",
        ID: 54 }
];
class ColorControles {
    constructor(SceneUI, scene) {
        this.pickedColor = null;
        // Hides or shows color picker UI
        this.setIsVisable = (state) => {
            this.mainContainer.isVisible = state;
        };
        // Show's what color was choosen
        this.showPicked = (color) => __awaiter(this, void 0, void 0, function* () {
            switch (color) {
                case "red":
                    this.pickedColor = "red";
                    this.colorTexture.emissiveColor = new BABYLON.Color3(1, 0, 0);
                    this.colorTexture.alpha = 1;
                    break;
                case "blue":
                    this.pickedColor = "blue";
                    this.colorTexture.emissiveColor = new BABYLON.Color3(0, 0, 1);
                    this.colorTexture.alpha = 1;
                    break;
                case "green":
                    this.pickedColor = "green";
                    this.colorTexture.emissiveColor = new BABYLON.Color3(0, 1, 0);
                    this.colorTexture.alpha = 1;
                    break;
                case "yellow":
                    this.pickedColor = "yellow";
                    this.colorTexture.emissiveColor = new BABYLON.Color3(1, 1, 0);
                    this.colorTexture.alpha = 1;
                    break;
                default:
                    console.error("Invalid input for color pick");
                    this.colorTexture.emissiveColor = new BABYLON.Color3(72 / 255, 72 / 255, 72 / 255);
                    this.colorTexture.alpha = 0;
                    break;
            }
        });
        //Sets the color box display by to default
        this.restBoxes = () => {
            this.setIsVisable(false);
            setTimeout(() => {
                this.colorTexture.diffuseColor = new BABYLON.Color3(72 / 255, 72 / 255, 72 / 255);
                this.colorTexture.emissiveColor = new BABYLON.Color3(72 / 255, 72 / 255, 72 / 255);
                this.colorTexture.alpha = 0;
            }, 3000);
        }; // Enables or disables if the color boxes can be clicked
        this.setIsColorPickable = (state) => {
            this.redBox.isPointerBlocker = state;
            this.blueBox.isPointerBlocker = state;
            this.greenBox.isPointerBlocker = state;
            this.yellowBox.isPointerBlocker = state;
        }; // Picks a random color
        this.randomColor = () => {
            let colors = ["yellow", "red", "green", "blue"];
            return colors[Math.floor(Math.random() * colors.length)];
        };
        this.sceneUI = SceneUI;
        this.mainContainer = new GUI.Grid("color holders");
        this.mainContainer.addColumnDefinition(100, true);
        this.mainContainer.addColumnDefinition(100, true);
        this.mainContainer.addRowDefinition(100, true);
        this.mainContainer.addRowDefinition(100, true);
        this.mainContainer.isVisible = false;
        this.mainContainer.widthInPixels = 200;
        this.mainContainer.heightInPixels = 200;
        this.mainContainer.isHighlighted = true;
        SceneUI.addControl(this.mainContainer);
        this.redBox = new GUI.Button("red box");
        this.redBox.background = "red";
        this.mainContainer.addControl(this.redBox, 0, 0);
        this.blueBox = new GUI.Button("blue box");
        this.blueBox.background = "blue";
        this.mainContainer.addControl(this.blueBox, 1, 0);
        this.greenBox = new GUI.Button("green box");
        this.greenBox.background = "green";
        this.mainContainer.addControl(this.greenBox, 0, 1);
        this.yellowBox = new GUI.Button("yellow box");
        this.yellowBox.background = "yellow";
        this.mainContainer.addControl(this.yellowBox, 1, 1);
        let plane = BABYLON.Mesh.CreateGround("Color mesh", 5, 5, 5, scene);
        plane.position.y = -2.95;
        plane.isEnabled(false);
        this.colorTexture = new BABYLON.StandardMaterial("Color texture", scene);
        this.colorTexture.alpha = 0;
        plane.material = this.colorTexture;
    }
}
//Under consideration to replace the Card @type
class Cardz {
    constructor(name, color, sign, ID, scene) {
        this.scene = scene;
        this.name = name;
        this.color = color;
        this.sign = sign;
        this.ID = ID;
        let fornt = new BABYLON.Vector4(0.5, 0, 1, 1);
        let back = new BABYLON.Vector4(0, 0, 0.5, 1);
        this.mesh = BABYLON.MeshBuilder.CreatePlane(this.name, { width: 1, height: 2, sideOrientation: BABYLON.Mesh.DOUBLESIDE, frontUVs: fornt, backUVs: back }, this.scene);
        let Texture = new BABYLON.StandardMaterial("Card Texture", this.scene);
        Texture.diffuseTexture = new BABYLON.Texture("../assets/img/Uno cards/" + this.name + ".png", this.scene);
        Texture.emissiveTexture = new BABYLON.Texture("../assets/img/Uno cards/" + this.name + ".png", this.scene);
        this.mesh.material = Texture;
        this.mesh.actionManager = new BABYLON.ActionManager(this.scene);
        let cardHighlight = new BABYLON.HighlightLayer("hl1", this.scene);
        cardHighlight.addMesh(this.mesh, BABYLON.Color3.White());
        cardHighlight.innerGlow = false;
        cardHighlight.outerGlow = false;
        //Hover Out Effect
        this.mesh.actionManager.registerAction(new BABYLON.InterpolateValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.mesh, "position.y", -2, 300));
        this.mesh.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger, () => {
            cardHighlight.outerGlow = false;
        }));
        //Hover Over Effect
        this.mesh.actionManager.registerAction(new BABYLON.InterpolateValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.mesh, "position.y", -1, 300));
        this.mesh.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger, () => {
            cardHighlight.outerGlow = true;
        }));
        //On right click for details on the card
        this.mesh.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnRightPickTrigger, () => {
            console.log("Picked card " + this.name, this);
        }));
    }
}
class GameLogic {
    constructor(scene, queue, sceneUI) {
        this.wildColor = null;
        this.drawRate = 0;
        this.setUpDrawbox = () => {
            //------------------------------------| Draw box data |------------------------------------
            let boxHightLigheter = new BABYLON.HighlightLayer("Draw box highlight", this.scene);
            boxHightLigheter.innerGlow = false;
            boxHightLigheter.outerGlow = false;
            this.drawBox.position = new BABYLON.Vector3(2.5, -2.5, 0);
            this.drawBox.rotation.y = Math.PI * 0.5;
            boxHightLigheter.addMesh(this.drawBox, new BABYLON.Color3(1, 1, 1));
            let boxTexture = new BABYLON.StandardMaterial("Card Texture", this.scene);
            boxTexture.diffuseTexture = new BABYLON.Texture("../assets/img/deck texture.png", this.scene);
            boxTexture.emissiveTexture = new BABYLON.Texture("../assets/img/deck texture.png", this.scene);
            this.drawBox.material = boxTexture;
            this.drawBox.actionManager = new BABYLON.ActionManager(this.scene);
            // On Hover Out
            this.drawBox.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger, () => {
                boxHightLigheter.outerGlow = false;
            }));
            // On Hover Over
            this.drawBox.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger, () => {
                boxHightLigheter.outerGlow = true;
            }));
            // On Click
            this.drawBox.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickDownTrigger, () => {
                let draw = this.randomCardGenerator();
                this.queue.getCurrentPlayer().hand.unshift(draw);
                this.deckSorter(this.queue.getCurrentPlayer());
                if (this.queue.getCurrentPlayer().isAI === false) {
                    this.cardInteractionEffect(draw);
                    this.queue.getCurrentPlayer().updateCount();
                }
            }));
        };
        this.setUnoButton = (state) => {
            this.unoButtonImage.isVisible = state;
            this.unoTrigger.isEnabled = state;
        };
        this.onUnoCall = (byPlayer) => {
            let callers = this.queue.printQueue().filter(unit => {
                if (unit.isAI === true && unit !== this.queue.getCurrentPlayer()) {
                    return true;
                }
                return false;
            });
            let callUno = 0;
            callers.forEach(() => {
                let unoCallchance = Math.round(Math.random() * 10);
                if (unoCallchance >= 8) {
                    callUno = +1;
                }
            });
            if (callUno >= 1 || byPlayer === true) {
                this.queue.getCurrentPlayer().hand.push(this.randomCardGenerator());
                this.queue.getCurrentPlayer().hand.push(this.randomCardGenerator());
                this.deckSorter(this.queue.getCurrentPlayer());
                this.queue.getCurrentPlayer().playerNode;
                this.queue.getCurrentPlayer().unoCalledBox.isVisible = false;
            }
        };
        /**
       * Creates the mesh for the card with mesh
       * @param {*} card The card data to use for creation.
       */
        this.cardMaker = (card) => {
            let fornt = new BABYLON.Vector4(0.5, 0, 1, 1);
            let back = new BABYLON.Vector4(0, 0, 0.5, 1);
            let mesh = BABYLON.MeshBuilder.CreatePlane(card.name, { width: 1, height: 2, sideOrientation: BABYLON.Mesh.DOUBLESIDE, frontUVs: fornt, backUVs: back }, this.scene);
            let Texture = new BABYLON.StandardMaterial("Card Texture", this.scene);
            Texture.diffuseTexture = new BABYLON.Texture("../assets/img/Uno cards/" + card.name + ".png", this.scene);
            Texture.emissiveTexture = new BABYLON.Texture("../assets/img/Uno cards/" + card.name + ".png", this.scene);
            mesh.material = Texture;
            return { mesh,
                cardInfo: card };
        };
        /**
       * Enable or disable picking on a the drawbox cards.
       * @param {*} state the state it should be in.
       */
        this.setdrawBoxPickable = (state) => {
            this.drawBox.isPickable = state;
        };
        /**
       * Allow's a player to interact with a card.
       * @param {*} card The to give interaction to.
       */
        this.cardInteractionEffect = (card) => {
            let mesh = card.mesh;
            mesh.actionManager = new BABYLON.ActionManager(this.scene);
            let cardHighlight = new BABYLON.HighlightLayer("hl1", this.scene);
            cardHighlight.addMesh(mesh, BABYLON.Color3.White());
            cardHighlight.innerGlow = false;
            cardHighlight.outerGlow = false;
            //Hover Out Effect
            mesh.actionManager.registerAction(new BABYLON.InterpolateValueAction(BABYLON.ActionManager.OnPointerOutTrigger, mesh, "position.y", -2, 300));
            mesh.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger, () => {
                cardHighlight.outerGlow = false;
            }));
            //Hover Over Effect
            mesh.actionManager.registerAction(new BABYLON.InterpolateValueAction(BABYLON.ActionManager.OnPointerOverTrigger, mesh, "position.y", -1, 300));
            mesh.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger, () => {
                cardHighlight.outerGlow = true;
            }));
            //On right click for details on the card
            mesh.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnRightPickTrigger, () => {
                console.log("Picked card " + card.cardInfo.name, card);
            }));
            //On duoble click 
            mesh.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnLeftPickTrigger, () => {
                // let rotationRandomiser = Math.floor(Math.random() * 4)*(Math.PI*0.25)
                let playableCheck = this.playableChecker(card, this.wildColor);
                if (playableCheck.playable === true) {
                    this.pilePusher(card);
                    this.specialCards(playableCheck.card.cardInfo);
                    console.log("Player played " + playableCheck.card.cardInfo.name);
                    switch (playableCheck.card.cardInfo.sign) {
                        case "wild":
                        case "draw4":
                            console.log("Waiting for a color to be picked");
                            break;
                        default:
                            this.queue.movePlayerBack().then(() => {
                                this.turnSystem();
                                this.ColorControle.restBoxes();
                                this.unoTrigger.isEnabled = false;
                                this.unoTrigger.isVisible = false;
                            });
                            break;
                    }
                    return;
                }
                console.log("Can't be played");
            }));
        };
        /**
       * Creates a random card
       * @param {*} falloff The number is meant to prevent Wild and draw4s form being picked.
       * 1 to stop wilds 2 for both wilds and draw4s.
       * @returns newly created card
       */
        this.randomCardGenerator = (falloff = 0) => {
            var _a, _b, _c;
            let cardPicker = Math.floor(Math.random() * ((exports.deck.length - 1) - falloff));
            console.log((_a = this.musicControles) === null || _a === void 0 ? void 0 : _a.cardPlayedSound.getVolume());
            let set = this.cardMaker(exports.deck[cardPicker]);
            if (((_b = this.musicControles) === null || _b === void 0 ? void 0 : _b.drawnCardSound) !== undefined) {
                (_c = this.musicControles) === null || _c === void 0 ? void 0 : _c.drawnCardSound.play();
            }
            return set;
        };
        /**
       * Is responsible for the all the special cards effect
       * @param {*} playedCard The card to check
       */
        this.specialCards = (playedCard) => {
            if (playedCard.sign === "wild") {
                console.log("A wild card has been played the color is now " + this.wildColor);
                this.onWild();
            }
            else if (playedCard.sign === "draw4") {
                console.log("A draw4 has been played the color is " + this.wildColor);
                this.onDraw4();
            }
            else if (playedCard.sign === "draw2") {
                console.log("A draw2 has been played");
                this.onDraw2();
            }
            else if (this.drawRate > 0) {
                console.log(this.queue.getCurrentPlayer().name + " has drawn " + this.drawRate + " cards");
                this.onBluckDraw();
            }
            else if (playedCard.sign === "skip") {
                this.onSkip();
                console.log(this.queue.getCurrentPlayer().name + " has been skiped");
            }
            else if (playedCard.sign === "reverse") {
                this.onReverse();
                console.log("The turn order has been revesed!");
            }
            else {
                this.wildColor = null;
            }
        };
        this.onBluckDraw = () => {
            let drawArry = [];
            let currentPlayer = this.queue.getCurrentPlayer();
            for (let i = 0; i < this.drawRate; i++) {
                drawArry.push(this.randomCardGenerator());
            }
            if (currentPlayer.isAI === false) {
                currentPlayer.hand.push(...drawArry);
                drawArry.forEach((card) => {
                    this.cardInteractionEffect(card);
                });
                this.drawRate = 0;
            }
            else {
                currentPlayer.hand.push(...drawArry);
            }
            this.deckSorter(currentPlayer);
            this.drawRate = 0;
        };
        this.onDraw4 = () => {
            this.drawRate += 4;
            this.onWild();
        };
        this.onDraw2 = () => {
            this.drawRate += 2;
        };
        this.onWild = () => {
            let newColor = this.ColorControle.randomColor();
            if (this.queue.getCurrentPlayer().isAI === true) {
                this.setColor(newColor);
                this.ColorControle.showPicked(newColor);
                this.ColorControle.setIsColorPickable(false);
                this.wildColor = this.ColorControle.pickedColor;
            }
            else {
                this.ColorControle.setIsVisable(true);
                this.ColorControle.setIsColorPickable(true);
            }
        };
        this.onSkip = () => {
            this.queue.movePlayerBack();
        };
        this.onReverse = () => {
            this.spinRate = -this.spinRate;
            this.arrowDirectionMesh.rotation.x -= Math.PI;
            this.queue.reverseOrder();
        };
        this.playableChecker = (playedCard, randColor = null) => {
            if (playedCard.cardInfo.sign === "wild" || playedCard.cardInfo.sign === "draw4") { //checks if a wild card or if a draw4 card was used
                return { card: playedCard,
                    playable: true };
            }
            else if ([this.pile.cardInfo.color, randColor].includes(playedCard.cardInfo.color) || playedCard.cardInfo.sign === this.pile.cardInfo.sign) { // checks if color or number or signs match's   
                return { card: playedCard,
                    playable: true };
            }
            else {
                return { card: playedCard,
                    playable: false };
            }
        };
        /**
       * Takes a given card to sets as the faced down card
       * @param {*} playedCard The card to set as the faced down card
       */
        this.pilePusher = (playedCard) => __awaiter(this, void 0, void 0, function* () {
            this.queue.getCurrentPlayer().hand.splice(this.queue.getCurrentPlayer().hand.indexOf(playedCard), 1);
            let randomRotation = Math.random() * (2) + Math.PI;
            playedCard.mesh.position = new BABYLON.Vector3(0, this.pileStartingPos += 0.001, 0);
            playedCard.mesh.rotation = new BABYLON.Vector3(Math.PI * 0.5, 0, randomRotation);
            let newpile = BABYLON.Mesh.MergeMeshes([playedCard.mesh, this.pile.mesh], true, true, undefined, true, true);
            newpile.name = playedCard.cardInfo.name;
            this.pile = { mesh: newpile,
                cardInfo: playedCard.cardInfo };
            this.deckSorter(this.queue.getCurrentPlayer());
            if (this.musicControles.cardPlayedSound !== undefined) {
                this.musicControles.cardPlayedSound.play();
            }
        });
        /**
       * Sorts the cards and realign's them back to there space
       * @param {*} player The player who's hand that will be sorted
       */
        this.deckSorter = (player) => __awaiter(this, void 0, void 0, function* () {
            let playerHand = player.hand;
            let placement = player.place;
            let node = player.playerNode;
            //Rearange order of cards to be alphabetical order
            playerHand.sort((a, b) => (a.cardInfo.name >= b.cardInfo.name) ? 1 : -1);
            //Instalise Starting postion
            let startPositon = {
                x: 0,
                z: 0,
            };
            //Instalise side to increment
            let increment = {
                side: 0,
                depth: 0
            };
            //What side should the cards face
            let facing;
            //Checks which player to sort 
            placement === 0 ? (startPositon.x = 0, startPositon.z = 8, facing = Math.PI, increment.side = 0.4, increment.depth = 0.001)
                : placement === 2 ? (startPositon.x = 0, startPositon.z = -8, facing = Math.PI * 2, increment.side = 0.4, increment.depth = 0.001)
                    : placement === 3 ? (startPositon.x = 8, startPositon.z = 0, facing = Math.PI * 1.5, increment.side = 0.001, increment.depth = 0.4)
                        : (startPositon.x = -8, startPositon.z = 0, facing = Math.PI * 0.5, increment.side = 0.001, increment.depth = 0.4);
            node.position = new BABYLON.Vector3(startPositon.x, -2, startPositon.z);
            //sorts deck of cards
            playerHand.map(card => {
                card.mesh.rotation = new BABYLON.Vector3(0.5, facing, 0);
                card.mesh.position.x = startPositon.x;
                card.mesh.position.y = -2;
                card.mesh.position.z = startPositon.z;
                startPositon.x += increment.side;
                startPositon.z -= increment.depth;
            });
        });
        /**
       * Turn order event system
       */
        this.turnSystem = () => {
            let currentPlayer = this.queue.getCurrentPlayer();
            //Shows who's turn it is currently
            this.queue.printQueue().forEach(player => {
                player.updateCount();
                player.playerDisplayBox.background = "brown";
                if (player === currentPlayer) {
                    player.playerDisplayBox.background = "green";
                }
            });
            // Checks if anyone has 0 cards left and ends the game if true
            if (this.queue.printQueue().filter(deck => deck.hand.length === 0).length > 0) {
                this.gameOver();
                return;
            }
            //Attepted UNO call system
            // this.queue.printQueue().forEach( unit => {
            //     if(unit !== this.queue.getCurrentPlayer()){
            //         if(unit.hand.length === 1){
            //             this.unoTrigger.isEnabled = true
            //             this.unoTrigger.isVisible = true
            //             this.onUnoCall() 
            //         }
            //     }
            // })
            //If it's the AI's turn then the AI acts
            if (currentPlayer.isAI === true) {
                this.setdrawBoxPickable(false);
                this.queue.printQueue().forEach(player => player.setHandInteractable(false));
                let cardCheckerLoop = currentPlayer.hand.map(card => this.playableChecker(card, this.wildColor)).filter(card => card.playable);
                if (cardCheckerLoop.length > 0) {
                    setTimeout(() => {
                        let playedCard = currentPlayer.hand[currentPlayer.hand.indexOf(cardCheckerLoop[0].card)];
                        console.log("Unit played " + playedCard.cardInfo.name);
                        this.pilePusher(playedCard);
                        this.specialCards(playedCard.cardInfo);
                        this.queue.movePlayerBack().then(() => {
                            this.turnSystem();
                            this.ColorControle.restBoxes();
                            /*this.unoTrigger.isEnabled = false
                        this.unoTrigger.isVisible = false*/ 
                        });
                    }, 1000);
                }
                else if (cardCheckerLoop.length <= 0) {
                    setTimeout(() => {
                        currentPlayer.hand.push(this.randomCardGenerator());
                        this.deckSorter(currentPlayer);
                        console.log(this.queue.getCurrentPlayer().name + " Drawing cards");
                        this.turnSystem();
                    }, 1000);
                }
            }
            //Else let the player act
            else if (currentPlayer.isAI === false) {
                this.setdrawBoxPickable(true);
                currentPlayer.setHandInteractable(true);
                console.log("Waiting for input");
            }
        };
        /**
       * Game over event
       */
        this.gameOver = () => {
            let winner = this.queue.printQueue().filter(deck => deck.hand.length === 0);
            let box = new GUI.Rectangle();
            box.width = 0.6;
            box.height = 0.4;
            this.ColorControle.sceneUI.addControl(box);
            let backgroundTextutre = new GUI.Image("Background Texture", "../assets/img/menu background.png");
            box.addControl(backgroundTextutre);
            let VitoryText = new GUI.TextBlock("Vitory Text", `${winner[0].name} has won!\nDo you want to play again?`);
            VitoryText.textVerticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
            VitoryText.fontSizeInPixels = 50;
            box.addControl(VitoryText);
            let playAgain = this.subButtonMaker("Play again", box);
            playAgain.background = 'green';
            playAgain.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
            playAgain.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
            playAgain.topInPixels = -20;
            playAgain.leftInPixels = 20;
            playAgain.onPointerDownObservable.add(() => {
                this.queue.emptyQueue();
                this.musicControles.soundTrack.soundCollection.forEach(sound => sound.dispose());
                renderer_1.default.setScene("MenuScene");
            });
            let quit = this.subButtonMaker("Quit", box);
            quit.background = 'Red';
            quit.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
            quit.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
            quit.topInPixels = -20;
            quit.leftInPixels = -20;
            quit.onPointerDownObservable.add(() => {
                this.queue.emptyQueue();
                this.musicControles.soundTrack.soundCollection.forEach(sound => sound.dispose());
                renderer_1.default.setScene("MenuScene");
                let window = electron_1.remote.getCurrentWindow();
                window.close();
            });
            setTimeout(() => {
                // this.queue.emptyQueue() 
                // this.musicControles.soundTrack.soundCollection.forEach(sound => sound.dispose())
                //     sceneHander.setScene("MenuScene")
            }, 5000);
        };
        /**
       * Set's the color of the wildColor
       * @param {*} player The player who's hand that will be sorted
       */
        this.setColor = (color) => {
            this.wildColor = color;
        };
        this.subButtonMaker = (name, control) => {
            let button = new GUI.Button(name);
            button.widthInPixels = 120;
            button.heightInPixels = 50;
            button.paddingLeftInPixels = 10;
            button.paddingBottomInPixels = 10;
            button.paddingTopInPixels = 10;
            button.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
            button.background = "green";
            button.paddingBottomInPixels = 10;
            control.addControl(button);
            let buttonText = new GUI.TextBlock(name + " text", name);
            buttonText.fontFamily = "Rockwell";
            button.addControl(buttonText);
            return button;
        };
        this.queue = queue;
        this.pile = this.randomCardGenerator(2);
        this.scene = scene;
        this.ColorControle = new ColorControles(sceneUI, this.scene);
        this.pileStartingPos = -2.9;
        this.pile.mesh.position = new BABYLON.Vector3(0, -2.9, 0);
        this.pile.mesh.rotation = new BABYLON.Vector3(Math.PI * 0.5, 0, 0);
        //                         ----------| Sound |------------
        this.musicControles = new audioControler_1.MusicControler(this.scene);
        this.musicControles.soundTrack.soundCollection[this.musicControles.currentTrack];
        //------------------------------------------------------------------------------------------------------------
        // ------------------------------------ Arrow spin Control ------------------------------------
        this.spinRate = 0.01;
        this.arrowDirectionMesh = BABYLON.Mesh.CreateGround("Order Direction", 15, 15, 15, scene);
        this.arrowDirectionMesh.position.y = -2.9;
        this.arrowDirectionMesh.rotation.x -= -Math.PI * 2;
        this.scene.registerAfterRender(() => {
            this.arrowDirectionMesh.rotation.y -= this.spinRate;
        });
        let arrowTexture = new BABYLON.StandardMaterial("", scene);
        arrowTexture.diffuseTexture = new BABYLON.Texture("../assets/img/Directional arrows.png", scene);
        arrowTexture.emissiveTexture = new BABYLON.Texture("../assets/img/Directional arrows.png", scene);
        arrowTexture.diffuseTexture.hasAlpha = true;
        arrowTexture.transparencyMode = BABYLON.Material.MATERIAL_ALPHATESTANDBLEND;
        arrowTexture.useAlphaFromDiffuseTexture = true;
        arrowTexture.backFaceCulling = false;
        this.arrowDirectionMesh.material = arrowTexture;
        //------------------------------------| Draw box data |------------------------------------
        let faceUV = new Array(3);
        for (var i = 0; i < 6; i++) {
            faceUV[i] = new BABYLON.Vector4(1 / 3, 0, (1 + 1) / 3, 1 / 1);
        }
        ;
        faceUV[4] = new BABYLON.Vector4(0 / 3, 0, (0 + 1) / 3, 1 / 1);
        faceUV[2] = new BABYLON.Vector4(2 / 3, 0, (2 + 1) / 3, 1 / 1);
        faceUV[3] = new BABYLON.Vector4(2 / 3, 0, (2 + 1) / 3, 1 / 1);
        this.drawBox = BABYLON.MeshBuilder.CreateBox("draw box", { width: 2, height: 0.8, faceUV: faceUV });
        this.setUpDrawbox();
        //-------------------------------------------- Color picking events ------------------------------------------------
        this.ColorControle.redBox.onPointerDownObservable.add(() => {
            this.ColorControle.showPicked("red");
            this.wildColor = this.ColorControle.pickedColor;
            this.queue.movePlayerBack().then(() => { this.turnSystem(); this.ColorControle.setIsVisable(false); });
        });
        this.ColorControle.blueBox.onPointerDownObservable.add(() => {
            this.ColorControle.showPicked("blue");
            this.wildColor = this.ColorControle.pickedColor;
            this.queue.movePlayerBack().then(() => { this.turnSystem(); this.ColorControle.setIsVisable(false); });
        });
        this.ColorControle.greenBox.onPointerDownObservable.add(() => {
            this.ColorControle.showPicked("green");
            this.wildColor = this.ColorControle.pickedColor;
            this.queue.movePlayerBack().then(() => { this.turnSystem(); this.ColorControle.setIsVisable(false); });
        });
        this.ColorControle.yellowBox.onPointerDownObservable.add(() => {
            this.ColorControle.showPicked("yellow");
            this.wildColor = this.ColorControle.pickedColor;
            this.queue.movePlayerBack().then(() => { this.turnSystem(); this.ColorControle.setIsVisable(false); });
        });
        //---------------------------------------------------------------------------------------------------------------------
        this.unoTrigger = new GUI.Button("Uno trigger");
        this.unoTrigger.thickness = 0;
        this.unoTrigger.widthInPixels = 150;
        this.unoTrigger.heightInPixels = 125;
        this.unoTrigger.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        this.unoTrigger.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        this.unoTrigger.topInPixels = -50;
        this.unoTrigger.leftInPixels = -50;
        this.unoTrigger.isEnabled = false;
        this.unoTrigger.isVisible = false;
        this.ColorControle.sceneUI.addControl(this.unoTrigger);
        this.unoTrigger.onPointerDownObservable.add(() => {
            this.onUnoCall(true);
            this.unoTrigger.isEnabled = false;
            this.unoTrigger.isVisible = false;
        });
        this.unoButtonImage = new GUI.Image("uno button", "../assets/img/uno button.png");
        this.unoTrigger.addControl(this.unoButtonImage);
        //--------------------------------------------------------------------------------------------
    }
    ;
}
exports.GameLogic = GameLogic;
//In case orginal deck is currupted use this to back it up.
// fs.writeFile("./deck.json", JSON.stringify(deck, null, 4), function (err) {
//     if (err) throw err;
// }) 
//not completed
let playedCardAnimation = (mesh) => __awaiter(void 0, void 0, void 0, function* () {
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
        value: new BABYLON.Vector3(0, -2.9 + 0.001, 0)
    });
    playedCardAnim.setKeys(keys);
    mesh.animations = [];
    mesh.animations.push(playedCardAnim);
});
exports.playedCardAnimation = playedCardAnimation;
class Units {
    constructor(name, UI, place, isAI) {
        this.hand = [];
        this.updateCount = () => {
            this.cardCountText.text = `${this.name}: ${this.hand.length}`;
        };
        this.createHand = (gameLogic) => {
            for (let i = 0; i < gameSettings_json_1.default.startingCardCount; i++) {
                let newCard = gameLogic.randomCardGenerator();
                gameLogic.cardInteractionEffect(newCard);
                this.hand.push(newCard);
            }
            this.updateCount();
            gameLogic.deckSorter(this);
        };
        this.setHandInteractable = (state) => {
            this.hand.forEach(card => card.mesh.isPickable = state);
        };
        this.name = name;
        this.hand = [];
        this.place = place == undefined ? 0 : place;
        this.isAI = isAI == undefined ? false : isAI;
        this.playerNode = new BABYLON.TransformNode(`Player ${this.name} node`);
        this.playerDisplayBox = new GUI.Rectangle("red box");
        this.playerDisplayBox.background = "brown";
        this.playerDisplayBox.heightInPixels = 35;
        this.playerDisplayBox.widthInPixels = 150;
        this.playerDisplayBox.linkOffsetY = -100;
        UI.addControl(this.playerDisplayBox);
        this.cardCountText = new GUI.TextBlock("card count", `${this.name}: ${this.hand.length}`);
        this.playerDisplayBox.addControl(this.cardCountText);
        this.playerDisplayBox.linkWithMesh(this.playerNode);
        this.unoCalledBox = new GUI.Image("Called box", "../assets/img/uno draw.png");
        this.unoCalledBox.widthInPixels = 150;
        this.unoCalledBox.heightInPixels = 100;
        this.unoCalledBox.linkOffsetYInPixels = -150;
        this.unoCalledBox.isVisible = false;
        this.unoCalledBox.fontSize;
        UI.addControl(this.unoCalledBox);
        this.unoCalledBox.linkWithMesh(this.playerNode);
    }
}
exports.Units = Units;
class Queue {
    constructor() {
        this.players = [];
    }
    addPlayer(player) {
        this.players.push(player);
    }
    removePlayer(player) {
        this.players.splice(this.players.indexOf(player), 1);
    }
    emptyQueue() { this.players = []; }
    movePlayerBack() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isEmpty())
                return "Underflow";
            return this.players.push(this.players.shift());
        });
    }
    reverseOrder() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.players.reverse();
        });
    }
    getCurrentPlayer(num = 0) {
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
exports.Queue = Queue;
