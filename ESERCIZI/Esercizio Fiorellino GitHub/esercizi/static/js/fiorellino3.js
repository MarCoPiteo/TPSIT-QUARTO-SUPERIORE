let width = 600
let height = 300
let diameter = 30

let aumentoX = 3
let aumentoY = 2

let x = 300
let y = 150

function drawFlower(x, y, d) {
	let r = d/2

	stroke("rgb(0,0,0)")
	strokeWeight(2)

	fill("rgb(255,165,0)")
	circle(x-r, y-r, d)
	circle(x+r, y+r, d)
	circle(x-r, y+r, d)
	circle(x+r, y-r, d)
	fill("rgb(255,51,0)")
	circle(x, y, d)
}


function setup () {
	createCanvas(width, height)
}


function draw() {
	background(0,255,0)

	drawFlower(x, y, diameter)

	x = x + aumentoX
	y = y + aumentoY

	console.log(y)

	if (y >= height-diameter) {
		aumentoY = -aumentoY

		console.log(y)
	} else if (y <= 0+diameter) {
		aumentoY = -aumentoY
	} else if (x >= width-diameter) {
		aumentoX = -aumentoX
	} else if (x <= 0+diameter) {
		aumentoX = -aumentoX
	}

}