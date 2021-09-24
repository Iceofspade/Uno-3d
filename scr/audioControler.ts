import * as BABYLON  from "babylonjs"
import fs from "fs"
import path from 'path'
import sceneHander from "./renderer"
import gameSettings from "./settings/gameSettings.json"

export class MusicControler{
    public musicVolume:number
    public fxVolume:number
    public currentTrack:number 
    public soundTrack:BABYLON.SoundTrack
    public cardPlayedSound:BABYLON.Sound
    public drawnCardSound:BABYLON.Sound 
    private scene:BABYLON.Scene
 
     constructor(scene:BABYLON.Scene,track?:number){
         this.scene = scene
         this.musicVolume = gameSettings.musicVol*0.6
         this.fxVolume =  gameSettings.fxVol*0.6

         this.drawnCardSound = this.loadAudio("played_card.wav")
         this.cardPlayedSound = this.loadAudio("drawn_card.wav") 
         this.soundTrack = this.loadAllMusic()

         this.currentTrack = track === undefined ? Math.round(Math.random()*(this.soundTrack.soundCollection.length-1)) : track
         this.soundTrack.soundCollection[this.currentTrack].autoplay = true
 
         if(track === undefined){
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
     }
     loadAllMusic = ()=>{
         let tracks = fs.readdirSync(path.join(__dirname,"../assets/audio/music/")).filter(d => d.endsWith(".mp3"||".wav"))
         let soundTrack = new BABYLON.SoundTrack(this.scene,{
             volume:this.musicVolume,
         })
         tracks.forEach(async track => {
          soundTrack.addSound(new BABYLON.Sound("test music",path.join(__dirname,`../assets/audio/music/${track}`) ,this.scene,null,{volume:this.musicVolume}))
 
         })
         return soundTrack
 
     }
     loadAudio = (file:string)=>{
         return new BABYLON.Sound(file.split(".wav")[0],path.join(__dirname,`../assets/audio/SFX effects/${file}`),this.scene,null,{volume: this.fxVolume})
     }
 }