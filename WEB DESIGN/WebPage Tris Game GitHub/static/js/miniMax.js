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
						let compMove = getBestMove(grid, max)


				    	let compRow = compMove[0],
				    	compCol = compMove[1]

			    		grid[compRow][compCol] = max
						playAudio(`../static/mp3/player${currentPlayer}.mp3`)

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
	let max = "X",
		min = "O"

	let bestScore = currentPlayer === min ? Infinity : -Infinity,
		bestMove = [],
		empty = getEmptyCells(grid);

	empty.forEach((emptyCell) => {
		let i = emptyCell[0];
		let j = emptyCell[1];

		grid[i][j] = currentPlayer === min ? min : max;

		let currentMoveScore = miniMax(grid, currentPlayer === min ? max : min);
		
		if (currentPlayer === min) {
			// min
			if (currentMoveScore <= bestScore) {
				bestScore = currentMoveScore;
				bestMove = [i, j];
			}
		} else {
			if (currentMoveScore >= bestScore) {
				bestScore = currentMoveScore;
				bestMove = [i, j];
			}
		}
		grid[i][j] = null;
	});
	return bestMove;
	/*let bestScore = currentPlayer === min ? Infinity : -Infinity

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
	return bestMove*/
}


function miniMax(grid, currentPlayer) {
	let bestScore;
	let max = "X",
		min = "O"

	if (currentPlayer === min) {
		bestScore = Infinity;
	} else {
		bestScore = -Infinity;
	}

	let emptyCells = getEmptyCells(grid);
	let vincitore = checkWin(grid);

	//controllo il vincitore
	if (vincitore != null) {
		if (vincitore === max) {
			return 1;
		} else if (vincitore === min) {
			return -1;
		} else if (vincitore === "draw") {
			return 0;
		}
	} else {
		if (currentPlayer === max) {
			emptyCells.forEach(function (element) {
				let i = element[0];
				let j = element[1];
				grid[i][j] = max;
				let score = miniMax(grid, min);
				bestScore = Math.max(score, bestScore);
				grid[i][j] = null;
			});
			return bestScore
		} else {
			emptyCells.forEach(function (element) {
				let i = element[0];
				let j = element[1];
				grid[i][j] = min;
				let score = miniMax(grid, max);
				bestScore = Math.min(bestScore, score);
				grid[i][j] = null;
			});
			return bestScore
		}
	}
	return bestScore;
	/*let bestScore = currentPlayer === max ? -Infinity : Infinity

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
	return bestScore*/
}





function checkWin(grid) {
	let result = null;

	//----------------ORIZZONTALE----------------//
	for (let i = 0; i < grid.length; i++) {
		if (grid[i][0] != null && grid[i][0] === grid[i][1] && grid[i][1] === grid[i][2]) {
			result = grid[i][0];

			return result;
		}
	}

	//----------------VERTICALE----------------//
	for (let j = 0; j < grid.length; j++) {
		if (grid[0][j] != null && grid[0][j] === grid[1][j] && grid[1][j] === grid[2][j]) {
			result = grid[0][j];

			return result;
		}
	}

	//----------------DIAGONALE SX-DX----------------//
	if (grid[0][0] != null && grid[0][0] === grid[1][1] && grid[1][1] === grid[2][2]) {		
		result = grid[0][0]

		return result
	}

	//----------------DIAGONALE DX-SX----------------//
	if (grid[0][2] != null && grid[0][2] === grid[1][1] && grid[1][1] === grid[2][0]) {		
		result = grid[0][2]

		return result
	}


	let draw = fullCellsCheck(grid)

	if (result === null && draw === true) {
		return "draw"
	} else {
		return result
	}
}
