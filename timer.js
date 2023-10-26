import Sounds from "./sounds.js"

export default function Timer({
  minutesDisplay,
  secondsDisplay,
  resetControls
}) {
  let timerTimeOut
  let minutes = Number(minutesDisplay.textContent)

  function updateDisplay(newMinutes, seconds) {
    newMinutes = newMinutes === undefined ? minutes: newMinutes
    seconds = seconds === undefined ? 0: seconds
    minutesDisplay.textContent = String(newMinutes).padStart(2, "0")
    secondsDisplay.textContent = String(seconds).padStart(2, "0")
    /* minutesDisplay/secondDisplay é um objeto do HTML pois é uma classe, por isso usa-se o textContent para alterar o conteúdo do mesmo */
  }
  
  function reset(){
    updateDisplay(minutes, 0)
    clearTimeout(timerTimeOut)
  }
  
  function countDown() {
    timerTimeOut = setTimeout(function() {
      let seconds = Number(secondsDisplay.textContent)
      let minutes = Number(minutesDisplay.textContent)
      let isFinished = minutes == 0 && seconds == 0

      updateDisplay(minutes, 0)
  
      if(isFinished){ //cronometro chegou ao fim
        resetControls()
        updateDisplay()
        Sounds().timeEnd()
        return
      }
  
      if(seconds == 0) {
        seconds = 60
        --minutes
      }
  
      updateDisplay(minutes, String(seconds-1))
  
      countDown()
    }, 1000) /* 1000ms */
  }

  function updateMinutes(newMinutes) {
    minutes = newMinutes
  }

  function hold (){
    clearTimeout(timerTimeOut) /* recebe identificador do retorno do seTimeOut e para a execução */
  }

  return {
    countDown, //countdown: countdown - mesmo nome do atributo e da propriedade da pra deixar um só 
    reset,
    updateDisplay,
    updateMinutes,
    hold
  }
}

