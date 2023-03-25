//FINIRE DI FARE START PLAYER FACENDO SCEGLIERE QUALE DEI DUE DEVE ESSERE


flgUserMove = false

currentPlayer = startPlayer()



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
				if (currentPlayer === "O") {
					casella.classList.add("playerOPlay")
				} else {
					casella.classList.add("playerXPlay")
				}

				grid[row][col] = currentPlayer
				playAudio(`../static/mp3/player${currentPlayer}.mp3`)
				removeMove(currentPlayer)
	

				//-------------CHECK RISULTATO----------//
				resultMatch = resultMatchCheck(grid)
	
				if (resultMatch != null) {
					if (resultMatch != "draw") {
						setTimeout(function() {
							winUpdate()
							restartCleaning()
						}, 1000)
					} else if (resultMatch === "draw") {
						setTimeout(function() {
							restartCleaning()
						}, 500)
					}
				} else if (resultMatch === null) {
					currentPlayer = currentPlayer === "O" ? "X" : "O" 
					flgUserMove = false

					animationPlayer(currentPlayer)
	
	
	
					//COMPUTER MOVE//
					timeout = setTimeout(function(){
						let computerMove = getBestMove(grid)
	
						let computerCasella = document.querySelector(`.pitchSquare[data-row="${computerMove[0]}"][data-col="${computerMove[1]}"]`)
	
						if (currentPlayer === "X") {
							computerCasella.classList.add("playerXPlay")
						} else {
							computerCasella.classList.add("playerOPlay")
						}

						grid[computerMove[0]][computerMove[1]] = currentPlayer
						playAudio(`../static/mp3/player${currentPlayer}.mp3`)
						removeMove(currentPlayer)
	
	
						resultMatch = resultMatchCheck(grid)
	
						if (resultMatch != null) {
							if (resultMatch != "draw") {
								setTimeout(function() {
									winUpdate()
									restartCleaning()
								}, 1000)
							} else if (resultMatch === "draw") {
								setTimeout(function() {
									restartCleaning()
								}, 500)
							}
						} else if (resultMatch === null) {
							currentPlayer = currentPlayer === "X" ? "O" : "X" 

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