//FINIRE DI FARE START PLAYER FACENDO SCEGLIERE QUALE DEI DUE DEVE ESSERE


flgUserMove = false

let userPlayer = startPlayer()
currentPlayer = userPlayer 



for (let i = 0; i < link.length; i++) {
	let l = link[i]

	l.addEventListener("click", function (e) {
		e.preventDefault()


		let casella = e.currentTarget,
			row = parseInt(e.currentTarget.dataset.row),
			col = parseInt(e.currentTarget.dataset.col)
		let resultMatch = null	


		if (flgUserMove === true) {
			if (grid[row][col] === null) {
				if (userPlayer === "O") {
					casella.classList.add("playerOPlay")
				} else {
					casella.classList.add("playerXPlay")
				}
				grid[row][col] = currentPlayer
				playAudio(`../static/mp3/player${currentPlayer}.mp3`)
				removeMove(currentPlayer)
	
				//-------------CHECK RISULTATO----------//
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
					if (userPlayer === "O") {
						currentPlayer = "X"
					} else {
						currentPlayer = "O"
					} 
					flgUserMove = false

					animationPlayer(currentPlayer)
	
	
	
					//COMPUTER MOVE//
					timeout = setTimeout(function(){
						let computerMove = getBestMove(grid)
						grid[computerMove[0]][computerMove[1]] = currentPlayer
	
						let computerCasella = document.querySelector(`.pitchSquare[data-row="${computerMove[0]}"][data-col="${computerMove[1]}"]`)
	
						if (userPlayer === "O") {
							computerCasella.classList.add("playerXPlay")
						} else {
							computerCasella.classList.add("playerOPlay")
						}
						playAudio(`../static/mp3/player${currentPlayer}.mp3`)
	
	
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
						setTimeout(function() {
							flgUserMove = true 
						}, 2400)
					}, 2000)
				}
			}
		}
	})
}
	


//------------------FUNZIONI---------------//
function startPlayer() {
	let userPlayer = "O"

	animationPlayer(userPlayer)

	setTimeout(function() {
		flgUserMove = true
	}, 2400)

	return userPlayer
}

function getBestMove(grid) {
	let emptyCells = getEmptyCells(grid)

	let move = []
	move = emptyCells[0]

	emptyCells.pop()

	return move
}