let accelerationXInput = document.querySelector("[name=accelerazioneX]")
let accelerationXValue = document.querySelector("#accelerationXValue")

let accelerationYInput = document.querySelector("[name=accelerazioneY]")
let accelerationYValue = document.querySelector("#accelerationYValue")


accelerationXInput.value = accelerazioneX
accelerationXValue.innerHTML = `ACCELERAZIONE X : ${accelerazioneX}`

accelerationXInput.addEventListener("input", function(e){
  //console.log(`acceleration changed -> ${accelerationXInput.value}`)
  accelerazioneX = parseFloat(accelerationXInput.value)
  console.log(accelerazioneX)

  accelerationXValue.innerHTML = `ACCELERAZIONE X: ${accelerazioneX}`
})


accelerationYInput.value = accelerazioneY
accelerationYValue.innerHTML = `ACCELERAZIONE Y : ${accelerazioneY}`

accelerationYInput.addEventListener("input", function(e){
  //console.log(`acceleration changed -> ${accelerationYInput.value}`)
  accelerazioneY = parseFloat(accelerationYInput.value)
  console.log(accelerazioneY)

  accelerationYValue.innerHTML = `ACCELERAZIONE Y: ${accelerazioneY}`
})