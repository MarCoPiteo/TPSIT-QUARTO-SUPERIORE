let link = document.querySelectorAll(".pitchSquare")
let restart = document.querySelector(".btnRestart")
let resetWinBtn = document.querySelector(".btnResetWin")



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

let player1Wins = 0
let player2Wins = 0




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
	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid.length; j++) {
			if (grid[i][j] === "O") {
				let casellaCleaning = document.querySelector(`.pitchSquare[data-row="${i}"][data-col="${j}"]`)
				casellaCleaning.classList.remove("player1Play")
			} else if (grid[i][j] === "X") {
				let casellaCleaning = document.querySelector(`.pitchSquare[data-row="${i}"][data-col="${j}"]`)
				casellaCleaning.classList.remove("player2Play")
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

	player1Wins = 0
	player2Wins = 0
}

function removeMove(currentPlayer) {
	if (currentPlayer === "O") {
		playerLifeRemove = document.querySelectorAll(".player1LifeImage")
	} else if (currentPlayer === "X") {
		playerLifeRemove = document.querySelectorAll(".player2LifeImage")
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
		player1Wins += 1

		winOutput = document.querySelector(".player1Win")
		winOutput.innerHTML = player1Wins
	} else if (currentPlayer === "X") {
		player2Wins += 1

		winOutput = document.querySelector(".player2Win")
		winOutput.innerHTML = player2Wins
	}
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