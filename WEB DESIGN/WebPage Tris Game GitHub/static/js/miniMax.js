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
				resultMatch = resultMatchCheck(grid)
	
				if (resultMatch != null) {
					if (resultMatch != "draw") {
						setTimeout(function() {
							playAudio(`../static/mp3/vittoria.mp3`)
							setTimeout(function() {
								winUpdate()
								restartCleaning()
							}, 1000)
						}, 1500)
					} else if (resultMatch === "draw") {
						setTimeout(function() {
							restartCleaning()
						}, 500)
					}
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
						

						resultMatch = resultMatchCheck(grid)
	
						if (resultMatch != null) {
							if (resultMatch != "draw") {
								setTimeout(function() {
									playAudio(`../static/mp3/sconfitta.mp3`)
									setTimeout(function() {
										winUpdate()
										restartCleaning()
									}, 1000)
								}, 2000)
							} else if (resultMatch === "draw") {
								setTimeout(function() {
									restartCleaning()
								}, 500)
							}
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
	let vincitore = resultMatchCheck(grid);

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
}

