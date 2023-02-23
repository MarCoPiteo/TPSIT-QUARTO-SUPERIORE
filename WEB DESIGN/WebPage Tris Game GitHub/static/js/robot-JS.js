//AGGIUSTARE IL FATTO CHE IL PLAYER UMANO POSSA GIOCARE PIU TURN DI SEGUITO


let link = document.querySelectorAll(".pitchSquare")
let restart = document.querySelector(".btnRestart")
let resetWinBtn = document.querySelector(".btnResetWin")

let grid = [
	[null, null, null], 
	[null, null, null], 
	[null, null, null]
]

let playerLifeRemove

let player1Wins = 0
let player2Wins = 0


let userPlayer = start()
let currentPlayer = userPlayer 



for (let i = 0; i < link.length; i++) {
	let l = link[i]

	l.addEventListener("click", function (e) {
		e.preventDefault()
		
		let win = false
		let draw = false

		let casella = e.currentTarget,
			row = parseInt(e.currentTarget.dataset.row),
			col = parseInt(e.currentTarget.dataset.col)
		let resultMatch = null	


		if (grid[row][col] === null) {
			if (userPlayer === "O") {
				casella.classList.add("player1Play")
			} else {
				casella.classList.add("player2Play")
			}
			grid[row][col] = currentPlayer


//CHECK RISULTATO//
			resultMatch = resultMatchCheck(currentPlayer)

			if (resultMatch === "win") {
				setTimeout(function() {
					winUpdate()
					restartCleaning()
				}, 1000)
			} else if (resultMatch === "draw") {
				setTimeout(function() {
					restartCleaning()
				}, 500)
			} else if (resultMatch === null) {
				removeMove(currentPlayer)
				if (userPlayer === "O") {
					currentPlayer = "X"
				} else {
					currentPlayer = "O"
				} 
				animationPlayer(currentPlayer)



				//COMPUTER MOVE//
				setTimeout(function(){

					let computerMove = getBestMove(grid)
					grid[computerMove[0]][computerMove[1]] = currentPlayer

					let computerCasella = document.querySelector(`.pitchSquare[data-row="${computerMove[0]}"][data-col="${computerMove[1]}"]`)

					if (userPlayer === "O") {
						computerCasella.classList.add("player2Play")
					} else {
						computerCasella.classList.add("player1Play")
					}


					resultMatch = resultMatchCheck(currentPlayer)

					if (resultMatch === "win") {
						setTimeout(function() {
						winUpdate()
						restartCleaning()
					}, 1000)
					} else if (resultMatch === "draw") {
						setTimeout(function() {
						restartCleaning()
					}, 500)
					} else if (resultMatch === null) {
						removeMove(currentPlayer)
						currentPlayer = userPlayer
						animationPlayer(currentPlayer)
					}
				}, 2000)
			}
		}
	})
}
restart.addEventListener("click", function(e) {			
	e.preventDefault()

	restartCleaning()
})

resetWinBtn.addEventListener("click", function(e) {
	e.preventDefault()

	resetPlayersWin()
})
	



//FUNZIONI

function start() {
	//PAGINA HOME PER INIZIO GIOCO

	let userPlayer = "X"

	animationPlayer(userPlayer)

	return userPlayer
}



function getBestMove(grid) {
	let emptyCells = getEmptyCells(grid)

	let move = []
	move = emptyCells[0]

	emptyCells.pop()

	return move
}


function getEmptyCells(grid) {
	let emptyCells = []
	let b = 0

	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid.length; j++) {
			if (grid[i][j] === null) {
				emptyCells.push([i, j])
			}
		}
	}
	return emptyCells
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

function fullCellsCheck(grid) {
	let fullCells = 0

	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid.length; j++) {
			if (grid[i][j] != null) {
				fullCells += 1
			}

			if (fullCells >= 8) {
				return true
			}
		}
	}
}

function checkWinner(currentPlayer, grid) {
	if (grid[0][0] === currentPlayer && grid[1][0] === currentPlayer && 
		grid[2][0] === currentPlayer) {		//COLONNA SINISTRA
		return true
		console.log("vittoria")
	} else if (grid[0][1] === currentPlayer && grid[1][1] === currentPlayer && 
		grid[2][1] === currentPlayer) {		//COLONNA CENTRALE
		return true
		console.log("vittoria")
	} else if (grid[0][2] === currentPlayer && grid[1][2] === currentPlayer && 
		grid[2][2] === currentPlayer) {		//COLONNA DESTRA
		return true
		console.log("vittoria")
	} else if (grid[0][0] === currentPlayer && grid[0][1] === currentPlayer && 
		grid[0][2] === currentPlayer) { 		//RIGA ALTA
		return true
		console.log("vittoria")
	} else if (grid[1][0] === currentPlayer && grid[1][1] === currentPlayer && 
		grid[1][2] === currentPlayer) {		//RIGA CENTRALE
		return true
		console.log("vittoria")
	} else if (grid[2][0] === currentPlayer && grid[2][1] === currentPlayer && 
		grid[2][2] === currentPlayer) {		//RIGA BASSA
		return true
		console.log("vittoria")
	} else if (grid[0][0] === currentPlayer && grid[1][1] === currentPlayer && 
		grid[2][2] === currentPlayer) {		//DIAGONALE SINISTRA-DESTRA
		return true
		console.log("vittoria")
	} else if (grid[0][2] === currentPlayer && grid[1][1] === currentPlayer && 
		grid[2][0] === currentPlayer) {		//DIAGONALE DESTRA-SINISTRA
		return true
		console.log("vittoria")
	} else {
		return false
	} 
}


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



function resetPlayersWin() {
	let playerWin = document.querySelectorAll(".functionPlayerWin")

	for (let i = 0; i < playerWin.length; i++) {
		playerWin[i].innerHTML = "0"
	}

	player1Wins = 0
	player2Wins = 0
} 

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

	currentPlayer = start()
}