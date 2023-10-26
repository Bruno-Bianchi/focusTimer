import Controls from "./controls.js"
import Timer from "./timer.js" 
import Sound from "./sounds.js"
import { 
  buttonPause,
  buttonPlay,
  buttonSet,
  buttonSoundOFF,
  buttonSoundON,
  buttonStop,
  minutesDisplay,
  secondsDisplay 
} from "./config.js"

const controls = Controls({
  buttonPause,
  buttonPlay,
  buttonSet,
  buttonStop
})

const sound = Sound()

const timer = Timer({
  minutesDisplay,
  secondsDisplay,
  resetControls: controls.reset
})

buttonPlay.addEventListener("click", function(){
  controls.play()
  timer.countDown()
  sound.pressButton()
})

buttonPause.addEventListener("click", function (){
  controls.pause()
  timer.hold()
  sound.pressButton()
})

buttonStop.addEventListener("click", function(){
  controls.reset()
  timer.reset()
  sound.pressButton()
})

buttonSoundON.addEventListener("click", function(){
  buttonSoundON.classList.add("hide")
  buttonSoundOFF.classList.remove("hide")
  sound.bgAudio.pause()
})

buttonSoundOFF.addEventListener("click", function(){
  buttonSoundOFF.classList.add("hide")
  buttonSoundON.classList.remove("hide")
  sound.bgAudio.play()
})

buttonSet.addEventListener("click", function(){
  let newMinutes = controls.getMinutes()

  if (!newMinutes) {
    timer.reset()
    return
  } 

  timer.updateDisplay(newMinutes, 0)
  timer.updateMinutes(newMinutes)
})