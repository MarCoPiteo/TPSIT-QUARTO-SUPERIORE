/*FINIRE FUNZIONE WIN AND DRAW. 
FARE DESIGN PAGINA HOME DI SCELTA PERSONAGGIO E BACKGROUND
FINIRE ANCHE BACKGROUND TRIS TABLE (90%)---> DA CAPIRE SE VA TENUTO IL REATTORE DI BACKGROUND
FINIRE INDICATORE PERSONAGGIO CHE INIZIA (80%) ---> AGGIUSTARE NUMERO DI VOLTE CHE SI RIPETE, E QUANDO L'AVVERSARIO 
											  FA LA MOSSA, BLOCCARE L'ANIMAZIONE. DA VEDERE COL PROF
*/


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
let flgUserMove = false


let currentPlayer = "null"
currentPlayer = startPlayer()


for (let i = 0; i < link.length; i++) {
	let l = link[i]
	l.addEventListener("click", function (e) {
		e.preventDefault()
		
		let win = false
		let draw = false
		let casella = e.currentTarget,
			row = parseInt(e.currentTarget.dataset.row),
			col = parseInt(e.currentTarget.dataset.col)
		//SERVE A MINIMIZZARE LE RIGHE DI CODICE PER IL CONTROLLO RISULTATO 
		let resultMatch = null			


		if (flgUserMove === true) {
			if (grid[row][col] === null) {
				if (currentPlayer === "O") {
					casella.classList.add("player1Play")
				} else {
					casella.classList.add("player2Play")
				}
				grid[row][col] = currentPlayer
				removeMove(currentPlayer)
					
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
					flgUserMove = false

					if (currentPlayer === "O") {
						currentPlayer = "X"
					} else {
						currentPlayer = "O"
					} 
					animationPlayer(currentPlayer)
				}
			}
		}


		/*if (casella.dataset.stato === "null") {
			if (currentPlayer === "O") {
				casella.classList.add("player1Play")

				casella.dataset.stato = currentPlayer
				removeMove(currentPlayer)

				win = checkWinner(currentPlayer)
				if (win === true) {
					//win() 		SVILUPPARE FUNZIONE PER DARE LA VITTORIA

					winUpdate()
					restartCleaning()
				} else {
					draw = fullCellsCheck()

					if (draw === true) {
						//draw		SVILUPPARE FUNZIONE PER DARE IL PAREGGIO
						restartCleaning()
					} else {
						currentPlayer = "X"

					}
				}
			} else {
				casella.classList.add("player2Play")

				casella.dataset.stato = currentPlayer
				removeMove(currentPlayer)

				win = checkWinner(currentPlayer)
				if (win === true) {
					//win() 		SVILUPPARE FUNZIONE PER DARE LA VITTORIA

					winUpdate()
					restartCleaning()
				} else {
					draw = fullCellsCheck()

					if (draw === true)  {
						//draw		SVILUPPARE FUNZIONE PER DARE IL PAREGGIO
						restartCleaning()
					} else {
						currentPlayer = "O"
					}
				}
			} 
			animationPlayer(currentPlayer)
		}*/
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



//---------------FUNZIONI---------------//

function startPlayer() {
	let r = Math.floor(Math.random() *2)

	if (r === 0) {		//PLAYER 1(IRONMAN) = O, PLAYER 2(THANOS) = X
		currentPlayer = "O"
	} else {
		currentPlayer = "X"		
	}
	animationPlayer(currentPlayer)

	return currentPlayer
}	

//----------------------------------//

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

		setTimeout(function() {
			flgUserMove = true
		}, 250)
    }
    
    currentPlayerAnimation[i].addEventListener('animationend', handleAnimationEnd, {once: true});
  });
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

	currentPlayer = startPlayer()
}


function resetPlayersWin() {
	let playerWin = document.querySelectorAll(".functionPlayerWin")

	for (let i = 0; i < playerWin.length; i++) {
		playerWin[i].innerHTML = "0"
	}
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

//----------------------------------//

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