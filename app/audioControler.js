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
exports.MusicControler = void 0;
const BABYLON = __importStar(require("babylonjs"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const gameSettings_json_1 = __importDefault(require("./settings/gameSettings.json"));
class MusicControler {
    constructor(scene, track) {
        this.loadAllMusic = () => {
            let tracks = fs_1.default.readdirSync(path_1.default.join(__dirname, "../assets/audio/music/")).filter(d => d.endsWith(".mp3" || ".wav"));
            let soundTrack = new BABYLON.SoundTrack(this.scene, {
                volume: this.musicVolume,
            });
            tracks.forEach((track) => __awaiter(this, void 0, void 0, function* () {
                soundTrack.addSound(new BABYLON.Sound("test music", path_1.default.join(__dirname, `../assets/audio/music/${track}`), this.scene, null, { volume: this.musicVolume }));
            }));
            return soundTrack;
        };
        this.loadAudio = (file) => {
            return new BABYLON.Sound(file.split(".wav")[0], path_1.default.join(__dirname, `../assets/audio/SFX effects/${file}`), this.scene, null, { volume: this.fxVolume });
        };
        this.scene = scene;
        this.musicVolume = gameSettings_json_1.default.musicVol * 0.6;
        this.fxVolume = gameSettings_json_1.default.fxVol * 0.6;
        this.drawnCardSound = this.loadAudio("played_card.wav");
        this.cardPlayedSound = this.loadAudio("drawn_card.wav");
        this.soundTrack = this.loadAllMusic();
        this.currentTrack = track === undefined ? Math.round(Math.random() * (this.soundTrack.soundCollection.length - 1)) : track;
        this.soundTrack.soundCollection[this.currentTrack].autoplay = true;
        if (track === undefined) {
            this.soundTrack.soundCollection.forEach(track => {
                this.soundTrack.soundCollection[this.currentTrack].autoplay = true;
                track.onEndedObservable.add(() => {
                    this.currentTrack++;
                    if (this.currentTrack >= this.soundTrack.soundCollection.length) {
                        this.currentTrack = 0;
                    }
                    this.soundTrack.soundCollection[this.currentTrack].play();
                });
            });
        }
    }
}
exports.MusicControler = MusicControler;
