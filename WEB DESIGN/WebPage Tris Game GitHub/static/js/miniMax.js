flgUserMove = false

let min,
	max
currentPlayer = startPlayer()


for (let i = 0; i < link.length; i++){
	let l = link[i]

	l.addEventListener("click", function(e){
		e.preventDefault()

		let casella = e.currentTarget,
			row = parseInt(e.currentTarget.dataset.row),
			col = parseInt(e.currentTarget.dataset.col)
		let resultMatch = null	

		if (flgUserMove === true) {
			if (grid[row][col] === null) {
				if (currentPlayer === min) {
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
					currentPlayer = currentPlayer === min ? max : min
		
					flgUserMove = false
					animationPlayer(currentPlayer)


					//-------------MAX MOVE----------------//
					timeout = setTimeout(function() {
						let compMove = getBestMove(grid, currentPlayer)


				    	let compRow = compMove[0],
				    	compCol = compMove[1]

			    		grid[compRow][compCol] = currentPlayer


						let computerCasella = document.querySelector(`.pitchSquare[data-row="${compRow}"][data-col="${compCol}"]`)
						computerCasella.classList.add("playerXPlay")
						

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

							currentPlayer = currentPlayer === max ? min : max

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
	max = "X",
	min = "O",
	currentPlayer = min					

	animationPlayer(currentPlayer)

	setTimeout(function() {
		flgUserMove = true
	}, 2400)

	return currentPlayer
}


function getBestMove(grid, currentPlayer) {
	let bestScore = currentPlayer === min ? Infinity : -Infinity

	let	bestMove = []
	let emptyCells = getEmptyCells(grid)


	emptyCells.forEach((empty) => {
		let i = empty[0]
		let j = empty[1]
		
		grid[i][j] = currentPlayer
		
		let currentCellScore = miniMax(grid, currentPlayer === min ? max : min)


		if (currentPlayer === min) {
			if (currentCellScore <= bestScore) {
				bestScore = currentCellScore

				bestMove = [i, j]
			}
		} else {
			if (currentCellScore >= bestScore) {
				bestScore = currentCellScore

				bestMove = [i, j]
			}
		}
		grid[i][j] = null
	});
	return bestMove
}


function miniMax(grid, currentPlayer) {
	let bestScore = currentPlayer === max ? -Infinity : Infinity

	let	emptyCells = getEmptyCells(grid)
	let result = gameOver(currentPlayer)


	if (result != null) {
		if (result === max) {
			return 1
		} else if (result === min) {
			return -1
		} else if (result === "draw") {
			return 0
		}
	} else {
		if (currentPlayer === max) {
			emptyCells.forEach(function (empty) {
				let	row = empty[0]
				let	col = empty[1]

				grid[row][col] = max


				let currentCellScore = miniMax(grid, min)

				bestScore = Math.max(currentCellScore, bestScore)
				grid[row][col] = null
			});
			return bestScore
		} else {
			emptyCells.forEach(function (empty) {
				let	row = empty[0]
				let	col = empty[1]

				grid[row][col] = min


				let currentCellScore = miniMax(grid, max)

				bestScore = Math.min(bestScore, currentCellScore)
				grid[row][col] = null
			});
			return bestScore
		} 
	}
	return bestScore
}


function gameOver(currentPlayer) {
	let gameOver = null

	win = checkWinner(currentPlayer, grid)
	if (win === true) {
		gameOver = currentPlayer
	} else {
		draw = fullCellsCheck(grid)

		if (draw === true)  {
			gameOver = "draw"
		}
	}
	return gameOver
}