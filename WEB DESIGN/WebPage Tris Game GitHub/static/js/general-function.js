let link = document.querySelectorAll(".pitchSquare")
let restart = document.querySelector(".btnRestart")
let resetWinBtn = document.querySelector(".btnResetWin")
let timeout


restart.addEventListener("click", function(e) {			
	e.preventDefault()

	restartCleaning()
})

resetWinBtn.addEventListener("click", function(e) {
	e.preventDefault()

	resetPlayersWin()
})



//-------------------VARIABLES--------------------//
let grid = [
	[null, null, null], 
	[null, null, null], 
	[null, null, null]
]

let playerLifeRemove
let flgUserMove
let currentPlayer = null

let playerOWins = 0
let playerXWins = 0




//-------------------FUNCTIONS---------------------//

function fullCellsCheck(grid) {
	let fullCells = 0

	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid.length; j++) {
			if (grid[i][j] != null) {
				fullCells += 1
			}

			if (fullCells >= 9) {
				return true
			}
		}
	}
}

function checkWinner(currentPlayer, grid) {
	if (grid[0][0] === currentPlayer && grid[1][0] === currentPlayer && 
		grid[2][0] === currentPlayer) {		//COLONNA SINISTRA
		return true
	} else if (grid[0][1] === currentPlayer && grid[1][1] === currentPlayer && 
		grid[2][1] === currentPlayer) {		//COLONNA CENTRALE
		return true
	} else if (grid[0][2] === currentPlayer && grid[1][2] === currentPlayer && 
		grid[2][2] === currentPlayer) {		//COLONNA DESTRA
		return true
	} else if (grid[0][0] === currentPlayer && grid[0][1] === currentPlayer && 
		grid[0][2] === currentPlayer) { 		//RIGA ALTA
		return true
	} else if (grid[1][0] === currentPlayer && grid[1][1] === currentPlayer && 
		grid[1][2] === currentPlayer) {		//RIGA CENTRALE
		return true
	} else if (grid[2][0] === currentPlayer && grid[2][1] === currentPlayer && 
		grid[2][2] === currentPlayer) {		//RIGA BASSA
		return true
	} else if (grid[0][0] === currentPlayer && grid[1][1] === currentPlayer && 
		grid[2][2] === currentPlayer) {		//DIAGONALE SINISTRA-DESTRA
		return true
	} else if (grid[0][2] === currentPlayer && grid[1][1] === currentPlayer && 
		grid[2][0] === currentPlayer) {		//DIAGONALE DESTRA-SINISTRA
		return true
	} else {
		return false
	} 
}


//.....................VISIBILITY FUNCTION.......................//
function restartCleaning() {
	clearTimeout(timeout)
	
	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid.length; j++) {
			if (grid[i][j] === "O") {
				let casellaCleaning = document.querySelector(`.pitchSquare[data-row="${i}"][data-col="${j}"]`)
				casellaCleaning.classList.remove("playerOPlay")
			} else if (grid[i][j] === "X") {
				let casellaCleaning = document.querySelector(`.pitchSquare[data-row="${i}"][data-col="${j}"]`)
				casellaCleaning.classList.remove("playerXPlay")
			}
			
			grid[i][j] = null	
		}	
	}

	playerLifeRemove = document.querySelectorAll(".functionRemoveMove")

	for (let i = 0; i < playerLifeRemove.length; i++) {
		playerLifeRemove[i].classList.remove("removeMove")

		playerLifeRemove[i].dataset.move = "0"
	}	

	currentPlayer = startPlayer()
}

function resetPlayersWin() {
	let playerWin = document.querySelectorAll(".functionPlayerWin")

	for (let i = 0; i < playerWin.length; i++) {
		playerWin[i].innerHTML = "0"
	}

	playerOWins = 0
	playerXWins = 0
}

function removeMove(currentPlayer) {
	if (currentPlayer === "O") {
		playerLifeRemove = document.querySelectorAll(".playerOLifeImage")
	} else if (currentPlayer === "X") {
		playerLifeRemove = document.querySelectorAll(".playerXLifeImage")
	}

	for (let i = 0; i < playerLifeRemove.length; i++) {
		if (playerLifeRemove[i].dataset.move === "0") {
			playerLifeRemove[i].classList.add("removeMove")

			playerLifeRemove[i].dataset.move = "1"

			return
		}
	}	
}

function winUpdate() {
	let winOutput

	if (currentPlayer === "O") {
		playerOWins += 1

		winOutput = document.querySelector(".playerOWin")
		winOutput.innerHTML = playerOWins
	} else if (currentPlayer === "X") {
		playerXWins += 1

		winOutput = document.querySelector(".playerXWin")
		winOutput.innerHTML = playerXWins
	}
}


function playAudio(url) {
	let audio = new Audio(url);
	audio.play();
}


function animationPlayer(currentPlayer) {
const animateCSS = (element = '.playerImages', animation = 'pulse', prefix = 'animate__', 
	duration = 'slow', repeating = 'repeat-1')

  new Promise((resolve, reject) => {
	let i = 0
    const bounce = `${prefix}${animation}`;
    const slower = `${prefix}${duration}`
    const repeat = `${prefix}${repeating}`

    const currentPlayerAnimation = document.querySelectorAll(element);

    if (currentPlayer === "O") {
    	i = 0
    } else if (currentPlayer === "X") {
    	i = 1
    }

	currentPlayerAnimation[i].classList.add(`${prefix}animated`, bounce, slower, repeat);

    function handleAnimationEnd(event) {
		event.stopPropagation();
		currentPlayerAnimation[i].classList.remove(`${prefix}animated`, bounce, slower, repeat);
		resolve('Animation ended');
    }
    
    currentPlayerAnimation[i].addEventListener('animationend', handleAnimationEnd, {once: true});
  });
}


//---------------------UMANO-ROBOT e UMANO-UMANO----------------------//
function resultMatchCheck(currentPlayer) {
	let result = null

	win = checkWinner(currentPlayer, grid)
	if (win === true) {
		result = "win"
	} else {
		draw = fullCellsCheck(grid)

		if (draw === true)  {
			result = "draw"
		}
	}
	return result
}


//---------------------ROBOT-UMANO FUNCTIONS----------------------//
function getEmptyCells(grid) {
	let emptyCells = []

	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid.length; j++) {
			if (grid[i][j] === null) {
				emptyCells.push([i, j])
			}
		}
	}
	return emptyCells
}