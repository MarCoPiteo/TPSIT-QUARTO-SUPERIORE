let width = 600
let height = 300

let diameter= 30
let x= diameter
let y= diameter

function drawFlower(x, y, d) {
	let r = d/2

	stroke("rgb(0,0,0)")
	strokeWeight(2)

	fill("rgb(255,165,0)")
	circle(x+r, y-r, d)
	circle(x-r, y-r, d)
	circle(x+r, y+r, d)
	circle(x-r, y+r, d)
	fill("rgb(255,51,0)")
	circle(x, y, d)
}

function setup () {
	createCanvas(width, height)
	background(0,255,51)
}

function draw() {
	drawFlower(x, y, diameter)
	x = x + diameter*2

	if (x>600) {
		x = diameter
		y = y + diameter*2
	}
}