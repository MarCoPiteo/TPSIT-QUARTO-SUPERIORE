let width = 900
let height = 600
let circleIteration = 0

let w = 400
let h = 400

let d = 50
let r = d/2

let accelerazioneX = -0.01
let accelerazioneY = 0.01
let velocitaX = 0
let velocitaY = 0
let x = 0
let y = h/2

function setup() {
  createCanvas(w, h);
  background(255,0,0);
}

function draw() {
  background(255,0,0);
  
  circle(x,y,d)
  fill(0,255,0)
  
  velocitaX = velocitaX + accelerazioneX
  velocitaY = velocitaY + accelerazioneY

  x = x + velocitaX
  y = y - velocitaY
  
  if (x >= w+r) {
    x = -r
  } else if (x <= -r) {
    x = w+r
  }

  if (y >= h+r) {
    y = -r
  } else if (y <= -r) {
    y = h+r
  }
}